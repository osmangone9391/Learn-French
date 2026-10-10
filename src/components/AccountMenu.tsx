import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  LogOut,
  RefreshCw,
  Trash2,
  ShieldCheck,
  Check,
  AlertCircle,
  CloudOff,
  ChevronDown,
  Lock,
  MailCheck
} from 'lucide-react';
import { AuthUser, SyncStatus } from '../types';
import { deleteUserAccount } from '../firebase/auth';

interface AccountMenuProps {
  user: AuthUser | null;
  syncStatus: SyncStatus;
  onOpenAuth: () => void;
  onOpenPrivacy: () => void;
  onSignOut: () => void;
  onTriggerSync: () => void;
  onAccountDeleted: () => void;
}

export const AccountMenu: React.FC<AccountMenuProps> = ({
  user,
  syncStatus,
  onOpenAuth,
  onOpenPrivacy,
  onSignOut,
  onTriggerSync,
  onAccountDeleted
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    // Guest Mode Header Trigger
    return (
      <button
        onClick={onOpenAuth}
        className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 sepia:bg-[#EDE3CB] sepia:hover:bg-[#E5D7BD] text-stone-800 dark:text-stone-200 sepia:text-[#382716] transition-colors cursor-pointer text-xs font-semibold border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6]"
        title="Sign in to sync your progress across devices"
      >
        <User size={13} />
        <span>Sign In</span>
      </button>
    );
  }

  // Signed In Mode Header Trigger
  const initial = (user.displayName || user.email || 'U').charAt(0).toUpperCase();

  const syncText =
    syncStatus === 'synced'
      ? 'Synced'
      : syncStatus === 'syncing'
      ? 'Syncing...'
      : syncStatus === 'offline'
      ? 'Offline, will sync later'
      : 'Sync failed, retrying';

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeleting(true);
    setDeleteError(null);
    const res = await deleteUserAccount(deletePassword || undefined);
    setIsDeleting(false);
    if (res.success) {
      setShowDeleteConfirm(false);
      onAccountDeleted();
    } else {
      setDeleteError(res.message || 'Could not delete account.');
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 py-1 px-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 sepia:hover:bg-[#EDE3CB] transition-colors cursor-pointer border border-transparent hover:border-stone-200 dark:hover:border-stone-700 sepia:hover:border-[#DDCFB6]"
        title={`Account: ${user.email} (${syncText})`}
      >
        <div className="relative">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || ''}
              className="w-6 h-6 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-amber-700 dark:bg-amber-600 sepia:bg-[#8C4712] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
              {initial}
            </div>
          )}
          {/* Sync indicator dot */}
          <span
            className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full ring-1 ring-white dark:ring-stone-900 ${
              syncStatus === 'synced'
                ? 'bg-emerald-500'
                : syncStatus === 'syncing'
                ? 'bg-amber-500 animate-pulse'
                : syncStatus === 'offline'
                ? 'bg-stone-400'
                : 'bg-rose-500'
            }`}
          />
        </div>

        <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 sepia:text-[#382716] max-w-[80px] truncate hidden sm:inline">
          {user.displayName || user.email?.split('@')[0]}
        </span>
        <ChevronDown size={12} className="text-stone-500 dark:text-stone-400 sepia:text-[#78644E]" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] py-2 z-50 text-stone-900 dark:text-stone-100 sepia:text-[#382716] animate-in fade-in zoom-in-95">
          {/* User Info Header */}
          <div className="px-4 py-2.5 border-b border-stone-100 dark:border-stone-800 sepia:border-[#E8DEC7]">
            <div className="text-xs font-bold text-stone-900 dark:text-stone-100 sepia:text-[#382716] truncate">
              {user.displayName || 'Learner'}
            </div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 sepia:text-[#78644E] truncate flex items-center gap-1 mt-0.5">
              <span>{user.email}</span>
              {user.emailVerified && (
                <MailCheck size={12} className="text-emerald-600 dark:text-emerald-400 shrink-0" title="Email verified" />
              )}
            </div>
          </div>

          {/* Sync Status Banner */}
          <div className="px-4 py-2.5 flex items-center justify-between text-xs border-b border-stone-100 dark:border-stone-800 sepia:border-[#E8DEC7]">
            <div className="flex items-center gap-1.5 min-w-0">
              {syncStatus === 'synced' && <Check size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />}
              {syncStatus === 'syncing' && <RefreshCw size={14} className="text-amber-600 dark:text-amber-400 animate-spin shrink-0" />}
              {syncStatus === 'offline' && <CloudOff size={14} className="text-stone-400 shrink-0" />}
              {syncStatus === 'error' && <AlertCircle size={14} className="text-rose-600 dark:text-rose-400 shrink-0" />}
              <span className="text-[11px] text-stone-600 dark:text-stone-400 sepia:text-[#644E35] truncate">
                {syncText}
              </span>
            </div>
            <button
              onClick={onTriggerSync}
              className="text-[10px] font-semibold text-amber-800 dark:text-amber-400 sepia:text-[#8C4712] hover:underline cursor-pointer shrink-0"
            >
              Sync Now
            </button>
          </div>

          {/* Actions */}
          <div className="py-1">
            <button
              onClick={() => { setIsOpen(false); onOpenPrivacy(); }}
              className="w-full px-4 py-2 flex items-center gap-2.5 text-xs text-stone-700 dark:text-stone-300 sepia:text-[#4A3825] hover:bg-stone-50 dark:hover:bg-stone-800/60 sepia:hover:bg-[#EDE3CB]/60 transition-colors cursor-pointer text-left"
            >
              <ShieldCheck size={14} className="text-stone-400" />
              <span>Privacy Policy</span>
            </button>

            <button
              onClick={() => { setIsOpen(false); onSignOut(); }}
              className="w-full px-4 py-2 flex items-center gap-2.5 text-xs text-stone-700 dark:text-stone-300 sepia:text-[#4A3825] hover:bg-stone-50 dark:hover:bg-stone-800/60 sepia:hover:bg-[#EDE3CB]/60 transition-colors cursor-pointer text-left"
            >
              <LogOut size={14} className="text-stone-400" />
              <span>Sign Out</span>
            </button>

            <button
              onClick={() => { setIsOpen(false); setShowDeleteConfirm(true); }}
              className="w-full px-4 py-2 flex items-center gap-2.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 sepia:hover:bg-rose-100/60 transition-colors cursor-pointer text-left"
            >
              <Trash2 size={14} />
              <span>Delete my account & data</span>
            </button>
          </div>
        </div>
      )}

      {/* Delete Account Modal Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div
            className="w-full max-w-sm bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] space-y-4 text-stone-900 dark:text-stone-100 sepia:text-[#382716]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/70 sepia:bg-rose-200/80 text-rose-700 dark:text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 size={24} />
            </div>

            <div className="text-center space-y-1">
              <h4 className="font-serif font-bold text-base text-rose-700 dark:text-rose-400">
                Permanently Delete Account?
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 sepia:text-[#644E35] leading-relaxed">
                This will permanently delete all your cloud documents (saved words, reading stats, review history) and delete your login account. This cannot be undone.
              </p>
            </div>

            {deleteError && (
              <div className="p-2.5 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 rounded-xl text-xs">
                {deleteError}
              </div>
            )}

            <form onSubmit={handleDeleteAccount} className="space-y-3 pt-1">
              {/* Optional password prompt if reauth is needed */}
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                  Confirm Password (if using email account):
                </label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-2.5 text-stone-400" />
                  <input
                    type="password"
                    placeholder="Enter current password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2 bg-stone-50 dark:bg-stone-800 sepia:bg-[#EDE3CB] border border-stone-300 dark:border-stone-700 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-2 px-3 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isDeleting}
                  className="flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Everything'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
