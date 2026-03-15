import { useState, useEffect } from 'react';
import { Radio, Package, TrendingUp, TrendingDown, Layers } from 'lucide-react';
import { TagsTable } from './components/TagsTable';
import { StatsCard } from './components/StatsCard';
import { UsageChart } from './components/UsageChart';
import { TypeDistribution } from './components/TypeDistribution';
import { RealTimeStatus } from './components/RealTimeStatus';

// Dados mockados para demonstração
const mockTags = [
  {
    id: 'RFID-A1B2C3D4',
    status: 'active' as const,
    quantity: 15,
    totalUses: 142,
    lastSeen: '14:32:15',
    type: 'Ferramenta Tipo A',
    location: 'Estoque',
    history: [
      { location: 'Estoque', action: 'entrada' as const, timestamp: '2026-03-15T14:32:15' },
      { location: 'Produção', action: 'saida' as const, timestamp: '2026-03-15T12:15:30' },
      { location: 'Produção', action: 'entrada' as const, timestamp: '2026-03-15T09:45:20' },
      { location: 'Estoque', action: 'saida' as const, timestamp: '2026-03-15T09:30:10' },
      { location: 'Estoque', action: 'entrada' as const, timestamp: '2026-03-14T18:20:00' },
    ],
  },
  {
    id: 'RFID-E5F6G7H8',
    status: 'in_use' as const,
    quantity: 8,
    totalUses: 89,
    lastSeen: '14:30:42',
    type: 'Ferramenta Tipo B',
    location: 'Lavanderia',
    history: [
      { location: 'Lavanderia', action: 'entrada' as const, timestamp: '2026-03-15T14:30:42' },
      { location: 'Frios', action: 'saida' as const, timestamp: '2026-03-15T11:20:15' },
      { location: 'Frios', action: 'entrada' as const, timestamp: '2026-03-15T08:10:30' },
      { location: 'Estoque', action: 'saida' as const, timestamp: '2026-03-15T08:00:00' },
    ],
  },
  {
    id: 'RFID-I9J0K1L2',
    status: 'active' as const,
    quantity: 23,
    totalUses: 267,
    lastSeen: '14:29:08',
    type: 'Ferramenta Tipo A',
    location: 'Produção',
    history: [
      { location: 'Produção', action: 'entrada' as const, timestamp: '2026-03-15T14:29:08' },
      { location: 'Expedição', action: 'saida' as const, timestamp: '2026-03-15T13:45:22' },
      { location: 'Expedição', action: 'entrada' as const, timestamp: '2026-03-15T10:30:15' },
    ],
  },
  {
    id: 'RFID-M3N4O5P6',
    status: 'inactive' as const,
    quantity: 5,
    totalUses: 34,
    lastSeen: '12:15:33',
    type: 'Ferramenta Tipo C',
    location: 'Estoque',
    history: [
      { location: 'Estoque', action: 'entrada' as const, timestamp: '2026-03-15T12:15:33' },
      { location: 'Produção', action: 'saida' as const, timestamp: '2026-03-14T16:20:10' },
      { location: 'Produção', action: 'entrada' as const, timestamp: '2026-03-14T14:10:00' },
    ],
  },
  {
    id: 'RFID-Q7R8S9T0',
    status: 'active' as const,
    quantity: 12,
    totalUses: 156,
    lastSeen: '14:31:52',
    type: 'Ferramenta Tipo B',
    location: 'Frios',
    history: [
      { location: 'Frios', action: 'entrada' as const, timestamp: '2026-03-15T14:31:52' },
      { location: 'Lavanderia', action: 'saida' as const, timestamp: '2026-03-15T13:00:00' },
      { location: 'Lavanderia', action: 'entrada' as const, timestamp: '2026-03-15T11:45:30' },
      { location: 'Frios', action: 'saida' as const, timestamp: '2026-03-15T10:00:00' },
    ],
  },
  {
    id: 'RFID-U1V2W3X4',
    status: 'in_use' as const,
    quantity: 7,
    totalUses: 78,
    lastSeen: '14:28:19',
    type: 'Ferramenta Tipo D',
    location: 'Expedição',
    history: [
      { location: 'Expedição', action: 'entrada' as const, timestamp: '2026-03-15T14:28:19' },
      { location: 'Produção', action: 'saida' as const, timestamp: '2026-03-15T12:30:45' },
      { location: 'Produção', action: 'entrada' as const, timestamp: '2026-03-15T09:15:20' },
    ],
  },
  {
    id: 'RFID-Y5Z6A7B8',
    status: 'active' as const,
    quantity: 19,
    totalUses: 203,
    lastSeen: '14:27:44',
    type: 'Ferramenta Tipo A',
    location: 'Estoque',
    history: [
      { location: 'Estoque', action: 'entrada' as const, timestamp: '2026-03-15T14:27:44' },
      { location: 'Expedição', action: 'saida' as const, timestamp: '2026-03-15T11:50:30' },
      { location: 'Expedição', action: 'entrada' as const, timestamp: '2026-03-15T09:20:15' },
      { location: 'Estoque', action: 'saida' as const, timestamp: '2026-03-15T08:45:00' },
    ],
  },
  {
    id: 'RFID-C9D0E1F2',
    status: 'active' as const,
    quantity: 11,
    totalUses: 98,
    lastSeen: '14:26:07',
    type: 'Ferramenta Tipo C',
    location: 'Produção',
    history: [
      { location: 'Produção', action: 'entrada' as const, timestamp: '2026-03-15T14:26:07' },
      { location: 'Frios', action: 'saida' as const, timestamp: '2026-03-15T13:15:20' },
      { location: 'Frios', action: 'entrada' as const, timestamp: '2026-03-15T10:40:10' },
    ],
  },
];

const usageData = [
  { date: '09/03', entradas: 45, saidas: 38 },
  { date: '10/03', entradas: 52, saidas: 47 },
  { date: '11/03', entradas: 48, saidas: 51 },
  { date: '12/03', entradas: 61, saidas: 55 },
  { date: '13/03', entradas: 55, saidas: 49 },
  { date: '14/03', entradas: 67, saidas: 62 },
  { date: '15/03', entradas: 58, saidas: 54 },
];

const typeDistributionData = [
  { name: 'Tipo A', value: 57 },
  { name: 'Tipo B', value: 20 },
  { name: 'Tipo C', value: 16 },
  { name: 'Tipo D', value: 7 },
];

export default function App() {
  const [tags, setTags] = useState(mockTags);
  const [totalTags] = useState(mockTags.length);
  const [activeTags] = useState(mockTags.filter(t => t.status === 'active').length);
  const [totalQuantity] = useState(mockTags.reduce((sum, tag) => sum + tag.quantity, 0));
  const [totalUses] = useState(mockTags.reduce((sum, tag) => sum + tag.totalUses, 0));

  // Simula atualização de dados em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setTags(prevTags =>
        prevTags.map(tag => ({
          ...tag,
          lastSeen: new Date().toLocaleTimeString('pt-BR'),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-3">
              <Radio className="w-8 h-8" />
              Dashboard RFID
            </h1>
            <p className="text-muted-foreground mt-1">
              Sistema de monitoramento de tags RFID via Ethernet
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Última sincronização</p>
            <p className="text-sm">{new Date().toLocaleString('pt-BR')}</p>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total de Tags"
            value={totalTags}
            icon={Radio}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatsCard
            title="Tags Ativas"
            value={activeTags}
            icon={TrendingUp}
            color="text-green-600"
          />
          <StatsCard
            title="Peças Totais"
            value={totalQuantity}
            icon={Package}
            trend={{ value: 8.3, isPositive: true }}
          />
          <StatsCard
            title="Usos Totais"
            value={totalUses}
            icon={Layers}
            trend={{ value: 3.2, isPositive: false }}
          />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <UsageChart data={usageData} />
          </div>
          <div>
            <RealTimeStatus />
          </div>
        </div>

        {/* Distribuição por Tipo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TypeDistribution data={typeDistributionData} />

          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="mb-4">Resumo de Peças por Tipo</h3>
            <div className="space-y-3">
              {typeDistributionData.map((type, index) => (
                <div key={type.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: [
                          '#0072B2',
                          '#E69F00',
                          '#009E73',
                          '#F0E442',
                        ][index],
                      }}
                    />
                    <span>{type.name}</span>
                  </div>
                  <span className="text-muted-foreground">{type.value} peças</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabela de Tags */}
        <div>
          <h2 className="mb-4">Tags Cadastradas</h2>
          <TagsTable tags={tags} />
        </div>
      </div>
    </div>
  );
}