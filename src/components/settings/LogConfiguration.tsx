import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function LogConfiguration() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Configurações salvas!",
      description: "As configurações de Logs foram atualizadas.",
    });
  };

  return (
    <Card className="bg-card/50 border-border shadow-lg">
      <CardHeader>
        <CardTitle>Configuração de Logs</CardTitle>
        <CardDescription>Controle quais dados são registrados e por quanto tempo.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Ativar/desativar logs de acesso */}
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="enable-logs">Ativar Logs de Acesso</Label>
          <Switch 
            id="enable-logs" 
            checked={true} // Mock: assumindo ativado por padrão
            onCheckedChange={(checked) => toast({ title: "Funcionalidade em desenvolvimento", description: `Logs de acesso: ${checked ? 'Ativado' : 'Desativado'}.` })}
          />
        </div>
        <p className="text-xs text-muted-foreground -mt-4">
          Ative ou desative o registro de dados de acesso aos seus QR Codes.
        </p>

        {/* Quais dados logar */}
        <div className="space-y-2">
          <Label>Quais dados logar:</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="log-ip" defaultChecked={true} onCheckedChange={(checked) => toast({ title: "Funcionalidade em desenvolvimento", description: `Log IP: ${checked}.` })} />
              <label htmlFor="log-ip" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Endereço IP
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="log-user-agent" defaultChecked={true} onCheckedChange={(checked) => toast({ title: "Funcionalidade em desenvolvimento", description: `Log User-agent: ${checked}.` })} />
              <label htmlFor="log-user-agent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                User-agent
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="log-datetime" defaultChecked={true} onCheckedChange={(checked) => toast({ title: "Funcionalidade em desenvolvimento", description: `Log Data e Hora: ${checked}.` })} />
              <label htmlFor="log-datetime" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Data e Hora
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="log-origin" defaultChecked={false} onCheckedChange={(checked) => toast({ title: "Funcionalidade em desenvolvimento", description: `Log Origem (UTM): ${checked}.` })} />
              <label htmlFor="log-origin" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Origem (Parâmetros UTM)
              </label>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Selecione quais informações serão registradas para cada acesso.
          </p>
        </div>

        {/* Período de retenção */}
        <div className="space-y-2">
          <Label htmlFor="retention-period">Período de Retenção de Logs</Label>
          <Select onValueChange={(value) => toast({ title: "Funcionalidade em desenvolvimento", description: `Período de retenção: ${value}.` })}>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="30-days">30 Dias</SelectItem>
              <SelectItem value="60-days">60 Dias</SelectItem>
              <SelectItem value="90-days">90 Dias</SelectItem>
              <SelectItem value="forever">Para Sempre</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Defina por quanto tempo os dados de log serão armazenados.
          </p>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Salvar Alterações</Button>
        </div>
      </CardContent>
    </Card>
  );
}