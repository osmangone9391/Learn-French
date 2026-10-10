import React, { useState } from 'react';
import { UploadCloud, Check, X, ShieldAlert } from 'lucide-react';

interface GuestMigrationPromptProps {
  isOpen: boolean;
  onConfirmMerge: () => void;
  onDismiss: () => void;
}

export const GuestMigrationPrompt: React.FC<GuestMigrationPromptProps> = ({
  isOpen,
  onConfirmMerge,
  onDismiss
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div
        className="w-full max-w-md bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] space-y-4 text-stone-900 dark:text-stone-100 sepia:text-[#382716]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/70 sepia:bg-[#EDE3CB] text-amber-800 dark:text-amber-300 sepia:text-[#8C4712] flex items-center justify-center mx-auto shadow-2xs">
          <UploadCloud size={24} />
        </div>

        <div className="text-center space-y-1.5">
          <h3 className="font-serif font-bold text-lg sm:text-xl">
            Add your guest progress?
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 sepia:text-[#644E35] leading-relaxed">
            We noticed previous reading history, vocabulary cards, and quiz scores saved on this browser. Would you like to merge this progress into your account?
          </p>
        </div>

        <div className="p-3 bg-stone-50 dark:bg-stone-900/60 sepia:bg-[#EDE3CB]/60 rounded-xl border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] text-[11px] text-stone-500 dark:text-stone-400 sepia:text-[#78644E] leading-relaxed flex items-start gap-2">
          <ShieldAlert size={15} className="shrink-0 text-amber-700 dark:text-amber-400 mt-0.5" />
          <span>
            Safe merge: Your cloud account data is never overwritten. If you choose &quot;Keep Separate&quot;, your browser guest progress remains untouched.
          </span>
        </div>

        <div className="flex items-center gap-2.5 pt-2">
          <button
            type="button"
            onClick={onDismiss}
            className="flex-1 py-2.5 px-3 rounded-xl border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6] text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 sepia:hover:bg-[#EDE3CB] cursor-pointer transition-colors"
          >
            Keep Separate
          </button>
          <button
            type="button"
            onClick={onConfirmMerge}
            className="flex-1 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white dark:text-stone-950 sepia:bg-[#382716] text-white text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Check size={14} />
            <span>Add to Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};
