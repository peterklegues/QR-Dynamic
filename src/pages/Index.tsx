import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Plus, BarChart3, Settings, Zap, LogOut } from "lucide-react";
import { QRCodeList } from "@/components/QRCodeList";
import { QRCodeStats } from "@/components/QRCodeStats";
import { CreateQRDialog } from "@/components/CreateQRDialog";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // State to trigger re-fetch in children
  const { toast } = useToast();

  const handleQrCodeCreated = () => {
    setRefreshTrigger(prev => prev + 1); // Increment to trigger re-fetch
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      toast({
        title: "Desconectado",
        description: "Você foi desconectado com sucesso.",
      });
    } catch (error: any) {
      console.error("Erro ao fazer logout:", error);
      toast({
        title: "Erro ao desconectar",
        description: error.message || "Ocorreu um erro ao tentar desconectar.",
        variant: "destructive",
      });
    }
  };

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
              <h1 className="text-xl font-bold text-foreground">QR Dynamic</h1>
              <p className="text-xs text-muted-foreground">Sistema de QR Codes Dinâmicos</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </Button>
            <Button 
              onClick={() => setShowCreateDialog(true)}
              className="bg-gradient-to-r from-primary to-primary-glow shadow-glow"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo QR Code
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Sistema Dinâmico de QR Codes
          </div>
          
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Gerencie seus QR Codes
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Dinamicamente</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Crie QR Codes que podem ser editados a qualquer momento. Mude o destino sem precisar reimprimir o código.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-card/50 border-border hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center mb-3">
                  <QrCode className="w-6 h-6 text-success" />
                </div>
                <CardTitle className="text-lg">Dinâmico</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Altere o destino do QR Code sem precisar gerar um novo código
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-lg bg-info/20 flex items-center justify-center mb-3">
                  <BarChart3 className="w-6 h-6 text-info" />
                </div>
                <CardTitle className="text-lg">Métricas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Acompanhe scans, origem dos acessos e performance dos códigos
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center mb-3">
                  <Settings className="w-6 h-6 text-warning" />
                </div>
                <CardTitle className="text-lg">Controle</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Ative, desative e gerencie todos os seus QR Codes em um só lugar
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="container mx-auto">
          <QRCodeStats refreshTrigger={refreshTrigger} />
        </div>
      </section>

      {/* QR Codes List */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground">Seus QR Codes</h3>
              <p className="text-muted-foreground">Gerencie e monitore todos os seus códigos</p>
            </div>
            <Button 
              onClick={() => setShowCreateDialog(true)}
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Criar Novo
            </Button>
          </div>
          
          <QRCodeList refreshTrigger={refreshTrigger} />
        </div>
      </section>

      <CreateQRDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog} 
        onQrCodeCreated={handleQrCodeCreated}
      />
    </div>
  );
};

export default Index;