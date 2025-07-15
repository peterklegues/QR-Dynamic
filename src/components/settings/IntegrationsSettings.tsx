import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Google, Mail, Database, Zap, BarChart2, MessageSquare } from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  status: "active" | "available";
}

const mockIntegrations: Integration[] = [
  {
    id: "google-analytics",
    name: "Google Analytics",
    description: "Conecte para rastrear o tráfego e o comportamento dos usuários.",
    icon: Google,
    status: "available",
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Sincronize dados de leads e gerencie campanhas de e-mail.",
    icon: Mail,
    status: "available",
  },
  {
    id: "supabase-db",
    name: "Supabase Database",
    description: "Gerencie seus dados de QR Codes diretamente no Supabase.",
    icon: Database,
    status: "active", // Mock como ativo
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Automatize fluxos de trabalho conectando a milhares de apps.",
    icon: Zap,
    status: "available",
  },
  {
    id: "crm-system",
    name: "Sistema CRM",
    description: "Integre com seu CRM para gerenciar contatos e vendas.",
    icon: Users, // Usando Users como um ícone genérico para CRM
    status: "available",
  },
  {
    id: "slack-notifications",
    name: "Slack Notifications",
    description: "Receba alertas de scans e eventos em seu canal Slack.",
    icon: MessageSquare,
    status: "available",
  },
];

export function IntegrationsSettings() {
  const { toast } = useToast();

  const handleConnect = (integrationName: string) => {
    toast({
      title: "Conectar Integração",
      description: `Funcionalidade de conexão para ${integrationName} em desenvolvimento.`,
    });
  };

  const activeIntegrations = mockIntegrations.filter(int => int.status === "active");
  const availableIntegrations = mockIntegrations.filter(int => int.status === "available");

  return (
    <Card className="bg-card/50 border-border shadow-lg">
      <CardHeader>
        <CardTitle>Integrações</CardTitle>
        <CardDescription>Conecte o QR Dynamic com outras ferramentas e serviços.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Integrações Ativas */}
        <div>
          <Label className="text-lg font-semibold mb-4 block">Integrações Ativas</Label>
          {activeIntegrations.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {activeIntegrations.map((integration) => (
                <Badge key={integration.id} className="bg-primary/20 text-primary border-primary/30 px-3 py-1 text-sm flex items-center gap-2">
                  <integration.icon className="h-4 w-4" />
                  {integration.name}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">Nenhuma integração ativa no momento.</p>
          )}
        </div>

        {/* Integrações Disponíveis */}
        <div>
          <Label className="text-lg font-semibold mb-4 block">Integrações Disponíveis</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableIntegrations.map((integration) => (
              <Card key={integration.id} className="bg-background border-border p-4 flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                    <integration.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h4 className="font-medium text-foreground">{integration.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleConnect(integration.name)}
                >
                  Conectar
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}