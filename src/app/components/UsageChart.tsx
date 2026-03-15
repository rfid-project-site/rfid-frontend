import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface UsageData {
  date: string;
  entradas: number;
  saidas: number;
}

interface UsageChartProps {
  data: UsageData[];
}

export function UsageChart({ data }: UsageChartProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="mb-4">Entradas e Saídas (Últimos 7 dias)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem',
            }}
          />
          <Legend />
          <Bar dataKey="entradas" fill="hsl(var(--chart-1))" name="Entradas" radius={[4, 4, 0, 0]} />
          <Bar dataKey="saidas" fill="hsl(var(--chart-2))" name="Saídas" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
