import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Link, Tag, Zap, CalendarIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

// Definir a interface para os dados do QR Code
interface QRCodeData {
  id: string;
  name: string;
  target_url: string;
  status: string;
  scan_count: number;
  created_at: string;
  qr_url: string;
  valid_until?: Date; // Adicionar valid_until
}

interface EditQRDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  qrCodeData: QRCodeData | null; // Dados do QR Code a ser editado
  onQRCodeUpdated: () => void; // Callback para quando o QR Code for atualizado
}

export function EditQRDialog({ open, onOpenChange, qrCodeData, onQRCodeUpdated }: EditQRDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    target_url: "",
    valid_until: undefined as Date | undefined,
    isActive: true,
  });
  const { toast } = useToast();

  // Preencher o formulário com os dados do QR Code quando ele for passado
  useEffect(() => {
    if (qrCodeData) {
      setFormData({
        name: qrCodeData.name,
        target_url: qrCodeData.target_url,
        valid_until: qrCodeData.valid_until ? new Date(qrCodeData.valid_until) : undefined,
        isActive: qrCodeData.status === "Ativo",
      });
    }
  }, [qrCodeData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.target_url) {
      toast({
        title: "Erro de validação",
        description: "Nome e URL de destino são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    console.log("Dados do QR Code a serem atualizados (ID:", qrCodeData?.id, "):", formData);
    toast({
      title: "QR Code atualizado com sucesso!",
      description: "Funcionalidade será implementada com Supabase",
    });

    onQRCodeUpdated(); // Chama o callback para notificar que o QR Code foi atualizado
    onOpenChange(false); // Fecha o modal
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <QrCode className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <DialogTitle className="text-xl">Editar QR Code</DialogTitle>
              <DialogDescription>
                Modifique as informações do seu QR Code dinâmico
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Nome do QR Code
            </Label>
            <Input
              id="name"
              placeholder="Ex: Campanha de Natal, Menu Restaurante..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target_url" className="flex items-center gap-2">
              <Link className="w-4 h-4" />
              URL de Destino
            </Label>
            <Input
              id="target_url"
              type="url"
              placeholder="https://exemplo.com/destino"
              value={formData.target_url}
              onChange={(e) => setFormData({ ...formData, target_url: e.target.value })}
              className="bg-background"
            />
            <p className="text-xs text-muted-foreground">
              Esta URL pode ser alterada a qualquer momento sem precisar gerar um novo QR Code
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="valid_until" className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Válido até (Opcional)
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal bg-background",
                    !formData.valid_until && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.valid_until ? format(formData.valid_until, "PPP") : <span>Selecione uma data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-card border-border">
                <Calendar
                  mode="single"
                  selected={formData.valid_until}
                  onSelect={(date) => setFormData({ ...formData, valid_until: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-muted-foreground">
              O QR Code será desativado automaticamente após esta data.
            </p>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="is-active" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Ativo
            </Label>
            <Switch
              id="is-active"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
          </div>

          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium">Recursos Dinâmicos</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Altere a URL de destino sem reimprimir o código</li>
              <li>• Acompanhe estatísticas de scans em tempo real</li>
              <li>• Ative/desative o QR Code quando necessário</li>
              <li>• Adicione parâmetros UTM automaticamente</li>
            </ul>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-primary to-primary-glow shadow-glow"
            >
              <QrCode className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}