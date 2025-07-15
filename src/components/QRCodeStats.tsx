import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, MousePointer, TrendingUp, Users } from "lucide-react";
import { useState, useEffect } from "react"; // Import useState and useEffect

interface QRCodeStatsProps {
  refreshTrigger: number; // Prop to trigger re-fetch
}

export function QRCodeStats({ refreshTrigger }: QRCodeStatsProps) {
  const [stats, setStats] = useState({ total_qr_codes: 0, total_scans: 0, active_qr_codes: 0, scan_growth: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  const mockStats = {
    total_qr_codes: 5,
    total_scans: 2500,
    active_qr_codes: 3,
    scan_growth: 15, // Example growth percentage
  };

  useEffect(() => {
    setIsLoading(true);
    // Simulate fetching data
    setTimeout(() => {
      setStats(mockStats);
      setIsLoading(false);
    }, 500);
  }, [refreshTrigger]); // Re-fetch mock data when refreshTrigger changes

  if (isLoading) {
    return <div className="text-center text-muted-foreground">Carregando estatísticas...</div>;
  }

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
          <div className="text-2xl font-bold text-foreground">{stats.total_qr_codes}</div>
          <p className="text-xs text-muted-foreground">
            {stats.active_qr_codes} ativos
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
            {stats.total_scans.toLocaleString('pt-BR')}
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
          <div className="text-2xl font-bold text-foreground">{stats.active_qr_codes}</div>
          <p className="text-xs text-muted-foreground">
            {stats.total_qr_codes > 0 ? ((stats.active_qr_codes / stats.total_qr_codes) * 100).toFixed(0) : 0}% do total
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
            +{stats.scan_growth}%
          </div>
          <p className="text-xs text-muted-foreground">
            Scans vs. mês anterior
          </p>
        </CardContent>
      </Card>
    </div>
  );
}