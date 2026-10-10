import React, { useState } from 'react';
import {
  LogIn,
  UserPlus,
  KeyRound,
  Mail,
  Lock,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  X,
  ShieldCheck
} from 'lucide-react';
import {
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  requestPasswordReset
} from '../firebase/auth';
import { isFirebaseConfigured } from '../firebase/config';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrivacy: () => void;
}

type AuthMode = 'signin' | 'signup' | 'forgot';

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onOpenPrivacy
}) => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage(null);
    const res = await signInWithGoogle();
    setLoading(false);
    if (res.success) {
      resetForm();
      onClose();
    } else {
      setErrorMessage(res.message || 'Could not sign in with Google');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    if (mode === 'signin') {
      const res = await signInWithEmail(email, password);
      setLoading(false);
      if (res.success) {
        resetForm();
        onClose();
      } else {
        setErrorMessage(res.message || 'Incorrect email or password');
      }
    } else if (mode === 'signup') {
      if (password.length < 6) {
        setLoading(false);
        setErrorMessage('Password must be at least 6 characters long.');
        return;
      }
      const res = await signUpWithEmail(email, password);
      setLoading(false);
      if (res.success) {
        if (res.verificationSent) {
          setSuccessMessage('Account created! A verification email has been sent to ' + email);
        }
        setTimeout(() => {
          resetForm();
          onClose();
        }, 1500);
      } else {
        setErrorMessage(res.message || 'Could not create account');
      }
    } else if (mode === 'forgot') {
      const res = await requestPasswordReset(email);
      setLoading(false);
      if (res.success) {
        setSuccessMessage(res.message);
      } else {
        setErrorMessage(res.message || 'Could not send reset email');
      }
    }
  };

  const isConfigured = isFirebaseConfigured();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] overflow-hidden flex flex-col text-stone-900 dark:text-stone-100 sepia:text-[#382716]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800 sepia:border-[#E8DEC7] bg-stone-50/70 dark:bg-stone-900/50 sepia:bg-[#EDE3CB]/60">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-amber-600 dark:text-amber-400" />
            <h3 className="font-serif font-bold text-base">
              {mode === 'signin' && 'Sign in to LireFacile'}
              {mode === 'signup' && 'Create your account'}
              {mode === 'forgot' && 'Reset your password'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 sepia:hover:bg-[#E5D7BD] text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {!isConfigured && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/60 sepia:bg-[#EDE3CB] border border-amber-300 dark:border-amber-800 sepia:border-[#DDCFB6] rounded-2xl text-xs text-amber-900 dark:text-amber-200 sepia:text-[#8C4712] space-y-1">
              <div className="font-semibold">Notice: Firebase is not yet connected</div>
              <div>
                Add your <code>VITE_FIREBASE_*</code> keys in Netlify to enable cloud login. You can continue reading in <strong>Guest Mode</strong> without an account.
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/60 sepia:bg-rose-100/70 border border-rose-300 dark:border-rose-800 sepia:border-rose-400 rounded-2xl text-xs text-rose-900 dark:text-rose-200 sepia:text-rose-950 flex items-start gap-2">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 sepia:bg-emerald-100/70 border border-emerald-300 dark:border-emerald-800 sepia:border-emerald-400 rounded-2xl text-xs text-emerald-900 dark:text-emerald-200 sepia:text-emerald-950 flex items-start gap-2">
              <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Mode Switcher Tabs */}
          {mode !== 'forgot' && (
            <div className="grid grid-cols-2 p-1 bg-stone-100 dark:bg-stone-800 sepia:bg-[#EDE3CB] rounded-2xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => { setMode('signin'); setErrorMessage(null); }}
                className={`py-2 rounded-xl transition-all cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-white dark:bg-stone-900 sepia:bg-[#FAF4E6] shadow-xs text-stone-900 dark:text-white sepia:text-[#382716]'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setMode('signup'); setErrorMessage(null); }}
                className={`py-2 rounded-xl transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-white dark:bg-stone-900 sepia:bg-[#FAF4E6] shadow-xs text-stone-900 dark:text-white sepia:text-[#382716]'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                Create Account
              </button>
            </div>
          )}

          {/* Google Button */}
          {mode !== 'forgot' && (
            <div>
              <button
                type="button"
                disabled={loading || !isConfigured}
                onClick={handleGoogleSignIn}
                className="w-full py-2.5 px-4 rounded-xl border border-stone-300 dark:border-stone-700 sepia:border-[#DDCFB6] hover:bg-stone-50 dark:hover:bg-stone-800 sepia:hover:bg-[#EDE3CB] text-xs font-semibold flex items-center justify-center gap-2.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
                <span>Continue with Google</span>
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200 dark:border-stone-800 sepia:border-[#E8DEC7]" />
                </div>
                <div className="relative flex justify-center text-[11px] uppercase">
                  <span className="bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] px-2 text-stone-400">
                    Or with email
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 sepia:text-[#644E35] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-3 text-stone-400" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-stone-50 dark:bg-stone-800 sepia:bg-[#EDE3CB] border border-stone-300 dark:border-stone-700 sepia:border-[#DDCFB6] rounded-xl text-stone-900 dark:text-stone-100 sepia:text-[#382716] focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 sepia:text-[#644E35]">
                    Password
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => { setMode('forgot'); setErrorMessage(null); }}
                      className="text-[10px] text-amber-700 dark:text-amber-400 sepia:text-[#8C4712] hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-3 text-stone-400" />
                  <input
                    type="password"
                    required
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-stone-50 dark:bg-stone-800 sepia:bg-[#EDE3CB] border border-stone-300 dark:border-stone-700 sepia:border-[#DDCFB6] rounded-xl text-stone-900 dark:text-stone-100 sepia:text-[#382716] focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !isConfigured}
              className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white dark:text-stone-950 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50 shadow-xs"
            >
              {loading ? (
                <span>Please wait...</span>
              ) : (
                <>
                  {mode === 'signin' && <LogIn size={14} />}
                  {mode === 'signup' && <UserPlus size={14} />}
                  {mode === 'forgot' && <KeyRound size={14} />}
                  <span>
                    {mode === 'signin' && 'Sign In'}
                    {mode === 'signup' && 'Create Account'}
                    {mode === 'forgot' && 'Send Reset Email'}
                  </span>
                </>
              )}
            </button>
          </form>

          {mode === 'forgot' && (
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => { setMode('signin'); setErrorMessage(null); }}
                className="text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 cursor-pointer underline"
              >
                Back to Sign In
              </button>
            </div>
          )}

          {/* Privacy Note */}
          <div className="pt-2 text-center text-[11px] text-stone-500 dark:text-stone-400 sepia:text-[#78644E] flex items-center justify-center gap-1">
            <ShieldCheck size={13} className="text-emerald-600 dark:text-emerald-400" />
            <span>Learning data stored in the EU.</span>
            <button
              onClick={() => { onClose(); onOpenPrivacy(); }}
              className="text-amber-800 dark:text-amber-400 sepia:text-[#8C4712] underline hover:text-amber-900 cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>

          {/* Guest Mode option */}
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 sepia:border-[#E8DEC7] text-center">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-stone-600 dark:text-stone-400 sepia:text-[#644E35] hover:text-stone-900 dark:hover:text-stone-100 font-medium cursor-pointer"
            >
              Continue without an account (Guest Mode) →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
