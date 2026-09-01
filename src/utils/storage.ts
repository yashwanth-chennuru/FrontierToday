import { Company, LaunchUpdate } from '../types';
import { INITIAL_COMPANIES, INITIAL_LAUNCHES } from '../data/seedData';

const STORAGE_KEYS = {
  COMPANIES: 'frontier_today_companies_v6',
  LAUNCHES: 'frontier_today_launches_v3',
  LAST_SYNC: 'frontier_today_last_sync',
};

export const getStoredCompanies = (): Company[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPANIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(INITIAL_COMPANIES));
      return INITIAL_COMPANIES;
    }
    const parsed: Company[] = JSON.parse(raw);
    
    // Reconcile with INITIAL_COMPANIES order while preserving any custom companies
    const initialMap = new Map(INITIAL_COMPANIES.map((c) => [c.id, c]));
    const customCompanies: Company[] = [];

    parsed.forEach((c) => {
      if (c.isCustom || !initialMap.has(c.id)) {
        customCompanies.push(c);
      }
    });

    // Guaranteed exact ordering from INITIAL_COMPANIES + custom labs
    const ordered = [...INITIAL_COMPANIES, ...customCompanies];
    localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(ordered));
    return ordered;
  } catch (e) {
    console.error('Error loading companies from localStorage:', e);
    return INITIAL_COMPANIES;
  }
};

export const saveStoredCompanies = (companies: Company[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(companies));
  } catch (e) {
    console.error('Error saving companies to localStorage:', e);
  }
};

export const getStoredLaunches = (): LaunchUpdate[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LAUNCHES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.LAUNCHES, JSON.stringify(INITIAL_LAUNCHES));
      return INITIAL_LAUNCHES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading launches from localStorage:', e);
    return INITIAL_LAUNCHES;
  }
};

export const saveStoredLaunches = (launches: LaunchUpdate[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.LAUNCHES, JSON.stringify(launches));
  } catch (e) {
    console.error('Error saving launches to localStorage:', e);
  }
};

export const resetToDefaults = (): { companies: Company[]; launches: LaunchUpdate[] } => {
  localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(INITIAL_COMPANIES));
  localStorage.setItem(STORAGE_KEYS.LAUNCHES, JSON.stringify(INITIAL_LAUNCHES));
  return {
    companies: INITIAL_COMPANIES,
    launches: INITIAL_LAUNCHES,
  };
};

export const exportDataAsJson = (): string => {
  const data = {
    exportedAt: new Date().toISOString(),
    version: '1.0',
    companies: getStoredCompanies(),
    launches: getStoredLaunches(),
  };
  return JSON.stringify(data, null, 2);
};

export const importDataFromJson = (jsonStr: string): { companies: Company[]; launches: LaunchUpdate[] } => {
  const parsed = JSON.parse(jsonStr);
  if (!parsed || !Array.isArray(parsed.companies) || !Array.isArray(parsed.launches)) {
    throw new Error('Invalid JSON format for Frontier Today data export.');
  }
  saveStoredCompanies(parsed.companies);
  saveStoredLaunches(parsed.launches);
  return {
    companies: parsed.companies,
    launches: parsed.launches,
  };
};
