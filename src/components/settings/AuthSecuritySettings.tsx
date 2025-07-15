import React, { useState } from "react"; // Importar useState
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export function AuthSecuritySettings() {
  const { toast } = useToast();
  const [publicMode, setPublicMode] = useState(false); // Adicionar estado para o modo público

  const handleSave = () => {
    console.log("Salvando configurações de Autenticação & Segurança:", { publicMode }); // Adicionar log para o estado
    toast({
      title: "Configurações salvas!",
      description: "As configurações de Autenticação & Segurança foram atualizadas.",
    });
  };

  return (
    <Card className="bg-card/50 border-border shadow-lg">
      <CardHeader>
        <CardTitle>Autenticação & Segurança</CardTitle>
        <CardDescription>Gerencie tokens de API, modo de acesso e proteção contra cliques.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Token de API / Chave Secreta */}
        <div className="space-y-2">
          <Label htmlFor="api-token">Token de API / Chave Secreta</Label>
          <div className="flex space-x-2">
            <Input id="api-token" type="text" value="********************" readOnly className="bg-background" />
            <Button variant="outline" onClick={() => toast({ title: "Funcionalidade em desenvolvimento", description: "Regenerar token de API." })}>Regenerar</Button>
            <Button variant="destructive" onClick={() => toast({ title: "Funcionalidade em desenvolvimento", description: "Revogar token de API." })}>Revogar</Button>
          </div>
          <p className="text-xs text-muted-foreground">Exibir, regenerar ou revogar seu token de acesso à API.</p>
        </div>

        {/* Modo público/privado */}
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="public-mode">Modo Público</Label>
          <Switch 
            id="public-mode" 
            checked={publicMode} // Conectar ao estado
            onCheckedChange={setPublicMode} // Atualizar o estado
          />
        </div>
        <p className="text-xs text-muted-foreground -mt-4">
          Se ativado, qualquer pessoa pode acessar os redirecionamentos. Se desativado, requer autenticação.
        </p>

        {/* Proteção contra cliques maliciosos */}
        <div className="space-y-2">
          <Label htmlFor="click-protection">Proteção contra cliques maliciosos</Label>
          <Select onValueChange={(value) => toast({ title: "Funcionalidade em desenvolvimento", description: `Proteção contra cliques: ${value}.` })}>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="none">Nenhuma</SelectItem>
              <SelectItem value="ip-verification">Verificação de IP</SelectItem>
              <SelectItem value="referrer-check">Verificação de Referrer</SelectItem>
              <SelectItem value="rate-limit">Limite de acesso por minuto</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Configure verificações de IP, referrer ou limites de acesso para proteger seus QRs.
          </p>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Salvar Alterações</Button>
        </div>
      </CardContent>
    </Card>
  );
}