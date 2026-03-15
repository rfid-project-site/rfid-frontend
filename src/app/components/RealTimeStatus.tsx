import { useState, useEffect } from 'react';
import { Activity, Wifi } from 'lucide-react';

export function RealTimeStatus() {
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Simula conexão intermitente
      setIsConnected(Math.random() > 0.1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3>Status em Tempo Real</h3>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
          isConnected
            ? 'bg-green-500/10 text-green-600 border border-green-500/20'
            : 'bg-red-500/10 text-red-600 border border-red-500/20'
        }`}>
          <Wifi className="w-3 h-3" />
          {isConnected ? 'Conectado' : 'Desconectado'}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Activity className="w-5 h-5 text-muted-foreground" />
            {isConnected && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm">Leitor RFID Ethernet</p>
            <p className="text-xs text-muted-foreground">
              Última atualização: {lastUpdate.toLocaleTimeString('pt-BR')}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Leituras/min</p>
              <p className="text-xl">{isConnected ? Math.floor(Math.random() * 50 + 10) : '0'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Taxa de Sucesso</p>
              <p className="text-xl">{isConnected ? '98.5%' : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
