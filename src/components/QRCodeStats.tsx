import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, MousePointer, TrendingUp, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/integrations/supabase/auth";

interface QRCodeStatsProps {
  refreshTrigger: number; // Prop to trigger re-fetch
}

export function QRCodeStats({ refreshTrigger }: QRCodeStatsProps) {
  const { session, isLoading: sessionLoading } = useSession();
  const ownerId = session?.user?.id;

  const fetchStats = async () => {
    if (!ownerId) return { total_qr_codes: 0, total_scans: 0, active_qr_codes: 0, scan_growth: 0 };

    // Fetch total QR codes
    const { count: totalQrCodes, error: totalError } = await supabase
      .from('qr_codes')
      .select('*', { count: 'exact' })
      .eq('owner_id', ownerId);

    if (totalError) throw totalError;

    // Fetch active QR codes
    const { count: activeQrCodes, error: activeError } = await supabase
      .from('qr_codes')
      .select('*', { count: 'exact' })
      .eq('owner_id', ownerId)
      .eq('is_ativo', true);

    if (activeError) throw activeError;

    // Fetch total scans (sum of scan_count for all user's QR codes)
    const { data: scanData, error: scanError } = await supabase
      .from('qr_codes')
      .select('scan_count')
      .eq('owner_id', ownerId);

    if (scanError) throw scanError;

    const totalScans = scanData.reduce((sum, qr) => sum + qr.scan_count, 0);

    // Placeholder for scan_growth (requires more complex logic, e.g., comparing current month to previous)
    // For now, we'll keep it at 0 or a mock value.
    const scanGrowth = 0; // This would be calculated based on time-series data

    return {
      total_qr_codes: totalQrCodes || 0,
      total_scans: totalScans,
      active_qr_codes: activeQrCodes || 0,
      scan_growth: scanGrowth,
    };
  };

  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['qr_code_stats', ownerId, refreshTrigger], // Add refreshTrigger to queryKey
    queryFn: fetchStats,
    enabled: !!ownerId && !sessionLoading,
    initialData: { total_qr_codes: 0, total_scans: 0, active_qr_codes: 0, scan_growth: 0 }, // Provide initial data to avoid undefined
  });

  if (isLoading || sessionLoading) {
    return <div className="text-center text-muted-foreground">Carregando estatísticas...</div>;
  }

  if (error) {
    return <div className="text-center text-destructive">Erro ao carregar estatísticas: {error.message}</div>;
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