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
import { Loader2, Info } from "lucide-react";

const studioFormSchema = z.object({
  name: z.string().min(2, { message: "Nome do estúdio deve ter pelo menos 2 caracteres." }).max(100, { message: "Nome do estúdio não pode ter mais de 100 caracteres." }),
  logo_url: z.string().url({ message: "URL do logo inválida." }).optional().or(z.literal('')),
  primary_color: z.string().optional().or(z.literal('')),
  google_review_link: z.string().url({ message: "URL do Google Review inválida." }).optional().or(z.literal('')),
});

type StudioFormValues = z.infer<typeof studioFormSchema>;

export function StudioSettingsForm() {
  const { toast } = useToast();
  const { session, isLoading: sessionLoading } = useSession();
  const queryClient = useQueryClient();

  const form = useForm<StudioFormValues>({
    resolver: zodResolver(studioFormSchema),
    defaultValues: {
      name: "",
      logo_url: "",
      primary_color: "",
      google_review_link: "",
    },
  });

  const { data: studio, isLoading: studioLoading, isError: studioError } = useQuery({
    queryKey: ['studio', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const { data, error } = await supabase
        .from('studios')
        .select('*')
        .eq('owner_id', session.user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 means no rows found
      return data;
    },
    enabled: !!session?.user?.id && !sessionLoading,
  });

  useEffect(() => {
    if (studio) {
      form.reset(studio);
    }
  }, [studio, form]);

  const updateStudioMutation = useMutation({
    mutationFn: async (values: StudioFormValues) => {
      if (!session?.user?.id) throw new Error("Usuário não autenticado.");
      if (!studio?.id) throw new Error("Estúdio não encontrado para atualização.");

      const { error } = await supabase
        .from('studios')
        .update(values)
        .eq('id', studio.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Estúdio atualizado!",
        description: "As informações do seu estúdio foram salvas.",
      });
      queryClient.invalidateQueries({ queryKey: ['studio', session?.user?.id] });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar estúdio",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive"
      });
    },
  });

  const createStudioMutation = useMutation({
    mutationFn: async (values: StudioFormValues) => {
      if (!session?.user?.id) throw new Error("Usuário não autenticado.");

      const { data, error } = await supabase
        .from('studios')
        .insert({ owner_id: session.user.id, ...values })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Estúdio criado!",
        description: "Seu novo estúdio foi registrado com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ['studio', session?.user?.id] });
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar estúdio",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive"
      });
    },
  });

  const onSubmit = (values: StudioFormValues) => {
    if (studio) {
      updateStudioMutation.mutate(values);
    } else {
      createStudioMutation.mutate(values);
    }
  };

  if (sessionLoading || studioLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (studioError && studioError.code !== 'PGRST116') {
    return <p className="text-destructive">Erro ao carregar estúdio: {studioError.message}</p>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {!studio && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-info/10 border border-info/20 p-3 rounded-md">
            <Info className="w-4 h-4 text-info" />
            Você ainda não tem um estúdio registrado. Preencha os dados para criar um.
          </div>
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Estúdio</FormLabel>
              <FormControl>
                <Input placeholder="Nome do seu estúdio" {...field} className="bg-background" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="logo_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL do Logo</FormLabel>
              <FormControl>
                <Input placeholder="https://seulogo.com/logo.png" {...field} className="bg-background" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="primary_color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cor Primária (Hex ou HSL)</FormLabel>
              <FormControl>
                <Input placeholder="#007bff ou hsl(210 40% 98%)" {...field} className="bg-background" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="google_review_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link Google Review</FormLabel>
              <FormControl>
                <Input placeholder="https://g.page/seu-negocio/review" {...field} className="bg-background" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={updateStudioMutation.isPending || createStudioMutation.isPending}>
          {updateStudioMutation.isPending || createStudioMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...
            </>
          ) : "Salvar alterações"}
        </Button>
      </form>
    </Form>
  );
}