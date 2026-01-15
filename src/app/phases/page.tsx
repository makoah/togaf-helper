import Link from 'next/link';
import { phases } from '@/data/togaf-adm';

export default function PhasesOverview() {
  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">ADM Phases</h1>
        <p className="text-slate-600 mt-2">
          Complete reference for all Architecture Development Method phases
        </p>
      </div>

      {/* Visual ADM Cycle */}
      <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-6 text-center">The ADM Cycle</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {phases.slice(0, -1).map((phase, index) => (
            <div key={phase.id} className="flex items-center">
              <Link
                href={`/phases/${phase.id}`}
                className="w-16 h-16 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-lg transition-colors"
              >
                {phase.code}
              </Link>
              {index < phases.length - 2 && (
                <span className="mx-2 text-slate-400">→</span>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            href={`/phases/requirements-management`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full font-medium hover:bg-amber-200 transition-colors"
          >
            RM - Requirements Management (Central)
          </Link>
        </div>
      </div>

      {/* Phase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {phases.map((phase) => (
          <Link
            key={phase.id}
            href={`/phases/${phase.id}`}
            className="group bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0 ${
                phase.code === 'RM'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white'
              } transition-colors`}>
                {phase.code}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {phase.fullName}
                </h2>
                <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                  {phase.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">
                    {phase.steps.length} steps
                  </span>
                  <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">
                    {phase.deliverables.length} deliverables
                  </span>
                  <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">
                    {phase.artifacts.length} artifacts
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Summary Table */}
      <div className="mt-8 bg-white rounded-xl border border-slate-200 overflow-hidden">
        <h2 className="text-xl font-semibold text-slate-900 p-6 border-b border-slate-200">
          Phase Summary
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-700">Phase</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-700">Name</th>
                <th className="text-center px-6 py-3 text-sm font-medium text-slate-700">Steps</th>
                <th className="text-center px-6 py-3 text-sm font-medium text-slate-700">Deliverables</th>
                <th className="text-center px-6 py-3 text-sm font-medium text-slate-700">Artifacts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {phases.map((phase) => (
                <tr key={phase.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <Link href={`/phases/${phase.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                      {phase.code}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{phase.name}</td>
                  <td className="px-6 py-4 text-center text-slate-600">{phase.steps.length}</td>
                  <td className="px-6 py-4 text-center text-slate-600">{phase.deliverables.length}</td>
                  <td className="px-6 py-4 text-center text-slate-600">{phase.artifacts.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
