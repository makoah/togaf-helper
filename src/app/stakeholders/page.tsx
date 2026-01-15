'use client';

import { useState } from 'react';

interface Stakeholder {
  id: string;
  name: string;
  role: string;
  organization: string;
  concerns: string[];
  influence: 'high' | 'medium' | 'low';
  interest: 'high' | 'medium' | 'low';
  phase: string;
  notes: string;
}

const defaultStakeholders: Stakeholder[] = [
  {
    id: '1',
    name: 'Example: CIO',
    role: 'Chief Information Officer',
    organization: 'IT Leadership',
    concerns: ['Strategic alignment', 'Cost management', 'Risk mitigation'],
    influence: 'high',
    interest: 'high',
    phase: 'All Phases',
    notes: 'Key sponsor for the architecture initiative',
  },
];

export default function StakeholdersPage() {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>(defaultStakeholders);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Stakeholder, 'id'>>({
    name: '',
    role: '',
    organization: '',
    concerns: [],
    influence: 'medium',
    interest: 'medium',
    phase: '',
    notes: '',
  });
  const [concernInput, setConcernInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setStakeholders(stakeholders.map(s =>
        s.id === editingId ? { ...formData, id: editingId } : s
      ));
    } else {
      const newStakeholder: Stakeholder = {
        ...formData,
        id: Date.now().toString(),
      };
      setStakeholders([...stakeholders, newStakeholder]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      organization: '',
      concerns: [],
      influence: 'medium',
      interest: 'medium',
      phase: '',
      notes: '',
    });
    setConcernInput('');
    setShowForm(false);
    setEditingId(null);
  };

  const editStakeholder = (stakeholder: Stakeholder) => {
    setFormData({
      name: stakeholder.name,
      role: stakeholder.role,
      organization: stakeholder.organization,
      concerns: stakeholder.concerns,
      influence: stakeholder.influence,
      interest: stakeholder.interest,
      phase: stakeholder.phase,
      notes: stakeholder.notes,
    });
    setEditingId(stakeholder.id);
    setShowForm(true);
  };

  const deleteStakeholder = (id: string) => {
    setStakeholders(stakeholders.filter(s => s.id !== id));
  };

  const addConcern = () => {
    if (concernInput.trim()) {
      setFormData({
        ...formData,
        concerns: [...formData.concerns, concernInput.trim()],
      });
      setConcernInput('');
    }
  };

  const removeConcern = (index: number) => {
    setFormData({
      ...formData,
      concerns: formData.concerns.filter((_, i) => i !== index),
    });
  };

  const getInfluenceColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-rose-500/20 text-rose-300 border border-rose-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
      case 'low': return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
      default: return 'bg-white/10 text-gray-300 border border-white/10';
    }
  };

  const getInterestColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-violet-500/20 text-violet-300 border border-violet-500/30';
      case 'medium': return 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30';
      case 'low': return 'bg-white/10 text-gray-400 border border-white/10';
      default: return 'bg-white/10 text-gray-400 border border-white/10';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Stakeholder Registry
          </h1>
          <p className="text-gray-500 mt-2">
            Manage stakeholders, their concerns, and engagement levels
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5"
        >
          + Add Stakeholder
        </button>
      </div>

      {/* Stakeholder Matrix Overview */}
      <div className="rounded-2xl bg-[#12121a] border border-white/5 p-6 mb-8">
        <h2 className="text-xl font-semibold text-white mb-6">Stakeholder Matrix</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-4">
            <h3 className="text-sm font-medium text-rose-300 mb-2">High Influence / High Interest</h3>
            <p className="text-xs text-gray-500 mb-3">Key Players - Manage Closely</p>
            <div className="space-y-2">
              {stakeholders
                .filter(s => s.influence === 'high' && s.interest === 'high')
                .map(s => (
                  <div key={s.id} className="text-sm bg-rose-500/20 text-rose-200 px-3 py-1.5 rounded-lg border border-rose-500/30">
                    {s.name}
                  </div>
                ))}
            </div>
          </div>
          <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-4">
            <h3 className="text-sm font-medium text-amber-300 mb-2">High Influence / Low Interest</h3>
            <p className="text-xs text-gray-500 mb-3">Keep Satisfied</p>
            <div className="space-y-2">
              {stakeholders
                .filter(s => s.influence === 'high' && s.interest === 'low')
                .map(s => (
                  <div key={s.id} className="text-sm bg-amber-500/20 text-amber-200 px-3 py-1.5 rounded-lg border border-amber-500/30">
                    {s.name}
                  </div>
                ))}
            </div>
          </div>
          <div className="rounded-xl bg-violet-500/10 border border-violet-500/20 p-4">
            <h3 className="text-sm font-medium text-violet-300 mb-2">Low Influence / High Interest</h3>
            <p className="text-xs text-gray-500 mb-3">Keep Informed</p>
            <div className="space-y-2">
              {stakeholders
                .filter(s => s.influence === 'low' && s.interest === 'high')
                .map(s => (
                  <div key={s.id} className="text-sm bg-violet-500/20 text-violet-200 px-3 py-1.5 rounded-lg border border-violet-500/30">
                    {s.name}
                  </div>
                ))}
            </div>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Low Influence / Low Interest</h3>
            <p className="text-xs text-gray-600 mb-3">Monitor</p>
            <div className="space-y-2">
              {stakeholders
                .filter(s => s.influence === 'low' && s.interest === 'low')
                .map(s => (
                  <div key={s.id} className="text-sm bg-white/10 text-gray-300 px-3 py-1.5 rounded-lg border border-white/10">
                    {s.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <h2 className="text-xl font-semibold text-white mb-6">
              {editingId ? 'Edit Stakeholder' : 'Add New Stakeholder'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Organization</label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Influence</label>
                  <select
                    value={formData.influence}
                    onChange={(e) => setFormData({ ...formData, influence: e.target.value as 'high' | 'medium' | 'low' })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  >
                    <option value="high" className="bg-[#12121a]">High</option>
                    <option value="medium" className="bg-[#12121a]">Medium</option>
                    <option value="low" className="bg-[#12121a]">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Interest</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value as 'high' | 'medium' | 'low' })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  >
                    <option value="high" className="bg-[#12121a]">High</option>
                    <option value="medium" className="bg-[#12121a]">Medium</option>
                    <option value="low" className="bg-[#12121a]">Low</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Relevant Phase</label>
                <input
                  type="text"
                  value={formData.phase}
                  onChange={(e) => setFormData({ ...formData, phase: e.target.value })}
                  placeholder="e.g., Phase A, All Phases"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Concerns</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={concernInput}
                    onChange={(e) => setConcernInput(e.target.value)}
                    placeholder="Add a concern"
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addConcern())}
                  />
                  <button
                    type="button"
                    onClick={addConcern}
                    className="px-4 py-3 bg-white/10 text-gray-300 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.concerns.map((concern, i) => (
                    <span key={i} className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-500/20 text-violet-300 rounded-lg text-sm border border-violet-500/30">
                      {concern}
                      <button
                        type="button"
                        onClick={() => removeConcern(i)}
                        className="text-violet-400 hover:text-rose-400 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-white/10 text-gray-300 rounded-xl hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-500/30 transition-all"
                >
                  {editingId ? 'Update' : 'Add'} Stakeholder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stakeholder List */}
      <div className="rounded-2xl bg-[#12121a] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Name</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Role</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Organization</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-400">Influence</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-400">Interest</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Concerns</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {stakeholders.map((stakeholder) => (
                <tr key={stakeholder.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{stakeholder.name}</td>
                  <td className="px-6 py-4 text-gray-400">{stakeholder.role}</td>
                  <td className="px-6 py-4 text-gray-400">{stakeholder.organization}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-xs px-2.5 py-1 rounded-lg ${getInfluenceColor(stakeholder.influence)}`}>
                      {stakeholder.influence}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-xs px-2.5 py-1 rounded-lg ${getInterestColor(stakeholder.interest)}`}>
                      {stakeholder.interest}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {stakeholder.concerns.slice(0, 2).map((c, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-white/10 text-gray-300 rounded-lg border border-white/10">
                          {c}
                        </span>
                      ))}
                      {stakeholder.concerns.length > 2 && (
                        <span className="text-xs px-2 py-1 text-gray-500">
                          +{stakeholder.concerns.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => editStakeholder(stakeholder)}
                      className="text-violet-400 hover:text-violet-300 mr-4 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteStakeholder(stakeholder.id)}
                      className="text-rose-400 hover:text-rose-300 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {stakeholders.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-gray-500">No stakeholders added yet. Click &quot;Add Stakeholder&quot; to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
