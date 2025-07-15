import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, ExternalLink, Edit, Trash2, BarChart3, Copy, Eye, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react"; // Import useState and useEffect

interface QRCode {
  id: string;
  name: string;
  target_url: string;
  status: string;
  scan_count: number;
  created_at: string;
  qr_url: string;
}

interface QRCodeListProps {
  refreshTrigger: number; // Prop to trigger re-fetch
}

export function QRCodeList({ refreshTrigger }: QRCodeListProps) {
  const { toast } = useToast();
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  const mockQRCodes: QRCode[] = [
    {
      id: "1",
      name: "Campanha de Verão 2024",
      target_url: "https://exemplo.com/verao",
      status: "Ativo",
      scan_count: 1250,
      created_at: "2024-01-15T10:00:00Z",
      qr_url: "https://mockqr.app/verao",
    },
    {
      id: "2",
      name: "Menu Digital Restaurante",
      target_url: "https://restaurantemock.com/menu",
      status: "Ativo",
      scan_count: 890,
      created_at: "2024-02-20T14:30:00Z",
      qr_url: "https://mockqr.app/menu",
    },
    {
      id: "3",
      name: "Pesquisa de Satisfação",
      target_url: "https://pesquisamock.com/satisfacao",
      status: "Inativo",
      scan_count: 320,
      created_at: "2024-03-01T09:15:00Z",
      qr_url: "https://mockqr.app/pesquisa",
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    // Simulate fetching data
    setTimeout(() => {
      setQrCodes(mockQRCodes);
      setIsLoading(false);
    }, 500);
  }, [refreshTrigger]); // Re-fetch mock data when refreshTrigger changes

  const handleCopyQRUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copiada!",
      description: "Link do QR Code copiado para a área de transferência",
    });
  };

  const handleEdit = (id: string) => {
    toast({
      title: "Editar QR Code",
      description: "Funcionalidade de edição será implementada em breve (simulado).",
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este QR Code (simulado)?")) {
      return;
    }
    // Simulate deletion
    setQrCodes(prev => prev.filter(qr => qr.id !== id));
    toast({
      title: "QR Code excluído!",
      description: "O QR Code foi removido com sucesso (simulado).",
    });
  };

  const getStatusBadge = (status: string) => {
    return status === "Ativo" ? (
      <Badge className="bg-success/20 text-success border-success/30">Ativo</Badge>
    ) : (
      <Badge variant="secondary">Inativo</Badge>
    );
  };

  if (isLoading) {
    return <div className="text-center text-muted-foreground">Carregando QR Codes...</div>;
  }

  if (!qrCodes || qrCodes.length === 0) {
    return (
      <Card className="bg-card/30 border-dashed border-2 border-border">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <QrCode className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum QR Code criado</h3>
          <p className="text-muted-foreground text-center mb-4">
            Comece criando seu primeiro QR Code dinâmico
          </p>
          {/* Button to open create dialog will be in parent component */}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {qrCodes.map((qr) => (
        <Card key={qr.id} className="bg-card/50 border-border hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{qr.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <ExternalLink className="w-3 h-3" />
                    {qr.target_url}
                  </CardDescription>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {getStatusBadge(qr.status)}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(qr.id)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleCopyQRUrl(qr.qr_url)}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar URL
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.open(qr.target_url, '_blank')}>
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(qr.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  {qr.scan_count} scans
                </div>
                <div>
                  Criado em {new Date(qr.created_at).toLocaleDateString('pt-BR')}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(qr.id)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => handleCopyQRUrl(qr.qr_url)}
                  className="bg-gradient-to-r from-primary to-primary-glow"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}