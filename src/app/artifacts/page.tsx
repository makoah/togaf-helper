import Link from 'next/link';
import { phases } from '@/data/togaf-adm';

export default function ArtifactsPage() {
  // Collect all artifacts and deliverables from all phases
  const allDeliverables = phases.flatMap(phase =>
    phase.deliverables.map(d => ({
      ...d,
      phaseName: phase.name,
      phaseCode: phase.code,
      phaseId: phase.id,
    }))
  );

  const allArtifacts = phases.flatMap(phase =>
    phase.artifacts.map(a => ({
      ...a,
      phaseName: phase.name,
      phaseCode: phase.code,
      phaseId: phase.id,
    }))
  );

  const catalogs = allArtifacts.filter(a => a.type === 'catalog');
  const matrices = allArtifacts.filter(a => a.type === 'matrix');
  const diagrams = allArtifacts.filter(a => a.type === 'diagram');

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Artifacts & Deliverables
        </h1>
        <p className="text-gray-500 mt-2">
          Complete reference of all TOGAF ADM artifacts and deliverables
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="rounded-2xl bg-[#12121a] border border-white/5 p-6 hover:border-fuchsia-500/30 transition-colors">
          <div className="text-4xl font-bold bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            {allDeliverables.length}
          </div>
          <div className="text-sm text-gray-500 mt-1">Deliverables</div>
        </div>
        <div className="rounded-2xl bg-[#12121a] border border-white/5 p-6 hover:border-violet-500/30 transition-colors">
          <div className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            {catalogs.length}
          </div>
          <div className="text-sm text-gray-500 mt-1">Catalogs</div>
        </div>
        <div className="rounded-2xl bg-[#12121a] border border-white/5 p-6 hover:border-emerald-500/30 transition-colors">
          <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            {matrices.length}
          </div>
          <div className="text-sm text-gray-500 mt-1">Matrices</div>
        </div>
        <div className="rounded-2xl bg-[#12121a] border border-white/5 p-6 hover:border-amber-500/30 transition-colors">
          <div className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            {diagrams.length}
          </div>
          <div className="text-sm text-gray-500 mt-1">Diagrams</div>
        </div>
      </div>

      {/* Deliverables Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Deliverables</h2>
        <div className="rounded-2xl bg-[#12121a] border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Phase</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Deliverable</th>
                  <th className="text-center px-6 py-4 text-sm font-medium text-gray-400">Required</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {allDeliverables.map((d) => (
                  <tr key={d.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/phases/${d.phaseId}`} className="font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                        {d.phaseCode}
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{d.name}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-xs px-2.5 py-1 rounded-lg ${
                        d.required
                          ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30'
                          : 'bg-white/10 text-gray-400 border border-white/10'
                      }`}>
                        {d.required ? 'Required' : 'Optional'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{d.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Catalogs Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">
          <span className="inline-flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-gradient-to-br from-violet-500 to-purple-500"></span>
            Catalogs ({catalogs.length})
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {catalogs.map((a) => (
            <div key={a.id} className="rounded-2xl bg-[#12121a] border border-white/5 p-5 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2.5 py-1 bg-violet-500/20 text-violet-300 rounded-lg border border-violet-500/30">Catalog</span>
                <Link href={`/phases/${a.phaseId}`} className="text-xs text-gray-500 hover:text-violet-400 transition-colors">
                  Phase {a.phaseCode}
                </Link>
              </div>
              <h3 className="font-medium text-white">{a.name}</h3>
              <p className="text-sm text-gray-500 mt-2">{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Matrices Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">
          <span className="inline-flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-gradient-to-br from-emerald-500 to-teal-500"></span>
            Matrices ({matrices.length})
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matrices.map((a) => (
            <div key={a.id} className="rounded-2xl bg-[#12121a] border border-white/5 p-5 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg border border-emerald-500/30">Matrix</span>
                <Link href={`/phases/${a.phaseId}`} className="text-xs text-gray-500 hover:text-emerald-400 transition-colors">
                  Phase {a.phaseCode}
                </Link>
              </div>
              <h3 className="font-medium text-white">{a.name}</h3>
              <p className="text-sm text-gray-500 mt-2">{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Diagrams Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">
          <span className="inline-flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-gradient-to-br from-amber-500 to-orange-500"></span>
            Diagrams ({diagrams.length})
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {diagrams.map((a) => (
            <div key={a.id} className="rounded-2xl bg-[#12121a] border border-white/5 p-5 hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-lg border border-amber-500/30">Diagram</span>
                <Link href={`/phases/${a.phaseId}`} className="text-xs text-gray-500 hover:text-amber-400 transition-colors">
                  Phase {a.phaseCode}
                </Link>
              </div>
              <h3 className="font-medium text-white text-sm">{a.name}</h3>
              <p className="text-xs text-gray-500 mt-2">{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Legend */}
      <div className="rounded-2xl bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 border border-white/10 p-8">
        <h3 className="font-semibold text-white mb-6">Understanding Artifact Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <span className="font-medium text-white">Catalogs</span>
            </div>
            <p className="text-sm text-gray-400">
              Lists of building blocks of a specific type. Used to capture inventories of core items.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18M10 3v18M14 3v18" />
                </svg>
              </div>
              <span className="font-medium text-white">Matrices</span>
            </div>
            <p className="text-sm text-gray-400">
              Show relationships between building blocks. Useful for gap analysis and traceability.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-medium text-white">Diagrams</span>
            </div>
            <p className="text-sm text-gray-400">
              Visual representations of architecture content. Support communication and analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
