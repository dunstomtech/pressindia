// src/config/firebase.js
// Production-safe Firebase initializer + safe Storage export
// - Exports: app, auth, db, storage (storage may be null if unavailable)
// - Guards browser-only APIs so builds don't crash
// - Provides small safe helpers for storage usage

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref as storageRefFactory } from "firebase/storage";
import errorHandler from "../utils/errorHandler.js";

/**
 * NOTE:
 * - Keep your actual secret values in Vite environment variables:
 *   VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID,
 *   VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID,
 *   VITE_FIREBASE_APP_ID, VITE_FIREBASE_MEASUREMENT_ID
 *
 * - These will be replaced at build time by Vite (import.meta.env).
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "", // may be empty
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "",
};

// Initialize app only on client (guard SSR/build)
let app = null;
let auth = null;
let db = null;
let storage = null;

if (typeof window !== "undefined") {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);

    // Guard storage initialization: only try if storageBucket provided
    if (firebaseConfig.storageBucket) {
      try {
        // getStorage may throw if bucket not properly configured; guard it
        storage = getStorage(app);
      } catch (e) {
        // non-fatal: mark storage unavailable and log
        storage = null;
        try {
          errorHandler.handle(e, "Firebase.getStorage");
        } catch {
          console.warn("Storage init failed", e);
        }
      }
    } else {
      // no storage bucket defined
      storage = null;
    }
  } catch (err) {
    // Defensive: log but do not throw to avoid breaking SSR/Vite build
    try {
      errorHandler.handle(err, "FirebaseInit");
    } catch {
      console.error("FirebaseInit error", err);
    }
    app = null;
    auth = null;
    db = null;
    storage = null;
  }
} else {
  // Server/build environment: keep exports defined (null) so imports do not break bundler
  app = null;
  auth = null;
  db = null;
  storage = null;
}

/** Helper: is Storage available at runtime */
function isStorageAvailable() {
  return storage !== null;
}

/** Helper: safe ref factory (returns null if storage unavailable) */
function safeRef(path) {
  if (!isStorageAvailable()) return null;
  try {
    return storageRefFactory(storage, path);
  } catch (err) {
    try {
      errorHandler.handle(err, "Storage.safeRef");
    } catch {
      console.warn("safeRef error", err);
    }
    return null;
  }
}

// Named exports — components import these directly
export { app, auth, db, storage, isStorageAvailable, safeRef };
export default app;
