import React from 'react';
import { ShieldCheck, Lock, Globe, Trash2, Download, EyeOff, X } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[90vh] bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] overflow-hidden flex flex-col text-stone-900 dark:text-stone-100 sepia:text-[#382716]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800 sepia:border-[#E8DEC7] bg-stone-50/70 dark:bg-stone-900/50 sepia:bg-[#EDE3CB]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 sepia:bg-[#EDE3CB] text-emerald-700 dark:text-emerald-400 sepia:text-[#8C4712] flex items-center justify-center">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base">Privacy Policy</h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 sepia:text-[#78644E]">
                Plain English • GDPR-compliant • Users in France & worldwide
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 sepia:hover:bg-[#E5D7BD] text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-stone-700 dark:text-stone-300 sepia:text-[#4A3825] leading-relaxed">
          <section className="space-y-1.5">
            <h4 className="font-semibold text-sm text-stone-900 dark:text-stone-100 sepia:text-[#382716] flex items-center gap-1.5">
              <Lock size={14} className="text-amber-600 dark:text-amber-400" />
              1. What We Collect
            </h4>
            <p>
              When you use LireFacile, we only collect what is strictly necessary to teach you French and remember your progress:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-1 text-[11px] text-stone-600 dark:text-stone-400 sepia:text-[#644E35]">
              <li><strong>Sign-in details:</strong> Your email address and display name provided by Google or entered during sign-up.</li>
              <li><strong>Learning progress:</strong> Your saved vocabulary, Leitner box intervals, read story records, quiz attempts, and daily streak counts.</li>
              <li><strong>App preferences:</strong> Your selected theme, font size, audio playback speed, and translation settings.</li>
            </ul>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-semibold text-sm text-stone-900 dark:text-stone-100 sepia:text-[#382716] flex items-center gap-1.5">
              <Globe size={14} className="text-sky-600 dark:text-sky-400" />
              2. Where Data is Stored (European Union)
            </h4>
            <p>
              Your account and synchronization data is hosted in the <strong>European Union</strong> (Firestore in Paris, France / Belgium). We adhere to European General Data Protection Regulation (GDPR) standards.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-semibold text-sm text-stone-900 dark:text-stone-100 sepia:text-[#382716] flex items-center gap-1.5">
              <EyeOff size={14} className="text-purple-600 dark:text-purple-400" />
              3. Zero Tracking, Zero Ads, Zero Data Selling
            </h4>
            <p>
              We do <strong>not</strong> sell, rent, or share your personal information. We do <strong>not</strong> include third-party advertising, commercial tracking pixels, or cross-site tracking cookies.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-semibold text-sm text-stone-900 dark:text-stone-100 sepia:text-[#382716] flex items-center gap-1.5">
              <Download size={14} className="text-emerald-600 dark:text-emerald-400" />
              4. Exporting Your Data
            </h4>
            <p>
              You can download a full copy of your learning progress at any time via <strong>Settings → Export Backup</strong>.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-semibold text-sm text-stone-900 dark:text-stone-100 sepia:text-[#382716] flex items-center gap-1.5">
              <Trash2 size={14} className="text-rose-600 dark:text-rose-400" />
              5. Deleting Your Account & Data
            </h4>
            <p>
              You have the right to be forgotten. Clicking <strong>&quot;Delete my account and all data&quot;</strong> in the account menu immediately and permanently removes your database documents, cached local files, and authentication record from our servers.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-stone-100 dark:border-stone-800 sepia:border-[#E8DEC7] bg-stone-50/70 dark:bg-stone-900/50 sepia:bg-[#EDE3CB]/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white dark:text-stone-950 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
