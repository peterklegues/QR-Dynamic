"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/integrations/supabase/auth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const profileFormSchema = z.object({
  first_name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres." }).max(50, { message: "Nome não pode ter mais de 50 caracteres." }).optional().or(z.literal('')),
  last_name: z.string().min(2, { message: "Sobrenome deve ter pelo menos 2 caracteres." }).max(50, { message: "Sobrenome não pode ter mais de 50 caracteres." }).optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileSettingsForm() {
  const { toast } = useToast();
  const { session, isLoading: sessionLoading } = useSession();
  const queryClient = useQueryClient();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
    },
  });

  const { data: profile, isLoading: profileLoading, isError: profileError } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', session.user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 means no rows found
      return data;
    },
    enabled: !!session?.user?.id && !sessionLoading,
  });

  useEffect(() => {
    if (profile) {
      form.reset(profile);
    }
  }, [profile, form]);

  const updateProfileMutation = useMutation({
    mutationFn: async (values: ProfileFormValues) => {
      if (!session?.user?.id) throw new Error("Usuário não autenticado.");
      const { error } = await supabase
        .from('profiles')
        .upsert({ id: session.user.id, ...values }, { onConflict: 'id' });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Perfil atualizado!",
        description: "Suas informações de perfil foram salvas.",
      });
      queryClient.invalidateQueries({ queryKey: ['profile', session?.user?.id] });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar perfil",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive"
      });
    },
  });

  const onSubmit = (values: ProfileFormValues) => {
    updateProfileMutation.mutate(values);
  };

  if (sessionLoading || profileLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (profileError) {
    return <p className="text-destructive">Erro ao carregar perfil: {profileError.message}</p>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome" {...field} className="bg-background" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sobrenome</FormLabel>
              <FormControl>
                <Input placeholder="Seu sobrenome" {...field} className="bg-background" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={updateProfileMutation.isPending}>
          {updateProfileMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...
            </>
          ) : "Salvar alterações"}
        </Button>
      </form>
    </Form>
  );
}