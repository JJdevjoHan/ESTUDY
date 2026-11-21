import { useSyncExternalStore } from 'react';
import { fetchTeacherData } from '../services/teacherApi.js';

// Demo only. Saves the teacher's changes in this browser until the backend exists.
const STORAGE_KEY = 'teacherRecheckUpdates';
const listeners = new Set();

function loadUpdates() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
}

let requests = [];

function buildList(updates) {
  return requests.map((request) => ({ ...request, ...updates[request.id] }));
}

let updates = loadUpdates();
let snapshot = buildList(updates);

fetchTeacherData()
  .then((data) => {
    requests = data.recheckRequests;
    snapshot = buildList(updates);
    listeners.forEach((listener) => listener());
  })
  .catch(() => {});

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** All re-check requests with the teacher's changes. Updates on every page at once. */
export function useRechecks() {
  return useSyncExternalStore(subscribe, () => snapshot);
}

export function updateRecheck(id, changes) {
  updates = { ...updates, [id]: { ...updates[id], ...changes } };
  snapshot = buildList(updates);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updates));
  } catch {
    // Storage is not available. The change still works until refresh.
  }
  listeners.forEach((listener) => listener());
}