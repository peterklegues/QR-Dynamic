import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, ExternalLink, Edit, Trash2, BarChart3, Copy, Eye, MoreHorizontal, PowerOff, Power } from "lucide-react"; // Importar Power icon
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

// Definir a interface para os dados do QR Code
interface QRCodeData {
  id: string;
  name: string;
  target_url: string;
  status: string;
  scan_count: number;
  created_at: string;
  qr_url: string;
  valid_until?: Date;
}

// Dados mock iniciais
const initialMockQRCodes: QRCodeData[] = [
  {
    id: "1",
    name: "Campanha de Natal",
    target_url: "https://loja.exemplo.com/natal",
    status: "Ativo",
    scan_count: 1247,
    created_at: "2024-12-01",
    qr_url: "https://api.exemplo.com/qr/abc123",
    valid_until: new Date("2025-01-31")
  },
  {
    id: "2", 
    name: "Menu Restaurante",
    target_url: "https://restaurante.com/cardapio",
    status: "Ativo",
    scan_count: 892,
    created_at: "2024-11-15",
    qr_url: "https://api.exemplo.com/qr/def456"
  },
  {
    id: "3",
    name: "Evento Corporativo",
    target_url: "https://evento.com/inscricoes",
    status: "Inativo",
    scan_count: 345,
    created_at: "2024-10-20",
    qr_url: "https://api.exemplo.com/qr/ghi789"
  }
];

interface QRCodeListProps {
  refreshTrigger: number;
  onEditQRCode: (qrCode: QRCodeData) => void;
}

export function QRCodeList({ refreshTrigger, onEditQRCode }: QRCodeListProps) {
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>(initialMockQRCodes);
  const { toast } = useToast();

  useEffect(() => {
    console.log("QRCodeList refreshed! Trigger value:", refreshTrigger);
    // Em um cenário real, aqui você buscaria os dados do Supabase
    // setQrCodes(initialMockQRCodes); // Descomente se quiser que o refreshTrigger resete os dados mock
  }, [refreshTrigger]);

  const handleCopyQRUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copiada!",
      description: "Link do QR Code copiado para a área de transferência",
    });
  };

  const handleDeactivate = (id: string) => {
    setQrCodes(prevQrCodes => 
      prevQrCodes.map(qr => 
        qr.id === id ? { ...qr, status: "Inativo" } : qr
      )
    );
    toast({
      title: "QR Code desativado!",
      description: `O QR Code com ID ${id} foi desativado.`,
      variant: "default",
    });
  };

  const handleActivate = (id: string) => { // Nova função para ativar
    setQrCodes(prevQrCodes => 
      prevQrCodes.map(qr => 
        qr.id === id ? { ...qr, status: "Ativo" } : qr
      )
    );
    toast({
      title: "QR Code ativado!",
      description: `O QR Code com ID ${id} foi ativado.`,
      variant: "default",
    });
  };

  const handleDelete = (id: string) => {
    setQrCodes(prevQrCodes => prevQrCodes.filter(qr => qr.id !== id));
    toast({
      title: "QR Code excluído!",
      description: `O QR Code com ID ${id} foi removido.`,
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: string) => {
    return status === "Ativo" ? (
      <Badge className="bg-success/20 text-success border-success/30">Ativo</Badge>
    ) : (
      <Badge variant="secondary">Inativo</Badge>
    );
  };

  return (
    <div className="grid gap-4">
      {qrCodes.length > 0 ? (
        qrCodes.map((qr) => (
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
                      <DropdownMenuItem onClick={() => onEditQRCode(qr)}>
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
                      {qr.status === "Ativo" ? (
                        <DropdownMenuItem onClick={() => handleDeactivate(qr.id)}>
                          <PowerOff className="w-4 h-4 mr-2" />
                          Desativar
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => handleActivate(qr.id)}> {/* Botão Ativar */}
                          <Power className="w-4 h-4 mr-2" />
                          Ativar
                        </DropdownMenuItem>
                      )}
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
                  <Button variant="outline" size="sm" onClick={() => onEditQRCode(qr)}>
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
        ))
      ) : (
        <Card className="bg-card/30 border-dashed border-2 border-border">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <QrCode className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum QR Code criado</h3>
            <p className="text-muted-foreground text-center mb-4">
              Comece criando seu primeiro QR Code dinâmico
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeiro QR Code
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}