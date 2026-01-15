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
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Artifacts & Deliverables</h1>
        <p className="text-slate-600 mt-2">
          Complete reference of all TOGAF ADM artifacts and deliverables
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-3xl font-bold text-blue-600">{allDeliverables.length}</div>
          <div className="text-sm text-slate-600">Deliverables</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-3xl font-bold text-purple-600">{catalogs.length}</div>
          <div className="text-sm text-slate-600">Catalogs</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-3xl font-bold text-emerald-600">{matrices.length}</div>
          <div className="text-sm text-slate-600">Matrices</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-3xl font-bold text-amber-600">{diagrams.length}</div>
          <div className="text-sm text-slate-600">Diagrams</div>
        </div>
      </div>

      {/* Deliverables Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Deliverables</h2>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-700">Phase</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-700">Deliverable</th>
                  <th className="text-center px-6 py-3 text-sm font-medium text-slate-700">Required</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-slate-700">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {allDeliverables.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <Link href={`/phases/${d.phaseId}`} className="text-blue-600 hover:text-blue-800 font-medium">
                        {d.phaseCode}
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">{d.name}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-xs px-2 py-1 rounded ${
                        d.required ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {d.required ? 'Required' : 'Optional'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{d.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Catalogs Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          <span className="inline-flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-purple-500"></span>
            Catalogs ({catalogs.length})
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {catalogs.map((a) => (
            <div key={a.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:border-purple-300 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded">Catalog</span>
                <Link href={`/phases/${a.phaseId}`} className="text-xs text-slate-500 hover:text-blue-600">
                  Phase {a.phaseCode}
                </Link>
              </div>
              <h3 className="font-medium text-slate-900">{a.name}</h3>
              <p className="text-sm text-slate-600 mt-1">{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Matrices Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          <span className="inline-flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-emerald-500"></span>
            Matrices ({matrices.length})
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matrices.map((a) => (
            <div key={a.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:border-emerald-300 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded">Matrix</span>
                <Link href={`/phases/${a.phaseId}`} className="text-xs text-slate-500 hover:text-blue-600">
                  Phase {a.phaseCode}
                </Link>
              </div>
              <h3 className="font-medium text-slate-900">{a.name}</h3>
              <p className="text-sm text-slate-600 mt-1">{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Diagrams Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          <span className="inline-flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-amber-500"></span>
            Diagrams ({diagrams.length})
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {diagrams.map((a) => (
            <div key={a.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:border-amber-300 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded">Diagram</span>
                <Link href={`/phases/${a.phaseId}`} className="text-xs text-slate-500 hover:text-blue-600">
                  Phase {a.phaseCode}
                </Link>
              </div>
              <h3 className="font-medium text-slate-900 text-sm">{a.name}</h3>
              <p className="text-xs text-slate-600 mt-1">{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Legend */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Understanding Artifact Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded bg-purple-500"></span>
              <span className="font-medium text-slate-900">Catalogs</span>
            </div>
            <p className="text-sm text-slate-600">
              Lists of building blocks of a specific type. Used to capture inventories of core items.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded bg-emerald-500"></span>
              <span className="font-medium text-slate-900">Matrices</span>
            </div>
            <p className="text-sm text-slate-600">
              Show relationships between building blocks. Useful for gap analysis and traceability.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded bg-amber-500"></span>
              <span className="font-medium text-slate-900">Diagrams</span>
            </div>
            <p className="text-sm text-slate-600">
              Visual representations of architecture content. Support communication and analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
