import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function NotificationAlertSettings() {
  const { toast } = useToast();
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [alertFrequency, setAlertFrequency] = useState("daily");
  const [alertTypes, setAlertTypes] = useState({
    abnormalScans: true,
    inactiveQrCode: true,
    expirationWarning: true,
  });

  const handleSave = () => {
    console.log("Salvando configurações de Notificações & Alertas:", {
      emailNotificationsEnabled,
      alertFrequency,
      alertTypes,
    });
    toast({
      title: "Configurações salvas!",
      description: "As configurações de Notificações & Alertas foram atualizadas.",
    });
  };

  return (
    <Card className="bg-card/50 border-border shadow-lg">
      <CardHeader>
        <CardTitle>Notificações & Alertas</CardTitle>
        <CardDescription>Configure como você deseja receber alertas sobre seus QR Codes.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Ativar/desativar notificações por e-mail */}
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="email-notifications">Ativar Notificações por E-mail</Label>
          <Switch
            id="email-notifications"
            checked={emailNotificationsEnabled}
            onCheckedChange={setEmailNotificationsEnabled}
          />
        </div>
        <p className="text-xs text-muted-foreground -mt-4">
          Receba alertas importantes diretamente na sua caixa de entrada.
        </p>

        {/* Frequência de Alertas */}
        <div className="space-y-2">
          <Label htmlFor="alert-frequency">Frequência de Alertas</Label>
          <Select value={alertFrequency} onValueChange={setAlertFrequency}>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Selecione a frequência" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="daily">Diário</SelectItem>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="monthly">Mensal</SelectItem>
              <SelectItem value="instant">Instantâneo (apenas alertas críticos)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Com que frequência você deseja receber resumos de alertas.
          </p>
        </div>

        {/* Tipos de Alerta */}
        <div className="space-y-2">
          <Label>Tipos de Alerta:</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="abnormal-scans"
                checked={alertTypes.abnormalScans}
                onCheckedChange={(checked: boolean) => setAlertTypes(prev => ({ ...prev, abnormalScans: checked }))}
              />
              <label htmlFor="abnormal-scans" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Scans Anormais (picos de acesso)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inactive-qr-code"
                checked={alertTypes.inactiveQrCode}
                onCheckedChange={(checked: boolean) => setAlertTypes(prev => ({ ...prev, inactiveQrCode: checked }))}
              />
              <label htmlFor="inactive-qr-code" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                QR Code Inativo (erro de redirecionamento)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="expiration-warning"
                checked={alertTypes.expirationWarning}
                onCheckedChange={(checked: boolean) => setAlertTypes(prev => ({ ...prev, expirationWarning: checked }))}
              />
              <label htmlFor="expiration-warning" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Expiração Próxima de QR Code
              </label>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Selecione os tipos de eventos para os quais você deseja ser alertado.
          </p>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Salvar Alterações</Button>
        </div>
      </CardContent>
    </Card>
  );
}