import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, MousePointer, TrendingUp, Users, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/integrations/supabase/auth";

interface QRCodeStatsData {
  total_qr_codes: number;
  total_scans: number;
  active_qr_codes: number;
  scan_growth: number; // This will be a placeholder for now, as it requires more complex logic
}

export function QRCodeStats() {
  const { session, isLoading: sessionLoading } = useSession();

  const { data: stats, isLoading, isError } = useQuery<QRCodeStatsData, Error>({
    queryKey: ['qr_stats', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) {
        return {
          total_qr_codes: 0,
          total_scans: 0,
          active_qr_codes: 0,
          scan_growth: 0,
        };
      }

      // Fetch total QR codes
      const { count: totalQrCodes, error: totalError } = await supabase
        .from('qr_codes')
        .select('*', { count: 'exact', head: true })
        .eq('owner_id', session.user.id);
      if (totalError) throw totalError;

      // Fetch active QR codes
      const { count: activeQrCodes, error: activeError } = await supabase
        .from('qr_codes')
        .select('*', { count: 'exact', head: true })
        .eq('owner_id', session.user.id)
        .eq('status', 'Ativo');
      if (activeError) throw activeError;

      // Fetch total scans (sum of scan_count)
      const { data: scanData, error: scanError } = await supabase
        .from('qr_codes')
        .select('scan_count')
        .eq('owner_id', session.user.id);
      if (scanError) throw scanError;

      const totalScans = scanData.reduce((sum, qr) => sum + (qr.scan_count || 0), 0);

      // Placeholder for scan_growth - real implementation would compare current month scans to previous
      const scanGrowth = 0; 

      return {
        total_qr_codes: totalQrCodes || 0,
        total_scans: totalScans,
        active_qr_codes: activeQrCodes || 0,
        scan_growth: scanGrowth,
      };
    },
    enabled: !!session?.user?.id && !sessionLoading,
  });

  if (sessionLoading || isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-card/50 border-border animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-muted rounded"></div>
              <div className="h-4 w-4 bg-muted rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-1/2 bg-muted rounded mb-2"></div>
              <div className="h-3 w-3/4 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card/50 border-border col-span-full text-center p-6">
          <p className="text-destructive">Erro ao carregar estatísticas.</p>
        </Card>
      </div>
    );
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