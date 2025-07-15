import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Power, PowerOff, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AddUserDialog } from "./AddUserDialog"; // Importar o novo modal

interface UserData {
  id: string;
  email: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  lastSignIn: string;
  createdAt: string;
}

const mockUsers: UserData[] = [
  { id: "user1", email: "admin@example.com", status: "Ativo", lastSignIn: "2024-07-20", createdAt: "2023-01-01" },
  { id: "user2", email: "joao.silva@example.com", status: "Ativo", lastSignIn: "2024-07-19", createdAt: "2023-03-10" },
  { id: "user3", email: "maria.souza@example.com", status: "Inativo", lastSignIn: "2024-06-05", createdAt: "2023-05-22" },
  { id: "user4", email: "pedro.alves@example.com", status: "Pendente", lastSignIn: "N/A", createdAt: "2024-07-18" },
];

export function SystemAdministrationSettings() {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddUserDialog, setShowAddUserDialog] = useState(false); // Estado para controlar o modal

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    setShowAddUserDialog(true);
  };

  const handleUserAdded = (newUser: { email: string; password?: string }) => {
    const newId = `user${users.length + 1}`;
    const newUserData: UserData = {
      id: newId,
      email: newUser.email,
      status: "Ativo", // Novo usuário começa como ativo
      lastSignIn: "Nunca", // Ou "N/A"
      createdAt: new Date().toISOString().split('T')[0], // Data atual
    };
    setUsers(prevUsers => [...prevUsers, newUserData]);
    setShowAddUserDialog(false);
  };

  const handleEditUser = (user: UserData) => {
    toast({
      title: "Editar Usuário",
      description: `Funcionalidade de edição para ${user.email} será implementada.`,
    });
  };

  const handleToggleStatus = (id: string, currentStatus: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id
          ? { ...user, status: currentStatus === "Ativo" ? "Inativo" : "Ativo" }
          : user
      )
    );
    toast({
      title: "Status Alterado",
      description: `Usuário ${currentStatus === "Ativo" ? "desativado" : "ativado"} com sucesso.`,
    });
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      toast({
        title: "Usuário Excluído",
        description: "Usuário removido com sucesso.",
        variant: "destructive",
      });
    }
  };

  const handleResetPassword = (user: UserData) => {
    toast({
      title: "Redefinir Senha",
      description: `Link de redefinição de senha enviado para ${user.email}.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge className="bg-success/20 text-success border-success/30">Ativo</Badge>;
      case "Inativo":
        return <Badge variant="secondary">Inativo</Badge>;
      case "Pendente":
        return <Badge className="bg-warning/20 text-warning border-warning/30">Pendente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* System Overview */}
      <Card className="bg-card/50 border-border shadow-lg">
        <CardHeader>
          <CardTitle>Visão Geral do Sistema</CardTitle>
          <CardDescription>Estatísticas de alto nível da sua plataforma.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg border border-border">
            <span className="text-3xl font-bold text-primary">{users.length}</span>
            <p className="text-sm text-muted-foreground">Total de Usuários</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg border border-border">
            <span className="text-3xl font-bold text-info">12</span> {/* Mock data */}
            <p className="text-sm text-muted-foreground">QR Codes Criados</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg border border-border">
            <span className="text-3xl font-bold text-warning">3847</span> {/* Mock data */}
            <p className="text-sm text-muted-foreground">Total de Scans</p>
          </div>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card className="bg-card/50 border-border shadow-lg">
        <CardHeader>
          <CardTitle>Gerenciamento de Usuários</CardTitle>
          <CardDescription>Adicione, edite e gerencie as contas de usuário da sua plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuário por email..."
                className="pl-9 bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleAddUser}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Usuário
            </Button>
          </div>

          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Criado Em</TableHead>
                  <TableHead>Último Login</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{user.lastSignIn === "N/A" ? "N/A" : new Date(user.lastSignIn).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditUser(user)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleResetPassword(user)}>
                              <Mail className="mr-2 h-4 w-4" />
                              Redefinir Senha
                            </DropdownMenuItem>
                            {user.status === "Ativo" ? (
                              <DropdownMenuItem onClick={() => handleToggleStatus(user.id, user.status)}>
                                <PowerOff className="mr-2 h-4 w-4" />
                                Desativar
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => handleToggleStatus(user.id, user.status)}>
                                <Power className="mr-2 h-4 w-4" />
                                Ativar
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      Nenhum usuário encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddUserDialog
        open={showAddUserDialog}
        onOpenChange={setShowAddUserDialog}
        onUserAdded={handleUserAdded}
      />
    </div>
  );
}