import React, { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import {
  signInWithPopup,
  signOut,
  User
} from 'firebase/auth';
import { X, Lock, LogOut, CheckCircle2, ShieldAlert } from 'lucide-react';

const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || '').trim();

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const isOwner = currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        setErrorMsg('Access denied. This Google account does not have administrative privileges.');
      } else {
        onClose();
      }
    } catch (e: any) {
      if (e.code === 'auth/configuration-not-found' || e.code === 'auth/operation-not-allowed') {
        setErrorMsg(
          'Google Sign-in provider needs to be enabled once in Firebase Console > Authentication > Sign-in method.'
        );
      } else {
        setErrorMsg(e.message || 'Sign-in failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setErrorMsg(null);
    } catch (e: any) {
      setErrorMsg(e.message || 'Sign-out failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-sm bg-white dark:bg-[#1E1E22] rounded-2xl shadow-nordic-lg border border-black/10 dark:border-zinc-700/80 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-black/[0.08] dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white ${
              isOwner ? 'bg-emerald-600' : 'bg-zinc-900 dark:bg-white dark:text-zinc-950'
            }`}>
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {isOwner ? 'Admin Active' : 'Admin Login'}
              </h2>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                {isOwner ? 'Edit mode enabled' : 'Authorized administrator access'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentUser ? (
            <div className="flex flex-col items-center text-center space-y-4">
              {isOwner ? (
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-200 dark:border-amber-800">
                  <ShieldAlert className="w-6 h-6" />
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {isOwner ? 'Administrator' : 'Guest Account'}
                </p>
                {isOwner ? (
                  <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    Edit Mode Active
                  </span>
                ) : (
                  <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                    Read-Only
                  </span>
                )}
              </div>

              {isOwner ? (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Your updates and releases are synced directly to Cloud Firestore.
                </p>
              ) : (
                <p className="text-xs text-rose-600 dark:text-rose-400 leading-relaxed">
                  This account does not have administrative privileges.
                </p>
              )}

              <div className="w-full pt-2">
                <button
                  onClick={handleSignOut}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-black/10 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Sign in with your Google administrator account to create, edit, or remove launches.
              </p>

              {/* 1-Click Google Sign In */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-black/15 dark:border-zinc-700 hover:border-black/30 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-900 dark:text-zinc-100 transition-all shadow-nordic-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
