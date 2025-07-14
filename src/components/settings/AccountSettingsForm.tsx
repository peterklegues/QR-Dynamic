"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const accountFormSchema = z.object({
  email: z.string().email({ message: "E-mail inválido." }).optional().or(z.literal('')),
  password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres." }).optional().or(z.literal('')),
  confirmPassword: z.string().optional().or(z.literal('')),
}).refine((data) => {
  if (data.password && !data.confirmPassword) {
    return false; // Password provided, but confirmPassword is not
  }
  if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
    return false; // Passwords do not match
  }
  return true;
}, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
}).refine((data) => {
  return !!data.email || !!data.password; // At least one field must be provided
}, {
  message: "Preencha o e-mail ou a senha para atualizar.",
  path: ["email"], // Attach error to email field if neither is provided
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountSettingsForm() {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: AccountFormValues) => {
    setIsUpdating(true);
    try {
      if (values.email) {
        const { error: emailError } = await supabase.auth.updateUser({ email: values.email });
        if (emailError) throw emailError;
        toast({
          title: "E-mail atualizado!",
          description: "Verifique sua caixa de entrada para confirmar o novo e-mail.",
        });
      }

      if (values.password) {
        const { error: passwordError } = await supabase.auth.updateUser({ password: values.password });
        if (passwordError) throw passwordError;
        toast({
          title: "Senha atualizada!",
          description: "Sua senha foi alterada com sucesso.",
        });
      }

      if (!values.email && !values.password) {
        toast({
          title: "Nenhuma alteração",
          description: "Nenhum campo preenchido para atualização.",
          variant: "info"
        });
      } else {
        form.reset({ email: "", password: "", confirmPassword: "" }); // Clear form after successful update
      }
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar conta",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Novo E-mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="seu.novo.email@exemplo.com" {...field} className="bg-background" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nova Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} className="bg-background" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Nova Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} className="bg-background" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Atualizando...
            </>
          ) : "Atualizar Conta"}
        </Button>
      </form>
    </Form>
  );
}