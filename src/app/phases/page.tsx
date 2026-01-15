import Link from 'next/link';
import { phases } from '@/data/togaf-adm';

const phaseColors = [
  'from-violet-500 to-purple-600',
  'from-purple-500 to-fuchsia-600',
  'from-fuchsia-500 to-pink-600',
  'from-pink-500 to-rose-600',
  'from-rose-500 to-red-600',
  'from-orange-500 to-amber-600',
  'from-amber-500 to-yellow-600',
  'from-lime-500 to-green-600',
  'from-green-500 to-emerald-600',
  'from-cyan-500 to-teal-600',
  'from-teal-500 to-cyan-600',
];

export default function PhasesOverview() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          ADM Phases
        </h1>
        <p className="text-gray-500 mt-2">
          Complete reference for all Architecture Development Method phases
        </p>
      </div>

      {/* Visual ADM Cycle */}
      <div className="rounded-2xl bg-[#12121a] border border-white/5 p-8 mb-8">
        <h2 className="text-xl font-semibold text-white mb-6 text-center">The ADM Cycle</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {phases.slice(0, -1).map((phase, index) => (
            <div key={phase.id} className="flex items-center">
              <Link
                href={`/phases/${phase.id}`}
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${phaseColors[index % phaseColors.length]} flex items-center justify-center text-white font-bold text-lg shadow-lg hover:scale-110 transition-transform`}
              >
                {phase.code}
              </Link>
              {index < phases.length - 2 && (
                <span className="mx-2 text-gray-600">→</span>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            href={`/phases/requirements-management`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
          >
            RM - Requirements Management (Central)
          </Link>
        </div>
      </div>

      {/* Phase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {phases.map((phase, index) => (
          <Link
            key={phase.id}
            href={`/phases/${phase.id}`}
            className="group rounded-2xl bg-[#12121a] border border-white/5 p-6 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${phaseColors[index % phaseColors.length]} flex items-center justify-center text-xl font-bold text-white flex-shrink-0 shadow-lg`}>
                {phase.code}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-white group-hover:text-violet-300 transition-colors">
                  {phase.fullName}
                </h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {phase.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs px-2 py-1 bg-violet-500/20 text-violet-300 rounded-lg border border-violet-500/30">
                    {phase.steps.length} steps
                  </span>
                  <span className="text-xs px-2 py-1 bg-fuchsia-500/20 text-fuchsia-300 rounded-lg border border-fuchsia-500/30">
                    {phase.deliverables.length} deliverables
                  </span>
                  <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-500/30">
                    {phase.artifacts.length} artifacts
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Summary Table */}
      <div className="rounded-2xl bg-[#12121a] border border-white/5 overflow-hidden">
        <h2 className="text-xl font-semibold text-white p-6 border-b border-white/5">
          Phase Summary
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Phase</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Name</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-400">Steps</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-400">Deliverables</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-400">Artifacts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {phases.map((phase, index) => (
                <tr key={phase.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/phases/${phase.id}`} className={`font-bold bg-gradient-to-r ${phaseColors[index % phaseColors.length]} bg-clip-text text-transparent hover:opacity-80`}>
                      {phase.code}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{phase.name}</td>
                  <td className="px-6 py-4 text-center text-gray-400">{phase.steps.length}</td>
                  <td className="px-6 py-4 text-center text-gray-400">{phase.deliverables.length}</td>
                  <td className="px-6 py-4 text-center text-gray-400">{phase.artifacts.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
