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
        <h1 className="text-3xl font-bold text-white">
          Artifacts & Deliverables
        </h1>
        <p className="text-gray-400 mt-2">
          Complete reference of all TOGAF ADM artifacts and deliverables
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="rounded-2xl bg-[#0F172A] border border-gray-800 p-6 hover:border-[#D4AF37]/30 transition-colors">
          <div className="text-4xl font-bold text-[#D4AF37]">
            {allDeliverables.length}
          </div>
          <div className="text-sm text-gray-500 mt-1">Deliverables</div>
        </div>
        <div className="rounded-2xl bg-[#0F172A] border border-gray-800 p-6 hover:border-[#00BCD4]/30 transition-colors">
          <div className="text-4xl font-bold text-[#00BCD4]">
            {catalogs.length}
          </div>
          <div className="text-sm text-gray-500 mt-1">Catalogs</div>
        </div>
        <div className="rounded-2xl bg-[#0F172A] border border-gray-800 p-6 hover:border-[#10B981]/30 transition-colors">
          <div className="text-4xl font-bold text-[#10B981]">
            {matrices.length}
          </div>
          <div className="text-sm text-gray-500 mt-1">Matrices</div>
        </div>
        <div className="rounded-2xl bg-[#0F172A] border border-gray-800 p-6 hover:border-[#007BFF]/30 transition-colors">
          <div className="text-4xl font-bold text-[#007BFF]">
            {diagrams.length}
          </div>
          <div className="text-sm text-gray-500 mt-1">Diagrams</div>
        </div>
      </div>

      {/* Deliverables Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Deliverables</h2>
        <div className="rounded-2xl bg-[#0F172A] border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1A2B48]/50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Phase</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Deliverable</th>
                  <th className="text-center px-6 py-4 text-sm font-medium text-gray-400">Required</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {allDeliverables.map((d) => (
                  <tr key={d.id} className="hover:bg-[#1A2B48]/30 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/phases/${d.phaseId}`} className="font-bold text-[#00BCD4] hover:text-[#00BCD4]/80 transition-opacity">
                        {d.phaseCode}
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{d.name}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-xs px-2.5 py-1 rounded-lg ${
                        d.required
                          ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30'
                          : 'bg-gray-700/50 text-gray-400 border border-gray-600'
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
            <span className="w-3 h-3 rounded bg-[#00BCD4]"></span>
            Catalogs ({catalogs.length})
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {catalogs.map((a) => (
            <div key={a.id} className="rounded-2xl bg-[#0F172A] border border-gray-800 p-5 hover:border-[#00BCD4]/30 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2.5 py-1 bg-[#00BCD4]/20 text-[#00BCD4] rounded-lg border border-[#00BCD4]/30">Catalog</span>
                <Link href={`/phases/${a.phaseId}`} className="text-xs text-gray-500 hover:text-[#00BCD4] transition-colors">
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
            <span className="w-3 h-3 rounded bg-[#10B981]"></span>
            Matrices ({matrices.length})
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matrices.map((a) => (
            <div key={a.id} className="rounded-2xl bg-[#0F172A] border border-gray-800 p-5 hover:border-[#10B981]/30 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2.5 py-1 bg-[#10B981]/20 text-[#10B981] rounded-lg border border-[#10B981]/30">Matrix</span>
                <Link href={`/phases/${a.phaseId}`} className="text-xs text-gray-500 hover:text-[#10B981] transition-colors">
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
            <span className="w-3 h-3 rounded bg-[#007BFF]"></span>
            Diagrams ({diagrams.length})
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {diagrams.map((a) => (
            <div key={a.id} className="rounded-2xl bg-[#0F172A] border border-gray-800 p-5 hover:border-[#007BFF]/30 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2.5 py-1 bg-[#007BFF]/20 text-[#007BFF] rounded-lg border border-[#007BFF]/30">Diagram</span>
                <Link href={`/phases/${a.phaseId}`} className="text-xs text-gray-500 hover:text-[#007BFF] transition-colors">
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
      <div className="rounded-2xl bg-gradient-to-br from-[#1A2B48]/50 to-[#0F172A] border border-gray-800 p-8">
        <h3 className="font-semibold text-white mb-6">Understanding Artifact Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#00BCD4] flex items-center justify-center">
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
              <div className="w-10 h-10 rounded-xl bg-[#10B981] flex items-center justify-center">
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
              <div className="w-10 h-10 rounded-xl bg-[#007BFF] flex items-center justify-center">
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
