import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const rawAuthDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const rawProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
// Firebase Auth OAuth handler expects `<projectId>.firebaseapp.com` to avoid redirect_uri_mismatch on Google Sign-In
export const resolvedAuthDomain =
  rawAuthDomain && !rawAuthDomain.endsWith('.web.app')
    ? rawAuthDomain
    : rawProjectId
      ? `${rawProjectId}.firebaseapp.com`
      : 'deutschmeister-pro.firebaseapp.com';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: resolvedAuthDomain,
  projectId: rawProjectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const app =
  firebaseConfig.apiKey && firebaseConfig.apiKey !== 'your_api_key'
    ? initializeApp(firebaseConfig)
    : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const functions = app ? getFunctions(app) : null;
export const appId = firebaseConfig.appId || 'default-app-id';
