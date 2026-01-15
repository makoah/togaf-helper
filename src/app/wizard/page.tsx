'use client';

import { useState } from 'react';
import Link from 'next/link';
import { phases, Phase } from '@/data/togaf-adm';

export default function Wizard() {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const currentPhase = phases[currentPhaseIndex];
  const currentStep = currentPhase.steps[currentStepIndex];

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
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">ADM Wizard</h1>
        <p className="text-slate-600 mt-2">
          Step-by-step guidance through the Architecture Development Method
        </p>
      </div>

      {/* Phase Progress */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {phases.map((phase, index) => (
            <button
              key={phase.id}
              onClick={() => goToPhase(index)}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                index === currentPhaseIndex
                  ? 'bg-blue-600 text-white'
                  : index < currentPhaseIndex
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
          <div className="bg-blue-600 text-white rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
                {currentPhase.code}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{currentPhase.fullName}</h2>
                <p className="text-blue-100 text-sm">
                  Step {currentStepIndex + 1} of {currentPhase.steps.length}
                </p>
              </div>
            </div>
            <p className="text-blue-100">{currentPhase.description}</p>
          </div>

          {/* Current Step */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-start gap-4">
              <button
                onClick={() => toggleStepComplete(currentStep.id)}
                className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                  completedSteps.has(currentStep.id)
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'border-slate-300 hover:border-blue-400'
                }`}
              >
                {completedSteps.has(currentStep.id) && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {currentStep.name}
                </h3>
                <p className="text-slate-600 mb-4">{currentStep.description}</p>

                {currentStep.tips && currentStep.tips.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-amber-800 mb-2">Tips</h4>
                    <ul className="list-disc list-inside text-sm text-amber-700 space-y-1">
                      {currentStep.tips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6 pt-6 border-t border-slate-200">
              <button
                onClick={prevStep}
                disabled={currentPhaseIndex === 0 && currentStepIndex === 0}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                disabled={currentPhaseIndex === phases.length - 1 && currentStepIndex === currentPhase.steps.length - 1}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            </div>
          </div>

          {/* All Steps in Phase */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              All Steps in {currentPhase.name}
            </h3>
            <div className="space-y-2">
              {currentPhase.steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStepIndex(index)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    index === currentStepIndex
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      completedSteps.has(step.id)
                        ? 'bg-emerald-500 text-white'
                        : index === currentStepIndex
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {completedSteps.has(step.id) ? '✓' : index + 1}
                    </div>
                    <span className={`text-sm ${
                      completedSteps.has(step.id)
                        ? 'text-emerald-700 line-through'
                        : 'text-slate-700'
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
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Objectives</h3>
            <ul className="space-y-2">
              {currentPhase.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-blue-500 mt-1">•</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          {/* Key Questions */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Key Questions</h3>
            <ul className="space-y-2">
              {currentPhase.keyQuestions.map((q, i) => (
                <li key={i} className="text-sm text-slate-600 pb-2 border-b border-slate-100 last:border-0">
                  {q}
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Deliverables</h3>
            <ul className="space-y-2">
              {currentPhase.deliverables.map((d) => (
                <li key={d.id} className="flex items-start gap-2 text-sm">
                  <span className={d.required ? 'text-red-500' : 'text-slate-400'}>
                    {d.required ? '●' : '○'}
                  </span>
                  <span className="text-slate-600">{d.name}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-400 mt-3">● Required  ○ Optional</p>
          </div>

          {/* Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-4">Tips</h3>
            <ul className="space-y-2">
              {currentPhase.tips.map((tip, i) => (
                <li key={i} className="text-sm text-amber-800">
                  💡 {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Phase Details Link */}
          <Link
            href={`/phases/${currentPhase.id}`}
            className="block w-full text-center px-4 py-3 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
          >
            View Full Phase Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
