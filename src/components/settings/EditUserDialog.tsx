import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, User, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  id: string;
  email: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  lastSignIn: string;
  createdAt: string;
}

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userData: UserData | null;
  onUserUpdated: (updatedUser: UserData) => void;
}

export function EditUserDialog({ open, onOpenChange, userData, onUserUpdated }: EditUserDialogProps) {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (userData) {
      setEmail(userData.email);
    }
  }, [userData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Erro de validação",
        description: "Email é obrigatório.",
        variant: "destructive",
      });
      return;
    }

    if (!userData) return; // Should not happen if dialog is open with userData

    const updatedUser: UserData = {
      ...userData,
      email: email,
      // Para simplificar, não estamos editando status, lastSignIn ou createdAt aqui.
      // Em um cenário real, você poderia adicionar mais campos ao formulário.
    };

    console.log("Atualizando usuário:", updatedUser);
    onUserUpdated(updatedUser);
    
    toast({
      title: "Usuário atualizado!",
      description: `O usuário ${email} foi atualizado com sucesso.`,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <DialogTitle className="text-xl">Editar Usuário</DialogTitle>
              <DialogDescription>
                Modifique as informações da conta de usuário.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background"
              required
            />
          </div>
          {/* Você pode adicionar mais campos aqui, como nome, etc. */}
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-primary to-primary-glow shadow-glow">
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}