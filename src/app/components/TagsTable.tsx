import { useState, Fragment } from 'react';
import { Radio, Package, Clock, MapPin, ChevronDown, ChevronUp, ArrowRight, Search, Filter, X } from 'lucide-react';

export interface LocationHistory {
  location: string;
  action: 'entrada' | 'saida';
  timestamp: string;
}

export interface Tag {
  id: string;
  status: 'active' | 'inactive' | 'in_use';
  quantity: number;
  totalUses: number;
  lastSeen: string;
  type: string;
  location: string;
  history: LocationHistory[];
}

interface TagsTableProps {
  tags: Tag[];
}

export function TagsTable({ tags }: TagsTableProps) {
  const [expandedTag, setExpandedTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const getStatusColor = (status: Tag['status']) => {
    switch (status) {
      case 'active':
        return 'bg-[#009E73]/10 text-[#009E73] border-[#009E73]/20';
      case 'inactive':
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
      case 'in_use':
        return 'bg-[#0072B2]/10 text-[#0072B2] border-[#0072B2]/20';
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

  const getLocationColor = (location: string) => {
    const colors: { [key: string]: string } = {
      'Estoque': 'bg-[#E69F00]/10 text-[#E69F00] border-[#E69F00]/20',
      'Lavanderia': 'bg-[#56B4E9]/10 text-[#56B4E9] border-[#56B4E9]/20',
      'Frios': 'bg-[#0072B2]/10 text-[#0072B2] border-[#0072B2]/20',
      'Produção': 'bg-[#D55E00]/10 text-[#D55E00] border-[#D55E00]/20',
      'Expedição': 'bg-[#CC79A7]/10 text-[#CC79A7] border-[#CC79A7]/20',
    };
    return colors[location] || 'bg-gray-500/10 text-gray-600 border-gray-500/20';
  };

  // Extrair localizações únicas para o filtro
  const uniqueLocations = Array.from(new Set(tags.map(tag => tag.location)));

  // Filtrar tags
  const filteredTags = tags.filter(tag => {
    const matchesSearch =
      tag.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || tag.status === statusFilter;
    const matchesLocation = locationFilter === 'all' || tag.location === locationFilter;

    return matchesSearch && matchesStatus && matchesLocation;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setLocationFilter('all');
  };

  const hasActiveFilters = searchTerm !== '' || statusFilter !== 'all' || locationFilter !== 'all';

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Barra de Pesquisa e Filtros */}
      <div className="p-4 border-b border-border space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Pesquisar por ID, tipo ou localização..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filtros
            {hasActiveFilters && (
              <span className="ml-1 px-2 py-0.5 bg-[#0072B2] text-white rounded-full text-xs">
                {[searchTerm !== '', statusFilter !== 'all', locationFilter !== 'all'].filter(Boolean).length}
              </span>
            )}
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
              Limpar
            </button>
          )}
        </div>

        {/* Painel de Filtros */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
            <div>
              <label className="block text-sm mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">Todos</option>
                <option value="active">Ativo</option>
                <option value="in_use">Em Uso</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Localização</label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">Todas</option>
                {uniqueLocations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Contador de Resultados */}
        <div className="text-sm text-muted-foreground">
          Mostrando {filteredTags.length} de {tags.length} tags
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-muted-foreground uppercase tracking-wider w-12">
              </th>
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
                Localização
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
            {filteredTags.map((tag) => (
              <Fragment key={tag.id}>
                <tr
                  className="hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => setExpandedTag(expandedTag === tag.id ? null : tag.id)}
                >
                  <td className="px-6 py-4">
                    {expandedTag === tag.id ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </td>
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs border inline-flex items-center gap-1 ${getLocationColor(tag.location)}`}>
                      <MapPin className="w-3 h-3" />
                      {tag.location}
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
                {/* Histórico Expandido */}
                {expandedTag === tag.id && (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 bg-muted/20">
                      <div className="space-y-3">
                        <h4 className="flex items-center gap-2 mb-3">
                          <Clock className="w-4 h-4" />
                          Histórico de Movimentação
                        </h4>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {tag.history.map((entry, index) => (
                            <div
                              key={`${tag.id}-history-${index}`}
                              className="flex items-center gap-4 p-3 bg-background rounded-lg border border-border"
                            >
                              <div className={`p-2 rounded-full ${
                                entry.action === 'entrada'
                                  ? 'bg-[#009E73]/10 text-[#009E73]'
                                  : 'bg-[#D55E00]/10 text-[#D55E00]'
                              }`}>
                                <ArrowRight className={`w-4 h-4 ${
                                  entry.action === 'entrada' ? 'rotate-180' : ''
                                }`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">
                                    {entry.action === 'entrada' ? 'Entrada em' : 'Saída de'}
                                  </span>
                                  <span className={`px-2 py-0.5 rounded text-xs border ${getLocationColor(entry.location)}`}>
                                    {entry.location}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {new Date(entry.timestamp).toLocaleString('pt-BR')}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
        {filteredTags.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Nenhuma tag encontrada com os filtros aplicados</p>
          </div>
        )}
      </div>
    </div>
  );
}
