export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[#231f20] tracking-tight">Tableau de Bord</h1>
        <p className="text-slate-500">Bienvenue dans le centre de contrôle d'Axenium.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Utilisateurs Totaux</p>
          <p className="text-3xl font-bold text-slate-900">0</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">En attente de validation</p>
          <p className="text-3xl font-bold text-[#ee0c5d]">0</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Revenus Mensuels</p>
          <p className="text-3xl font-bold text-slate-900">0 FCFA</p>
        </div>
      </div>
    </div>
  );
}
