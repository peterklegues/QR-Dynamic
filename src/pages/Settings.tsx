"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, User, Home, Lock } from "lucide-react";
import { ProfileSettingsForm } from "@/components/settings/ProfileSettingsForm";
import { StudioSettingsForm } from "@/components/settings/StudioSettingsForm";
import { AccountSettingsForm } from "@/components/settings/AccountSettingsForm";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <QrCode className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Configurações</h1>
              <p className="text-xs text-muted-foreground">Gerencie suas preferências e dados</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-fit mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" /> Perfil
            </TabsTrigger>
            <TabsTrigger value="studio" className="flex items-center gap-2">
              <Home className="w-4 h-4" /> Estúdio
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Lock className="w-4 h-4" /> Conta
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>Configurações de Perfil</CardTitle>
                <CardDescription>Atualize suas informações pessoais.</CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileSettingsForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="studio">
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>Configurações do Estúdio</CardTitle>
                <CardDescription>Gerencie as informações do seu estúdio.</CardDescription>
              </CardHeader>
              <CardContent>
                <StudioSettingsForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>Configurações da Conta</CardTitle>
                <CardDescription>Altere seu e-mail e senha.</CardDescription>
              </CardHeader>
              <CardContent>
                <AccountSettingsForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;