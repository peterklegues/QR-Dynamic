"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

const MockLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-card/50 border-border shadow-lg">
        <CardHeader className="text-center pb-6">
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-3">
              <QrCode className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold text-foreground">Bem-vindo ao QR Dynamic</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Este é um ambiente de demonstração. Clique abaixo para acessar.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <Link to="/">
            <Button className="w-full bg-gradient-to-r from-primary to-primary-glow shadow-glow">
              Acessar Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default MockLogin;