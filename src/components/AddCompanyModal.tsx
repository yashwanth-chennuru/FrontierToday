import React, { useState } from 'react';
import { Company } from '../types';
import { X, Building2 } from 'lucide-react';

interface AddCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCompany: (company: Company) => void;
}

export const AddCompanyModal: React.FC<AddCompanyModalProps> = ({
  isOpen,
  onClose,
  onAddCompany,
}) => {
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [tagline, setTagline] = useState('');
  const [country, setCountry] = useState('USA');
  const [website, setWebsite] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newComp: Company = {
      id,
      name: name.trim(),
      shortName: (shortName.trim() || name.trim()).slice(0, 15),
      tagline: tagline.trim() || 'Frontier AI Research & Products',
      brandColor: '#27272A',
      accentColor: '#18181B',
      country: country.trim() || 'Global',
      website: website.trim() ? (website.startsWith('http') ? website : `https://${website}`) : 'https://ai.com',
      logoKey: id,
      isCustom: true,
    };

    onAddCompany(newComp);
    setName('');
    setShortName('');
    setTagline('');
    setWebsite('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-white dark:bg-[#1E1E22] rounded-2xl shadow-nordic-lg border border-black/10 dark:border-zinc-700/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-black/[0.08] dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Add Frontier Lab</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Track an additional lab or startup</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Company / Lab Name *
            </label>
            <input
              type="text"
              required
              autoFocus
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!shortName) setShortName(e.target.value.split(' ')[0]);
              }}
              placeholder="e.g. Mistral AI, Cognition, Cursor, Adept"
              className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 focus:border-black/40 dark:focus:border-zinc-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Short Name (Header)
              </label>
              <input
                type="text"
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
                placeholder="e.g. Mistral"
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 focus:border-black/40 dark:focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Country / Region
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. France, USA, UK"
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 focus:border-black/40 dark:focus:border-zinc-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Tagline / Focus
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Open models & European AI sovereignty"
              className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 focus:border-black/40 dark:focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Website URL
            </label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://mistral.ai"
              className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 focus:border-black/40 dark:focus:border-zinc-500"
            />
          </div>

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
              Add Lab to Grid
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
