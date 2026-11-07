import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import TeacherLayout from '../components/TeacherLayout.jsx';
import { subjects, students } from '../data/teacherMockData.js';
import { getStatus, STATUS_LABELS } from '../utils/studentUtils.js';
import { studentProfilePath } from '../routes/teacherPaths.js';
import widgets from '../components/Widgets.module.css';
import styles from './SubjectsPage.module.css';

const BADGE = {
  'on-track': widgets.good,
  'needs-attention': widgets.caution,
  'at-risk': widgets.critical,
};

export default function SubjectsPage() {
  const navigate = useNavigate();
  const [subjectId, setSubjectId] = useState(subjects[0].id);
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

  const rows = useMemo(() => {
    const text = query.trim().toLowerCase();
    return students
      .filter((s) => subjectId in s.scores)
      .map((s) => ({ ...s, score: s.scores[subjectId], status: getStatus(s.scores[subjectId]) }))
      .filter((row) => row.name.toLowerCase().includes(text))
      .filter((row) => statusFilter === 'all' || row.status === statusFilter)
      .sort((a, b) => {
        if (sortBy === 'high') return b.score - a.score;
        if (sortBy === 'low') return a.score - b.score;
        return a.name.localeCompare(b.name);
      });
  }, [subjectId, query, statusFilter, sortBy]);

  const activeSubject = subjectCards.find((s) => s.id === subjectId);

  return (
    <TeacherLayout activeKey="subjects" title="SUBJECTS (STUDENTS)">
      <div className={styles.subjectGrid}>
        {subjectCards.map((subject) => (
          <button
            key={subject.id}
            type="button"
            className={`${styles.subjectBtn} ${subject.id === subjectId ? styles.subjectActive : ''}`}
            onClick={() => setSubjectId(subject.id)}
          >
            <p className={styles.subjectName}>{subject.name}</p>
            <p className={styles.subjectMeta}>
              {subject.count} students · Class average {subject.average}%
            </p>
          </button>
        ))}
      </div>

      <section className={widgets.card}>
        <h2 className={widgets.cardTitle}>{activeSubject.name} Students</h2>

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
          <p className={styles.empty}>No students match your search.</p>
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
                      <button
                        type="button"
                        className={widgets.viewBtn}
                        onClick={() => navigate(studentProfilePath(row.id))}
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </TeacherLayout>
  );
}