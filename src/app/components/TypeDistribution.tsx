import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface TypeData {
  name: string;
  value: number;
}

interface TypeDistributionProps {
  data: TypeData[];
}

// Cores adequadas para daltônicos (Paleta de Paul Tol)
const COLORS = [
  '#0072B2', // Azul
  '#E69F00', // Laranja/Âmbar
  '#009E73', // Verde
  '#F0E442', // Amarelo
  '#56B4E9', // Azul claro
  '#D55E00', // Vermelho/Laranja escuro
  '#CC79A7', // Rosa/Roxo
];

export function TypeDistribution({ data }: TypeDistributionProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="mb-4">Distribuição por Tipo</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart id="type-pie-chart">
          <Pie
            id="pie-type-distribution"
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem',
            }}
          />
          <Legend id="type-legend" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
