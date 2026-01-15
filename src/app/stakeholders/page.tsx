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
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getInterestColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-blue-100 text-blue-700';
      case 'medium': return 'bg-purple-100 text-purple-700';
      case 'low': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Stakeholder Registry</h1>
          <p className="text-slate-600 mt-2">
            Manage stakeholders, their concerns, and engagement levels
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Stakeholder
        </button>
      </div>

      {/* Stakeholder Matrix Overview */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Stakeholder Matrix</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-slate-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-slate-700 mb-3">High Influence / High Interest</h3>
            <p className="text-xs text-slate-500 mb-2">Key Players - Manage Closely</p>
            <div className="space-y-2">
              {stakeholders
                .filter(s => s.influence === 'high' && s.interest === 'high')
                .map(s => (
                  <div key={s.id} className="text-sm bg-red-50 text-red-700 px-2 py-1 rounded">
                    {s.name}
                  </div>
                ))}
            </div>
          </div>
          <div className="border border-slate-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-slate-700 mb-3">High Influence / Low Interest</h3>
            <p className="text-xs text-slate-500 mb-2">Keep Satisfied</p>
            <div className="space-y-2">
              {stakeholders
                .filter(s => s.influence === 'high' && s.interest === 'low')
                .map(s => (
                  <div key={s.id} className="text-sm bg-amber-50 text-amber-700 px-2 py-1 rounded">
                    {s.name}
                  </div>
                ))}
            </div>
          </div>
          <div className="border border-slate-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Low Influence / High Interest</h3>
            <p className="text-xs text-slate-500 mb-2">Keep Informed</p>
            <div className="space-y-2">
              {stakeholders
                .filter(s => s.influence === 'low' && s.interest === 'high')
                .map(s => (
                  <div key={s.id} className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">
                    {s.name}
                  </div>
                ))}
            </div>
          </div>
          <div className="border border-slate-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Low Influence / Low Interest</h3>
            <p className="text-xs text-slate-500 mb-2">Monitor</p>
            <div className="space-y-2">
              {stakeholders
                .filter(s => s.influence === 'low' && s.interest === 'low')
                .map(s => (
                  <div key={s.id} className="text-sm bg-slate-50 text-slate-700 px-2 py-1 rounded">
                    {s.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              {editingId ? 'Edit Stakeholder' : 'Add New Stakeholder'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Organization</label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Influence</label>
                  <select
                    value={formData.influence}
                    onChange={(e) => setFormData({ ...formData, influence: e.target.value as 'high' | 'medium' | 'low' })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Interest</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value as 'high' | 'medium' | 'low' })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Relevant Phase</label>
                <input
                  type="text"
                  value={formData.phase}
                  onChange={(e) => setFormData({ ...formData, phase: e.target.value })}
                  placeholder="e.g., Phase A, All Phases"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Concerns</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={concernInput}
                    onChange={(e) => setConcernInput(e.target.value)}
                    placeholder="Add a concern"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addConcern())}
                  />
                  <button
                    type="button"
                    onClick={addConcern}
                    className="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.concerns.map((concern, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 rounded text-sm">
                      {concern}
                      <button
                        type="button"
                        onClick={() => removeConcern(i)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingId ? 'Update' : 'Add'} Stakeholder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stakeholder List */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-700">Name</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-700">Role</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-700">Organization</th>
                <th className="text-center px-6 py-3 text-sm font-medium text-slate-700">Influence</th>
                <th className="text-center px-6 py-3 text-sm font-medium text-slate-700">Interest</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-slate-700">Concerns</th>
                <th className="text-center px-6 py-3 text-sm font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {stakeholders.map((stakeholder) => (
                <tr key={stakeholder.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{stakeholder.name}</td>
                  <td className="px-6 py-4 text-slate-600">{stakeholder.role}</td>
                  <td className="px-6 py-4 text-slate-600">{stakeholder.organization}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-xs px-2 py-1 rounded ${getInfluenceColor(stakeholder.influence)}`}>
                      {stakeholder.influence}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-xs px-2 py-1 rounded ${getInterestColor(stakeholder.interest)}`}>
                      {stakeholder.interest}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {stakeholder.concerns.slice(0, 2).map((c, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">
                          {c}
                        </span>
                      ))}
                      {stakeholder.concerns.length > 2 && (
                        <span className="text-xs px-2 py-1 text-slate-500">
                          +{stakeholder.concerns.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => editStakeholder(stakeholder)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteStakeholder(stakeholder.id)}
                      className="text-red-600 hover:text-red-800"
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
          <div className="p-12 text-center text-slate-500">
            No stakeholders added yet. Click "Add Stakeholder" to get started.
          </div>
        )}
      </div>
    </div>
  );
}
