import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, MousePointer, TrendingUp, Users } from "lucide-react";

// Dados mock até conectar com Supabase
const mockStats = {
  total_qr_codes: 12,
  total_scans: 3847,
  active_qr_codes: 8,
  scan_growth: 23.5
};

export function QRCodeStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-card/50 border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total de QR Codes
          </CardTitle>
          <QrCode className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{mockStats.total_qr_codes}</div>
          <p className="text-xs text-muted-foreground">
            {mockStats.active_qr_codes} ativos
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total de Scans
          </CardTitle>
          <MousePointer className="h-4 w-4 text-info" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {mockStats.total_scans.toLocaleString('pt-BR')}
          </div>
          <p className="text-xs text-muted-foreground">
            Último mês
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            QR Codes Ativos
          </CardTitle>
          <Users className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{mockStats.active_qr_codes}</div>
          <p className="text-xs text-muted-foreground">
            {((mockStats.active_qr_codes / mockStats.total_qr_codes) * 100).toFixed(0)}% do total
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Crescimento
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            +{mockStats.scan_growth}%
          </div>
          <p className="text-xs text-muted-foreground">
            Scans vs. mês anterior
          </p>
        </CardContent>
      </Card>
    </div>
  );
}