import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

/**
 * Public Firebase web configuration for the Ludo Live project. Firebase API keys
 * identify the project, rather than authorising database access; access remains
 * governed by Authentication and Realtime Database Rules.
 */
const firebaseConfig = {
  apiKey: 'AIzaSyA95r32ggvPlbfYn-FOClbqv9R37HWEi7o',
  authDomain: 'ludo-eede8.firebaseapp.com',
  databaseURL: 'https://ludo-eede8-default-rtdb.firebaseio.com',
  projectId: 'ludo-eede8',
  storageBucket: 'ludo-eede8.firebasestorage.app',
  messagingSenderId: '925784697518',
  appId: '1:925784697518:web:823aa7b284ea534f991b3f',
  measurementId: 'G-1754421LE0',
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const database = getDatabase(firebaseApp);

/** Establishes a lightweight player session when Anonymous Auth is enabled. */
export async function ensurePlayerSession() {
  if (auth.currentUser) return auth.currentUser;
  const credential = await signInAnonymously(auth);
  return credential.user;
}
