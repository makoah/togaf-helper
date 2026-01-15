import Link from 'next/link';
import { notFound } from 'next/navigation';
import { phases, getPhaseById, getPhaseNavigation } from '@/data/togaf-adm';

interface PageProps {
  params: Promise<{ id: string }>;
}

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

  return (
    <div className="max-w-5xl">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-slate-500">
          <li><Link href="/" className="hover:text-blue-600">Dashboard</Link></li>
          <li>/</li>
          <li><Link href="/phases" className="hover:text-blue-600">Phases</Link></li>
          <li>/</li>
          <li className="text-slate-900">{phase.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-8 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
            {phase.code}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{phase.fullName}</h1>
            <p className="text-blue-100">{phase.name}</p>
          </div>
        </div>
        <p className="text-blue-100 text-lg">{phase.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Objectives */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Objectives</h2>
            <ul className="space-y-3">
              {phase.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-slate-700">{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Steps */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Steps</h2>
            <div className="space-y-4">
              {phase.steps.map((step, i) => (
                <div key={step.id} className="border-l-4 border-blue-200 pl-4 py-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-medium text-blue-600">Step {i + 1}</span>
                    <h3 className="font-medium text-slate-900">{step.name}</h3>
                  </div>
                  <p className="text-slate-600 mt-1">{step.description}</p>
                  {step.tips && step.tips.length > 0 && (
                    <div className="mt-2 bg-amber-50 rounded p-2">
                      <ul className="text-sm text-amber-700">
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
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Artifacts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phase.artifacts.map((artifact) => (
                  <div
                    key={artifact.id}
                    className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        artifact.type === 'catalog'
                          ? 'bg-purple-100 text-purple-700'
                          : artifact.type === 'matrix'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {artifact.type}
                      </span>
                    </div>
                    <h3 className="font-medium text-slate-900">{artifact.name}</h3>
                    <p className="text-sm text-slate-600 mt-1">{artifact.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Inputs & Outputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Inputs</h2>
              <ul className="space-y-2">
                {phase.inputs.map((input, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-emerald-500">→</span>
                    {input}
                  </li>
                ))}
              </ul>
            </section>
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Outputs</h2>
              <ul className="space-y-2">
                {phase.outputs.map((output, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-blue-500">←</span>
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
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Deliverables</h2>
            <ul className="space-y-3">
              {phase.deliverables.map((d) => (
                <li key={d.id} className="pb-3 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      d.required
                        ? 'bg-red-100 text-red-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {d.required ? 'Required' : 'Optional'}
                    </span>
                  </div>
                  <h3 className="font-medium text-slate-900 text-sm">{d.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{d.description}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Key Questions */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Key Questions</h2>
            <ul className="space-y-3">
              {phase.keyQuestions.map((q, i) => (
                <li key={i} className="text-sm text-slate-600 pb-3 border-b border-slate-100 last:border-0">
                  ❓ {q}
                </li>
              ))}
            </ul>
          </section>

          {/* Stakeholder Focus */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Stakeholder Focus</h2>
            <div className="flex flex-wrap gap-2">
              {phase.stakeholderFocus.map((s, i) => (
                <span
                  key={i}
                  className="text-sm px-3 py-1 bg-slate-100 text-slate-700 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* Tips */}
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-amber-900 mb-4">Tips</h2>
            <ul className="space-y-3">
              {phase.tips.map((tip, i) => (
                <li key={i} className="text-sm text-amber-800">
                  💡 {tip}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-8 border-t border-slate-200">
        {prev ? (
          <Link
            href={`/phases/${prev.id}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            <span>←</span>
            <div className="text-left">
              <div className="text-xs text-slate-500">Previous</div>
              <div className="font-medium">{prev.name}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/phases/${next.id}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            <div className="text-right">
              <div className="text-xs text-blue-200">Next</div>
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
