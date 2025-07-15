import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export function SystemAdministrationSettings() {
  const { toast } = useToast();
  const [systemStatus, setSystemStatus] = useState("online");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [adminEmail, setAdminEmail] = useState("admin@qrdynamic.com");

  const handleSave = () => {
    console.log("Salvando configurações de Administração do Sistema:", {
      systemStatus,
      maintenanceMode,
      adminEmail,
    });
    toast({
      title: "Configurações salvas!",
      description: "As configurações de Administração do Sistema foram atualizadas.",
    });
  };

  return (
    <Card className="bg-card/50 border-border shadow-lg">
      <CardHeader>
        <CardTitle>Administração do Sistema</CardTitle>
        <CardDescription>Gerencie usuários, papéis e configurações globais do sistema.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status do Sistema */}
        <div className="space-y-2">
          <Label htmlFor="system-status">Status do Sistema</Label>
          <Select value={systemStatus} onValueChange={setSystemStatus}>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="degraded">Degradado</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Define o status operacional geral da aplicação.
          </p>
        </div>

        {/* Modo de Manutenção */}
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="maintenance-mode">Modo de Manutenção</Label>
          <Switch
            id="maintenance-mode"
            checked={maintenanceMode}
            onCheckedChange={setMaintenanceMode}
          />
        </div>
        <p className="text-xs text-muted-foreground -mt-4">
          Ative para colocar o sistema em modo de manutenção, impedindo novos acessos.
        </p>

        {/* E-mail do Administrador Principal */}
        <div className="space-y-2">
          <Label htmlFor="admin-email">E-mail do Administrador Principal</Label>
          <Input
            id="admin-email"
            type="email"
            placeholder="admin@qrdynamic.com"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            className="bg-background"
          />
          <p className="text-xs text-muted-foreground">
            E-mail para notificações críticas do sistema e contato principal.
          </p>
        </div>

        {/* Gerenciamento de Usuários (Placeholder) */}
        <div className="space-y-2">
          <Label>Gerenciamento de Usuários</Label>
          <p className="text-sm text-muted-foreground">
            Gerencie usuários, papéis e permissões.
          </p>
          <Button variant="outline" onClick={() => toast({ title: "Funcionalidade em desenvolvimento", description: "Gerenciamento de usuários." })}>
            Abrir Gerenciamento de Usuários
          </Button>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Salvar Alterações</Button>
        </div>
      </CardContent>
    </Card>
  );
}