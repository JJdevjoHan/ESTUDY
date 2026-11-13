import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Upload, Trash2, UserPlus } from 'lucide-react';
import TeacherLayout from '../components/TeacherLayout.jsx';
import AddSubjectForm from '../components/AddSubjectForm.jsx';
import AddStudentForm from '../components/AddStudentForm.jsx';
import UploadStudents from '../components/UploadStudents.jsx';
import { useClassData, deleteSubject, dropStudent } from '../store/classStore.js';
import { getStatus, STATUS_LABELS } from '../utils/studentUtils.js';
import { studentProfilePath } from '../routes/teacherPaths.js';
import widgets from '../components/Widgets.module.css';
import tools from '../components/ClassTools.module.css';
import styles from './SubjectsPage.module.css';

const BADGE = {
  'on-track': widgets.good,
  'needs-attention': widgets.caution,
  'at-risk': widgets.critical,
};

export default function SubjectsPage() {
  const navigate = useNavigate();
  const { subjects, students } = useClassData();

  const [subjectId, setSubjectId] = useState(null);
  const [openPanel, setOpenPanel] = useState(null); // 'subject' | 'student' | 'upload' | null
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const subjectCards = subjects.map((subject) => {
    const enrolled = students.filter((s) => subject.id in s.scores);
    const total = enrolled.reduce((sum, s) => sum + s.scores[subject.id], 0);
    return {
      ...subject,
      count: enrolled.length,
      average: enrolled.length ? Math.round(total / enrolled.length) : 0,
    };
  });

  // If the chosen subject was deleted, fall back to the first one.
  const activeSubject = subjectCards.find((s) => s.id === subjectId) ?? subjectCards[0] ?? null;
  const activeId = activeSubject?.id ?? null;

  const rows = useMemo(() => {
    if (!activeId) return [];
    const text = query.trim().toLowerCase();
    return students
      .filter((s) => activeId in s.scores)
      .map((s) => ({ ...s, score: s.scores[activeId], status: getStatus(s.scores[activeId]) }))
      .filter((row) => row.name.toLowerCase().includes(text))
      .filter((row) => statusFilter === 'all' || row.status === statusFilter)
      .sort((a, b) => {
        if (sortBy === 'high') return b.score - a.score;
        if (sortBy === 'low') return a.score - b.score;
        return a.name.localeCompare(b.name);
      });
  }, [students, activeId, query, statusFilter, sortBy]);

  const togglePanel = (name) => setOpenPanel((current) => (current === name ? null : name));
  const closePanel = () => setOpenPanel(null);

  const handleSubjectAdded = (subject) => {
    setSubjectId(subject.id);
    closePanel();
  };

  const handleDeleteSubject = () => {
    const ok = window.confirm(
      `Delete ${activeSubject.name}? Its students will be removed from this subject.`
    );
    if (!ok) return;
    deleteSubject(activeId);
    setSubjectId(null);
    closePanel();
  };

  const handleDrop = (row) => {
    if (window.confirm(`Drop ${row.name} from ${activeSubject.name}?`)) {
      dropStudent(row.id, activeId);
    }
  };

  return (
    <TeacherLayout activeKey="subjects" title="SUBJECTS (STUDENTS)">
      <div className={tools.actionBar}>
        <button
          type="button"
          className={tools.secondary}
          disabled={!activeSubject}
          onClick={() => togglePanel('upload')}
        >
          <Upload size={16} aria-hidden="true" />
          Upload Excel
        </button>
        <button type="button" className={tools.primary} onClick={() => togglePanel('subject')}>
          <Plus size={16} aria-hidden="true" />
          Add Subject
        </button>
      </div>

      {openPanel === 'subject' && <AddSubjectForm onAdded={handleSubjectAdded} onClose={closePanel} />}
      {openPanel === 'upload' && activeSubject && (
        <UploadStudents subject={activeSubject} onClose={closePanel} />
      )}

      {!activeSubject ? (
        <section className={widgets.card}>
          <p className={styles.empty}>No subjects yet. Click Add Subject to start.</p>
        </section>
      ) : (
        <>
          <div className={styles.subjectGrid}>
            {subjectCards.map((subject) => (
              <button
                key={subject.id}
                type="button"
                className={`${styles.subjectBtn} ${subject.id === activeId ? styles.subjectActive : ''}`}
                onClick={() => setSubjectId(subject.id)}
              >
                <p className={styles.subjectName}>{subject.name}</p>
                <p className={styles.subjectMeta}>
                  {subject.count} {subject.count === 1 ? 'student' : 'students'} · Class average{' '}
                  {subject.average}%
                </p>
              </button>
            ))}
          </div>

          <section className={widgets.card}>
            <div className={styles.cardHeader}>
              <h2 className={widgets.cardTitle}>{activeSubject.name} Students</h2>
              <div className={styles.headerActions}>
                <button type="button" className={tools.secondary} onClick={() => togglePanel('student')}>
                  <UserPlus size={16} aria-hidden="true" />
                  Add Student
                </button>
                <button type="button" className={tools.danger} onClick={handleDeleteSubject}>
                  <Trash2 size={16} aria-hidden="true" />
                  Delete Subject
                </button>
              </div>
            </div>

            {openPanel === 'student' && (
              <div className={styles.panelSlot}>
                <AddStudentForm subject={activeSubject} onClose={closePanel} />
              </div>
            )}

            <div className={styles.toolbar}>
              <label className={styles.searchBox}>
                <Search size={16} aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search student name"
                  aria-label="Search student name"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>

              <select
                className={styles.select}
                aria-label="Filter by status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All statuses</option>
                <option value="at-risk">At Risk</option>
                <option value="needs-attention">Needs Attention</option>
                <option value="on-track">On Track</option>
              </select>

              <select
                className={styles.select}
                aria-label="Sort students"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort: Name</option>
                <option value="high">Sort: Highest score</option>
                <option value="low">Sort: Lowest score</option>
              </select>
            </div>

            {rows.length === 0 ? (
              <p className={styles.empty}>
                {activeSubject.count === 0
                  ? 'No students in this subject yet. Use Add Student or Upload Excel.'
                  : 'No students match your search.'}
              </p>
            ) : (
              <div className={widgets.tableWrap}>
                <table className={widgets.table}>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Score</th>
                      <th>Status</th>
                      <th>Engagement</th>
                      <th>Last Active</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.id}>
                        <td className={styles.nameCell}>{row.name}</td>
                        <td>
                          <div className={styles.scoreCell}>
                            <span>{row.score}%</span>
                            <div className={widgets.scoreTrack}>
                              <div className={widgets.scoreFill} style={{ width: `${row.score}%` }} />
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`${widgets.badge} ${BADGE[row.status]}`}>
                            {STATUS_LABELS[row.status]}
                          </span>
                        </td>
                        <td>{row.engagement}</td>
                        <td>{row.lastActive}</td>
                        <td>
                          <div className={styles.rowActions}>
                            <button
                              type="button"
                              className={widgets.viewBtn}
                              onClick={() => navigate(studentProfilePath(row.id))}
                            >
                              View Profile
                            </button>
                            <button
                              type="button"
                              className={styles.dropBtn}
                              onClick={() => handleDrop(row)}
                            >
                              Drop
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </TeacherLayout>
  );
}