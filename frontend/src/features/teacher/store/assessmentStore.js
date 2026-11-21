import { useSyncExternalStore } from 'react';

// Demo only. Keeps the teacher's assessments in this browser.
const STORAGE_KEY = 'teacherAssessments';
const listeners = new Set();

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) return saved;
  } catch {
    // Nothing saved yet.
  }
  return [];
}

let assessments = load();

function setAssessments(next) {
  assessments = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage is not available. The change still works until refresh.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useAssessments() {
  return useSyncExternalStore(subscribe, () => assessments);
}

export function addAssessment({ title, subjectId, questions }) {
  const cleanTitle = String(title ?? '').trim();
  if (!cleanTitle) return { ok: false, error: 'Enter a title for the assessment.' };
  if (!subjectId) return { ok: false, error: 'Choose a subject.' };
  if (questions.length === 0) return { ok: false, error: 'Add at least one question.' };

  const assessment = {
    id: `assessment-${Date.now()}`,
    title: cleanTitle,
    subjectId,
    questions,
    createdOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  };
  setAssessments([...assessments, assessment]);
  return { ok: true };
}

export function deleteAssessment(id) {
  setAssessments(assessments.filter((assessment) => assessment.id !== id));
}