'use client';

import { useState } from 'react';
import Link from 'next/link';
import { phases } from '@/data/togaf-adm';

const phaseColors = [
  { bg: 'from-violet-500 to-purple-600', glow: 'shadow-violet-500/30' },
  { bg: 'from-purple-500 to-fuchsia-600', glow: 'shadow-purple-500/30' },
  { bg: 'from-fuchsia-500 to-pink-600', glow: 'shadow-fuchsia-500/30' },
  { bg: 'from-pink-500 to-rose-600', glow: 'shadow-pink-500/30' },
  { bg: 'from-rose-500 to-red-600', glow: 'shadow-rose-500/30' },
  { bg: 'from-orange-500 to-amber-600', glow: 'shadow-orange-500/30' },
  { bg: 'from-amber-500 to-yellow-600', glow: 'shadow-amber-500/30' },
  { bg: 'from-lime-500 to-green-600', glow: 'shadow-lime-500/30' },
  { bg: 'from-green-500 to-emerald-600', glow: 'shadow-green-500/30' },
  { bg: 'from-cyan-500 to-teal-600', glow: 'shadow-cyan-500/30' },
  { bg: 'from-teal-500 to-cyan-600', glow: 'shadow-teal-500/30' },
];

export default function Wizard() {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const currentPhase = phases[currentPhaseIndex];
  const currentStep = currentPhase.steps[currentStepIndex];
  const currentColor = phaseColors[currentPhaseIndex % phaseColors.length];

  const toggleStepComplete = (stepId: string) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const nextStep = () => {
    if (currentStepIndex < currentPhase.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else if (currentPhaseIndex < phases.length - 1) {
      setCurrentPhaseIndex(currentPhaseIndex + 1);
      setCurrentStepIndex(0);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    } else if (currentPhaseIndex > 0) {
      setCurrentPhaseIndex(currentPhaseIndex - 1);
      setCurrentStepIndex(phases[currentPhaseIndex - 1].steps.length - 1);
    }
  };

  const goToPhase = (index: number) => {
    setCurrentPhaseIndex(index);
    setCurrentStepIndex(0);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          ADM Wizard
        </h1>
        <p className="text-gray-500 mt-2">
          Step-by-step guidance through the Architecture Development Method
        </p>
      </div>

      {/* Phase Progress */}
      <div className="rounded-2xl bg-[#12121a] border border-white/5 p-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {phases.map((phase, index) => (
            <button
              key={phase.id}
              onClick={() => goToPhase(index)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                index === currentPhaseIndex
                  ? `bg-gradient-to-r ${phaseColors[index % phaseColors.length].bg} text-white shadow-lg ${phaseColors[index % phaseColors.length].glow}`
                  : index < currentPhaseIndex
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
              }`}
            >
              {phase.code}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Phase Header */}
          <div className={`bg-gradient-to-r ${currentColor.bg} rounded-2xl p-8 shadow-xl ${currentColor.glow}`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
                {currentPhase.code}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{currentPhase.fullName}</h2>
                <p className="text-white/70">
                  Step {currentStepIndex + 1} of {currentPhase.steps.length}
                </p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">{currentPhase.description}</p>
          </div>

          {/* Current Step */}
          <div className="rounded-2xl bg-[#12121a] border border-white/5 p-8">
            <div className="flex items-start gap-4">
              <button
                onClick={() => toggleStepComplete(currentStep.id)}
                className={`flex-shrink-0 w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                  completedSteps.has(currentStep.id)
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'border-white/20 hover:border-violet-400'
                }`}
              >
                {completedSteps.has(currentStep.id) && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {currentStep.name}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{currentStep.description}</p>

                {currentStep.tips && currentStep.tips.length > 0 && (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-amber-400 mb-2">Tips</h4>
                    <ul className="space-y-1">
                      {currentStep.tips.map((tip, i) => (
                        <li key={i} className="text-sm text-amber-200/80">• {tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-white/5">
              <button
                onClick={prevStep}
                disabled={currentPhaseIndex === 0 && currentStepIndex === 0}
                className="px-6 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ← Previous
              </button>
              <button
                onClick={nextStep}
                disabled={currentPhaseIndex === phases.length - 1 && currentStepIndex === currentPhase.steps.length - 1}
                className={`px-6 py-3 rounded-xl bg-gradient-to-r ${currentColor.bg} text-white font-semibold shadow-lg ${currentColor.glow} hover:-translate-y-0.5 disabled:opacity-30 disabled:cursor-not-allowed transition-all`}
              >
                Next Step →
              </button>
            </div>
          </div>

          {/* All Steps in Phase */}
          <div className="rounded-2xl bg-[#12121a] border border-white/5 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              All Steps in {currentPhase.name}
            </h3>
            <div className="space-y-2">
              {currentPhase.steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStepIndex(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    index === currentStepIndex
                      ? 'bg-violet-500/20 border border-violet-500/30'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
                      completedSteps.has(step.id)
                        ? 'bg-emerald-500 text-white'
                        : index === currentStepIndex
                        ? `bg-gradient-to-r ${currentColor.bg} text-white`
                        : 'bg-white/10 text-gray-400'
                    }`}>
                      {completedSteps.has(step.id) ? '✓' : index + 1}
                    </div>
                    <span className={`text-sm ${
                      completedSteps.has(step.id)
                        ? 'text-emerald-400 line-through'
                        : index === currentStepIndex
                        ? 'text-white'
                        : 'text-gray-400'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Objectives */}
          <div className="rounded-2xl bg-[#12121a] border border-white/5 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Objectives</h3>
            <ul className="space-y-3">
              {currentPhase.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                  <span className="text-violet-400 mt-0.5">•</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          {/* Key Questions */}
          <div className="rounded-2xl bg-[#12121a] border border-white/5 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Key Questions</h3>
            <ul className="space-y-3">
              {currentPhase.keyQuestions.map((q, i) => (
                <li key={i} className="text-sm text-gray-400 pb-3 border-b border-white/5 last:border-0">
                  {q}
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables */}
          <div className="rounded-2xl bg-[#12121a] border border-white/5 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Deliverables</h3>
            <ul className="space-y-3">
              {currentPhase.deliverables.map((d) => (
                <li key={d.id} className="flex items-start gap-3 text-sm">
                  <span className={d.required ? 'text-fuchsia-400' : 'text-gray-600'}>
                    {d.required ? '●' : '○'}
                  </span>
                  <span className="text-gray-400">{d.name}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-600 mt-4">● Required  ○ Optional</p>
          </div>

          {/* Tips */}
          <div className="rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-6">
            <h3 className="text-lg font-semibold text-amber-400 mb-4">Tips</h3>
            <ul className="space-y-3">
              {currentPhase.tips.map((tip, i) => (
                <li key={i} className="text-sm text-amber-200/80">
                  💡 {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Phase Details Link */}
          <Link
            href={`/phases/${currentPhase.id}`}
            className="block w-full text-center px-4 py-4 rounded-xl border border-violet-500/30 text-violet-400 hover:bg-violet-500/10 transition-all"
          >
            View Full Phase Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
