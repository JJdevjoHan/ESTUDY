// Reads an Excel or CSV file and finds the student columns by their header names.

const MAX_ROWS = 500;

export const FIELD_LABELS = {
  name: 'Name',
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  score: 'Score',
  engagement: 'Engagement',
  subject: 'Subject',
};

function normalizeHeader(header) {
  return String(header)
    .toLowerCase()
    .replace(/[_\-.]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Other names a teacher might use for each column.
const ALIASES = Object.entries({
  name: ['name', 'student', 'student name', 'full name', 'fullname', 'complete name', 'pangalan'],
  firstName: ['first name', 'firstname', 'given name'],
  lastName: ['last name', 'lastname', 'surname', 'family name'],
  email: ['email', 'e-mail', 'email address', 'school email'],
  score: ['score', 'grade', 'average', 'percent', 'percentage', 'mark', 'marks', 'final grade', 'rating'],
  engagement: ['engagement', 'participation', 'activity level'],
  subject: ['subject', 'course', 'class', 'subject name'],
}).map(([field, names]) => [field, names.map(normalizeHeader)]);

const text = (value) => String(value ?? '').trim();

function detectColumns(headers) {
  const columns = {};
  headers.forEach((header) => {
    const key = normalizeHeader(header);
    const match = ALIASES.find(([field, names]) => !columns[field] && names.includes(key));
    if (match) columns[match[0]] = header;
  });
  return columns;
}

function readName(record, columns) {
  if (columns.name) return text(record[columns.name]);
  return [record[columns.firstName], record[columns.lastName]]
    .map(text)
    .filter(Boolean)
    .join(' ');
}

// Accepts 85, "85", "85%" and Excel percent cells like 0.85.
function readScore(value) {
  if (text(value) === '') return null;
  const raw = typeof value === 'number' ? value : Number(text(value).replace('%', ''));
  if (Number.isNaN(raw)) return null;
  const percent = raw > 0 && raw < 1 ? raw * 100 : raw;
  return Math.min(100, Math.max(0, Math.round(percent)));
}

function readEngagement(value) {
  const first = text(value).charAt(0).toLowerCase();
  if (first === 'h') return 'High';
  if (first === 'l') return 'Low';
  return 'Medium';
}

/** Turns the sheet records into student rows. */
export function rowsFromRecords(records) {
  if (records.length === 0) {
    throw new Error('No rows were found. Put the headers in the first row.');
  }
  if (records.length > MAX_ROWS) {
    throw new Error(`Please upload ${MAX_ROWS} rows or fewer.`);
  }

  const columns = detectColumns(Object.keys(records[0]));
  if (!columns.name && !columns.firstName && !columns.lastName) {
    throw new Error('I could not find a Name column. Rename the header to "Name" and try again.');
  }

  const rows = [];
  const skipped = [];

  records.forEach((record, index) => {
    const rowNumber = index + 2; // row 1 is the header
    if (Object.values(record).every((value) => text(value) === '')) return;

    const name = readName(record, columns);
    if (!name) {
      skipped.push(`Row ${rowNumber}: no student name`);
      return;
    }

    const score = columns.score ? readScore(record[columns.score]) : null;
    rows.push({
      name,
      email: columns.email ? text(record[columns.email]) : '',
      score: score ?? 0,
      hasScore: score !== null,
      engagement: columns.engagement ? readEngagement(record[columns.engagement]) : 'Medium',
      subject: columns.subject ? text(record[columns.subject]) : '',
    });
  });

  if (rows.length === 0) throw new Error('No students were found in this file.');

  const detected = Object.entries(columns).map(([field, header]) => ({
    label: FIELD_LABELS[field],
    header: String(header),
  }));

  return { rows, skipped, detected };
}

export async function parseStudentSheet(file) {
  // Loaded only when a file is chosen, so the rest of the app stays light.
  const XLSX = await import('xlsx');

  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  if (!sheet) throw new Error('This file has no sheet to read.');

  const records = XLSX.utils.sheet_to_json(sheet, { defval: '', blankrows: true });
  return rowsFromRecords(records);
}