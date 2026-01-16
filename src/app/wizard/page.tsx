'use client';

import { useState } from 'react';
import Link from 'next/link';
import { phases } from '@/data/togaf-adm';

// Brand-consistent phase colors based on ADM wheel
const phaseColors: Record<string, { bg: string; border: string; text: string }> = {
  'preliminary': { bg: 'bg-[#1A2B48]', border: 'border-[#1A2B48]', text: 'text-white' },
  'phase-a': { bg: 'bg-[#1E3A5F]', border: 'border-[#1E3A5F]', text: 'text-white' },
  'phase-b': { bg: 'bg-[#2563EB]', border: 'border-[#2563EB]', text: 'text-white' },
  'phase-c-is': { bg: 'bg-[#3B82F6]', border: 'border-[#3B82F6]', text: 'text-white' },
  'phase-c-app': { bg: 'bg-[#0EA5E9]', border: 'border-[#0EA5E9]', text: 'text-white' },
  'phase-d': { bg: 'bg-[#00BCD4]', border: 'border-[#00BCD4]', text: 'text-white' },
  'phase-e': { bg: 'bg-[#14B8A6]', border: 'border-[#14B8A6]', text: 'text-white' },
  'phase-f': { bg: 'bg-[#10B981]', border: 'border-[#10B981]', text: 'text-white' },
  'phase-g': { bg: 'bg-[#D4AF37]', border: 'border-[#D4AF37]', text: 'text-[#1A2B48]' },
  'phase-h': { bg: 'bg-[#F59E0B]', border: 'border-[#F59E0B]', text: 'text-[#1A2B48]' },
  'requirements-management': { bg: 'bg-[#00BCD4]', border: 'border-[#00BCD4]', text: 'text-white' },
};

export default function Wizard() {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const currentPhase = phases[currentPhaseIndex];
  const currentStep = currentPhase.steps[currentStepIndex];
  const currentColor = phaseColors[currentPhase.id] || phaseColors['preliminary'];

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
        <h1 className="text-3xl font-bold text-white font-montserrat">
          ADM Wizard
        </h1>
        <p className="text-gray-400 mt-2">
          Step-by-step guidance through the Architecture Development Method
        </p>
      </div>

      {/* Phase Progress */}
      <div className="rounded-2xl bg-[#0F172A] border border-gray-800 p-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {phases.map((phase, index) => {
            const color = phaseColors[phase.id] || phaseColors['preliminary'];
            return (
              <button
                key={phase.id}
                onClick={() => goToPhase(index)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  index === currentPhaseIndex
                    ? `${color.bg} ${color.text} shadow-lg`
                    : index < currentPhaseIndex
                    ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30'
                    : 'bg-[#1A2B48]/50 text-gray-400 hover:bg-[#1A2B48] border border-gray-700'
                }`}
              >
                {phase.code}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Phase Header */}
          <div className={`${currentColor.bg} rounded-2xl p-8 shadow-xl`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
                {currentPhase.code}
              </div>
              <div>
                <h2 className={`text-2xl font-bold font-montserrat ${currentColor.text}`}>{currentPhase.fullName}</h2>
                <p className={`${currentColor.text} opacity-70`}>
                  Step {currentStepIndex + 1} of {currentPhase.steps.length}
                </p>
              </div>
            </div>
            <p className={`${currentColor.text} opacity-80 leading-relaxed`}>{currentPhase.description}</p>
          </div>

          {/* Current Step */}
          <div className="rounded-2xl bg-[#0F172A] border border-gray-800 p-8">
            <div className="flex items-start gap-4">
              <button
                onClick={() => toggleStepComplete(currentStep.id)}
                className={`flex-shrink-0 w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                  completedSteps.has(currentStep.id)
                    ? 'bg-[#D4AF37] border-[#D4AF37] text-[#1A2B48] shadow-lg shadow-[#D4AF37]/30'
                    : 'border-gray-600 hover:border-[#00BCD4]'
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
                  <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-[#D4AF37] mb-2">Tips</h4>
                    <ul className="space-y-1">
                      {currentStep.tips.map((tip, i) => (
                        <li key={i} className="text-sm text-[#D4AF37]/80">• {tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
              <button
                onClick={prevStep}
                disabled={currentPhaseIndex === 0 && currentStepIndex === 0}
                className="px-6 py-3 rounded-xl border border-gray-700 text-gray-300 hover:bg-[#1A2B48] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ← Previous
              </button>
              <button
                onClick={nextStep}
                disabled={currentPhaseIndex === phases.length - 1 && currentStepIndex === currentPhase.steps.length - 1}
                className="px-6 py-3 rounded-xl bg-[#00BCD4] text-white font-semibold shadow-lg shadow-[#00BCD4]/30 hover:-translate-y-0.5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Next Step →
              </button>
            </div>
          </div>

          {/* All Steps in Phase */}
          <div className="rounded-2xl bg-[#0F172A] border border-gray-800 p-6">
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
                      ? 'bg-[#00BCD4]/20 border border-[#00BCD4]/30'
                      : 'hover:bg-[#1A2B48]/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
                      completedSteps.has(step.id)
                        ? 'bg-[#D4AF37] text-[#1A2B48]'
                        : index === currentStepIndex
                        ? `${currentColor.bg} ${currentColor.text}`
                        : 'bg-[#1A2B48] text-gray-400'
                    }`}>
                      {completedSteps.has(step.id) ? '✓' : index + 1}
                    </div>
                    <span className={`text-sm ${
                      completedSteps.has(step.id)
                        ? 'text-[#D4AF37] line-through'
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
          <div className="rounded-2xl bg-[#0F172A] border border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Objectives</h3>
            <ul className="space-y-3">
              {currentPhase.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                  <span className="text-[#00BCD4] mt-0.5">•</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          {/* Key Questions */}
          <div className="rounded-2xl bg-[#0F172A] border border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Key Questions</h3>
            <ul className="space-y-3">
              {currentPhase.keyQuestions.map((q, i) => (
                <li key={i} className="text-sm text-gray-400 pb-3 border-b border-gray-700 last:border-0">
                  {q}
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables */}
          <div className="rounded-2xl bg-[#0F172A] border border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Deliverables</h3>
            <ul className="space-y-3">
              {currentPhase.deliverables.map((d) => (
                <li key={d.id} className="flex items-start gap-3 text-sm">
                  <span className={d.required ? 'text-[#D4AF37]' : 'text-gray-600'}>
                    {d.required ? '●' : '○'}
                  </span>
                  <span className="text-gray-400">{d.name}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-4">● Required  ○ Optional</p>
          </div>

          {/* Tips */}
          <div className="rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-6">
            <h3 className="text-lg font-semibold text-[#D4AF37] mb-4">Tips</h3>
            <ul className="space-y-3">
              {currentPhase.tips.map((tip, i) => (
                <li key={i} className="text-sm text-[#D4AF37]/80">
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Phase Details Link */}
          <Link
            href={`/phases/${currentPhase.id}`}
            className="block w-full text-center px-4 py-4 rounded-xl border border-[#007BFF]/30 text-[#007BFF] hover:bg-[#007BFF]/10 transition-all"
          >
            View Full Phase Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
