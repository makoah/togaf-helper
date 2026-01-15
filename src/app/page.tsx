import Link from 'next/link';
import { phases } from '@/data/togaf-adm';
import ADMWheel from '@/components/ADMWheel';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1A2B48] to-[#2D4A6F] rounded-2xl p-10 mb-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          <div className="lg:max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span className="text-xs font-medium text-[#D4AF37]">Interactive Learning Platform</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              <span className="text-white">Master </span>
              <span className="text-[#00BCD4]">TOGAF ADM</span>
            </h1>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Your interactive guide through the Architecture Development Method.
              Study, practice, and apply TOGAF with confidence.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/wizard"
                className="px-6 py-3 bg-[#00BCD4] text-white rounded-lg font-semibold transition-all duration-200 hover:bg-[#00ACC1] hover:shadow-lg hover:shadow-[#00BCD4]/30 inline-flex items-center gap-2"
              >
                Start Learning
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/phases"
                className="px-6 py-3 bg-white/10 text-white rounded-lg font-semibold border border-white/20 transition-all duration-200 hover:bg-white/20"
              >
                Browse Phases
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 min-w-[100px]">
              <div className="text-3xl font-bold text-[#00BCD4]">{phases.length}</div>
              <div className="text-xs text-gray-400 mt-1">ADM Phases</div>
            </div>
            <div className="text-center p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 min-w-[100px]">
              <div className="text-3xl font-bold text-[#D4AF37]">
                {phases.reduce((acc, p) => acc + p.deliverables.length, 0)}
              </div>
              <div className="text-xs text-gray-400 mt-1">Deliverables</div>
            </div>
            <div className="text-center p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 min-w-[100px]">
              <div className="text-3xl font-bold text-[#007BFF]">
                {phases.reduce((acc, p) => acc + p.artifacts.length, 0)}
              </div>
              <div className="text-xs text-gray-400 mt-1">Artifacts</div>
            </div>
          </div>
        </div>
      </div>

      {/* ADM Wheel Section */}
      <div className="bg-[#0F172A] rounded-2xl p-8 mb-8 border border-gray-800">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">The ADM Cycle</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The Architecture Development Method provides a tested and repeatable process
            for developing architectures. Hover over any phase to explore.
          </p>
        </div>
        <ADMWheel />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          href="/wizard"
          className="group rounded-xl p-6 bg-[#0F172A] border border-gray-800 hover:border-[#00BCD4]/50 transition-all duration-200"
        >
          <div className="w-12 h-12 rounded-lg bg-[#00BCD4]/10 flex items-center justify-center mb-4 group-hover:bg-[#00BCD4]/20 transition-colors">
            <svg className="w-6 h-6 text-[#00BCD4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Step-by-Step Wizard</h3>
          <p className="text-gray-400 text-sm">
            Guided walkthrough of all ADM phases with interactive progress tracking.
          </p>
        </Link>

        <Link
          href="/stakeholders"
          className="group rounded-xl p-6 bg-[#0F172A] border border-gray-800 hover:border-[#D4AF37]/50 transition-all duration-200"
        >
          <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
            <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Stakeholder Registry</h3>
          <p className="text-gray-400 text-sm">
            Manage stakeholders, concerns, and engagement with influence matrix.
          </p>
        </Link>

        <Link
          href="/artifacts"
          className="group rounded-xl p-6 bg-[#0F172A] border border-gray-800 hover:border-[#007BFF]/50 transition-all duration-200"
        >
          <div className="w-12 h-12 rounded-lg bg-[#007BFF]/10 flex items-center justify-center mb-4 group-hover:bg-[#007BFF]/20 transition-colors">
            <svg className="w-6 h-6 text-[#007BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Artifacts & Deliverables</h3>
          <p className="text-gray-400 text-sm">
            Complete reference of catalogs, matrices, and diagrams for each phase.
          </p>
        </Link>
      </div>

      {/* Phase Quick Reference */}
      <div className="bg-[#0F172A] rounded-2xl p-8 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-6">Phase Quick Reference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {phases.map((phase) => (
            <Link
              key={phase.id}
              href={`/phases/${phase.id}`}
              className="group flex items-start gap-4 p-4 rounded-lg border border-gray-800 hover:border-[#00BCD4]/40 hover:bg-[#00BCD4]/5 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1A2B48] flex items-center justify-center font-bold text-[#00BCD4] flex-shrink-0 text-sm">
                {phase.code}
              </div>
              <div className="min-w-0">
                <h3 className="font-medium text-white group-hover:text-[#00BCD4] transition-colors text-sm">
                  {phase.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {phase.objectives[0]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-600">
          TOGAF® is a registered trademark of The Open Group.
        </p>
      </div>
    </div>
  );
}
