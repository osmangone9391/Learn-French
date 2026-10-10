/**
 * Firebase Client SDK Configuration
 *
 * Reads standard public client config from Vite environment variables (VITE_FIREBASE_*).
 * No service account or secret keys are included here or in the client bundle.
 */

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

export interface FirebaseClientConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

export const firebaseConfig: FirebaseClientConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDL9yXkhpQd-LJrmxcBF8ReIdN8ZoivJdU',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'learn-french-23bcc.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'learn-french-23bcc',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'learn-french-23bcc.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '31820952920',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:31820952920:web:20dfb7d6705687dfd4612d',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-DC9Y2HJM1Y'
};

export function isFirebaseConfigured(): boolean {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
  );
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let googleProvider: GoogleAuthProvider | null = null;

if (isFirebaseConfigured()) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
  } catch (error) {
    console.error('Failed to initialize Firebase SDK:', error);
  }
}

export { app, auth, db, googleProvider };
