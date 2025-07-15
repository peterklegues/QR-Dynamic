import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QrCode, Link, Tag, Zap } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/integrations/supabase/auth";

interface CreateQRDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onQrCodeCreated: () => void; // Callback to refresh list after creation
}

export function CreateQRDialog({ open, onOpenChange, onQrCodeCreated }: CreateQRDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    target_url: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { session } = useSession();
  const ownerId = session?.user?.id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!ownerId) {
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar logado para criar QR Codes.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    if (!formData.name || !formData.target_url) {
      toast({
        title: "Erro de validação",
        description: "Nome e URL de destino são obrigatórios",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Generate a simple QR code string for now. In a real app, you might use a QR code generation service.
      const qrCodeString = `https://qr.dynamic.app/${Math.random().toString(36).substring(2, 10)}`;

      const { data, error } = await supabase
        .from('qr_codes')
        .insert([
          { 
            name: formData.name, 
            target_url: formData.target_url, 
            description: formData.description,
            owner_id: ownerId,
            codigo_qr: qrCodeString, // Storing a placeholder QR code string
            qr_url: qrCodeString, // Assuming qr_url is the same as codigo_qr for now
            is_ativo: true, // Default to active
            status: 'Ativo', // Default status
            scan_count: 0, // Initial scan count
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      toast({
        title: "QR Code criado com sucesso!",
        description: "Seu novo QR Code dinâmico foi salvo.",
      });

      setFormData({ name: "", target_url: "", description: "" });
      onOpenChange(false);
      onQrCodeCreated(); // Notify parent to refresh list

    } catch (error: any) {
      console.error("Erro ao criar QR Code:", error);
      toast({
        title: "Erro ao criar QR Code",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
              <DialogTitle className="text-xl">Criar Novo QR Code</DialogTitle>
              <DialogDescription>
                Configure as informações do seu QR Code dinâmico
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              disabled={isSubmitting}
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
              onChange={(e) => setFormData({ ...formData, target: e.target.value })}
              className="bg-background"
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground">
              Esta URL pode ser alterada a qualquer momento sem precisar gerar um novo QR Code
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              id="description"
              placeholder="Descreva o propósito deste QR Code..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-background resize-none"
              rows={3}
              disabled={isSubmitting}
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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-primary to-primary-glow shadow-glow"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Criando..." : (
                <>
                  <QrCode className="w-4 h-4 mr-2" />
                  Criar QR Code
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}