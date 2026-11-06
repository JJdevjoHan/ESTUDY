import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherLayout from '../components/TeacherLayout.jsx';
import { useRechecks, updateRecheck } from '../store/recheckStore.js';
import { studentProfilePath } from '../routes/teacherPaths.js';
import widgets from '../components/Widgets.module.css';
import styles from './RequestQueuePage.module.css';

const TABS = [
  { key: 'in-review', label: 'Pending' },
  { key: 'resolved', label: 'Resolved' },
  { key: 'all', label: 'All' },
];

const OUTCOME_LABELS = {
  approved: 'Approved. Score was re-checked',
  declined: 'Original score kept',
};

export default function RequestQueuePage() {
  const navigate = useNavigate();
  const requests = useRechecks();
  const [tab, setTab] = useState('in-review');
  const [selectedId, setSelectedId] = useState(null);
  const [note, setNote] = useState('');

  const counts = {
    'in-review': requests.filter((r) => r.status === 'in-review').length,
    resolved: requests.filter((r) => r.status === 'resolved').length,
    all: requests.length,
  };

  const visible = tab === 'all' ? requests : requests.filter((r) => r.status === tab);
  const selected = requests.find((r) => r.id === selectedId) ?? null;
  const isResolved = selected?.status === 'resolved';

  const openRequest = (request) => {
    setSelectedId(request.id);
    setNote(request.note ?? '');
  };

  const resolve = (outcome) => {
    updateRecheck(selected.id, {
      status: 'resolved',
      outcome,
      note: note.trim(),
      resolvedOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    });
  };

  const reopen = () => {
    updateRecheck(selected.id, { status: 'in-review', outcome: null, note: '', resolvedOn: null });
    setNote('');
  };

  return (
    <TeacherLayout activeKey="requests" title="REQUEST QUEUE">
      <div className={styles.tabs} role="tablist">
        {TABS.map((item) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={tab === item.key}
            className={`${styles.tab} ${tab === item.key ? styles.tabActive : ''}`}
            onClick={() => setTab(item.key)}
          >
            {item.label} ({counts[item.key]})
          </button>
        ))}
      </div>

      <div className={styles.layout}>
        <section className={widgets.card}>
          <h2 className={widgets.cardTitle}>Re-check Requests</h2>

          {visible.length === 0 ? (
            <p className={styles.empty}>No requests in this list.</p>
          ) : (
            <div className={widgets.tableWrap}>
              <table className={widgets.table}>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Subject</th>
                    <th>Activity</th>
                    <th>Question #</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((request) => (
                    <tr
                      key={request.id}
                      className={request.id === selectedId ? styles.rowSelected : ''}
                    >
                      <td>{request.student}</td>
                      <td>{request.subject}</td>
                      <td>{request.activity}</td>
                      <td>{request.question}</td>
                      <td>{request.date}</td>
                      <td>
                        <span
                          className={`${widgets.badge} ${
                            request.status === 'resolved' ? widgets.resolved : widgets.inReview
                          }`}
                        >
                          {request.status === 'resolved' ? 'Resolved' : 'In Review'}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className={widgets.viewBtn}
                          onClick={() => openRequest(request)}
                        >
                          {request.status === 'resolved' ? 'View' : 'Review'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <aside className={widgets.card}>
          {!selected ? (
            <p className={styles.empty}>Choose a request and click Review to see the details.</p>
          ) : (
            <>
              <h2 className={widgets.cardTitle}>Review request</h2>

              <dl className={styles.facts}>
                <dt>Student</dt>
                <dd>{selected.student}</dd>
                <dt>Subject</dt>
                <dd>{selected.subject}</dd>
                <dt>Activity</dt>
                <dd>{selected.activity}</dd>
                <dt>Question</dt>
                <dd>{selected.question}</dd>
                <dt>Requested</dt>
                <dd>{selected.date}</dd>
              </dl>

              <p className={styles.blockLabel}>Student's reason</p>
              <p className={styles.blockText}>{selected.reason}</p>

              <p className={styles.blockLabel}>Student's answer</p>
              <p className={styles.blockText}>{selected.answer}</p>

              {isResolved ? (
                <>
                  <p className={styles.blockLabel}>Decision</p>
                  <p className={styles.blockText}>
                    {OUTCOME_LABELS[selected.outcome]}
                    {selected.resolvedOn ? ` on ${selected.resolvedOn}` : ''}
                    {selected.note ? `\n${selected.note}` : ''}
                  </p>
                  <div className={styles.actions}>
                    <button type="button" className={styles.secondary} onClick={reopen}>
                      Reopen request
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <label className={styles.blockLabel} htmlFor="teacher-note">
                    Note to student (optional)
                  </label>
                  <textarea
                    id="teacher-note"
                    className={styles.textarea}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Explain your decision"
                  />
                  <div className={styles.actions}>
                    <button type="button" className={styles.primary} onClick={() => resolve('approved')}>
                      Approve re-check
                    </button>
                    <button type="button" className={styles.secondary} onClick={() => resolve('declined')}>
                      Keep original score
                    </button>
                  </div>
                </>
              )}

              <button
                type="button"
                className={styles.linkBtn}
                onClick={() => navigate(studentProfilePath(selected.studentId))}
              >
                View student profile
              </button>
            </>
          )}
        </aside>
      </div>
    </TeacherLayout>
  );
}