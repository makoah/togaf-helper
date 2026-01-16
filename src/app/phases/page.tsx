import Link from 'next/link';
import { phases } from '@/data/togaf-adm';

// Brand-consistent phase colors based on ADM wheel
const phaseColors: Record<string, string> = {
  'preliminary': 'bg-[#1A2B48]',
  'phase-a': 'bg-[#1E3A5F]',
  'phase-b': 'bg-[#2563EB]',
  'phase-c-is': 'bg-[#3B82F6]',
  'phase-c-app': 'bg-[#0EA5E9]',
  'phase-d': 'bg-[#00BCD4]',
  'phase-e': 'bg-[#14B8A6]',
  'phase-f': 'bg-[#10B981]',
  'phase-g': 'bg-[#D4AF37]',
  'phase-h': 'bg-[#F59E0B]',
  'requirements-management': 'bg-[#00BCD4]',
};

const phaseTextColors: Record<string, string> = {
  'phase-g': 'text-[#1A2B48]',
  'phase-h': 'text-[#1A2B48]',
};

export default function PhasesOverview() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          ADM Phases
        </h1>
        <p className="text-gray-400 mt-2">
          Complete reference for all Architecture Development Method phases
        </p>
      </div>

      {/* Visual ADM Cycle */}
      <div className="rounded-2xl bg-[#0F172A] border border-gray-800 p-8 mb-8">
        <h2 className="text-xl font-semibold text-white mb-6 text-center">The ADM Cycle</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {phases.slice(0, -1).map((phase) => (
            <div key={phase.id} className="flex items-center">
              <Link
                href={`/phases/${phase.id}`}
                className={`w-16 h-16 rounded-2xl ${phaseColors[phase.id] || 'bg-[#1A2B48]'} ${phaseTextColors[phase.id] || 'text-white'} flex items-center justify-center font-bold text-lg shadow-lg hover:scale-110 transition-transform`}
              >
                {phase.code}
              </Link>
              {phases.indexOf(phase) < phases.length - 2 && (
                <span className="mx-2 text-gray-600">→</span>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            href={`/phases/requirements-management`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00BCD4] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#00BCD4]/30 transition-all"
          >
            RM - Requirements Management (Central)
          </Link>
        </div>
      </div>

      {/* Phase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {phases.map((phase) => (
          <Link
            key={phase.id}
            href={`/phases/${phase.id}`}
            className="group rounded-2xl bg-[#0F172A] border border-gray-800 p-6 hover:border-[#00BCD4]/30 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl ${phaseColors[phase.id] || 'bg-[#1A2B48]'} ${phaseTextColors[phase.id] || 'text-white'} flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-lg`}>
                {phase.code}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-white group-hover:text-[#00BCD4] transition-colors">
                  {phase.fullName}
                </h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {phase.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs px-2 py-1 bg-[#00BCD4]/20 text-[#00BCD4] rounded-lg border border-[#00BCD4]/30">
                    {phase.steps.length} steps
                  </span>
                  <span className="text-xs px-2 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg border border-[#D4AF37]/30">
                    {phase.deliverables.length} deliverables
                  </span>
                  <span className="text-xs px-2 py-1 bg-[#007BFF]/20 text-[#007BFF] rounded-lg border border-[#007BFF]/30">
                    {phase.artifacts.length} artifacts
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Summary Table */}
      <div className="rounded-2xl bg-[#0F172A] border border-gray-800 overflow-hidden">
        <h2 className="text-xl font-semibold text-white p-6 border-b border-gray-800">
          Phase Summary
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1A2B48]/50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Phase</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Name</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-400">Steps</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-400">Deliverables</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-400">Artifacts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {phases.map((phase) => (
                <tr key={phase.id} className="hover:bg-[#1A2B48]/30 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/phases/${phase.id}`} className="font-bold text-[#00BCD4] hover:text-[#00BCD4]/80">
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
