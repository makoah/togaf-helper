import Link from 'next/link';
import { phases } from '@/data/togaf-adm';
import ADMWheel from '@/components/ADMWheel';

export default function Dashboard() {
  return (
    <div className="max-w-7xl">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 mb-8 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="lg:max-w-md">
            <h1 className="text-4xl font-bold mb-3">
              TOGAF<span className="text-blue-400">®</span> ADM Helper
            </h1>
            <p className="text-slate-300 text-lg mb-6">
              Your interactive guide through the Architecture Development Method.
              Study, practice, and apply TOGAF with confidence.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/wizard"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Start Wizard
              </Link>
              <Link
                href="/phases"
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors"
              >
                Browse Phases
              </Link>
            </div>
          </div>
          <div className="flex gap-6 text-center">
            <div className="bg-slate-800/50 rounded-xl p-4 min-w-[100px]">
              <div className="text-3xl font-bold text-blue-400">{phases.length}</div>
              <div className="text-sm text-slate-400">Phases</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 min-w-[100px]">
              <div className="text-3xl font-bold text-purple-400">
                {phases.reduce((acc, p) => acc + p.deliverables.length, 0)}
              </div>
              <div className="text-sm text-slate-400">Deliverables</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 min-w-[100px]">
              <div className="text-3xl font-bold text-emerald-400">
                {phases.reduce((acc, p) => acc + p.artifacts.length, 0)}
              </div>
              <div className="text-sm text-slate-400">Artifacts</div>
            </div>
          </div>
        </div>
      </div>

      {/* ADM Wheel Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">The ADM Cycle</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            The Architecture Development Method (ADM) provides a tested and repeatable process
            for developing architectures. Click on any phase to explore its details.
          </p>
        </div>
        <ADMWheel />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          href="/wizard"
          className="group bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Step-by-Step Wizard</h3>
              <p className="text-blue-100 text-sm">
                Guided walkthrough of all ADM phases
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/stakeholders"
          className="group bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Stakeholder Registry</h3>
              <p className="text-emerald-100 text-sm">
                Manage stakeholders & concerns
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/artifacts"
          className="group bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Artifacts & Deliverables</h3>
              <p className="text-purple-100 text-sm">
                Complete artifact reference
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Phase Quick Reference */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Phase Quick Reference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {phases.map((phase, index) => (
            <Link
              key={phase.id}
              href={`/phases/${phase.id}`}
              className="group flex items-start gap-3 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-blue-100 group-hover:to-blue-200 flex items-center justify-center font-bold text-slate-600 group-hover:text-blue-700 flex-shrink-0 transition-colors">
                {phase.code}
              </div>
              <div className="min-w-0">
                <h3 className="font-medium text-slate-900 group-hover:text-blue-900 transition-colors truncate">
                  {phase.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {phase.objectives[0]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-slate-400">
        <p>TOGAF® is a registered trademark of The Open Group.</p>
      </div>
    </div>
  );
}
