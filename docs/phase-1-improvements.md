# Phase 1 Improvements Specification

**Document Version:** 1.0
**Date:** January 2026
**Author:** Business Analyst Review
**Project:** TOGAF Helper

---

## Executive Summary

Phase 1 focuses on three quick-win improvements that address fundamental usability gaps without requiring backend infrastructure. These improvements will transform the app from a static reference tool into an active learning companion.

| Improvement | Effort | Impact | Priority |
|-------------|--------|--------|----------|
| LocalStorage Persistence | Low | Very High | P1 |
| Search Functionality | Low | High | P2 |
| TOGAF Glossary | Low | Medium | P3 |

**Estimated Total Effort:** 2-3 days of development

---

## 1. LocalStorage Persistence

### 1.1 Problem Statement

Currently, all user progress is lost when the browser is refreshed or closed:
- Wizard step completion is reset
- Stakeholder registry data disappears
- No bookmarks or favorites are retained
- Users cannot resume where they left off

**User Impact:** High frustration, discourages return visits, breaks learning flow.

### 1.2 Proposed Solution

Implement a localStorage-based persistence layer that saves:
- Wizard progress (current phase, step, completed steps)
- Stakeholder registry data
- User preferences
- Bookmarked phases/artifacts

### 1.3 Technical Specification

#### 1.3.1 Data Structure

```typescript
// src/types/persistence.ts

interface UserProgress {
  wizard: {
    currentPhaseIndex: number;
    currentStepIndex: number;
    completedSteps: string[];  // Array of step IDs
    lastVisited: string;       // ISO timestamp
  };
  bookmarks: {
    phases: string[];          // Array of phase IDs
    artifacts: string[];       // Array of artifact IDs
  };
  preferences: {
    theme: 'dark' | 'light';
    showTips: boolean;
  };
}

interface StakeholderData {
  stakeholders: Stakeholder[];
  lastModified: string;        // ISO timestamp
}

// LocalStorage Keys
const STORAGE_KEYS = {
  USER_PROGRESS: 'togaf-helper-progress',
  STAKEHOLDERS: 'togaf-helper-stakeholders',
  VERSION: 'togaf-helper-version'
} as const;
```

#### 1.3.2 Persistence Hook

```typescript
// src/hooks/useLocalStorage.ts

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
    setIsLoaded(true);
  }, [key]);

  // Save to localStorage when value changes
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  const clearValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error clearing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, clearValue, isLoaded] as const;
}
```

#### 1.3.3 Wizard Page Modifications

```typescript
// Key changes to src/app/wizard/page.tsx

// Replace useState with useLocalStorage
const [progress, setProgress, clearProgress, isLoaded] = useLocalStorage<WizardProgress>(
  'togaf-helper-progress',
  {
    currentPhaseIndex: 0,
    currentStepIndex: 0,
    completedSteps: [],
    lastVisited: new Date().toISOString()
  }
);

// Show loading state while hydrating
if (!isLoaded) {
  return <WizardSkeleton />;
}

// Update progress on navigation
const nextStep = () => {
  setProgress(prev => ({
    ...prev,
    currentStepIndex: prev.currentStepIndex + 1,
    lastVisited: new Date().toISOString()
  }));
};

// Add "Reset Progress" button
<button onClick={clearProgress} className="text-sm text-gray-500">
  Reset Progress
</button>
```

#### 1.3.4 Stakeholder Page Modifications

```typescript
// Key changes to src/app/stakeholders/page.tsx

const [stakeholderData, setStakeholderData] = useLocalStorage<StakeholderData>(
  'togaf-helper-stakeholders',
  {
    stakeholders: defaultStakeholders,
    lastModified: new Date().toISOString()
  }
);

// Update on any change
const addStakeholder = (stakeholder: Stakeholder) => {
  setStakeholderData(prev => ({
    stakeholders: [...prev.stakeholders, stakeholder],
    lastModified: new Date().toISOString()
  }));
};
```

### 1.4 UI Enhancements

#### 1.4.1 Progress Indicator on Dashboard

Add a "Continue Learning" card showing:
- Last visited phase
- Completion percentage
- "Resume" button

```tsx
// Dashboard addition
{progress.completedSteps.length > 0 && (
  <div className="rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-6">
    <h3 className="text-lg font-semibold text-[#D4AF37]">Continue Learning</h3>
    <p className="text-gray-400 mt-2">
      You're on Phase {phases[progress.currentPhaseIndex].code}
    </p>
    <div className="mt-3 h-2 bg-gray-700 rounded-full">
      <div
        className="h-2 bg-[#D4AF37] rounded-full"
        style={{ width: `${(progress.completedSteps.length / totalSteps) * 100}%` }}
      />
    </div>
    <Link href="/wizard" className="btn-gold mt-4">
      Resume →
    </Link>
  </div>
)}
```

#### 1.4.2 Bookmark Toggle on Phase Pages

```tsx
// Phase detail page addition
<button
  onClick={() => toggleBookmark(phase.id)}
  className={`p-2 rounded-lg ${
    isBookmarked ? 'bg-[#D4AF37] text-white' : 'bg-gray-700 text-gray-400'
  }`}
>
  <BookmarkIcon />
</button>
```

### 1.5 Migration Strategy

For users with existing data when updating the app:

```typescript
// src/utils/migration.ts

const CURRENT_VERSION = '1.0.0';

export function migrateData() {
  const storedVersion = localStorage.getItem('togaf-helper-version');

  if (!storedVersion) {
    // First time user or pre-persistence user
    localStorage.setItem('togaf-helper-version', CURRENT_VERSION);
    return;
  }

  // Handle future migrations here
  if (storedVersion !== CURRENT_VERSION) {
    // Migration logic
    localStorage.setItem('togaf-helper-version', CURRENT_VERSION);
  }
}
```

### 1.6 Acceptance Criteria

- [ ] Wizard progress persists across page refreshes
- [ ] Wizard progress persists across browser sessions
- [ ] Stakeholder data persists across sessions
- [ ] User can reset progress manually
- [ ] Dashboard shows "Continue Learning" when progress exists
- [ ] No hydration mismatch errors (handle SSR properly)

---

## 2. Search Functionality

### 2.1 Problem Statement

With 11 phases, 30+ deliverables, and 50+ artifacts, users struggle to find specific content. Currently, they must manually browse through pages to locate information.

**User Pain Points:**
- "Where is the Stakeholder Map Matrix?"
- "Which phase covers data architecture?"
- "What deliverables are required vs optional?"

### 2.2 Proposed Solution

Implement a global search feature accessible via:
- Keyboard shortcut (Cmd/Ctrl + K)
- Search icon in navigation
- Dedicated search page for advanced filtering

### 2.3 Technical Specification

#### 2.3.1 Search Index Structure

```typescript
// src/types/search.ts

interface SearchItem {
  id: string;
  type: 'phase' | 'step' | 'deliverable' | 'artifact';
  title: string;
  description: string;
  keywords: string[];
  phaseId: string;
  phaseName: string;
  url: string;
  metadata?: {
    required?: boolean;
    artifactType?: 'catalog' | 'matrix' | 'diagram';
  };
}

interface SearchResult extends SearchItem {
  score: number;
  matches: {
    field: string;
    indices: [number, number][];
  }[];
}
```

#### 2.3.2 Search Index Builder

```typescript
// src/utils/searchIndex.ts

import { phases } from '@/data/togaf-adm';

export function buildSearchIndex(): SearchItem[] {
  const index: SearchItem[] = [];

  phases.forEach(phase => {
    // Index phase
    index.push({
      id: phase.id,
      type: 'phase',
      title: phase.fullName,
      description: phase.description,
      keywords: [phase.code, phase.name, ...phase.stakeholderFocus],
      phaseId: phase.id,
      phaseName: phase.name,
      url: `/phases/${phase.id}`
    });

    // Index steps
    phase.steps.forEach(step => {
      index.push({
        id: step.id,
        type: 'step',
        title: step.name,
        description: step.description,
        keywords: step.tips || [],
        phaseId: phase.id,
        phaseName: phase.name,
        url: `/phases/${phase.id}#step-${step.id}`
      });
    });

    // Index deliverables
    phase.deliverables.forEach(deliverable => {
      index.push({
        id: deliverable.id,
        type: 'deliverable',
        title: deliverable.name,
        description: deliverable.description,
        keywords: [],
        phaseId: phase.id,
        phaseName: phase.name,
        url: `/artifacts#deliverable-${deliverable.id}`,
        metadata: { required: deliverable.required }
      });
    });

    // Index artifacts
    phase.artifacts.forEach(artifact => {
      index.push({
        id: artifact.id,
        type: 'artifact',
        title: artifact.name,
        description: artifact.description,
        keywords: [artifact.type],
        phaseId: phase.id,
        phaseName: phase.name,
        url: `/artifacts#artifact-${artifact.id}`,
        metadata: { artifactType: artifact.type }
      });
    });
  });

  return index;
}
```

#### 2.3.3 Search Algorithm

```typescript
// src/utils/search.ts

export function search(query: string, index: SearchItem[], limit = 10): SearchResult[] {
  if (!query.trim()) return [];

  const normalizedQuery = query.toLowerCase().trim();
  const queryWords = normalizedQuery.split(/\s+/);

  const results: SearchResult[] = index
    .map(item => {
      let score = 0;
      const matches: SearchResult['matches'] = [];

      // Title match (highest weight)
      const titleLower = item.title.toLowerCase();
      if (titleLower.includes(normalizedQuery)) {
        score += 100;
        matches.push({ field: 'title', indices: [[titleLower.indexOf(normalizedQuery), normalizedQuery.length]] });
      }

      // Word-by-word title match
      queryWords.forEach(word => {
        if (titleLower.includes(word)) score += 20;
      });

      // Description match
      const descLower = item.description.toLowerCase();
      if (descLower.includes(normalizedQuery)) {
        score += 30;
      }
      queryWords.forEach(word => {
        if (descLower.includes(word)) score += 5;
      });

      // Keyword match
      item.keywords.forEach(keyword => {
        if (keyword.toLowerCase().includes(normalizedQuery)) {
          score += 40;
        }
      });

      // Type-specific boosts
      if (item.type === 'phase') score *= 1.5;

      return { ...item, score, matches };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return results;
}
```

#### 2.3.4 Search Modal Component

```typescript
// src/components/SearchModal.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { buildSearchIndex, search, SearchResult } from '@/utils/search';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Build index once
  const searchIndex = useMemo(() => buildSearchIndex(), []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Search on query change
  useEffect(() => {
    const searchResults = search(query, searchIndex);
    setResults(searchResults);
    setSelectedIndex(0);
  }, [query, searchIndex]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
        if (results[selectedIndex]) {
          router.push(results[selectedIndex].url);
          onClose();
        }
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center pt-24">
      <div className="w-full max-w-2xl bg-[#0F172A] border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-700">
          <SearchIcon className="w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search phases, artifacts, deliverables..."
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
          />
          <kbd className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            results.map((result, index) => (
              <button
                key={result.id}
                onClick={() => {
                  router.push(result.url);
                  onClose();
                }}
                className={`w-full text-left p-4 flex items-start gap-4 ${
                  index === selectedIndex ? 'bg-[#1A2B48]' : 'hover:bg-[#1A2B48]/50'
                }`}
              >
                <TypeBadge type={result.type} />
                <div className="flex-1">
                  <div className="font-medium text-white">{result.title}</div>
                  <div className="text-sm text-gray-500 line-clamp-1">
                    {result.phaseName} • {result.description}
                  </div>
                </div>
              </button>
            ))
          ) : query ? (
            <div className="p-8 text-center text-gray-500">
              No results found for "{query}"
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              Start typing to search...
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-700 flex items-center gap-4 text-xs text-gray-500">
          <span><kbd>↑↓</kbd> Navigate</span>
          <span><kbd>Enter</kbd> Select</span>
          <span><kbd>Esc</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}

function TypeBadge({ type }: { type: string }) {
  const colors = {
    phase: 'bg-[#00BCD4]/20 text-[#00BCD4]',
    step: 'bg-[#007BFF]/20 text-[#007BFF]',
    deliverable: 'bg-[#D4AF37]/20 text-[#D4AF37]',
    artifact: 'bg-[#10B981]/20 text-[#10B981]'
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colors[type]}`}>
      {type}
    </span>
  );
}
```

#### 2.3.5 Keyboard Shortcut Hook

```typescript
// src/hooks/useKeyboardShortcut.ts

import { useEffect } from 'react';

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  modifiers: { ctrl?: boolean; meta?: boolean; shift?: boolean } = {}
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const ctrlMatch = modifiers.ctrl ? e.ctrlKey : true;
      const metaMatch = modifiers.meta ? e.metaKey : true;
      const shiftMatch = modifiers.shift ? e.shiftKey : !e.shiftKey;

      if (
        e.key.toLowerCase() === key.toLowerCase() &&
        ctrlMatch &&
        metaMatch &&
        shiftMatch
      ) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [key, callback, modifiers]);
}
```

#### 2.3.6 Navigation Integration

```typescript
// Add to Navigation.tsx

const [searchOpen, setSearchOpen] = useState(false);

// Cmd+K shortcut
useKeyboardShortcut('k', () => setSearchOpen(true), { meta: true });

// In render:
<button
  onClick={() => setSearchOpen(true)}
  className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white"
>
  <SearchIcon className="w-4 h-4" />
  <span className="text-sm">Search</span>
  <kbd className="text-xs bg-gray-800 px-1.5 py-0.5 rounded">⌘K</kbd>
</button>

<SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
```

### 2.4 Acceptance Criteria

- [ ] Cmd/Ctrl+K opens search modal from anywhere
- [ ] Search icon in navigation opens modal
- [ ] Results appear as user types (debounced)
- [ ] Results show type badges (phase/step/deliverable/artifact)
- [ ] Arrow keys navigate results
- [ ] Enter navigates to selected result
- [ ] Escape closes modal
- [ ] Results link to correct pages/sections

---

## 3. TOGAF Glossary

### 3.1 Problem Statement

TOGAF uses specialized terminology that can be confusing for newcomers:
- "ADM" - Architecture Development Method
- "Building Block" - Reusable architecture components
- "Viewpoint" - Perspective for a stakeholder
- "Concern" - Stakeholder interest

Users currently have no quick way to understand these terms without leaving the app.

### 3.2 Proposed Solution

Create a searchable glossary with:
- Alphabetized term list
- Quick search/filter
- Hover tooltips throughout the app
- Link to glossary from any term

### 3.3 Technical Specification

#### 3.3.1 Glossary Data Structure

```typescript
// src/data/glossary.ts

export interface GlossaryTerm {
  id: string;
  term: string;
  abbreviation?: string;
  definition: string;
  relatedTerms?: string[];
  example?: string;
  phases?: string[];  // Which phases use this term heavily
}

export const glossary: GlossaryTerm[] = [
  {
    id: 'adm',
    term: 'Architecture Development Method',
    abbreviation: 'ADM',
    definition: 'The core of TOGAF - an iterative, cyclic process for developing and managing enterprise architecture.',
    relatedTerms: ['architecture-cycle', 'phase'],
    example: 'The ADM consists of a preliminary phase plus eight main phases (A through H).',
    phases: ['preliminary']
  },
  {
    id: 'architecture-building-block',
    term: 'Architecture Building Block',
    abbreviation: 'ABB',
    definition: 'A constituent of the architecture model that describes a single aspect of the overall model.',
    relatedTerms: ['solution-building-block', 'building-block'],
    example: 'A Customer Management ABB defines the required capability without specifying how it will be implemented.'
  },
  {
    id: 'solution-building-block',
    term: 'Solution Building Block',
    abbreviation: 'SBB',
    definition: 'A candidate physical solution component that will implement an Architecture Building Block.',
    relatedTerms: ['architecture-building-block', 'building-block'],
    example: 'Salesforce CRM is an SBB that implements the Customer Management ABB.'
  },
  {
    id: 'stakeholder',
    term: 'Stakeholder',
    definition: 'An individual, team, or organization with interests in, or concerns relative to, the outcome of the architecture.',
    relatedTerms: ['concern', 'viewpoint'],
    phases: ['phase-a']
  },
  {
    id: 'concern',
    term: 'Concern',
    definition: 'An interest in a system relevant to one or more stakeholders. Concerns may pertain to any aspect of the system.',
    relatedTerms: ['stakeholder', 'viewpoint'],
    example: 'Performance, security, and maintainability are common concerns.'
  },
  {
    id: 'viewpoint',
    term: 'Viewpoint',
    definition: 'A definition of the perspective from which a view is taken, establishing conventions for constructing, interpreting, and analyzing the view.',
    relatedTerms: ['view', 'stakeholder', 'concern']
  },
  {
    id: 'view',
    term: 'View',
    definition: 'The representation of a related set of concerns, seen from a particular viewpoint.',
    relatedTerms: ['viewpoint', 'concern']
  },
  {
    id: 'baseline-architecture',
    term: 'Baseline Architecture',
    definition: 'The existing architecture before any changes are made - the "as-is" state.',
    relatedTerms: ['target-architecture', 'gap-analysis'],
    phases: ['phase-b', 'phase-c-is', 'phase-c-app', 'phase-d']
  },
  {
    id: 'target-architecture',
    term: 'Target Architecture',
    definition: 'The desired future state of the architecture - the "to-be" state.',
    relatedTerms: ['baseline-architecture', 'gap-analysis'],
    phases: ['phase-b', 'phase-c-is', 'phase-c-app', 'phase-d']
  },
  {
    id: 'gap-analysis',
    term: 'Gap Analysis',
    definition: 'A technique to compare baseline and target architectures to identify the differences that need to be addressed.',
    relatedTerms: ['baseline-architecture', 'target-architecture'],
    phases: ['phase-b', 'phase-c-is', 'phase-c-app', 'phase-d', 'phase-e']
  },
  {
    id: 'architecture-vision',
    term: 'Architecture Vision',
    definition: 'A high-level description of the target architecture, providing an overview of how the proposed solution will address stakeholder concerns.',
    phases: ['phase-a']
  },
  {
    id: 'statement-of-architecture-work',
    term: 'Statement of Architecture Work',
    abbreviation: 'SAW',
    definition: 'A document that defines the scope and approach for the architecture development.',
    phases: ['phase-a']
  },
  {
    id: 'architecture-contract',
    term: 'Architecture Contract',
    definition: 'An agreement between development partners and sponsors on the deliverables, quality, and fitness-for-purpose of an architecture.',
    phases: ['phase-g']
  },
  {
    id: 'transition-architecture',
    term: 'Transition Architecture',
    definition: 'An intermediate architecture state between baseline and target, used to plan incremental delivery.',
    relatedTerms: ['baseline-architecture', 'target-architecture'],
    phases: ['phase-e', 'phase-f']
  },
  {
    id: 'architecture-repository',
    term: 'Architecture Repository',
    definition: 'A structured storage area for architecture outputs, including models, patterns, and standards.',
    phases: ['preliminary']
  },
  {
    id: 'architecture-landscape',
    term: 'Architecture Landscape',
    definition: 'The architectural representation of assets deployed within the enterprise at a particular point in time.',
    relatedTerms: ['architecture-repository']
  },
  {
    id: 'capability',
    term: 'Capability',
    definition: 'An ability that an organization, person, or system possesses. Capabilities are expressed in general terms and typically require a combination of organization, people, processes, and technology.',
    phases: ['phase-e']
  },
  {
    id: 'work-package',
    term: 'Work Package',
    definition: 'A set of actions identified to achieve one or more objectives for the architecture.',
    phases: ['phase-e', 'phase-f']
  },
  {
    id: 'architecture-principle',
    term: 'Architecture Principle',
    definition: 'A qualitative statement of intent that should be met by the architecture. Principles inform and support the way in which an organization fulfills its mission.',
    phases: ['preliminary'],
    example: 'Example principle: "Data is shared across the enterprise and is accessible to users based on their need to perform their job functions."'
  },
  {
    id: 'architecture-governance',
    term: 'Architecture Governance',
    definition: 'The practice of monitoring and controlling changes to the enterprise architecture.',
    phases: ['phase-g', 'phase-h']
  },
  {
    id: 'compliance-assessment',
    term: 'Compliance Assessment',
    definition: 'An evaluation of how well a project or solution conforms to the defined architecture.',
    phases: ['phase-g']
  },
  {
    id: 'request-for-architecture-work',
    term: 'Request for Architecture Work',
    abbreviation: 'RAW',
    definition: 'A document from the sponsoring organization requesting the development of an architecture.',
    phases: ['preliminary', 'phase-a']
  },
  {
    id: 'enterprise-continuum',
    term: 'Enterprise Continuum',
    definition: 'A view of the Architecture Repository that provides methods for classifying architecture and solution artifacts.',
    relatedTerms: ['architecture-repository']
  }
];

// Helper functions
export function getTermById(id: string): GlossaryTerm | undefined {
  return glossary.find(t => t.id === id);
}

export function searchGlossary(query: string): GlossaryTerm[] {
  const q = query.toLowerCase();
  return glossary.filter(term =>
    term.term.toLowerCase().includes(q) ||
    term.abbreviation?.toLowerCase().includes(q) ||
    term.definition.toLowerCase().includes(q)
  );
}

export function getTermsByPhase(phaseId: string): GlossaryTerm[] {
  return glossary.filter(term => term.phases?.includes(phaseId));
}
```

#### 3.3.2 Glossary Page

```typescript
// src/app/glossary/page.tsx

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { glossary, GlossaryTerm } from '@/data/glossary';

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const filteredTerms = useMemo(() => {
    let terms = [...glossary].sort((a, b) => a.term.localeCompare(b.term));

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      terms = terms.filter(t =>
        t.term.toLowerCase().includes(q) ||
        t.abbreviation?.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q)
      );
    }

    if (selectedLetter) {
      terms = terms.filter(t => t.term.toUpperCase().startsWith(selectedLetter));
    }

    return terms;
  }, [searchQuery, selectedLetter]);

  // Group terms by first letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach(term => {
      const letter = term.term[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">TOGAF Glossary</h1>
        <p className="text-gray-400 mt-2">
          {glossary.length} terms and definitions from the TOGAF framework
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search terms..."
          className="w-full px-4 py-3 bg-[#1A2B48] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent"
        />
      </div>

      {/* Alphabet Filter */}
      <div className="flex flex-wrap gap-1 mb-8">
        <button
          onClick={() => setSelectedLetter(null)}
          className={`px-3 py-1 rounded-lg text-sm ${
            !selectedLetter ? 'bg-[#00BCD4] text-white' : 'bg-[#1A2B48] text-gray-400 hover:text-white'
          }`}
        >
          All
        </button>
        {alphabet.map(letter => (
          <button
            key={letter}
            onClick={() => setSelectedLetter(letter)}
            className={`px-3 py-1 rounded-lg text-sm ${
              selectedLetter === letter ? 'bg-[#00BCD4] text-white' : 'bg-[#1A2B48] text-gray-400 hover:text-white'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Terms List */}
      <div className="space-y-8">
        {Object.entries(groupedTerms).map(([letter, terms]) => (
          <div key={letter}>
            <h2 className="text-2xl font-bold text-[#00BCD4] mb-4">{letter}</h2>
            <div className="space-y-4">
              {terms.map(term => (
                <div
                  key={term.id}
                  id={term.id}
                  className="rounded-xl bg-[#0F172A] border border-gray-800 p-5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {term.term}
                        {term.abbreviation && (
                          <span className="ml-2 text-[#D4AF37]">({term.abbreviation})</span>
                        )}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-2 text-gray-400">{term.definition}</p>

                  {term.example && (
                    <div className="mt-3 p-3 bg-[#1A2B48]/50 rounded-lg border-l-2 border-[#D4AF37]">
                      <span className="text-sm text-[#D4AF37]">Example: </span>
                      <span className="text-sm text-gray-300">{term.example}</span>
                    </div>
                  )}

                  {term.relatedTerms && term.relatedTerms.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="text-sm text-gray-500">Related:</span>
                      {term.relatedTerms.map(relId => {
                        const related = glossary.find(t => t.id === relId);
                        return related ? (
                          <a
                            key={relId}
                            href={`#${relId}`}
                            className="text-sm text-[#007BFF] hover:underline"
                          >
                            {related.term}
                          </a>
                        ) : null;
                      })}
                    </div>
                  )}

                  {term.phases && term.phases.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="text-sm text-gray-500">Used in:</span>
                      {term.phases.map(phaseId => (
                        <Link
                          key={phaseId}
                          href={`/phases/${phaseId}`}
                          className="text-xs px-2 py-1 bg-[#00BCD4]/20 text-[#00BCD4] rounded-lg hover:bg-[#00BCD4]/30"
                        >
                          {phaseId}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No terms found matching your search.
        </div>
      )}
    </div>
  );
}
```

#### 3.3.3 Tooltip Component

```typescript
// src/components/GlossaryTooltip.tsx

'use client';

import { useState } from 'react';
import { getTermById } from '@/data/glossary';

interface GlossaryTooltipProps {
  termId: string;
  children: React.ReactNode;
}

export default function GlossaryTooltip({ termId, children }: GlossaryTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const term = getTermById(termId);

  if (!term) return <>{children}</>;

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="border-b border-dashed border-[#00BCD4] cursor-help">
        {children}
      </span>

      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-[#1A2B48] border border-gray-700 rounded-lg shadow-xl z-50">
          <div className="font-semibold text-white mb-1">
            {term.term}
            {term.abbreviation && <span className="text-[#D4AF37]"> ({term.abbreviation})</span>}
          </div>
          <div className="text-sm text-gray-400">{term.definition}</div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
            <div className="border-8 border-transparent border-t-[#1A2B48]" />
          </div>
        </div>
      )}
    </span>
  );
}
```

#### 3.3.4 Navigation Update

```typescript
// Add to Navigation.tsx navItems array
{
  href: '/glossary',
  label: 'Glossary',
  icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
}
```

### 3.4 Acceptance Criteria

- [ ] Glossary page displays all terms alphabetically
- [ ] Search filters terms in real-time
- [ ] Alphabet filter works correctly
- [ ] Related terms are clickable links
- [ ] Phase links navigate to correct pages
- [ ] Navigation includes Glossary link
- [ ] Tooltip component works on hover

---

## Implementation Checklist

### Phase 1A: LocalStorage Persistence (Day 1)
- [ ] Create `useLocalStorage` hook
- [ ] Update Wizard page to use persistence
- [ ] Update Stakeholders page to use persistence
- [ ] Add "Continue Learning" card to Dashboard
- [ ] Add "Reset Progress" functionality
- [ ] Test hydration (no SSR mismatch)
- [ ] Test across browser sessions

### Phase 1B: Search Functionality (Day 1-2)
- [ ] Create search index builder
- [ ] Implement search algorithm
- [ ] Build SearchModal component
- [ ] Add keyboard shortcut hook
- [ ] Integrate into Navigation
- [ ] Style search results
- [ ] Test keyboard navigation
- [ ] Test on mobile

### Phase 1C: TOGAF Glossary (Day 2-3)
- [ ] Create glossary data file
- [ ] Build Glossary page
- [ ] Add alphabet filter
- [ ] Add search filter
- [ ] Create GlossaryTooltip component
- [ ] Add Glossary to Navigation
- [ ] Test all links and filters

### Final Testing
- [ ] Cross-browser testing
- [ ] Mobile responsiveness
- [ ] Performance testing
- [ ] Accessibility review

---

## Success Metrics

| Feature | Metric | Target |
|---------|--------|--------|
| LocalStorage | Return user rate | +30% |
| Search | Time to find content | <5 seconds |
| Glossary | Page views | Top 5 pages |

---

## Appendix: File Structure After Phase 1

```
src/
├── app/
│   ├── glossary/
│   │   └── page.tsx          # NEW
│   └── ...existing pages
├── components/
│   ├── SearchModal.tsx       # NEW
│   ├── GlossaryTooltip.tsx   # NEW
│   └── ...existing
├── data/
│   ├── togaf-adm.ts
│   └── glossary.ts           # NEW
├── hooks/
│   ├── useLocalStorage.ts    # NEW
│   └── useKeyboardShortcut.ts # NEW
├── types/
│   ├── persistence.ts        # NEW
│   └── search.ts             # NEW
└── utils/
    ├── searchIndex.ts        # NEW
    └── search.ts             # NEW
```
