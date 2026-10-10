/**
 * Firebase Authentication Service
 *
 * Supports:
 * - Google Sign-In
 * - Email / Password Sign-In & Sign-Up
 * - Email verification sending
 * - Password reset
 * - Clean friendly English error messages (no technical codes)
 * - Safe account deletion with re-authentication support
 */

import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from './config';
import { AuthUser } from '../types';

export function mapFirebaseUser(user: User | null): AuthUser | null {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || (user.email ? user.email.split('@')[0] : 'Learner'),
    photoURL: user.photoURL,
    emailVerified: user.emailVerified
  };
}

/**
 * Translates Firebase Auth error codes into polite, simple English messages.
 */
export function formatAuthError(error: any): string {
  const code = error?.code || '';
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Incorrect email or password. Please check your credentials and try again.';
    case 'auth/email-already-in-use':
      return 'An account already exists with this email address. Try signing in instead.';
    case 'auth/weak-password':
      return 'Please choose a stronger password (at least 6 characters).';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed before completing. Please try again.';
    case 'auth/popup-blocked':
      return 'The sign-in popup was blocked by your browser. Please allow popups for this site.';
    case 'auth/network-request-failed':
      return 'Unable to reach the server. Please check your internet connection.';
    case 'auth/too-many-requests':
      return 'Too many unsuccessful attempts. Please wait a few moments before trying again.';
    case 'auth/requires-recent-login':
      return 'For your security, please sign in again before performing this action.';
    default:
      if (!isFirebaseConfigured()) {
        return 'Firebase is not yet configured for this deployment. You can continue using Guest Mode.';
      }
      return 'Could not complete sign-in. Please try again in a few moments.';
  }
}

/**
 * Sign in using Google OAuth popup
 */
export async function signInWithGoogle(): Promise<{ success: boolean; user?: AuthUser; message?: string }> {
  if (!isFirebaseConfigured() || !auth || !googleProvider) {
    return {
      success: false,
      message: 'Sign-in is currently unavailable because Firebase is not configured.'
    };
  }
  try {
    const cred = await signInWithPopup(auth, googleProvider);
    return { success: true, user: mapFirebaseUser(cred.user) || undefined };
  } catch (err: any) {
    return { success: false, message: formatAuthError(err) };
  }
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(
  email: string,
  pass: string
): Promise<{ success: boolean; user?: AuthUser; message?: string }> {
  if (!isFirebaseConfigured() || !auth) {
    return {
      success: false,
      message: 'Sign-in is currently unavailable because Firebase is not configured.'
    };
  }
  try {
    const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
    return { success: true, user: mapFirebaseUser(cred.user) || undefined };
  } catch (err: any) {
    return { success: false, message: formatAuthError(err) };
  }
}

/**
 * Sign up with email and password, sending an email verification link
 */
export async function signUpWithEmail(
  email: string,
  pass: string
): Promise<{ success: boolean; user?: AuthUser; message?: string; verificationSent?: boolean }> {
  if (!isFirebaseConfigured() || !auth) {
    return {
      success: false,
      message: 'Sign-up is currently unavailable because Firebase is not configured.'
    };
  }
  try {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
    let verificationSent = false;
    try {
      await sendEmailVerification(cred.user);
      verificationSent = true;
    } catch (e) {
      console.warn('Could not send verification email:', e);
    }
    return {
      success: true,
      user: mapFirebaseUser(cred.user) || undefined,
      verificationSent
    };
  } catch (err: any) {
    return { success: false, message: formatAuthError(err) };
  }
}

/**
 * Send password reset email
 */
export async function requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
  if (!isFirebaseConfigured() || !auth) {
    return {
      success: false,
      message: 'Password reset is currently unavailable because Firebase is not configured.'
    };
  }
  try {
    await sendPasswordResetEmail(auth, email.trim());
    return {
      success: true,
      message: 'Password reset email sent. Please check your inbox and spam folders.'
    };
  } catch (err: any) {
    return { success: false, message: formatAuthError(err) };
  }
}

/**
 * Sign out
 */
export async function signOutAccount(): Promise<void> {
  if (auth) {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  }
}

/**
 * Delete account with re-authentication if required
 */
export async function deleteUserAccount(
  passwordConfirmation?: string
): Promise<{ success: boolean; message?: string; requiresReauth?: boolean }> {
  if (!auth || !auth.currentUser) {
    return { success: false, message: 'No signed-in user found.' };
  }

  const currentUser = auth.currentUser;
  try {
    // If password provided for email-password account, re-authenticate first
    if (passwordConfirmation && currentUser.email) {
      const cred = EmailAuthProvider.credential(currentUser.email, passwordConfirmation);
      await reauthenticateWithCredential(currentUser, cred);
    }
    await deleteUser(currentUser);
    return { success: true };
  } catch (err: any) {
    if (err?.code === 'auth/requires-recent-login') {
      return {
        success: false,
        requiresReauth: true,
        message: 'For your security, please confirm your password or sign in again to delete your account.'
      };
    }
    return { success: false, message: formatAuthError(err) };
  }
}

/**
 * Auth state listener
 */
export function subscribeToAuthState(callback: (user: AuthUser | null) => void): () => void {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, (user) => {
    callback(mapFirebaseUser(user));
  });
}
