import { Radio, Package, Clock } from 'lucide-react';

interface Tag {
  id: string;
  status: 'active' | 'inactive' | 'in_use';
  quantity: number;
  totalUses: number;
  lastSeen: string;
  type: string;
}

interface TagsTableProps {
  tags: Tag[];
}

export function TagsTable({ tags }: TagsTableProps) {
  const getStatusColor = (status: Tag['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'inactive':
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
      case 'in_use':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    }
  };

  const getStatusText = (status: Tag['status']) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'inactive':
        return 'Inativo';
      case 'in_use':
        return 'Em Uso';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-muted-foreground uppercase tracking-wider">
                ID da Tag
              </th>
              <th className="px-6 py-3 text-left text-xs text-muted-foreground uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs text-muted-foreground uppercase tracking-wider">
                Quantidade
              </th>
              <th className="px-6 py-3 text-left text-xs text-muted-foreground uppercase tracking-wider">
                Usos Totais
              </th>
              <th className="px-6 py-3 text-left text-xs text-muted-foreground uppercase tracking-wider">
                Última Leitura
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tags.map((tag) => (
              <tr key={tag.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-muted-foreground" />
                    <span className="font-mono text-sm">{tag.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{tag.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(tag.status)}`}>
                    {getStatusText(tag.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {tag.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {tag.totalUses}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {tag.lastSeen}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
