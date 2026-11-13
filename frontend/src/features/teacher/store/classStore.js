import { useSyncExternalStore } from 'react';
import {
  subjects as sampleSubjects,
  students as sampleStudents,
} from '../data/teacherMockData.js';

// Demo only. Keeps the teacher's subjects and students in this browser
// until the backend is connected.
const STORAGE_KEY = 'teacherClassData';
const listeners = new Set();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved?.subjects) && Array.isArray(saved?.students)) {
      return saved;
    }
  } catch {
    // Nothing saved yet or the saved text is broken. Use the sample data.
  }
  return { subjects: sampleSubjects, students: sampleStudents };
}

let state = loadState();

function setState(next) {
  state = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage is not available. The change still works until refresh.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** The subjects and students. Updates on every page at once. */
export function useClassData() {
  return useSyncExternalStore(subscribe, () => state);
}

// Helpers

const cleanText = (value) => String(value ?? '').trim();
const sameText = (a, b) => cleanText(a).toLowerCase() === cleanText(b).toLowerCase();

function newStudentId() {
  return `s-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function makeSubjectId(name, subjects) {
  const base =
    cleanText(name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'subject';
  let id = base;
  let count = 2;
  while (subjects.some((subject) => subject.id === id)) {
    id = `${base}-${count}`;
    count += 1;
  }
  return id;
}

function withoutKey(object, key) {
  return Object.fromEntries(Object.entries(object).filter(([name]) => name !== key));
}

function findStudent(students, { name, email }) {
  const mail = cleanText(email).toLowerCase();
  return students.find(
    (student) =>
      (mail && cleanText(student.email).toLowerCase() === mail) ||
      sameText(student.name, name)
  );
}

function buildStudent({ name, email, engagement }, subjectId, score) {
  return {
    id: newStudentId(),
    name: cleanText(name),
    email: cleanText(email),
    engagement: engagement || 'Medium',
    lastActive: 'Just added',
    scores: { [subjectId]: score },
  };
}

// Actions. Each one returns { ok, ... } so the forms can show a message.

export function addSubject(name) {
  const clean = cleanText(name);
  if (!clean) return { ok: false, error: 'Enter a subject name.' };
  if (state.subjects.some((subject) => sameText(subject.name, clean))) {
    return { ok: false, error: `${clean} already exists.` };
  }

  const subject = { id: makeSubjectId(clean, state.subjects), name: clean };
  setState({ ...state, subjects: [...state.subjects, subject] });
  return { ok: true, subject };
}

export function deleteSubject(subjectId) {
  const subjects = state.subjects.filter((subject) => subject.id !== subjectId);
  const students = state.students
    .map((student) => ({ ...student, scores: withoutKey(student.scores, subjectId) }))
    // A student with no subject left is removed from the class.
    .filter((student) => Object.keys(student.scores).length > 0);
  setState({ subjects, students });
}

export function addStudent({ subjectId, name, email, score, engagement }) {
  const cleanName = cleanText(name);
  if (!cleanName) return { ok: false, error: 'Enter the student name.' };

  const cleanEmail = cleanText(email);
  if (cleanEmail && !/^\S+@\S+\.\S+$/.test(cleanEmail)) {
    return { ok: false, error: 'That email does not look right.' };
  }

  const number = Number(score);
  if (cleanText(score) === '' || Number.isNaN(number) || number < 0 || number > 100) {
    return { ok: false, error: 'Score must be a number from 0 to 100.' };
  }
  const rounded = Math.round(number);

  const existing = findStudent(state.students, { name: cleanName, email: cleanEmail });
  if (existing && subjectId in existing.scores) {
    return { ok: false, error: `${existing.name} is already in this subject.` };
  }

  const students = existing
    ? state.students.map((student) =>
        student.id === existing.id
          ? { ...student, scores: { ...student.scores, [subjectId]: rounded } }
          : student
      )
    : [
        ...state.students,
        buildStudent({ name: cleanName, email: cleanEmail, engagement }, subjectId, rounded),
      ];

  setState({ ...state, students });
  return {
    ok: true,
    message: existing
      ? `${existing.name} was added to this subject.`
      : `${cleanName} was added.`,
  };
}

export function dropStudent(studentId, subjectId) {
  const students = state.students
    .map((student) =>
      student.id === studentId
        ? { ...student, scores: withoutKey(student.scores, subjectId) }
        : student
    )
    // A student with no subject left is removed from the class.
    .filter((student) => Object.keys(student.scores).length > 0);
  setState({ ...state, students });
}

export function importStudents(rows, fallbackSubjectId) {
  let subjects = [...state.subjects];
  const students = state.students.map((student) => ({
    ...student,
    scores: { ...student.scores },
  }));
  const summary = { added: 0, enrolled: 0, updated: 0, newSubjects: 0 };

  rows.forEach((row) => {
    let subjectId = fallbackSubjectId;

    if (row.subject) {
      const match = subjects.find((subject) => sameText(subject.name, row.subject));
      if (match) {
        subjectId = match.id;
      } else {
        const created = { id: makeSubjectId(row.subject, subjects), name: row.subject };
        subjects = [...subjects, created];
        subjectId = created.id;
        summary.newSubjects += 1;
      }
    }

    if (!subjectId) return;

    const existing = findStudent(students, row);
    if (existing) {
      if (subjectId in existing.scores) {
        summary.updated += 1;
      } else {
        summary.enrolled += 1;
      }
      existing.scores[subjectId] = row.score;
    } else {
      students.push(buildStudent(row, subjectId, row.score));
      summary.added += 1;
    }
  });

  setState({ subjects, students });
  return summary;
}