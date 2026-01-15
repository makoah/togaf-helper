'use client';

import { useState } from 'react';
import Link from 'next/link';
import { phases } from '@/data/togaf-adm';

const wheelPhases = [
  { id: 'preliminary', code: 'Preliminary', angle: -90, color: '#6366f1' },      // Top
  { id: 'phase-a', code: 'A', angle: -54, color: '#8b5cf6' },                     // Architecture Vision
  { id: 'phase-b', code: 'B', angle: -18, color: '#a855f7' },                     // Business Architecture
  { id: 'phase-c-is', code: 'C', angle: 18, color: '#d946ef' },                   // IS Architecture (Data)
  { id: 'phase-c-app', code: 'C', angle: 54, color: '#ec4899' },                  // IS Architecture (App)
  { id: 'phase-d', code: 'D', angle: 90, color: '#f43f5e' },                      // Technology Architecture
  { id: 'phase-e', code: 'E', angle: 126, color: '#f97316' },                     // Opportunities & Solutions
  { id: 'phase-f', code: 'F', angle: 162, color: '#eab308' },                     // Migration Planning
  { id: 'phase-g', code: 'G', angle: 198, color: '#84cc16' },                     // Implementation Governance
  { id: 'phase-h', code: 'H', angle: 234, color: '#22c55e' },                     // Architecture Change Mgmt
];

export default function ADMWheel() {
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const radius = 160;
  const centerX = 200;
  const centerY = 200;

  const getPhaseInfo = (id: string) => phases.find(p => p.id === id);

  const hoveredInfo = hoveredPhase ? getPhaseInfo(hoveredPhase) : null;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8">
      {/* SVG Wheel */}
      <div className="relative">
        <svg width="400" height="400" viewBox="0 0 400 400" className="drop-shadow-xl">
          {/* Outer ring gradient background */}
          <defs>
            <linearGradient id="wheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius + 30}
            fill="url(#wheelGradient)"
            stroke="#e2e8f0"
            strokeWidth="2"
          />

          {/* Connecting arrows/arc */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="2"
            strokeDasharray="8 4"
          />

          {/* Phase nodes */}
          {wheelPhases.map((phase, index) => {
            const angleRad = (phase.angle * Math.PI) / 180;
            const x = centerX + radius * Math.cos(angleRad);
            const y = centerY + radius * Math.sin(angleRad);
            const isHovered = hoveredPhase === phase.id;
            const nodeRadius = isHovered ? 38 : 32;

            return (
              <Link key={phase.id} href={`/phases/${phase.id}`}>
                <g
                  onMouseEnter={() => setHoveredPhase(phase.id)}
                  onMouseLeave={() => setHoveredPhase(null)}
                  style={{ cursor: 'pointer' }}
                  filter={isHovered ? 'url(#glow)' : undefined}
                >
                  {/* Node circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r={nodeRadius}
                    fill={phase.color}
                    stroke="white"
                    strokeWidth="3"
                    style={{
                      transition: 'all 0.2s ease',
                      transform: isHovered ? `scale(1.1)` : 'scale(1)',
                      transformOrigin: `${x}px ${y}px`,
                    }}
                  />
                  {/* Phase label */}
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontWeight="bold"
                    fontSize={phase.code.length > 1 ? "11" : "16"}
                    style={{ pointerEvents: 'none' }}
                  >
                    {phase.code}
                  </text>
                </g>
              </Link>
            );
          })}

          {/* Center - Requirements Management */}
          <Link href="/phases/requirements-management">
            <g
              onMouseEnter={() => setHoveredPhase('requirements-management')}
              onMouseLeave={() => setHoveredPhase(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={centerX}
                cy={centerY}
                r={hoveredPhase === 'requirements-management' ? 58 : 52}
                fill="#0ea5e9"
                stroke="white"
                strokeWidth="4"
                style={{ transition: 'all 0.2s ease' }}
              />
              <text
                x={centerX}
                y={centerY - 8}
                textAnchor="middle"
                fill="white"
                fontWeight="bold"
                fontSize="12"
              >
                Requirements
              </text>
              <text
                x={centerX}
                y={centerY + 8}
                textAnchor="middle"
                fill="white"
                fontWeight="bold"
                fontSize="12"
              >
                Management
              </text>
            </g>
          </Link>

          {/* Direction arrows */}
          {wheelPhases.slice(0, -1).map((phase, index) => {
            const nextPhase = wheelPhases[index + 1];
            const angle1 = (phase.angle * Math.PI) / 180;
            const angle2 = (nextPhase.angle * Math.PI) / 180;
            const midAngle = (angle1 + angle2) / 2;
            const arrowRadius = radius + 15;
            const ax = centerX + arrowRadius * Math.cos(midAngle);
            const ay = centerY + arrowRadius * Math.sin(midAngle);

            return (
              <text
                key={`arrow-${index}`}
                x={ax}
                y={ay}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#94a3b8"
                fontSize="14"
                style={{
                  transform: `rotate(${(midAngle * 180) / Math.PI + 90}deg)`,
                  transformOrigin: `${ax}px ${ay}px`,
                }}
              >
                →
              </text>
            );
          })}
        </svg>
      </div>

      {/* Info Panel */}
      <div className="w-full lg:w-80 min-h-[200px]">
        {hoveredInfo ? (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg animate-fadeIn">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: wheelPhases.find(p => p.id === hoveredPhase)?.color || '#0ea5e9' }}
              >
                {hoveredInfo.code}
              </div>
              <h3 className="font-semibold text-slate-900">{hoveredInfo.name}</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">{hoveredInfo.description}</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                {hoveredInfo.steps.length} steps
              </span>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
                {hoveredInfo.deliverables.length} deliverables
              </span>
              <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded">
                {hoveredInfo.artifacts.length} artifacts
              </span>
            </div>
            <Link
              href={`/phases/${hoveredPhase}`}
              className="mt-4 block text-center py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm"
            >
              Explore Phase →
            </Link>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-6 text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-slate-700 mb-2">TOGAF ADM Cycle</h3>
            <p className="text-sm text-slate-500">
              Hover over any phase to see details, or click to explore the full phase documentation.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-400">
                The Architecture Development Method (ADM) is an iterative process for developing enterprise architecture.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
