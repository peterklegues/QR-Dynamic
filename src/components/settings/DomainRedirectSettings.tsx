import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export function DomainRedirectSettings() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Configurações salvas!",
      description: "As configurações de Domínio & Redirecionamento foram atualizadas.",
    });
  };

  return (
    <Card className="bg-card/50 border-border shadow-lg">
      <CardHeader>
        <CardTitle>Domínio Base / Redirecionamento</CardTitle>
        <CardDescription>Defina a URL base para seus QR Codes e o comportamento de redirecionamento.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* URL base pública para os QRs */}
        <div className="space-y-2">
          <Label htmlFor="base-url">URL Base Pública para os QRs</Label>
          <Input 
            id="base-url" 
            type="url" 
            placeholder="https://meusite.com/qr/:slug" 
            defaultValue="https://qr.dynamic.com/r/" // Mock default
            className="bg-background"
            onChange={(e) => console.log(e.target.value)} // Placeholder
          />
          <p className="text-xs text-muted-foreground">
            Ex: `https://meusite.com/qr/:slug`. O `:slug` será substituído pelo ID único do QR Code.
          </p>
        </div>

        {/* Tipo de redirecionamento */}
        <div className="space-y-2">
          <Label htmlFor="redirect-type">Tipo de Redirecionamento</Label>
          <Select onValueChange={(value) => toast({ title: "Funcionalidade em desenvolvimento", description: `Tipo de redirecionamento: ${value}.` })}>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="302">302 Temporary (Temporário)</SelectItem>
              <SelectItem value="301">301 Permanent (Permanente)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Escolha entre redirecionamento temporário (302) ou permanente (301).
          </p>
        </div>

        {/* URL padrão (fallback) */}
        <div className="space-y-2">
          <Label htmlFor="fallback-url">URL Padrão (Fallback)</Label>
          <Input 
            id="fallback-url" 
            type="url" 
            placeholder="https://meusite.com/pagina-padrao" 
            defaultValue="https://qr.dynamic.com/fallback" // Mock default
            className="bg-background"
            onChange={(e) => console.log(e.target.value)} // Placeholder
          />
          <p className="text-xs text-muted-foreground">
            Para onde o usuário será redirecionado se o QR Code estiver inativo ou não for encontrado.
          </p>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Salvar Alterações</Button>
        </div>
      </CardContent>
    </Card>
  );
}