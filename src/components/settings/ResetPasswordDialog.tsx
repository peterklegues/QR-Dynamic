import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, KeyRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResetPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userEmail: string;
}

export function ResetPasswordDialog({ open, onOpenChange, userEmail }: ResetPasswordDialogProps) {
  const { toast } = useToast();

  const handleSendResetLink = () => {
    // Em um cenário real, aqui você faria a chamada para o Supabase para enviar o link de redefinição
    console.log("Enviando link de redefinição de senha para:", userEmail);
    toast({
      title: "Link Enviado!",
      description: `Um link de redefinição de senha foi enviado para ${userEmail}.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <DialogTitle className="text-xl">Redefinir Senha</DialogTitle>
              <DialogDescription>
                Envie um link de redefinição de senha para o e-mail do usuário.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="user-email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email do Usuário
            </Label>
            <p id="user-email" className="text-foreground font-medium p-2 border border-border rounded-md bg-background">
              {userEmail}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Um e-mail com instruções para redefinir a senha será enviado para este endereço.
          </p>
        </div>
        <DialogFooter className="pt-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            type="button" 
            onClick={handleSendResetLink} 
            className="bg-gradient-to-r from-primary to-primary-glow shadow-glow"
          >
            <Mail className="w-4 h-4 mr-2" />
            Enviar Link de Redefinição
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}