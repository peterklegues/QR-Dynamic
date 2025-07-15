import React, { useState } from "react";
import { QrCode, Settings as SettingsIcon, Key, Globe, FileText, Bell, Puzzle, Palette, Clock, FlaskConical, Users, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarNav } from "@/components/SidebarNav";
import { AuthSecuritySettings } from "@/components/settings/AuthSecuritySettings";
import { DomainRedirectSettings } from "@/components/settings/DomainRedirectSettings";
import { LogConfiguration } from "@/components/settings/LogConfiguration";
import { NotificationAlertSettings } from "@/components/settings/NotificationAlertSettings";
import { IntegrationsSettings } from "@/components/settings/IntegrationsSettings"; // Importar o novo componente
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const settingsSections = [
  {
    title: "Autenticação & Segurança",
    icon: Key,
    component: AuthSecuritySettings,
  },
  {
    title: "Domínio Base / Redirecionamento",
    icon: Globe,
    component: DomainRedirectSettings,
  },
  {
    title: "Configuração de Logs",
    icon: FileText,
    component: LogConfiguration,
  },
  {
    title: "Notificações & Alertas",
    icon: Bell,
    component: NotificationAlertSettings,
  },
  {
    title: "Integrações",
    icon: Puzzle,
    component: IntegrationsSettings, // Usar o novo componente aqui
  },
  {
    title: "Estilo dos QR Codes",
    icon: Palette,
    component: () => <div className="p-6 text-muted-foreground">Conteúdo para Estilo dos QR Codes</div>,
  },
  {
    title: "Expiração e Regras Globais",
    icon: Clock,
    component: () => <div className="p-6 text-muted-foreground">Conteúdo para Expiração e Regras Globais</div>,
  },
  {
    title: "Modo de Teste / Sandbox",
    icon: FlaskConical,
    component: () => <div className="p-6 text-muted-foreground">Conteúdo para Modo de Teste / Sandbox</div>,
  },
  {
    title: "Administração do Sistema",
    icon: Users,
    component: () => <div className="p-6 text-muted-foreground">Conteúdo para Administração do Sistema</div>,
  },
  {
    title: "Backup e Exportação",
    icon: Download,
    component: () => <div className="p-6 text-muted-foreground">Conteúdo para Backup e Exportação</div>,
  },
];

const Settings = () => {
  const [activeSection, setActiveSection] = useState(settingsSections[0]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <QrCode className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">QR Dynamic</h1>
              <p className="text-xs text-muted-foreground">Configurações do Sistema</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              Voltar para o Dashboard
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar de Navegação */}
        <aside className="w-64 border-r border-border bg-card/50 p-4 sticky top-0 h-[calc(100vh-64px)] overflow-y-auto">
          <SidebarNav 
            items={settingsSections.map(s => ({ title: s.title, icon: s.icon }))}
            activeTitle={activeSection.title}
            onSelect={title => setActiveSection(settingsSections.find(s => s.title === title) || settingsSections[0])}
          />
        </aside>

        {/* Conteúdo Principal das Configurações */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-2">{activeSection.title}</h2>
            <p className="text-muted-foreground mb-8">Gerencie as configurações relacionadas a {activeSection.title.toLowerCase()}.</p>
            
            <activeSection.component />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;