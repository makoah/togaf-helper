import Link from 'next/link';
import { notFound } from 'next/navigation';
import { phases, getPhaseById, getPhaseNavigation } from '@/data/togaf-adm';

interface PageProps {
  params: Promise<{ id: string }>;
}

const phaseColorMap: Record<string, string> = {
  'preliminary': 'from-violet-500 to-purple-600',
  'phase-a': 'from-purple-500 to-fuchsia-600',
  'phase-b': 'from-fuchsia-500 to-pink-600',
  'phase-c-is': 'from-pink-500 to-rose-600',
  'phase-c-app': 'from-rose-500 to-red-600',
  'phase-d': 'from-orange-500 to-amber-600',
  'phase-e': 'from-amber-500 to-yellow-600',
  'phase-f': 'from-lime-500 to-green-600',
  'phase-g': 'from-green-500 to-emerald-600',
  'phase-h': 'from-cyan-500 to-teal-600',
  'requirements-management': 'from-teal-500 to-cyan-600',
};

export async function generateStaticParams() {
  return phases.map((phase) => ({
    id: phase.id,
  }));
}

export default async function PhasePage({ params }: PageProps) {
  const { id } = await params;
  const phase = getPhaseById(id);

  if (!phase) {
    notFound();
  }

  const { prev, next } = getPhaseNavigation(id);
  const colorClass = phaseColorMap[id] || 'from-violet-500 to-purple-600';

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><Link href="/" className="hover:text-violet-400 transition-colors">Dashboard</Link></li>
          <li className="text-gray-600">/</li>
          <li><Link href="/phases" className="hover:text-violet-400 transition-colors">Phases</Link></li>
          <li className="text-gray-600">/</li>
          <li className="text-white">{phase.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className={`bg-gradient-to-r ${colorClass} rounded-2xl p-8 mb-8 shadow-xl`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold">
            {phase.code}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{phase.fullName}</h1>
            <p className="text-white/70">{phase.name}</p>
          </div>
        </div>
        <p className="text-white/80 text-lg leading-relaxed">{phase.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Objectives */}
          <section className="rounded-2xl bg-[#12121a] border border-white/5 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Objectives</h2>
            <ul className="space-y-3">
              {phase.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center text-sm font-medium flex-shrink-0`}>
                    {i + 1}
                  </div>
                  <span className="text-gray-400">{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Steps */}
          <section className="rounded-2xl bg-[#12121a] border border-white/5 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Steps</h2>
            <div className="space-y-4">
              {phase.steps.map((step, i) => (
                <div key={step.id} className="border-l-2 border-violet-500/30 pl-4 py-2">
                  <div className="flex items-baseline gap-3">
                    <span className={`text-sm font-medium bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}>Step {i + 1}</span>
                    <h3 className="font-medium text-white">{step.name}</h3>
                  </div>
                  <p className="text-gray-500 mt-1">{step.description}</p>
                  {step.tips && step.tips.length > 0 && (
                    <div className="mt-2 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
                      <ul className="text-sm text-amber-200/80">
                        {step.tips.map((tip, j) => (
                          <li key={j}>💡 {tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Artifacts */}
          {phase.artifacts.length > 0 && (
            <section className="rounded-2xl bg-[#12121a] border border-white/5 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Artifacts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phase.artifacts.map((artifact) => (
                  <div
                    key={artifact.id}
                    className="border border-white/5 rounded-xl p-4 hover:border-violet-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-lg ${
                        artifact.type === 'catalog'
                          ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                          : artifact.type === 'matrix'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {artifact.type}
                      </span>
                    </div>
                    <h3 className="font-medium text-white">{artifact.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{artifact.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Inputs & Outputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="rounded-2xl bg-[#12121a] border border-white/5 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Inputs</h2>
              <ul className="space-y-2">
                {phase.inputs.map((input, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="text-emerald-400">→</span>
                    {input}
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-2xl bg-[#12121a] border border-white/5 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Outputs</h2>
              <ul className="space-y-2">
                {phase.outputs.map((output, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="text-violet-400">←</span>
                    {output}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Deliverables */}
          <section className="rounded-2xl bg-[#12121a] border border-white/5 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Deliverables</h2>
            <ul className="space-y-3">
              {phase.deliverables.map((d) => (
                <li key={d.id} className="pb-3 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-lg ${
                      d.required
                        ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30'
                        : 'bg-white/5 text-gray-500 border border-white/10'
                    }`}>
                      {d.required ? 'Required' : 'Optional'}
                    </span>
                  </div>
                  <h3 className="font-medium text-white text-sm">{d.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{d.description}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Key Questions */}
          <section className="rounded-2xl bg-[#12121a] border border-white/5 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Key Questions</h2>
            <ul className="space-y-3">
              {phase.keyQuestions.map((q, i) => (
                <li key={i} className="text-sm text-gray-400 pb-3 border-b border-white/5 last:border-0">
                  ❓ {q}
                </li>
              ))}
            </ul>
          </section>

          {/* Stakeholder Focus */}
          <section className="rounded-2xl bg-[#12121a] border border-white/5 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Stakeholder Focus</h2>
            <div className="flex flex-wrap gap-2">
              {phase.stakeholderFocus.map((s, i) => (
                <span
                  key={i}
                  className="text-sm px-3 py-1 bg-white/5 text-gray-300 rounded-lg border border-white/10"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* Tips */}
          <section className="rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-6">
            <h2 className="text-lg font-semibold text-amber-400 mb-4">Tips</h2>
            <ul className="space-y-3">
              {phase.tips.map((tip, i) => (
                <li key={i} className="text-sm text-amber-200/80">
                  💡 {tip}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-8 border-t border-white/5">
        {prev ? (
          <Link
            href={`/phases/${prev.id}`}
            className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition-all"
          >
            <span>←</span>
            <div className="text-left">
              <div className="text-xs text-gray-500">Previous</div>
              <div className="font-medium">{prev.name}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/phases/${next.id}`}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r ${colorClass} text-white hover:shadow-lg transition-all`}
          >
            <div className="text-right">
              <div className="text-xs text-white/70">Next</div>
              <div className="font-medium">{next.name}</div>
            </div>
            <span>→</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
