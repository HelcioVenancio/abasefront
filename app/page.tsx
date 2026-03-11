"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  ShieldAlert,
  Network,
  BarChart3,
  Users,
  UserCheck,
  UserPlus,
  RefreshCw,
  Landmark,
  Menu,
  Bell,
  Search,
  LogOut,
  ChevronRight,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Upload,
  Settings,
  Eye,
  Edit,
  Plus,
  Shield,
  Activity,
  Server,
  Database,
  Percent,
  HardDrive,
  Cpu,
  Clock,
  DownloadCloud,
  Filter,
  X,
  Calendar,
  Copy,
  Check,
  FileText,
  Zap,
  List,
  Info,
  CheckCircle,
  AlertTriangle,
  Download,
  ChevronDown,
  UserMinus,
  Lock
} from 'lucide-react';

const sidebarItems = [
  { name: 'Admin', icon: ShieldAlert, id: 'admin' },
  { name: 'Coordenação', icon: Network, id: 'coordenacao' },
  { name: 'Análises', icon: BarChart3, id: 'analises' },
  { name: 'Agentes', icon: Users, id: 'agentes' },
  { name: 'Associados', icon: UserCheck, id: 'associados' },
  { name: 'Novos Cadastros', icon: UserPlus, id: 'novos-cadastros' },
  { name: 'Renovação de Ciclos', icon: RefreshCw, id: 'renovacao' },
  { name: 'Tesouraria', icon: Landmark, id: 'tesouraria' },
  { name: 'Importação', icon: Upload, id: 'importacao' },
  { name: 'Configurações', icon: Settings, id: 'configuracoes' },
];

const MesCard = ({ data }: { data: any }) => {
  const [filtro, setFiltro] = useState('Todos');
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  const [isBaixaModalOpen, setIsBaixaModalOpen] = useState(false);
  const [selectedAssociado, setSelectedAssociado] = useState<any>(null);

  const toggleRow = (index: number) => {
    setExpandedRows(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleBaixaManual = (e: React.MouseEvent, associado: any) => {
    e.stopPropagation();
    setSelectedAssociado(associado);
    setIsBaixaModalOpen(true);
  };
  
  const associadosFiltrados = data.associados.filter((a: any) => {
    if (filtro === 'Todos') return true;
    if (filtro === 'Ciclo Renovado (3/3)') return a.parcela === '3/3';
    if (filtro === 'Em Aberto') return a.status === 'Em Aberto';
    if (filtro === 'Apto à Renovar (2/3)') return a.parcela === '2/3' && a.status === 'Descontado';
    return true;
  });

  const progresso = data.valorEsperado > 0 ? ((data.valorArrecadado / data.valorEsperado) * 100).toFixed(1) : '0.0';

  return (
    <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-xl p-5 flex flex-col h-[600px]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-zinc-100 font-medium text-lg">{data.mes}</h4>
          <div className="text-sm text-zinc-400 mt-1">
            Esperado: <span className="text-zinc-200 font-medium">R$ {data.valorEsperado?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <button className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 px-2 py-1 rounded-md text-xs font-medium transition-colors">
            <Download size={14} /> Exportar
          </button>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex justify-between text-xs text-zinc-400 mb-1.5">
          <span>Arrecadado: <strong className="text-emerald-400">R$ {data.valorArrecadado?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></span>
          <span className="font-medium text-zinc-300">{progresso}%</span>
        </div>
        <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden border border-zinc-800/50">
          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${progresso}%` }}></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800/50 flex flex-col items-center justify-center">
          <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1 text-center">Refinanciados</div>
          <div className="text-zinc-200 font-semibold text-lg">{data.refinanciados}</div>
        </div>
        <div className="bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800/50 flex flex-col items-center justify-center">
          <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1 text-center">Renovações</div>
          <div className="text-zinc-200 font-semibold text-lg">{data.renovacoes}</div>
        </div>
        <div className="bg-rose-500/5 p-2.5 rounded-lg border border-rose-500/10 flex flex-col items-center justify-center">
          <div className="text-rose-500/70 text-[10px] uppercase tracking-wider mb-1 text-center">Inadimplentes</div>
          <div className="text-rose-400 font-semibold text-lg">{data.inadimplentes}</div>
        </div>
        <div className="bg-amber-500/5 p-2.5 rounded-lg border border-amber-500/10 flex flex-col items-center justify-center">
          <div className="text-amber-500/70 text-[10px] uppercase tracking-wider mb-1 text-center">Não Descontados</div>
          <div className="text-amber-400 font-semibold text-lg">{data.naoDescontados}</div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-2 mt-2">
        <span className="text-xs font-medium text-zinc-400">Detalhamento de Associados</span>
        <select 
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] rounded px-1.5 py-1 focus:outline-none cursor-pointer"
        >
          <option value="Todos">Todos</option>
          <option value="Ciclo Renovado (3/3)">Ciclo Renovado (3/3)</option>
          <option value="Em Aberto">Em Aberto</option>
          <option value="Apto à Renovar (2/3)">Apto à Renovar (2/3)</option>
        </select>
      </div>

      <div className="border border-zinc-800/60 rounded-lg overflow-hidden flex-1 flex flex-col">
        <div className="overflow-y-auto custom-scrollbar flex-1">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900/80 text-zinc-400 sticky top-0 backdrop-blur-sm z-10">
              <tr>
                <th className="px-3 py-2 font-medium text-xs">Associado</th>
                <th className="px-3 py-2 font-medium text-xs">Parc.</th>
                <th className="px-3 py-2 font-medium text-xs text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40">
              {associadosFiltrados.map((item: any, i: number) => {
                const isEmAberto = item.status === 'Em Aberto';
                const is3 = item.parcela === '3/3';
                const is2 = item.parcela === '2/3';
                const is1 = item.parcela === '1/3';
                
                let statusLabel = item.status;
                let statusColorClass = 'bg-zinc-500/10 text-zinc-400';
                
                if (isEmAberto) {
                  statusLabel = 'Em Aberto';
                  statusColorClass = 'bg-amber-500/10 text-amber-400';
                } else if (is3) {
                  statusLabel = 'Ciclo Renovado';
                  statusColorClass = 'bg-cyan-500/10 text-cyan-400';
                } else if (is2) {
                  statusLabel = 'Apto à Renovar';
                  statusColorClass = 'bg-emerald-500/10 text-emerald-400';
                } else if (is1) {
                  statusLabel = 'Ciclo Iniciado';
                  statusColorClass = 'bg-blue-500/10 text-blue-400';
                }
                
                return (
                  <React.Fragment key={i}>
                    <tr 
                      onClick={() => toggleRow(i)}
                      className={`hover:bg-zinc-800/20 transition-colors cursor-pointer ${is3 && !isEmAberto ? 'bg-cyan-900/10' : ''}`}
                    >
                      <td className="px-3 py-2 text-zinc-200">
                        <div className="flex items-center gap-1.5">
                          {expandedRows[i] ? <ChevronDown size={14} className="text-zinc-500" /> : <ChevronRight size={14} className="text-zinc-500" />}
                          <div className="truncate max-w-[120px]" title={item.nome}>{item.nome}</div>
                          {isEmAberto && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Parcela em aberto"></span>}
                          {!isEmAberto && is3 && <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" title="Ciclo Renovado"></span>}
                          {!isEmAberto && is2 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Apto à Renovar"></span>}
                          {!isEmAberto && is1 && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" title="Ciclo Iniciado"></span>}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-mono ml-5">{item.matricula}</div>
                      </td>
                      <td className="px-3 py-2 text-zinc-400 text-xs">
                        <span className={
                          isEmAberto ? 'text-amber-400/70' :
                          is3 ? 'text-cyan-400 font-medium' : 
                          is2 ? 'text-emerald-400 font-medium' : 
                          'text-blue-400 font-medium'
                        }>{item.parcela}</span>
                      </td>
                      <td className="px-3 py-2 text-right">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap ${statusColorClass}`}>
                          {statusLabel}
                        </span>
                      </td>
                    </tr>
                    {expandedRows[i] && (
                      <tr className="bg-zinc-900/30 border-b border-zinc-800/40">
                        <td colSpan={3} className="px-4 py-3">
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between text-xs text-zinc-400">
                              <span>Detalhes do Ciclo Atual</span>
                              <span className="font-mono">{item.matricula}</span>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2">
                              <div className="bg-zinc-900/80 p-2 rounded border border-zinc-800/50 flex flex-col items-center justify-center">
                                <span className="text-[10px] text-zinc-500 mb-1">Parcela 1/3</span>
                                <span className="text-xs text-emerald-400 font-medium">Pago</span>
                              </div>
                              <div className="bg-zinc-900/80 p-2 rounded border border-zinc-800/50 flex flex-col items-center justify-center">
                                <span className="text-[10px] text-zinc-500 mb-1">Parcela 2/3</span>
                                <span className={`text-xs font-medium ${is1 ? 'text-zinc-600' : is2 || is3 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                  {is1 ? 'Pendente' : is2 || is3 ? 'Pago' : 'Em Aberto'}
                                </span>
                              </div>
                              <div className="bg-zinc-900/80 p-2 rounded border border-zinc-800/50 flex flex-col items-center justify-center">
                                <span className="text-[10px] text-zinc-500 mb-1">Parcela 3/3</span>
                                <span className={`text-xs font-medium ${!is3 ? 'text-zinc-600' : 'text-emerald-400'}`}>
                                  {!is3 ? 'Pendente' : 'Pago'}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-2">
                              {is3 && (
                                <button className="flex-1 min-w-[100px] bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 py-1.5 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1.5">
                                  <RefreshCw size={12} /> Renovar Ciclo
                                </button>
                              )}
                              {isEmAberto && (
                                <button 
                                  onClick={(e) => handleBaixaManual(e, item)}
                                  className="flex-1 min-w-[100px] bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 py-1.5 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                                >
                                  <CheckCircle size={12} /> Baixa Manual
                                </button>
                              )}
                              <button className="flex-1 min-w-[100px] bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 py-1.5 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1.5">
                                <UserMinus size={12} /> Desativar
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
              {associadosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-3 py-6 text-center text-zinc-500 text-xs">Nenhum registro.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Baixa Manual */}
      {isBaixaModalOpen && selectedAssociado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="text-lg font-medium text-zinc-100">Baixa Manual de Parcela</h3>
              <button 
                onClick={() => setIsBaixaModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Associado</label>
                <div className="text-sm text-zinc-200 font-medium">{selectedAssociado.nome}</div>
                <div className="text-xs text-zinc-500 font-mono">{selectedAssociado.matricula}</div>
              </div>
              
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Parcela Referência</label>
                <div className="text-sm text-zinc-200">{selectedAssociado.parcela}</div>
              </div>

              <div>
                <label className="block text-xs text-zinc-500 mb-1">Data do Pagamento</label>
                <input 
                  type="date" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500 transition-colors [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-500 mb-1">Comprovante (Anexo)</label>
                <div className="border-2 border-dashed border-zinc-800 rounded-lg p-4 text-center hover:border-zinc-700 transition-colors cursor-pointer bg-zinc-950/50">
                  <Upload size={20} className="mx-auto text-zinc-500 mb-2" />
                  <p className="text-xs text-zinc-400">Clique para anexar ou arraste o arquivo</p>
                  <p className="text-[10px] text-zinc-600 mt-1">PDF, JPG ou PNG (Max 5MB)</p>
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Observações</label>
                <textarea 
                  rows={2}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  placeholder="Motivo da baixa manual..."
                ></textarea>
              </div>
            </div>
            <div className="p-5 border-t border-zinc-800 flex justify-end gap-3 bg-zinc-950/50">
              <button 
                onClick={() => setIsBaixaModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => setIsBaixaModalOpen(false)}
                className="px-4 py-2 text-sm font-medium bg-cyan-500 hover:bg-cyan-400 text-zinc-950 rounded-lg transition-colors flex items-center gap-2"
              >
                <CheckCircle size={16} /> Confirmar Baixa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('associados');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [configTab, setConfigTab] = useState('acessos');
  const [competencia, setCompetencia] = useState('2026-03');
  const [visibleCycles, setVisibleCycles] = useState(3);
  
  // View Modes and Filters
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [filterAno, setFilterAno] = useState('');
  const [filterMes, setFilterMes] = useState('');
  
  // Modal States
  const [agentModal, setAgentModal] = useState<{ type: 'details' | 'access' | 'commission', data: any } | null>(null);
  const [assocModal, setAssocModal] = useState<{ type: 'details' | 'edit', data: any } | null>(null);
  const [isBaixaModalOpen, setIsBaixaModalOpen] = useState(false);
  const [isPrevisaoModalOpen, setIsPrevisaoModalOpen] = useState(false);
  const [selectedAssociado, setSelectedAssociado] = useState<any>(null);
  
  // Table States
  const [expandedAssociadosRows, setExpandedAssociadosRows] = useState<Record<number, boolean>>({});

  const toggleAssociadoRow = (index: number) => {
    setExpandedAssociadosRows(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleBaixaManual = (e: React.MouseEvent, associado: any) => {
    e.stopPropagation();
    setSelectedAssociado(associado);
    setIsBaixaModalOpen(true);
  };

  const handlePrevisao = (e: React.MouseEvent, associado: any) => {
    e.stopPropagation();
    setSelectedAssociado(associado);
    setIsPrevisaoModalOpen(true);
  };
  
  // Filter State
  const [showFilter, setShowFilter] = useState(false);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const autocompleteResults = [
    { type: 'Agente', name: 'Ana Beatriz', id: 'AG-123' },
    { type: 'Associado', name: 'Carlos Silva', id: 'AS-456' },
    { type: 'Módulo', name: 'Análises', id: 'MOD-AN' },
    { type: 'Contrato', name: 'CTR-2026-001', id: 'CTR-001' },
  ].filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.type.toLowerCase().includes(searchQuery.toLowerCase()));

  const CopySnippet = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = () => {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="flex items-center gap-2 group/copy">
        <span className="font-mono text-xs text-zinc-300">{text}</span>
        <button 
          onClick={handleCopy}
          className="p-1 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-all opacity-0 group-hover/copy:opacity-100"
          title="Copiar"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
        </button>
      </div>
    );
  };

  const AdvancedFilter = () => (
    <div className="relative">
      <button 
        onClick={() => setShowFilter(!showFilter)}
        className="bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 text-zinc-300 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
      >
        <Filter size={16} /> Filtros Avançados
      </button>
      
      {showFilter && (
        <div className="absolute right-0 mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-40 p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-zinc-100">Filtros Avançados</h4>
            <button onClick={() => setShowFilter(false)} className="text-zinc-500 hover:text-zinc-300"><X size={16} /></button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Período</label>
              <div className="relative">
                <select className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-rose-900/50 appearance-none">
                  <option>Últimos 7 dias</option>
                  <option>Últimos 30 dias</option>
                  <option>Este Mês</option>
                  <option>Mês Passado</option>
                  <option>Personalizado...</option>
                </select>
                <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Data Inicial</label>
                <input type="date" className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-rose-900/50 [color-scheme:dark]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Data Final</label>
                <input type="date" className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-rose-900/50 [color-scheme:dark]" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Status</label>
              <select className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-rose-900/50 appearance-none">
                <option>Todos os Status</option>
                <option>Ativo</option>
                <option>Inativo</option>
                <option>Pendente</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-2 mt-6">
            <button className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 py-2 rounded-lg text-sm font-medium transition-colors">Limpar</button>
            <button className="flex-1 bg-rose-900 hover:bg-rose-800 text-white py-2 rounded-lg text-sm font-medium transition-colors">Aplicar</button>
          </div>
        </div>
      )}
    </div>
  );

  const Modal = ({ isOpen, onClose, title, children }: any) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
        >
          <div className="flex items-center justify-between p-5 border-b border-zinc-800/60">
            <h3 className="text-lg font-semibold text-zinc-100">{title}</h3>
            <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors">
              <X size={20} />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </div>
    );
  };

  const KPICards = ({ stats }: { stats: any[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-5 hover:border-rose-900/30 transition-colors">
          <div className="text-zinc-400 text-sm font-medium mb-3">{stat.label}</div>
          <div className="flex items-end justify-between">
            <div className="text-3xl font-bold text-zinc-100">{stat.value}</div>
            <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${stat.isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
              {stat.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {stat.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDashboardContent = () => (
    <>
      <KPICards stats={[
        { label: 'Total Associados', value: '2.845', change: '+12.5%', isPositive: true },
        { label: 'Novos Cadastros', value: '142', change: '+5.2%', isPositive: true },
        { label: 'Renovações Pendentes', value: '38', change: '-2.1%', isPositive: false },
        { label: 'Receita Mensal', value: 'R$ 124.500', change: '+8.4%', isPositive: true },
      ]} />

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6 min-h-[360px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-zinc-100">Crescimento de Associados</h2>
            <button className="text-zinc-400 hover:text-zinc-200"><MoreVertical size={18} /></button>
          </div>
          <div className="flex-1 flex items-center justify-center border border-dashed border-zinc-800/50 rounded-xl bg-zinc-950/30">
            <div className="flex flex-col items-center gap-2 text-zinc-500">
              <BarChart3 size={32} className="opacity-50" />
              <span className="text-sm font-medium">Gráfico de Linha (Placeholder)</span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6 min-h-[360px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-zinc-100">Status de Ciclos</h2>
            <button className="text-zinc-400 hover:text-zinc-200"><MoreVertical size={18} /></button>
          </div>
          <div className="flex-1 flex items-center justify-center border border-dashed border-zinc-800/50 rounded-xl bg-zinc-950/30">
            <div className="flex flex-col items-center gap-2 text-zinc-500">
              <RefreshCw size={32} className="opacity-50" />
              <span className="text-sm font-medium">Gráfico de Rosca (Placeholder)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800/60 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-100">Últimos Cadastros</h2>
          <button className="text-sm text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1">
            Ver todos <ChevronRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950/50 text-zinc-400">
              <tr>
                <th className="px-6 py-4 font-medium">Nome</th>
                <th className="px-6 py-4 font-medium">Agente Responsável</th>
                <th className="px-6 py-4 font-medium">Data</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40">
              {[
                { name: 'Carlos Silva', agent: 'Ana Beatriz', date: '10 Mar 2026', status: 'Ativo' },
                { name: 'Mariana Costa', agent: 'João Pedro', date: '09 Mar 2026', status: 'Em Análise' },
                { name: 'Roberto Alves', agent: 'Ana Beatriz', date: '08 Mar 2026', status: 'Pendente' },
                { name: 'Fernanda Lima', agent: 'Lucas Mendes', date: '08 Mar 2026', status: 'Ativo' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-6 py-4 text-zinc-200 font-medium">{row.name}</td>
                  <td className="px-6 py-4 text-zinc-400">{row.agent}</td>
                  <td className="px-6 py-4 text-zinc-400">{row.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      row.status === 'Ativo' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      row.status === 'Em Análise' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderAgentesContent = () => (
    <div className="space-y-6">
      <KPICards stats={[
        { label: 'Total de Agentes', value: '124', change: '+12', isPositive: true },
        { label: 'Agentes Ativos', value: '118', change: '+5', isPositive: true },
        { label: 'Média de Associados/Agente', value: '23', change: '+2', isPositive: true },
        { label: 'Agentes Inativos', value: '6', change: '-1', isPositive: false },
      ]} />
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input type="text" placeholder="Buscar agentes..." className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-200 focus:outline-none focus:border-rose-900/50" />
        </div>
        <div className="flex gap-3">
          <AdvancedFilter />
          <button className="bg-rose-900 hover:bg-rose-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus size={18} /> Novo Agente
          </button>
        </div>
      </div>
      <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950/50 text-zinc-400">
              <tr>
                <th className="px-6 py-4 font-medium">Nome</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Associados</th>
                <th className="px-6 py-4 font-medium">Comissão</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40">
              {[
                { name: 'Ana Beatriz', email: 'ana.beatriz@abase.com', count: 45, comissao: '15%', status: 'Ativo' },
                { name: 'João Pedro', email: 'joao.pedro@abase.com', count: 32, comissao: '12%', status: 'Ativo' },
                { name: 'Lucas Mendes', email: 'lucas.mendes@abase.com', count: 18, comissao: '10%', status: 'Inativo' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-6 py-4 text-zinc-200 font-medium">{row.name}</td>
                  <td className="px-6 py-4 text-zinc-400">{row.email}</td>
                  <td className="px-6 py-4 text-zinc-400">{row.count}</td>
                  <td className="px-6 py-4 text-zinc-300 font-medium">{row.comissao}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${row.status === 'Ativo' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-end gap-2">
                    <button onClick={() => setAgentModal({ type: 'commission', data: row })} className="p-1.5 text-zinc-400 hover:text-rose-400 rounded-md hover:bg-rose-950/30 transition-colors" title="Ajustar Comissão"><Percent size={18} /></button>
                    <button onClick={() => setAgentModal({ type: 'details', data: row })} className="p-1.5 text-zinc-400 hover:text-rose-400 rounded-md hover:bg-rose-950/30 transition-colors" title="Ver detalhes"><Eye size={18} /></button>
                    <button onClick={() => setAgentModal({ type: 'access', data: row })} className="p-1.5 text-zinc-400 hover:text-rose-400 rounded-md hover:bg-rose-950/30 transition-colors" title="Editar acesso"><Edit size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAssociadosContent = () => (
    <div className="space-y-6">
      <KPICards stats={[
        { label: 'Total de Associados', value: '2.845', change: '+12.5%', isPositive: true },
        { label: 'Associados Ativos', value: '2.710', change: '+8.2%', isPositive: true },
        { label: 'Em Análise', value: '85', change: '-12', isPositive: false },
        { label: 'Inativos', value: '50', change: '-5', isPositive: false },
      ]} />
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input type="text" placeholder="Buscar associados..." className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-200 focus:outline-none focus:border-rose-900/50" />
        </div>
        <div className="flex gap-3">
          <AdvancedFilter />
          <button className="bg-rose-900 hover:bg-rose-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus size={18} /> Novo Associado
          </button>
        </div>
      </div>
      <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950/50 text-zinc-400">
              <tr>
                <th className="px-6 py-4 font-medium">Nome</th>
                <th className="px-6 py-4 font-medium">Matrícula</th>
                <th className="px-6 py-4 font-medium">CPF/CNPJ</th>
                <th className="px-6 py-4 font-medium">Ciclos (Abertos / Fechados)</th>
                <th className="px-6 py-4 font-medium">Agente</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40">
              {[
                { 
                  name: 'Empresa Alpha Ltda', matricula: 'MAT-10042', doc: '12.345.678/0001-90', ciclosAbertos: 1, ciclosFechados: 4, agent: 'Ana Beatriz', status: 'Ativo', parcelaAtual: '3/3',
                  ciclos: [
                    { id: 'C-2026-04', status: 'Pré-gerado', isAtual: false, isFuturo: true, parcelas: [{ num: '1/3', status: 'Em Aberto', mes: 'Abr/2026' }, { num: '2/3', status: 'Em Aberto', mes: 'Mai/2026' }, { num: '3/3', status: 'Em Aberto', mes: 'Jun/2026' }] },
                    { id: 'C-2026-01', status: 'Em Andamento', isAtual: true, parcelas: [{ num: '1/3', status: 'Pago', mes: 'Jan/2026' }, { num: '2/3', status: 'Pago', mes: 'Fev/2026' }, { num: '3/3', status: 'Em previsão', mes: 'Mar/2026', previsao: '15/Mar/2026' }] },
                    { id: 'C-2025-04', status: 'Concluído', isAtual: false, parcelas: [{ num: '1/3', status: 'Pago', mes: 'Out/2025' }, { num: '2/3', status: 'Pago', mes: 'Nov/2025' }, { num: '3/3', status: 'Pago', mes: 'Dez/2025' }] },
                  ]
                },
                { 
                  name: 'Carlos Silva', matricula: 'MAT-10043', doc: '123.456.789-00', ciclosAbertos: 2, ciclosFechados: 0, agent: 'João Pedro', status: 'Inadimplente', parcelaAtual: '2/3',
                  ciclos: [
                    { id: 'C-2026-01', status: 'Em Andamento', isAtual: true, parcelas: [{ num: '1/3', status: 'Pago', mes: 'Jan/2026' }, { num: '2/3', status: 'Em Aberto', mes: 'Fev/2026' }, { num: '3/3', status: 'Pendente', mes: 'Mar/2026' }] },
                    { id: 'C-2025-04', status: 'Em Atraso', isAtual: false, parcelas: [{ num: '1/3', status: 'Pago', mes: 'Out/2025' }, { num: '2/3', status: 'Pago', mes: 'Nov/2025' }, { num: '3/3', status: 'Em Aberto', mes: 'Dez/2025' }] },
                  ]
                },
                { 
                  name: 'Roberto Alves', matricula: 'MAT-10044', doc: '987.654.321-11', ciclosAbertos: 0, ciclosFechados: 5, agent: 'Ana Beatriz', status: 'Inativo', parcelaAtual: '1/3',
                  ciclos: [
                    { id: 'C-2026-01', status: 'Em Andamento', isAtual: true, parcelas: [{ num: '1/3', status: 'Pendente', mes: 'Jan/2026' }, { num: '2/3', status: 'Pendente', mes: 'Fev/2026' }, { num: '3/3', status: 'Pendente', mes: 'Mar/2026' }] },
                    { id: 'C-2025-04', status: 'Concluído', isAtual: false, parcelas: [{ num: '1/3', status: 'Pago', mes: 'Out/2025' }, { num: '2/3', status: 'Pago', mes: 'Nov/2025' }, { num: '3/3', status: 'Pago', mes: 'Dez/2025' }] },
                  ]
                },
                { 
                  name: 'Tech Solutions SA', matricula: 'MAT-10045', doc: '45.678.901/0001-23', ciclosAbertos: 0, ciclosFechados: 2, agent: 'Marcos Paulo', status: 'Ativo', parcelaAtual: '3/3',
                  ciclos: [
                    { id: 'C-2026-04', status: 'Futuro', isAtual: false, isFuturo: true, parcelas: [{ num: '1/3', status: 'Em Aberto', mes: 'Abr/2026' }, { num: '2/3', status: 'Em Aberto', mes: 'Mai/2026' }, { num: '3/3', status: 'Em Aberto', mes: 'Jun/2026' }] },
                    { id: 'C-2026-01', status: 'Concluído', isAtual: true, parcelas: [{ num: '1/3', status: 'Pago', mes: 'Jan/2026' }, { num: '2/3', status: 'Pago', mes: 'Fev/2026' }, { num: '3/3', status: 'Pago', mes: 'Mar/2026' }] },
                  ]
                },
              ].map((row, i) => {
                const isEmAberto = row.status === 'Inadimplente';
                const is3 = row.parcelaAtual === '3/3';
                const hasFutureCycle = row.ciclos.some(c => c.isFuturo);

                return (
                  <React.Fragment key={i}>
                    <tr 
                      onClick={() => toggleAssociadoRow(i)}
                      className="hover:bg-zinc-800/20 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 text-zinc-200 font-medium flex items-center gap-2">
                        {expandedAssociadosRows[i] ? <ChevronDown size={16} className="text-zinc-500" /> : <ChevronRight size={16} className="text-zinc-500" />}
                        {row.name}
                      </td>
                      <td className="px-6 py-4"><CopySnippet text={row.matricula} /></td>
                      <td className="px-6 py-4"><CopySnippet text={row.doc} /></td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-xs font-medium">
                          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded" title="Ciclos Abertos (Pendentes)">{row.ciclosAbertos} abertos</span>
                          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded" title="Ciclos Fechados (Quitados)">{row.ciclosFechados} fechados</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-400">{row.agent}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          row.status === 'Ativo' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          row.status === 'Em Análise' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                          row.status === 'Inadimplente' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                          'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex justify-end gap-2">
                        <button onClick={(e) => { e.stopPropagation(); setAssocModal({ type: 'details', data: row }); }} className="p-1.5 text-zinc-400 hover:text-rose-400 rounded-md hover:bg-rose-950/30 transition-colors" title="Ver detalhes"><Eye size={18} /></button>
                        <button onClick={(e) => { e.stopPropagation(); setAssocModal({ type: 'edit', data: row }); }} className="p-1.5 text-zinc-400 hover:text-rose-400 rounded-md hover:bg-rose-950/30 transition-colors" title="Editar cadastro"><Edit size={18} /></button>
                      </td>
                    </tr>
                    {expandedAssociadosRows[i] && (
                      <tr className="bg-zinc-900/30 border-b border-zinc-800/40">
                        <td colSpan={7} className="px-6 py-4">
                          <div className="flex flex-col gap-6">
                            {!hasFutureCycle && (
                              <div className="flex flex-col gap-4 opacity-50 border border-dashed border-zinc-700 rounded-xl p-4 bg-zinc-900/20">
                                <div className="flex items-center justify-between text-sm text-zinc-500">
                                  <span className="font-medium">Ciclo Futuro</span>
                                  <span className="font-mono bg-zinc-800/50 px-2 py-1 rounded text-xs">Bloqueado</span>
                                </div>
                                <div className="text-center text-xs text-zinc-500 py-2 flex items-center justify-center gap-2">
                                  <Lock size={14} />
                                  O ciclo futuro será gerado automaticamente quando 2 parcelas do ciclo atual forem pagas.
                                </div>
                              </div>
                            )}

                            {row.ciclos.map((ciclo: any, idx: number) => (
                              <div key={idx} className={`flex flex-col gap-4 ${!ciclo.isAtual && !ciclo.isFuturo ? 'opacity-70' : ''}`}>
                                <div className="flex items-center justify-between text-sm text-zinc-400">
                                  <span className={`font-medium ${ciclo.isAtual ? 'text-zinc-300' : 'text-zinc-500'}`}>
                                    {ciclo.isFuturo ? 'Ciclo Futuro' : ciclo.isAtual ? 'Detalhes do Ciclo Atual' : `Ciclo Anterior (${ciclo.id})`}
                                  </span>
                                  <span className="font-mono bg-zinc-800/50 px-2 py-1 rounded text-xs">Status: {ciclo.status}</span>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4">
                                  {ciclo.parcelas.map((parcela: any, pIdx: number) => {
                                    const canPay = parcela.status === 'Pendente' || parcela.status === 'Em Aberto' || parcela.status === 'Em previsão';
                                    const isLast = parcela.num === '3/3';
                                    return (
                                      <div key={pIdx} className="bg-zinc-900/80 p-3 rounded-lg border border-zinc-800/50 flex flex-col items-center justify-center relative group overflow-hidden">
                                        <span className="text-xs text-zinc-500 mb-1">Parcela {parcela.num}</span>
                                        <span className="text-[10px] text-zinc-600 mb-1">{parcela.mes}</span>
                                        <span className={`text-sm font-medium ${
                                          parcela.status === 'Pago' ? 'text-emerald-400' : 
                                          parcela.status === 'Em Aberto' ? 'text-amber-400' : 
                                          parcela.status === 'Em previsão' ? 'text-purple-400' : 
                                          'text-zinc-600'
                                        }`}>
                                          {parcela.status}
                                        </span>
                                        {parcela.previsao && (
                                          <span className="text-[10px] text-purple-400 mt-1 flex items-center gap-1">
                                            <Calendar size={10} /> Prev: {parcela.previsao}
                                          </span>
                                        )}

                                        {canPay && (
                                          <div className="absolute inset-0 bg-zinc-900/95 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-2 gap-2">
                                            <button 
                                              onClick={(e) => handleBaixaManual(e, { ...row, parcela: `${parcela.num} (${parcela.mes})`, nome: row.name })}
                                              className="w-full border border-cyan-500/30 text-cyan-400 text-xs font-medium py-1 rounded flex items-center justify-center gap-1 hover:bg-cyan-500/10 transition-colors"
                                            >
                                              <CheckCircle size={14} /> Baixar
                                            </button>
                                            {isLast && (
                                              <button 
                                                onClick={(e) => handlePrevisao(e, { ...row, parcela: `${parcela.num} (${parcela.mes})`, nome: row.name })}
                                                className="w-full border border-purple-500/30 text-purple-400 text-xs font-medium py-1 rounded flex items-center justify-center gap-1 hover:bg-purple-500/10 transition-colors"
                                              >
                                                <Calendar size={14} /> Previsão
                                              </button>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}

                            <div className="flex flex-wrap gap-3 mt-2 pt-4 border-t border-zinc-800/50">
                              <button className="flex-1 min-w-[150px] bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                                <UserMinus size={16} /> Desativar Associado
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalisesContent = () => (
    <div className="space-y-6">
      <KPICards stats={[
        { label: 'Taxa de Conversão', value: '68%', change: '+4.5%', isPositive: true },
        { label: 'Ticket Médio', value: 'R$ 43,50', change: '+1.2%', isPositive: true },
        { label: 'Churn Rate', value: '2.4%', change: '-0.5%', isPositive: true },
        { label: 'LTV Estimado', value: 'R$ 1.250', change: '+15%', isPositive: true },
      ]} />
      <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6 min-h-[400px] flex items-center justify-center border-dashed">
        <div className="text-center text-zinc-500">
          <BarChart3 size={48} className="mx-auto mb-4 opacity-50" />
          <p>Gráficos detalhados de análise entrarão aqui.</p>
        </div>
      </div>
    </div>
  );

  const renderRenovacaoContent = () => {
    const mesesMockData = [
      {
        mes: 'Março 2026',
        ano: '2026',
        mesNome: 'Março',
        valorEsperado: 45000,
        valorArrecadado: 38000,
        refinanciados: 12,
        renovacoes: 45,
        inadimplentes: 8,
        naoDescontados: 15,
        associados: [
          { nome: 'Carlos Mendes', matricula: 'MAT-10049', parcela: '3/3', status: 'Descontado' },
          { nome: 'Maria Oliveira', matricula: 'MAT-10046', parcela: '2/3', status: 'Em Aberto' },
          { nome: 'João Silva', matricula: 'MAT-10045', parcela: '2/3', status: 'Descontado' },
          { nome: 'Ana Costa', matricula: 'MAT-10048', parcela: '1/3', status: 'Em Aberto' },
          { nome: 'Lucas Ferreira', matricula: 'MAT-10052', parcela: '3/3', status: 'Em Aberto' },
        ]
      },
      {
        mes: 'Fevereiro 2026',
        ano: '2026',
        mesNome: 'Fevereiro',
        valorEsperado: 42000,
        valorArrecadado: 39500,
        refinanciados: 9,
        renovacoes: 38,
        inadimplentes: 5,
        naoDescontados: 10,
        associados: [
          { nome: 'Juliana Martins', matricula: 'MAT-10030', parcela: '3/3', status: 'Descontado' },
          { nome: 'Roberto Alves', matricula: 'MAT-10051', parcela: '2/3', status: 'Descontado' },
          { nome: 'Fernanda Lima', matricula: 'MAT-10050', parcela: '1/3', status: 'Em Aberto' },
          { nome: 'Marcos Paulo', matricula: 'MAT-10031', parcela: '2/3', status: 'Em Aberto' },
        ]
      },
      {
        mes: 'Janeiro 2026',
        ano: '2026',
        mesNome: 'Janeiro',
        valorEsperado: 40000,
        valorArrecadado: 39000,
        refinanciados: 7,
        renovacoes: 35,
        inadimplentes: 4,
        naoDescontados: 8,
        associados: [
          { nome: 'Pedro Santos', matricula: 'MAT-10047', parcela: '3/3', status: 'Descontado' },
          { nome: 'Ana Costa', matricula: 'MAT-10048', parcela: '2/3', status: 'Descontado' },
          { nome: 'Lucas Ferreira', matricula: 'MAT-10052', parcela: '1/3', status: 'Descontado' },
        ]
      },
      {
        mes: 'Dezembro 2025',
        ano: '2025',
        mesNome: 'Dezembro',
        valorEsperado: 38000,
        valorArrecadado: 37500,
        refinanciados: 5,
        renovacoes: 30,
        inadimplentes: 3,
        naoDescontados: 5,
        associados: [
          { nome: 'Carlos Mendes', matricula: 'MAT-10049', parcela: '3/3', status: 'Descontado' },
          { nome: 'João Silva', matricula: 'MAT-10045', parcela: '2/3', status: 'Descontado' },
          { nome: 'Ana Costa', matricula: 'MAT-10048', parcela: '1/3', status: 'Em Aberto' },
        ]
      },
      {
        mes: 'Novembro 2025',
        ano: '2025',
        mesNome: 'Novembro',
        valorEsperado: 35000,
        valorArrecadado: 34000,
        refinanciados: 4,
        renovacoes: 28,
        inadimplentes: 2,
        naoDescontados: 4,
        associados: [
          { nome: 'Maria Oliveira', matricula: 'MAT-10046', parcela: '3/3', status: 'Descontado' },
          { nome: 'Roberto Alves', matricula: 'MAT-10051', parcela: '2/3', status: 'Em Aberto' },
        ]
      },
      {
        mes: 'Outubro 2025',
        ano: '2025',
        mesNome: 'Outubro',
        valorEsperado: 32000,
        valorArrecadado: 31000,
        refinanciados: 3,
        renovacoes: 25,
        inadimplentes: 2,
        naoDescontados: 3,
        associados: [
          { nome: 'Ana Costa', matricula: 'MAT-10048', parcela: '3/3', status: 'Descontado' },
          { nome: 'Lucas Ferreira', matricula: 'MAT-10052', parcela: '2/3', status: 'Descontado' },
        ]
      }
    ];

    const filteredMeses = mesesMockData.filter(m => {
      if (filterAno && m.ano !== filterAno) return false;
      if (filterMes && m.mesNome !== filterMes) return false;
      return true;
    });

    const RetornoCard = ({ title, refDate, previstos, descontados, valorPrevisto, valorDescontado, mensalidadesPrev, mensalidadesDesc, valoresPrev, valoresDesc }: any) => {
      const progressoContratos = previstos > 0 ? ((descontados / previstos) * 100).toFixed(1) : '0,0';
      const progressoMensalidades = mensalidadesPrev > 0 ? ((mensalidadesDesc / mensalidadesPrev) * 100).toFixed(1) : '0,0';
      const progressoValores = valoresPrev > 0 ? ((valoresDesc / valoresPrev) * 100).toFixed(1) : '0,0';
      const naoRealizados = previstos - descontados;

      return (
        <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-xl p-5 flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-zinc-100 font-medium">{title}</h4>
              <p className="text-zinc-500 text-sm">Ref.: {refDate}</p>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded-md text-xs font-medium text-zinc-300">
              <Users size={14} className="text-cyan-500" />
              <span>{descontados} / {previstos}</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-2xl font-bold text-zinc-100">
              R$ {valorDescontado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} <span className="text-sm font-normal text-zinc-500">de R$ {valorPrevisto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="space-y-4 flex-1">
            {/* Section 1: Mensalidades */}
            <div className="pb-4 border-b border-zinc-800/40">
              <div className="flex justify-between text-xs text-zinc-400 mb-1">
                <span>Descontados: <strong className="text-zinc-200">{descontados}</strong> de {previstos} contratos</span>
                <span>Progresso: {progressoContratos}%</span>
              </div>
              <div className="text-xs text-rose-400/80 mb-3 font-medium bg-rose-500/10 px-2 py-1 rounded inline-block">
                Previsão não realizada (sem desconto): {naoRealizados} associados
              </div>
              
              <div className="flex justify-between text-sm text-zinc-300 mb-1">
                <span>Mensalidades (≥ R$ 100)</span>
                <span className="font-medium">R$ {mensalidadesDesc.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} <span className="text-zinc-500 font-normal">de R$ {mensalidadesPrev.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></span>
              </div>
              <div className="flex justify-between text-sm text-zinc-300 mb-3">
                <span>Valores R$ 30/50</span>
                <span className="font-medium">R$ {valoresDesc.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} <span className="text-zinc-500 font-normal">de R$ {valoresPrev.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></span>
              </div>
              
              <div className="flex justify-between text-xs text-zinc-500 mb-1">
                <span>Barra mensalidades</span>
                <span>{progressoMensalidades}%</span>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${progressoMensalidades}%` }}></div>
              </div>
            </div>

            {/* Section 2: Valores */}
            <div className="pb-4 border-b border-zinc-800/40">
              <div className="flex justify-between text-xs text-zinc-400 mb-3">
                <span>Descontados: <strong className="text-zinc-200">{descontados}</strong> de {previstos} contratos</span>
                <span>Progresso: {progressoContratos}%</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-500 mb-1">
                <span>Barra valores 30/50</span>
                <span>{progressoValores}%</span>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${progressoValores}%` }}></div>
              </div>
            </div>

            {/* Section 3: Status */}
            <div className="pt-2">
              <div className="flex justify-between text-xs text-zinc-400 mb-2">
                <span>Descontados: <strong className="text-zinc-200">{descontados}</strong> de {previstos} contratos</span>
                <span>Progresso: {progressoContratos}%</span>
              </div>
              {descontados === 0 ? (
                <p className="text-xs text-zinc-500 italic">Nenhum retorno registrado para esta referência.</p>
              ) : (
                <p className="text-xs text-emerald-500/80 italic">Retorno processado parcialmente.</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 mt-6 pt-4 border-t border-zinc-800/40">
            <button className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 px-3 py-1.5 rounded-md text-xs font-medium transition-colors">
              <List size={14} /> Detalhar
            </button>
            <button className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 px-3 py-1.5 rounded-md text-xs font-medium transition-colors">
              <FileText size={14} /> Detalhar mensalidades
            </button>
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-6">
        {/* Gestão Detalhada por Ciclo */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
            <h3 className="text-lg font-medium text-zinc-100">Gestão Detalhada por Mês</h3>
            
            <div className="flex flex-wrap items-center gap-3">
              <select 
                value={filterAno}
                onChange={(e) => setFilterAno(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg text-sm focus:outline-none"
              >
                <option value="">Todos os Anos</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
              </select>
              
              <select 
                value={filterMes}
                onChange={(e) => setFilterMes(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg text-sm focus:outline-none"
              >
                <option value="">Todos os Meses</option>
                <option value="Janeiro">Janeiro</option>
                <option value="Fevereiro">Fevereiro</option>
                <option value="Março">Março</option>
                <option value="Abril">Abril</option>
                <option value="Maio">Maio</option>
                <option value="Junho">Junho</option>
                <option value="Julho">Julho</option>
                <option value="Agosto">Agosto</option>
                <option value="Setembro">Setembro</option>
                <option value="Outubro">Outubro</option>
                <option value="Novembro">Novembro</option>
                <option value="Dezembro">Dezembro</option>
              </select>

              <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-lg">
                <button 
                  onClick={() => setViewMode('cards')} 
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'cards' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}
                  title="Visualização em Cards"
                >
                  <LayoutDashboard size={16} />
                </button>
                <button 
                  onClick={() => setViewMode('table')} 
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}
                  title="Visualização em Tabela"
                >
                  <List size={16} />
                </button>
              </div>

              <button className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ml-auto">
                <Download size={16} /> Exportar
              </button>
            </div>
          </div>

          {viewMode === 'cards' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMeses.slice(0, visibleCycles).map((mesData, idx) => (
                  <MesCard key={idx} data={mesData} />
                ))}
              </div>
              {visibleCycles < filteredMeses.length && (
                <div className="mt-6 flex justify-center">
                  <button 
                    onClick={() => setVisibleCycles(prev => prev + 3)}
                    className="bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800/60 text-zinc-300 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    Carregar meses anteriores
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-950/50 text-zinc-400">
                    <tr>
                      <th className="px-6 py-4 font-medium">Mês/Ano</th>
                      <th className="px-6 py-4 font-medium text-right">Valor Esperado</th>
                      <th className="px-6 py-4 font-medium text-right">Valor Arrecadado</th>
                      <th className="px-6 py-4 font-medium text-center">Progresso</th>
                      <th className="px-6 py-4 font-medium text-center">Refinanciados</th>
                      <th className="px-6 py-4 font-medium text-center">Renovações</th>
                      <th className="px-6 py-4 font-medium text-center">Inadimplentes</th>
                      <th className="px-6 py-4 font-medium text-center">Não Descontados</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/40">
                    {filteredMeses.map((row, i) => {
                      const progresso = row.valorEsperado > 0 ? ((row.valorArrecadado / row.valorEsperado) * 100).toFixed(1) : '0.0';
                      return (
                        <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                          <td className="px-6 py-4 text-zinc-200 font-medium">{row.mes}</td>
                          <td className="px-6 py-4 text-zinc-400 text-right">R$ {row.valorEsperado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                          <td className="px-6 py-4 text-emerald-400 font-medium text-right">R$ {row.valorArrecadado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 justify-center">
                              <div className="w-16 bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${progresso}%` }}></div>
                              </div>
                              <span className="text-xs text-zinc-300">{progresso}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-zinc-300 text-center">{row.refinanciados}</td>
                          <td className="px-6 py-4 text-zinc-300 text-center">{row.renovacoes}</td>
                          <td className="px-6 py-4 text-rose-400 text-center font-medium">{row.inadimplentes}</td>
                          <td className="px-6 py-4 text-amber-400 text-center font-medium">{row.naoDescontados}</td>
                        </tr>
                      );
                    })}
                    {filteredMeses.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-6 py-8 text-center text-zinc-500">Nenhum resultado encontrado para os filtros selecionados.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <FileText size={20} />
              </div>
              <h2 className="text-xl font-bold text-zinc-100">Arquivos Retorno deste Mês</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-zinc-950/50 border border-zinc-800 rounded-lg overflow-hidden">
                <span className="px-3 py-2 text-sm text-zinc-400 border-r border-zinc-800">Competência</span>
                <div className="relative flex items-center">
                  <input
                    type="month"
                    value={competencia}
                    onChange={(e) => setCompetencia(e.target.value)}
                    className="bg-transparent border-none text-zinc-200 text-sm font-medium px-3 py-2 focus:outline-none cursor-pointer [color-scheme:dark]"
                  />
                </div>
              </div>
              <button className="flex items-center gap-2 bg-zinc-950/50 hover:bg-zinc-800 border border-zinc-800 text-cyan-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                <Zap size={16} /> Mês atual
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <RetornoCard
              title="1º arquivo retorno"
              refDate="04/2026"
              previstos={150}
              descontados={120}
              valorPrevisto={15000}
              valorDescontado={12000}
              mensalidadesPrev={10000}
              mensalidadesDesc={8000}
              valoresPrev={5000}
              valoresDesc={4000}
            />
            <RetornoCard
              title="2º arquivo retorno"
              refDate="05/2026"
              previstos={150}
              descontados={0}
              valorPrevisto={15000}
              valorDescontado={0}
              mensalidadesPrev={10000}
              mensalidadesDesc={0}
              valoresPrev={5000}
              valoresDesc={0}
            />
            <RetornoCard
              title="3º arquivo retorno"
              refDate="06/2026"
              previstos={150}
              descontados={0}
              valorPrevisto={15000}
              valorDescontado={0}
              mensalidadesPrev={10000}
              mensalidadesDesc={0}
              valoresPrev={5000}
              valoresDesc={0}
            />
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-zinc-800/60">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-sm text-zinc-300 font-medium">Total recebido no mês: <strong className="text-zinc-100">R$ 12.000,00</strong></span>
              <span className="text-zinc-600">•</span>
              <span className="text-sm text-zinc-400">Estimado total: <strong className="text-zinc-300">R$ 45.000,00</strong></span>
            </div>
            <div className="flex items-start gap-2 text-xs text-zinc-500">
              <Info size={14} className="mt-0.5 shrink-0" />
              <p>Cada card representa o <strong>arquivo retorno</strong> (1º, 2º e 3º) da competência. &quot;Recebidos&quot; = status <strong>1</strong> ou <strong>4</strong> na tabela de mensalidades (ou manual pago). A previsão indica associados que deveriam ter o desconto em folha mas não constam no arquivo.</p>
            </div>
          </div>
        </div>

        {/* Monitoramento Trimestral */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-zinc-100 mb-4">Monitoramento de Ciclos (Trimestrais)</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-xl p-4">
              <div className="text-zinc-400 text-sm mb-1">Mês 1/3 (Início)</div>
              <div className="text-2xl font-bold text-zinc-100">845 <span className="text-sm font-normal text-zinc-500">associados</span></div>
            </div>
            <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-xl p-4">
              <div className="text-zinc-400 text-sm mb-1">Mês 2/3 (Meio)</div>
              <div className="text-2xl font-bold text-zinc-100">720 <span className="text-sm font-normal text-zinc-500">associados</span></div>
            </div>
            <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-xl p-4">
              <div className="text-zinc-400 text-sm mb-1">Mês 3/3 (Encerramento)</div>
              <div className="text-2xl font-bold text-amber-400">585 <span className="text-sm font-normal text-amber-500/50">associados</span></div>
            </div>
            <div className="bg-zinc-950/50 border border-rose-900/30 rounded-xl p-4">
              <div className="text-rose-400 text-sm mb-1">Ciclos Pendentes Acumulados</div>
              <div className="text-2xl font-bold text-rose-100">124 <span className="text-sm font-normal text-rose-500/50">associados</span></div>
            </div>
          </div>
          <div className="mt-4 text-xs text-zinc-500 flex items-start gap-2 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800/50">
            <Info size={16} className="shrink-0 mt-0.5 text-cyan-500" />
            <p><strong>Regra de Renovação Automática:</strong> Cada ciclo é composto por exatamente 3 meses (3 parcelas). Ao atingir o mês 3/3, um novo ciclo é gerado automaticamente no mês seguinte (mês 1/3), <strong>independentemente da quitação do ciclo anterior</strong>. Associados com ciclos anteriores não quitados acumulam &quot;Ciclos Abertos&quot;.</p>
          </div>
        </div>
      </div>
    );
  };

  const renderTesourariaContent = () => (
    <div className="space-y-6">
      <KPICards stats={[
        { label: 'Receita Total', value: 'R$ 124.500', change: '+8.4%', isPositive: true },
        { label: 'Inadimplência', value: '4.2%', change: '-1.1%', isPositive: true },
        { label: 'Previsão Próx. Mês', value: 'R$ 132.000', change: '+6%', isPositive: true },
        { label: 'Despesas', value: 'R$ 45.200', change: '+2.5%', isPositive: false },
      ]} />
      <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800/60 flex items-center justify-between">
          <h3 className="text-lg font-medium text-zinc-100">Gestão de Parcelas de Contrato</h3>
          <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
            Gerar Faturas
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950/50 text-zinc-400">
              <tr>
                <th className="px-6 py-4 font-medium">Contrato</th>
                <th className="px-6 py-4 font-medium">Associado</th>
                <th className="px-6 py-4 font-medium">Parcela</th>
                <th className="px-6 py-4 font-medium">Vencimento</th>
                <th className="px-6 py-4 font-medium">Valor</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40">
              {[
                { id: 'CTR-2026-001', name: 'Empresa Alpha Ltda', parcela: '3/12', vencimento: '15 Mar 2026', valor: 'R$ 1.250,00', status: 'Pendente' },
                { id: 'CTR-2026-042', name: 'Carlos Silva', parcela: '1/12', vencimento: '10 Mar 2026', valor: 'R$ 450,00', status: 'Pago' },
                { id: 'CTR-2025-899', name: 'Roberto Alves', parcela: '11/12', vencimento: '05 Mar 2026', valor: 'R$ 850,00', status: 'Atrasado' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-6 py-4 text-zinc-300 font-mono text-xs">{row.id}</td>
                  <td className="px-6 py-4 text-zinc-200 font-medium">{row.name}</td>
                  <td className="px-6 py-4 text-zinc-400">{row.parcela}</td>
                  <td className="px-6 py-4 text-zinc-400">{row.vencimento}</td>
                  <td className="px-6 py-4 text-zinc-300 font-medium">{row.valor}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      row.status === 'Pago' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      row.status === 'Pendente' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderImportacaoContent = () => {
    const importData = {
      descontados: [
        { nome: 'João Silva', matricula: 'MAT-10045', valor: 'R$ 150,00' },
        { nome: 'Maria Oliveira', matricula: 'MAT-10046', valor: 'R$ 150,00' },
        { nome: 'Carlos Mendes', matricula: 'MAT-10049', valor: 'R$ 150,00' },
        { nome: 'Fernanda Lima', matricula: 'MAT-10050', valor: 'R$ 150,00' },
        { nome: 'Roberto Alves', matricula: 'MAT-10051', valor: 'R$ 150,00' },
      ],
      previsao: [
        { nome: 'Pedro Santos', matricula: 'MAT-10047', ciclo: 'Ciclo 12', parcela: '3/3' },
        { nome: 'Ana Costa', matricula: 'MAT-10048', ciclo: 'Ciclo 06', parcela: '3/3' },
        { nome: 'Lucas Ferreira', matricula: 'MAT-10052', ciclo: 'Ciclo 24', parcela: '3/3' },
      ],
      novosCiclos: [
        { nome: 'Juliana Martins', matricula: 'MAT-10030', cicloAnterior: 'Fechado', novoCiclo: 'Ciclo 13', parcela: '1/3' },
        { nome: 'Marcos Paulo', matricula: 'MAT-10031', cicloAnterior: 'Aberto (Pendente)', novoCiclo: 'Ciclo 07', parcela: '1/3' },
      ]
    };

    return (
      <div className="space-y-6">
        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-8 flex flex-col items-center justify-center text-center border-dashed">
          <div className="w-16 h-16 rounded-full bg-rose-900/20 flex items-center justify-center mb-4">
            <Upload size={32} className="text-rose-400" />
          </div>
          <h3 className="text-lg font-medium text-zinc-100 mb-2">Importar Dados</h3>
          <p className="text-zinc-400 text-sm max-w-md mb-6">Arraste e solte arquivos CSV ou Excel aqui, ou clique para selecionar os arquivos do seu computador.</p>
          <button className="bg-rose-900 hover:bg-rose-800 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
            Selecionar Arquivo
          </button>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-zinc-100">Resultado da Última Importação</h3>
            <span className="text-sm text-zinc-400">Há 2 horas</span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Descontados Card */}
            <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h4 className="text-zinc-100 font-medium">Associados Descontados</h4>
                  <p className="text-sm text-zinc-500">{importData.descontados.length} registros processados</p>
                </div>
              </div>
              
              <div className="mt-4 border border-zinc-800/60 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-900/50 text-zinc-400">
                    <tr>
                      <th className="px-4 py-3 font-medium">Nome</th>
                      <th className="px-4 py-3 font-medium">Matrícula</th>
                      <th className="px-4 py-3 font-medium text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/40">
                    {importData.descontados.map((item, i) => (
                      <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                        <td className="px-4 py-3 text-zinc-200">{item.nome}</td>
                        <td className="px-4 py-3 text-zinc-400 font-mono text-xs">{item.matricula}</td>
                        <td className="px-4 py-3 text-zinc-300 text-right">{item.valor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Previsão Card */}
            <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h4 className="text-zinc-100 font-medium">Previsão de Encerramento</h4>
                  <p className="text-sm text-zinc-500">{importData.previsao.length} associados na última parcela</p>
                </div>
              </div>

              <div className="mt-4 border border-zinc-800/60 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-900/50 text-zinc-400">
                    <tr>
                      <th className="px-4 py-3 font-medium">Nome</th>
                      <th className="px-4 py-3 font-medium">Ciclo Atual</th>
                      <th className="px-4 py-3 font-medium text-right">Parcela</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/40">
                    {importData.previsao.map((item, i) => (
                      <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                        <td className="px-4 py-3 text-zinc-200">{item.nome}</td>
                        <td className="px-4 py-3 text-zinc-300">{item.ciclo}</td>
                        <td className="px-4 py-3 text-amber-400/90 text-right font-medium">{item.parcela}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-xs text-zinc-500 flex items-start gap-2">
                <Info size={14} className="shrink-0 mt-0.5" />
                <p>Estes associados estão na parcela 3/3. Um novo ciclo será gerado automaticamente no próximo mês.</p>
              </div>
            </div>

            {/* Novos Ciclos Card */}
            <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <RefreshCw size={20} />
                </div>
                <div>
                  <h4 className="text-zinc-100 font-medium">Novos Ciclos Abertos</h4>
                  <p className="text-sm text-zinc-500">{importData.novosCiclos.length} associados iniciaram novo ciclo</p>
                </div>
              </div>

              <div className="mt-4 border border-zinc-800/60 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-900/50 text-zinc-400">
                    <tr>
                      <th className="px-4 py-3 font-medium">Nome</th>
                      <th className="px-4 py-3 font-medium">Novo Ciclo</th>
                      <th className="px-4 py-3 font-medium text-right">Status Antigo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/40">
                    {importData.novosCiclos.map((item, i) => (
                      <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                        <td className="px-4 py-3 text-zinc-200">{item.nome}</td>
                        <td className="px-4 py-3 text-cyan-400/90 font-medium">{item.novoCiclo} (1/3)</td>
                        <td className="px-4 py-3 text-right">
                          <span className={`text-xs px-2 py-0.5 rounded ${item.cicloAnterior === 'Fechado' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                            {item.cicloAnterior}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-xs text-zinc-500 flex items-start gap-2">
                <Info size={14} className="shrink-0 mt-0.5" />
                <p>Ciclos gerados automaticamente após a 3ª parcela do ciclo anterior, independentemente de quitação.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderConfiguracoesContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4">
          <nav className="space-y-1">
            <button 
              onClick={() => setConfigTab('acessos')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${configTab === 'acessos' ? 'text-rose-100 bg-rose-900/20 border border-rose-900/30' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'}`}
            >
              <Shield size={18} className={configTab === 'acessos' ? 'text-rose-400' : ''} /> Gerenciar Acessos
            </button>
            <button 
              onClick={() => setConfigTab('auditoria')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${configTab === 'auditoria' ? 'text-rose-100 bg-rose-900/20 border border-rose-900/30' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'}`}
            >
              <Activity size={18} className={configTab === 'auditoria' ? 'text-rose-400' : ''} /> Auditoria de Ações
            </button>
            <button 
              onClick={() => setConfigTab('servidor')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${configTab === 'servidor' ? 'text-rose-100 bg-rose-900/20 border border-rose-900/30' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'}`}
            >
              <Server size={18} className={configTab === 'servidor' ? 'text-rose-400' : ''} /> Servidor
            </button>
            <button 
              onClick={() => setConfigTab('banco')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${configTab === 'banco' ? 'text-rose-100 bg-rose-900/20 border border-rose-900/30' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'}`}
            >
              <Database size={18} className={configTab === 'banco' ? 'text-rose-400' : ''} /> Banco de Dados
            </button>
          </nav>
        </div>
      </div>
      <div className="lg:col-span-3 space-y-6">
        {configTab === 'acessos' ? (
          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-zinc-100">Gerenciar Acessos</h3>
              <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                Novo Perfil
              </button>
            </div>
            <div className="space-y-4">
              {[
                { role: 'Administrador', desc: 'Acesso total ao sistema', users: 3 },
                { role: 'Coordenador', desc: 'Acesso a relatórios e gestão de agentes', users: 5 },
                { role: 'Agente', desc: 'Acesso restrito aos próprios associados', users: 42 },
              ].map((role, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-zinc-800/50 rounded-xl bg-zinc-950/30">
                  <div>
                    <div className="font-medium text-zinc-200">{role.role}</div>
                    <div className="text-xs text-zinc-500 mt-1">{role.desc}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-medium text-zinc-400 bg-zinc-800/50 px-2 py-1 rounded-md">{role.users} usuários</span>
                    <button className="text-zinc-400 hover:text-rose-400 transition-colors"><Edit size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : configTab === 'auditoria' ? (
          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800/60 flex items-center justify-between">
              <h3 className="text-lg font-medium text-zinc-100">Auditoria de Ações</h3>
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <input type="text" placeholder="Buscar logs..." className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg pl-9 pr-4 py-1.5 text-sm text-zinc-200 focus:outline-none focus:border-rose-900/50" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-950/50 text-zinc-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">Data/Hora</th>
                    <th className="px-6 py-4 font-medium">Usuário</th>
                    <th className="px-6 py-4 font-medium">Ação</th>
                    <th className="px-6 py-4 font-medium">Módulo</th>
                    <th className="px-6 py-4 font-medium">IP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/40">
                  {[
                    { time: '10 Mar 2026, 14:32:15', user: 'Admin User', action: 'Login no sistema', module: 'Auth', ip: '192.168.1.45' },
                    { time: '10 Mar 2026, 12:15:00', user: 'Ana Beatriz', action: 'Criou novo associado (Carlos Silva)', module: 'Associados', ip: '192.168.1.112' },
                    { time: '10 Mar 2026, 10:45:22', user: 'Admin User', action: 'Exportou relatório de análises', module: 'Análises', ip: '192.168.1.45' },
                    { time: '09 Mar 2026, 16:30:10', user: 'João Pedro', action: 'Alterou status de ciclo (ID: 8492)', module: 'Renovação', ip: '192.168.1.88' },
                    { time: '09 Mar 2026, 14:20:05', user: 'Lucas Mendes', action: 'Atualizou dados de agente', module: 'Agentes', ip: '192.168.1.105' },
                    { time: '09 Mar 2026, 09:10:00', user: 'Admin User', action: 'Alterou permissões do perfil Agente', module: 'Configurações', ip: '192.168.1.45' },
                  ].map((log, i) => (
                    <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                      <td className="px-6 py-4 text-zinc-400 whitespace-nowrap">{log.time}</td>
                      <td className="px-6 py-4 text-zinc-200 font-medium">{log.user}</td>
                      <td className="px-6 py-4 text-zinc-300">{log.action}</td>
                      <td className="px-6 py-4 text-zinc-400">{log.module}</td>
                      <td className="px-6 py-4 text-zinc-500 font-mono text-xs">{log.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-zinc-800/60 flex items-center justify-between text-sm text-zinc-500">
              <span>Mostrando 6 de 1.248 registros</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-md border border-zinc-800 hover:bg-zinc-800/50 transition-colors disabled:opacity-50" disabled>Anterior</button>
                <button className="px-3 py-1 rounded-md border border-zinc-800 hover:bg-zinc-800/50 transition-colors">Próxima</button>
              </div>
            </div>
          </div>
        ) : configTab === 'servidor' ? (
          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6">
            <h3 className="text-lg font-medium text-zinc-100 mb-6">Gestão do Servidor</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-zinc-400 mb-2"><Cpu size={16} /> CPU Usage</div>
                <div className="text-2xl font-bold text-zinc-100">24%</div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-3"><div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '24%' }}></div></div>
              </div>
              <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-zinc-400 mb-2"><HardDrive size={16} /> Memory</div>
                <div className="text-2xl font-bold text-zinc-100">4.2 GB <span className="text-sm font-normal text-zinc-500">/ 8 GB</span></div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-3"><div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '52%' }}></div></div>
              </div>
              <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-zinc-400 mb-2"><Clock size={16} /> Uptime</div>
                <div className="text-2xl font-bold text-zinc-100">14d 08h 22m</div>
                <div className="text-xs text-emerald-400 mt-2">Sistema Estável</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-rose-900 hover:bg-rose-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">Reiniciar Servidor</button>
              <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Limpar Cache</button>
            </div>
          </div>
        ) : configTab === 'banco' ? (
          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6">
            <h3 className="text-lg font-medium text-zinc-100 mb-6">Banco de Dados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <div className="text-zinc-400 text-sm mb-1">Status da Conexão</div>
                  <div className="flex items-center gap-2 text-emerald-400 font-medium"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Conectado (PostgreSQL)</div>
                </div>
                <Database size={32} className="text-zinc-700" />
              </div>
              <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <div className="text-zinc-400 text-sm mb-1">Armazenamento</div>
                  <div className="text-zinc-100 font-medium">12.4 GB <span className="text-zinc-500 text-sm">/ 50 GB</span></div>
                </div>
                <HardDrive size={32} className="text-zinc-700" />
              </div>
            </div>
            <div className="border-t border-zinc-800/60 pt-6">
              <h4 className="text-sm font-medium text-zinc-300 mb-4">Backups e Manutenção</h4>
              <div className="flex items-center justify-between p-4 bg-zinc-950/30 border border-zinc-800/50 rounded-xl mb-4">
                <div>
                  <div className="font-medium text-zinc-200">Último Backup Automático</div>
                  <div className="text-xs text-zinc-500 mt-1">Hoje às 03:00 AM • 4.2 GB</div>
                </div>
                <button className="text-zinc-400 hover:text-rose-400 transition-colors" title="Baixar Backup"><DownloadCloud size={20} /></button>
              </div>
              <div className="flex gap-3">
                <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Gerar Backup Manual</button>
                <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Otimizar Tabelas</button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950 text-zinc-50 font-sans">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: 280 }}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="flex flex-col border-r border-zinc-800/60 bg-zinc-900/30 backdrop-blur-xl z-20"
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-zinc-800/60">
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 font-bold text-xl tracking-tight text-zinc-100 whitespace-nowrap overflow-hidden"
            >
              <div className="w-8 h-8 rounded-lg bg-rose-900 flex items-center justify-center text-rose-100 shadow-lg shadow-rose-900/20">
                <LayoutDashboard size={18} />
              </div>
              <span>ABASE</span>
            </motion.div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className={`p-2 rounded-lg hover:bg-zinc-800/80 text-zinc-400 hover:text-zinc-100 transition-colors ${!isSidebarOpen && 'mx-auto'}`}
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5 custom-scrollbar">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
              activeTab === 'dashboard' ? 'text-rose-100' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
            }`}
          >
            {activeTab === 'dashboard' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-rose-900/40 border border-rose-800/50 rounded-lg"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <LayoutDashboard size={20} className={`relative z-10 ${activeTab === 'dashboard' ? 'text-rose-400' : 'group-hover:text-zinc-300'} ${!isSidebarOpen && 'mx-auto'}`} />
            {isSidebarOpen && (
              <span className="relative z-10 font-medium text-sm whitespace-nowrap">Dashboard</span>
            )}
          </button>

          <div className="pt-4 pb-2">
            {isSidebarOpen ? (
              <p className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Módulos</p>
            ) : (
              <div className="w-full h-px bg-zinc-800/60 my-2"></div>
            )}
          </div>

          {sidebarItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                  isActive ? 'text-rose-100' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                }`}
                title={!isSidebarOpen ? item.name : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-rose-900/40 border border-rose-800/50 rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon size={20} className={`relative z-10 ${isActive ? 'text-rose-400' : 'group-hover:text-zinc-300'} ${!isSidebarOpen && 'mx-auto'}`} />
                {isSidebarOpen && (
                  <span className="relative z-10 font-medium text-sm whitespace-nowrap">{item.name}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800/60">
          <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors ${!isSidebarOpen && 'justify-center'}`}>
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium text-sm">Sair</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Background glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-rose-900/10 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Header */}
        <header className="h-16 border-b border-zinc-800/60 bg-zinc-950/50 backdrop-blur-md flex items-center justify-between px-6 z-30 sticky top-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowAutocomplete(e.target.value.length > 0);
                }}
                onFocus={() => setShowAutocomplete(searchQuery.length > 0)}
                onBlur={() => setTimeout(() => setShowAutocomplete(false), 200)}
                placeholder="Buscar em todo o sistema..."
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-sm text-zinc-200 focus:outline-none focus:border-rose-900/50 focus:ring-1 focus:ring-rose-900/50 transition-all placeholder:text-zinc-600"
              />
              {showAutocomplete && (
                <div className="absolute top-full mt-2 w-full bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-50">
                  {autocompleteResults.length > 0 ? (
                    <ul className="py-2">
                      {autocompleteResults.map((result, idx) => (
                        <li key={idx} className="px-4 py-2 hover:bg-zinc-800/50 cursor-pointer flex items-center justify-between group">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-zinc-200 group-hover:text-rose-400 transition-colors">{result.name}</span>
                            <span className="text-xs text-zinc-500">{result.type}</span>
                          </div>
                          <span className="text-xs font-mono text-zinc-600">{result.id}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-6 text-center text-sm text-zinc-500">Nenhum resultado encontrado.</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <button className="relative p-2 text-zinc-400 hover:text-zinc-100 transition-colors rounded-full hover:bg-zinc-800/50">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-zinc-950"></span>
            </button>
            <div className="h-8 w-px bg-zinc-800 hidden sm:block"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">Admin User</span>
                <span className="text-xs text-zinc-500">Administrador</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden group-hover:border-rose-900/50 transition-colors">
                <Image src="https://picsum.photos/seed/admin/100/100" alt="User" width={100} height={100} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative z-10">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto space-y-6 sm:space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
                  {activeTab === 'dashboard' ? 'Visão Geral' : sidebarItems.find(i => i.id === activeTab)?.name}
                </h1>
                <p className="text-zinc-500 text-sm mt-1">
                  {activeTab === 'dashboard' ? 'Acompanhe as métricas e atividades recentes.' : `Gerencie as informações de ${sidebarItems.find(i => i.id === activeTab)?.name.toLowerCase()}.`}
                </p>
              </div>
              <div className="text-sm font-medium text-zinc-400 bg-zinc-900/50 px-3 py-1.5 rounded-lg border border-zinc-800/50 inline-flex items-center gap-3" suppressHydrationWarning>
                <AdvancedFilter />
                {new Date().toLocaleDateString('pt-BR', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
              </div>
            </div>

            {activeTab === 'dashboard' ? (
              renderDashboardContent()
            ) : activeTab === 'analises' ? (
              renderAnalisesContent()
            ) : activeTab === 'agentes' ? (
              renderAgentesContent()
            ) : activeTab === 'associados' ? (
              renderAssociadosContent()
            ) : activeTab === 'renovacao' ? (
              renderRenovacaoContent()
            ) : activeTab === 'tesouraria' ? (
              renderTesourariaContent()
            ) : activeTab === 'importacao' ? (
              renderImportacaoContent()
            ) : activeTab === 'configuracoes' ? (
              renderConfiguracoesContent()
            ) : (
              <div className="flex flex-col items-center justify-center h-[50vh] text-zinc-500 space-y-4 bg-zinc-900/20 border border-zinc-800/40 rounded-3xl border-dashed">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900/80 flex items-center justify-center border border-zinc-800 shadow-inner">
                  {React.createElement(sidebarItems.find(i => i.id === activeTab)?.icon || LayoutDashboard, { size: 32, className: "text-rose-900/70" })}
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium text-zinc-300 mb-1">Módulo em Desenvolvimento</h3>
                  <p className="text-sm max-w-sm mx-auto">A área de <strong className="text-zinc-200">{sidebarItems.find(i => i.id === activeTab)?.name}</strong> está sendo construída e estará disponível em breve.</p>
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
      
      {/* Modals */}
      {isPrevisaoModalOpen && selectedAssociado && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="text-lg font-medium text-zinc-100">Informar Previsão de Pagamento</h3>
              <button 
                onClick={() => setIsPrevisaoModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Associado</label>
                <div className="text-sm text-zinc-200 font-medium">{selectedAssociado.nome}</div>
                <div className="text-xs text-zinc-500 font-mono">{selectedAssociado.matricula}</div>
              </div>
              
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Parcela Referência</label>
                <div className="text-sm text-zinc-200">{selectedAssociado.parcela}</div>
              </div>

              <div>
                <label className="block text-xs text-zinc-500 mb-1">Data Prevista</label>
                <input 
                  type="date" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-purple-500 transition-colors [color-scheme:dark]"
                />
              </div>
              
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Observações (Opcional)</label>
                <textarea 
                  rows={2}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  placeholder="Motivo da previsão..."
                ></textarea>
              </div>
            </div>
            <div className="p-5 border-t border-zinc-800 flex justify-end gap-3 bg-zinc-950/50">
              <button 
                onClick={() => setIsPrevisaoModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => setIsPrevisaoModalOpen(false)}
                className="px-4 py-2 text-sm font-medium bg-purple-500 hover:bg-purple-400 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Calendar size={16} /> Salvar Previsão
              </button>
            </div>
          </div>
        </div>
      )}

      {isBaixaModalOpen && selectedAssociado && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="text-lg font-medium text-zinc-100">Baixa Manual de Parcela</h3>
              <button 
                onClick={() => setIsBaixaModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Associado</label>
                <div className="text-sm text-zinc-200 font-medium">{selectedAssociado.nome}</div>
                <div className="text-xs text-zinc-500 font-mono">{selectedAssociado.matricula}</div>
              </div>
              
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Parcela Referência</label>
                <div className="text-sm text-zinc-200">{selectedAssociado.parcela}</div>
              </div>

              <div>
                <label className="block text-xs text-zinc-500 mb-1">Data do Pagamento</label>
                <input 
                  type="date" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500 transition-colors [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-500 mb-1">Comprovante (Anexo)</label>
                <div className="border-2 border-dashed border-zinc-800 rounded-lg p-4 text-center hover:border-zinc-700 transition-colors cursor-pointer bg-zinc-950/50">
                  <Upload size={20} className="mx-auto text-zinc-500 mb-2" />
                  <p className="text-xs text-zinc-400">Clique para anexar ou arraste o arquivo</p>
                  <p className="text-[10px] text-zinc-600 mt-1">PDF, JPG ou PNG (Max 5MB)</p>
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Observações</label>
                <textarea 
                  rows={2}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  placeholder="Motivo da baixa manual..."
                ></textarea>
              </div>
            </div>
            <div className="p-5 border-t border-zinc-800 flex justify-end gap-3 bg-zinc-950/50">
              <button 
                onClick={() => setIsBaixaModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => setIsBaixaModalOpen(false)}
                className="px-4 py-2 text-sm font-medium bg-cyan-500 hover:bg-cyan-400 text-zinc-950 rounded-lg transition-colors flex items-center gap-2"
              >
                <CheckCircle size={16} /> Confirmar Baixa
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal 
        isOpen={!!agentModal} 
        onClose={() => setAgentModal(null)} 
        title={
          agentModal?.type === 'details' ? 'Detalhes do Agente' : 
          agentModal?.type === 'access' ? 'Editar Acesso' : 
          'Ajustar Comissão'
        }
      >
        {agentModal && (
          <div className="space-y-4">
            <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50 mb-6">
              <div className="text-sm text-zinc-400">Agente Selecionado</div>
              <div className="text-lg font-medium text-zinc-100">{agentModal.data.name}</div>
              <div className="text-sm text-zinc-500">{agentModal.data.email}</div>
            </div>
            
            {agentModal.type === 'details' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-zinc-500 mb-1">Status</div>
                  <div className="text-sm font-medium text-zinc-200">{agentModal.data.status}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 mb-1">Associados Ativos</div>
                  <div className="text-sm font-medium text-zinc-200">{agentModal.data.count}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 mb-1">Comissão Atual</div>
                  <div className="text-sm font-medium text-zinc-200">{agentModal.data.comissao}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 mb-1">Data de Cadastro</div>
                  <div className="text-sm font-medium text-zinc-200">12 Jan 2025</div>
                </div>
              </div>
            )}

            {agentModal.type === 'access' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Perfil de Acesso</label>
                  <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-rose-900/50">
                    <option>Agente</option>
                    <option>Coordenador</option>
                    <option>Administrador</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Status da Conta</label>
                  <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-rose-900/50">
                    <option>Ativo</option>
                    <option>Inativo</option>
                    <option>Bloqueado</option>
                  </select>
                </div>
                <button className="w-full bg-rose-900 hover:bg-rose-800 text-white py-2 rounded-lg text-sm font-medium transition-colors mt-4">Salvar Alterações</button>
              </div>
            )}

            {agentModal.type === 'commission' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Nova Taxa de Comissão (%)</label>
                  <input type="number" defaultValue={parseInt(agentModal.data.comissao)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-rose-900/50" />
                </div>
                <p className="text-xs text-zinc-500">A nova taxa será aplicada apenas para novos contratos e renovações a partir de hoje.</p>
                <button className="w-full bg-rose-900 hover:bg-rose-800 text-white py-2 rounded-lg text-sm font-medium transition-colors mt-4">Atualizar Comissão</button>
              </div>
            )}
          </div>
        )}
      </Modal>

      <Modal 
        isOpen={!!assocModal} 
        onClose={() => setAssocModal(null)} 
        title={assocModal?.type === 'details' ? 'Detalhes do Associado' : 'Editar Cadastro'}
      >
        {assocModal && (
          <div className="space-y-4">
            <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50 mb-6">
              <div className="text-sm text-zinc-400">Associado Selecionado</div>
              <div className="text-lg font-medium text-zinc-100">{assocModal.data.name}</div>
              <div className="text-sm text-zinc-500">{assocModal.data.doc}</div>
            </div>
            
            {assocModal.type === 'details' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-zinc-500 mb-1">Status</div>
                  <div className="text-sm font-medium text-zinc-200">{assocModal.data.status}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 mb-1">Agente Responsável</div>
                  <div className="text-sm font-medium text-zinc-200">{assocModal.data.agent}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-zinc-500 mb-1">Endereço</div>
                  <div className="text-sm font-medium text-zinc-200">Av. Paulista, 1000 - São Paulo, SP</div>
                </div>
              </div>
            )}

            {assocModal.type === 'edit' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Nome Completo / Razão Social</label>
                  <input type="text" defaultValue={assocModal.data.name} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-rose-900/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">CPF / CNPJ</label>
                  <input type="text" defaultValue={assocModal.data.doc} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-rose-900/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Agente Responsável</label>
                  <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-rose-900/50">
                    <option>{assocModal.data.agent}</option>
                    <option>Ana Beatriz</option>
                    <option>João Pedro</option>
                    <option>Lucas Mendes</option>
                  </select>
                </div>
                <button className="w-full bg-rose-900 hover:bg-rose-800 text-white py-2 rounded-lg text-sm font-medium transition-colors mt-4">Salvar Cadastro</button>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Custom Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 4px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: #52525b;
        }
      `}} />
    </div>
  );
}
