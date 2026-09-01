import React, { useState, useEffect } from 'react';
import { Company, LaunchUpdate, CategoryType } from '../types';
import { CATEGORIES_LIST } from '../data/seedData';
import { CompanyLogo } from './CompanyLogos';
import { X, Link as LinkIcon, Plus } from 'lucide-react';

interface LaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (launch: Omit<LaunchUpdate, 'id' | 'createdAt'>, existingId?: string) => void;
  companies: Company[];
  initialCompanyId?: string;
  initialDate?: string;
  editingLaunch?: LaunchUpdate | null;
}

export const LaunchModal: React.FC<LaunchModalProps> = ({
  isOpen,
  onClose,
  onSave,
  companies,
  initialCompanyId,
  initialDate,
  editingLaunch,
}) => {
  const [companyId, setCompanyId] = useState<string>(companies[0]?.id || 'anthropic');
  const [date, setDate] = useState<string>('2026-09-01');
  const [title, setTitle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [category, setCategory] = useState<CategoryType>('Foundation Model');
  const [linkUrl, setLinkUrl] = useState<string>('');
  const [linkLabel, setLinkLabel] = useState<string>('');
  const [tagsInput, setTagsInput] = useState<string>('');

  useEffect(() => {
    if (editingLaunch) {
      setCompanyId(editingLaunch.companyId);
      setDate(editingLaunch.date);
      setTitle(editingLaunch.title);
      setSummary(editingLaunch.summary || '');
      setCategory(editingLaunch.category);
      setTagsInput(editingLaunch.tags ? editingLaunch.tags.join(', ') : '');
      if (editingLaunch.links && editingLaunch.links.length > 0) {
        setLinkUrl(editingLaunch.links[0].url);
        setLinkLabel(editingLaunch.links[0].label);
      } else {
        setLinkUrl('');
        setLinkLabel('');
      }
    } else {
      setCompanyId(initialCompanyId || companies[0]?.id || 'anthropic');
      setDate(initialDate || '2026-09-01');
      setTitle('');
      setSummary('');
      setCategory('Foundation Model');
      setTagsInput('');
      setLinkUrl('');
      setLinkLabel('');
    }
  }, [editingLaunch, initialCompanyId, initialDate, isOpen, companies]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const links = linkUrl.trim()
      ? [
          {
            url: linkUrl.trim(),
            label: linkLabel.trim() || 'Link',
          },
        ]
      : undefined;

    onSave(
      {
        companyId,
        date,
        title: title.trim(),
        summary: summary.trim(),
        category,
        links,
        tags,
      },
      editingLaunch ? editingLaunch.id : undefined
    );
    onClose();
  };

  const selectedCompany = companies.find((c) => c.id === companyId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white dark:bg-[#1E1E22] rounded-2xl shadow-nordic-lg border border-black/10 dark:border-zinc-700/80 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-black/[0.08] dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-black/10 dark:border-zinc-700 flex items-center justify-center">
              {selectedCompany ? (
                <CompanyLogo logoKey={selectedCompany.logoKey} className="text-zinc-900 dark:text-zinc-100" size={18} />
              ) : (
                <Plus className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
              )}
            </div>
            <div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {editingLaunch ? 'Edit Frontier Launch' : 'Log Frontier Launch'}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Track AI model, feature, or benchmark release
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
          {/* Company & Date Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Frontier Lab / Company
              </label>
              <select
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 focus:border-black/40 dark:focus:border-zinc-500"
              >
                {companies.map((comp) => (
                  <option key={comp.id} value={comp.id}>
                    {comp.name} ({comp.shortName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Release Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 focus:border-black/40 dark:focus:border-zinc-500"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Launch / Update Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Fable 5.1, Agentic Video, Muse 2.0, o3 mini"
              required
              autoFocus
              className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 focus:border-black/40 dark:focus:border-zinc-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryType)}
              className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 focus:border-black/40 dark:focus:border-zinc-500"
            >
              {CATEGORIES_LIST.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Summary & Key Details
            </label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="What does this release include? Model capability, speed, reasoning improvements, or agent tools..."
              className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 focus:border-black/40 dark:focus:border-zinc-500 resize-none"
            />
          </div>

          {/* Link URL & Label */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1">
                <LinkIcon className="w-3 h-3 text-zinc-500 dark:text-zinc-400" /> Link URL
              </label>
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 focus:border-black/40 dark:focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Link Title / Source
              </label>
              <input
                type="text"
                value={linkLabel}
                onChange={(e) => setLinkLabel(e.target.value)}
                placeholder="e.g. Official Blog, Paper, GitHub"
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 focus:border-black/40 dark:focus:border-zinc-500"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Reasoning, 100M tokens, OpenWeights"
              className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 focus:border-black/40 dark:focus:border-zinc-500"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-black/[0.08] dark:border-zinc-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-xl shadow-nordic-sm transition-all"
            >
              {editingLaunch ? 'Update Launch' : 'Save to Tracker'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
