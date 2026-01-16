'use client';

import { useState } from 'react';
import Link from 'next/link';
import { phases } from '@/data/togaf-adm';

const wheelPhases = [
  { id: 'preliminary', code: 'P', angle: -90, color: '#1A2B48' },
  { id: 'phase-a', code: 'A', angle: -54, color: '#1E3A5F' },
  { id: 'phase-b', code: 'B', angle: -18, color: '#2563EB' },
  { id: 'phase-c-is', code: 'C', angle: 18, color: '#3B82F6' },
  { id: 'phase-c-app', code: 'C', angle: 54, color: '#0EA5E9' },
  { id: 'phase-d', code: 'D', angle: 90, color: '#00BCD4' },
  { id: 'phase-e', code: 'E', angle: 126, color: '#14B8A6' },
  { id: 'phase-f', code: 'F', angle: 162, color: '#10B981' },
  { id: 'phase-g', code: 'G', angle: 198, color: '#D4AF37' },
  { id: 'phase-h', code: 'H', angle: 234, color: '#F59E0B' },
];

export default function ADMWheel() {
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);

  const radius = 140;
  const centerX = 180;
  const centerY = 180;

  const getPhaseInfo = (id: string) => phases.find(p => p.id === id);
  const hoveredInfo = hoveredPhase ? getPhaseInfo(hoveredPhase) : null;
  const hoveredWheelPhase = wheelPhases.find(p => p.id === hoveredPhase);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
      {/* SVG Wheel */}
      <div className="relative">
        <svg width="360" height="360" viewBox="0 0 360 360">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Connecting arc */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />

          {/* Phase nodes */}
          {wheelPhases.map((phase) => {
            const angleRad = (phase.angle * Math.PI) / 180;
            const x = centerX + radius * Math.cos(angleRad);
            const y = centerY + radius * Math.sin(angleRad);
            const isHovered = hoveredPhase === phase.id;
            const nodeRadius = isHovered ? 32 : 26;

            return (
              <Link key={phase.id} href={`/phases/${phase.id}`}>
                <g
                  onMouseEnter={() => setHoveredPhase(phase.id)}
                  onMouseLeave={() => setHoveredPhase(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Hover ring */}
                  {isHovered && (
                    <circle
                      cx={x}
                      cy={y}
                      r={nodeRadius + 6}
                      fill="none"
                      stroke={phase.color}
                      strokeWidth="2"
                      opacity="0.5"
                    />
                  )}

                  {/* Node circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r={nodeRadius}
                    fill={phase.color}
                    filter={isHovered ? 'url(#glow)' : undefined}
                    style={{ transition: 'all 0.2s ease' }}
                  />

                  {/* Phase label */}
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontWeight="600"
                    fontSize={isHovered ? "16" : "14"}
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
              {/* Outer ring */}
              <circle
                cx={centerX}
                cy={centerY}
                r={hoveredPhase === 'requirements-management' ? 52 : 48}
                fill="none"
                stroke="rgba(0, 188, 212, 0.3)"
                strokeWidth="2"
                style={{ transition: 'all 0.2s ease' }}
              />

              {/* Main circle */}
              <circle
                cx={centerX}
                cy={centerY}
                r={hoveredPhase === 'requirements-management' ? 46 : 42}
                fill="#00BCD4"
                filter={hoveredPhase === 'requirements-management' ? 'url(#glow)' : undefined}
                style={{ transition: 'all 0.2s ease' }}
              />

              {/* Text */}
              <text
                x={centerX}
                y={centerY - 5}
                textAnchor="middle"
                fill="white"
                fontWeight="600"
                fontSize="10"
              >
                Requirements
              </text>
              <text
                x={centerX}
                y={centerY + 8}
                textAnchor="middle"
                fill="white"
                fontWeight="600"
                fontSize="10"
              >
                Management
              </text>
            </g>
          </Link>
        </svg>
      </div>

      {/* Info Panel */}
      <div className="w-full lg:w-80 min-h-[240px]">
        {hoveredInfo ? (
          <div
            className="rounded-xl p-6 border transition-all duration-200"
            style={{
              background: `linear-gradient(135deg, ${hoveredWheelPhase?.color}15 0%, transparent 100%)`,
              borderColor: `${hoveredWheelPhase?.color}40`,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="min-w-12 h-12 px-3 rounded-lg flex items-center justify-center text-white font-bold text-base whitespace-nowrap"
                style={{ backgroundColor: hoveredWheelPhase?.color }}
              >
                {hoveredInfo.code}
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">{hoveredInfo.name}</h3>
                <p className="text-sm text-gray-400">{hoveredInfo.fullName}</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-5 leading-relaxed">{hoveredInfo.description}</p>

            <div className="flex flex-wrap gap-2 mb-5">
              <span className="px-2.5 py-1 rounded-md bg-[#00BCD4]/20 text-[#00BCD4] text-xs border border-[#00BCD4]/30">
                {hoveredInfo.steps.length} steps
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#D4AF37]/20 text-[#D4AF37] text-xs border border-[#D4AF37]/30">
                {hoveredInfo.deliverables.length} deliverables
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#007BFF]/20 text-[#007BFF] text-xs border border-[#007BFF]/30">
                {hoveredInfo.artifacts.length} artifacts
              </span>
            </div>

            <Link
              href={`/phases/${hoveredPhase}`}
              className="block w-full text-center py-2.5 rounded-lg font-medium text-white text-sm transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: hoveredWheelPhase?.color }}
            >
              View Phase Details
            </Link>
          </div>
        ) : (
          <div className="rounded-xl bg-[#1A2B48]/30 border border-gray-700 p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[#00BCD4]/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#00BCD4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-white mb-2">TOGAF ADM Cycle</h3>
            <p className="text-gray-400 text-sm">
              Hover over any phase to see details, or click to explore the full documentation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
