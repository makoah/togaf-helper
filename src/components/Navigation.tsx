'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    href: '/',
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    href: '/wizard',
    label: 'Wizard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    ),
  },
  {
    href: '/phases',
    label: 'Phases',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    href: '/stakeholders',
    label: 'Stakeholders',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    href: '/artifacts',
    label: 'Artifacts',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

// SVG Logo Component matching the brand
function LogoIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer ring */}
      <circle cx="20" cy="20" r="18" stroke="url(#gradient1)" strokeWidth="2" fill="none" />
      {/* Inner ring */}
      <circle cx="20" cy="20" r="12" stroke="url(#gradient2)" strokeWidth="2" fill="none" />
      {/* Center dot */}
      <circle cx="20" cy="20" r="4" fill="#00BCD4" />
      {/* Arrow indicators */}
      <path d="M20 2 L23 6 L17 6 Z" fill="#1A2B48" />
      <path d="M38 20 L34 23 L34 17 Z" fill="#6366F1" />
      <path d="M20 38 L17 34 L23 34 Z" fill="#00BCD4" />
      <path d="M2 20 L6 17 L6 23 Z" fill="#D4AF37" />
      <defs>
        <linearGradient id="gradient1" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#1A2B48" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#00BCD4" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0" y1="40" x2="40" y2="0">
          <stop offset="0%" stopColor="#00BCD4" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="w-64 min-h-screen p-5 flex flex-col bg-[#1A2B48]">
      {/* Logo */}
      <div className="mb-8 pb-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3 group">
          <LogoIcon />
          <div>
            <span className="text-xl font-bold text-white tracking-tight">TOGAF</span>
            <span className="text-xl font-bold text-[#00BCD4] tracking-tight"> Helper</span>
          </div>
        </Link>
      </div>

      {/* Navigation Items */}
      <ul className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-[#00BCD4] text-white shadow-lg shadow-[#00BCD4]/25'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-gray-400'}>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 px-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
          <span className="text-xs text-gray-400">TOGAF® 9.2 Standard</span>
        </div>
        <p className="text-xs text-gray-500 px-2">
          v1.0.0
        </p>
      </div>
    </nav>
  );
}
