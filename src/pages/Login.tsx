"use client";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-card/50 border-border shadow-lg">
        <CardHeader className="text-center pb-6">
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-3">
              <QrCode className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold text-foreground">Bem-vindo ao QR Dynamic</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Faça login ou crie uma conta para gerenciar seus QR Codes.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            providers={[]} // No third-party providers unless specified
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(var(--primary))',
                    brandAccent: 'hsl(var(--primary-glow))',
                    inputBackground: 'hsl(var(--background))',
                    inputBorder: 'hsl(var(--border))',
                    inputBorderHover: 'hsl(var(--ring))',
                    inputBorderFocus: 'hsl(var(--ring))',
                    inputText: 'hsl(var(--foreground))',
                    defaultButtonBackground: 'hsl(var(--secondary))',
                    defaultButtonBackgroundHover: 'hsl(var(--secondary-foreground))',
                    defaultButtonBorder: 'hsl(var(--border))',
                    defaultButtonText: 'hsl(var(--secondary-foreground))',
                    anchorText: 'hsl(var(--primary))',
                    anchorTextHover: 'hsl(var(--primary-glow))',
                  },
                },
              },
            }}
            theme="dark" // Using dark theme to match your current app's dark mode
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Seu e-mail',
                  password_label: 'Sua senha',
                  email_input_placeholder: 'email@exemplo.com',
                  password_input_placeholder: '••••••••',
                  button_label: 'Entrar',
                  social_provider_text: 'Entrar com {{provider}}',
                  link_text: 'Já tem uma conta? Entrar',
                },
                sign_up: {
                  email_label: 'Seu e-mail',
                  password_label: 'Crie uma senha',
                  email_input_placeholder: 'email@exemplo.com',
                  password_input_placeholder: '••••••••',
                  button_label: 'Criar conta',
                  social_provider_text: 'Criar conta com {{provider}}',
                  link_text: 'Não tem uma conta? Cadastre-se',
                },
                forgotten_password: {
                  email_label: 'Seu e-mail',
                  password_reset_button_label: 'Enviar instruções de redefinição',
                  link_text: 'Esqueceu sua senha?',
                  email_input_placeholder: 'email@exemplo.com',
                },
                update_password: {
                  password_label: 'Nova senha',
                  password_input_placeholder: 'Sua nova senha forte',
                  button_label: 'Atualizar senha',
                },
                magic_link: {
                  email_input_placeholder: 'email@exemplo.com',
                  button_label: 'Enviar link mágico',
                  link_text: 'Enviar um link mágico por e-mail',
                },
                verify_otp: {
                  email_input_placeholder: 'Seu e-mail',
                  phone_input_placeholder: 'Seu telefone',
                  token_input_placeholder: 'Código OTP',
                  button_label: 'Verificar código',
                  link_text: 'Já tem um código? Verifique',
                },
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;