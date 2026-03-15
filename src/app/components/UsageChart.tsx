import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface UsageData {
  date: string;
  entradas: number;
  saidas: number;
}

interface UsageChartProps {
  data: UsageData[];
}

// Cores adequadas para daltônicos (Paleta de Paul Tol)
const COLORS = {
  entradas: '#009E73', // Verde
  saidas: '#D55E00',   // Laranja/Vermelho
};

export function UsageChart({ data }: UsageChartProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="mb-4">Entradas e Saídas (Últimos 7 dias)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} id="usage-bar-chart">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            id="usage-xaxis"
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            id="usage-yaxis"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem',
            }}
          />
          <Legend id="usage-legend" />
          <Bar id="bar-entradas" dataKey="entradas" fill={COLORS.entradas} name="Entradas" radius={[4, 4, 0, 0]} />
          <Bar id="bar-saidas" dataKey="saidas" fill={COLORS.saidas} name="Saídas" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
