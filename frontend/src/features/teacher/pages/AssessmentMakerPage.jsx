import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import TeacherLayout from '../components/TeacherLayout.jsx';
import { useClassData } from '../store/classStore.js';
import { useAssessments, addAssessment, deleteAssessment } from '../store/assessmentStore.js';
import widgets from '../components/Widgets.module.css';
import tools from '../components/ClassTools.module.css';
import styles from './AssessmentMakerPage.module.css';

const EMPTY_QUESTION = { text: '', choices: ['', '', '', ''], answer: 0 };
const LETTERS = ['A', 'B', 'C', 'D'];

export default function AssessmentMakerPage() {
  const { subjects } = useClassData();
  const assessments = useAssessments();

  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [draft, setDraft] = useState(EMPTY_QUESTION);
  const [message, setMessage] = useState(null); // { type: 'error' | 'success', text }

  const subjectName = (id) => subjects.find((subject) => subject.id === id)?.name ?? 'Unknown subject';

  const changeChoice = (index, value) => {
    setDraft((current) => ({
      ...current,
      choices: current.choices.map((choice, i) => (i === index ? value : choice)),
    }));
    setMessage(null);
  };

  const addQuestion = () => {
    const text = draft.text.trim();
    const choices = draft.choices.map((choice) => choice.trim());
    if (!text) {
      setMessage({ type: 'error', text: 'Write the question first.' });
      return;
    }
    if (choices.some((choice) => !choice)) {
      setMessage({ type: 'error', text: 'Fill in all four choices.' });
      return;
    }
    setQuestions((current) => [
      ...current,
      { id: `question-${Date.now()}`, text, choices, answer: draft.answer },
    ]);
    setDraft(EMPTY_QUESTION);
    setMessage(null);
  };

  const removeQuestion = (id) => {
    setQuestions((current) => current.filter((question) => question.id !== id));
  };

  const saveAssessment = () => {
    const result = addAssessment({ title, subjectId, questions });
    if (!result.ok) {
      setMessage({ type: 'error', text: result.error });
      return;
    }
    setTitle('');
    setSubjectId('');
    setQuestions([]);
    setDraft(EMPTY_QUESTION);
    setMessage({ type: 'success', text: 'Assessment saved.' });
  };

  const handleDelete = (assessment) => {
    if (window.confirm(`Delete ${assessment.title}?`)) {
      deleteAssessment(assessment.id);
    }
  };

  return (
    <TeacherLayout activeKey="assessment" title="ASSESSMENT MAKER">
      <div className={tools.panel}>
        <h2 className={tools.panelTitle}>New assessment</h2>

        <div className={tools.formRow}>
          <label className={tools.field}>
            <span>Title</span>
            <input
              type="text"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setMessage(null);
              }}
              placeholder="e.g. Quiz 1"
            />
          </label>

          <label className={tools.field}>
            <span>Subject</span>
            <select
              value={subjectId}
              onChange={(event) => {
                setSubjectId(event.target.value);
                setMessage(null);
              }}
            >
              <option value="">Choose a subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <h3 className={tools.panelTitle} style={{ marginTop: 18 }}>
          Add a question
        </h3>

        <label className={tools.field}>
          <span>Question</span>
          <input
            type="text"
            value={draft.text}
            onChange={(event) => {
              setDraft((current) => ({ ...current, text: event.target.value }));
              setMessage(null);
            }}
            placeholder="Write the question"
          />
        </label>

        <p className={tools.hint} style={{ marginTop: 10 }}>
          Choose the circle beside the right answer.
        </p>
        {draft.choices.map((choice, index) => (
          <div key={LETTERS[index]} className={styles.choiceRow}>
            <input
              type="radio"
              name="answer"
              checked={draft.answer === index}
              onChange={() => setDraft((current) => ({ ...current, answer: index }))}
              aria-label={`Choice ${LETTERS[index]} is the right answer`}
            />
            <input
              type="text"
              value={choice}
              onChange={(event) => changeChoice(index, event.target.value)}
              placeholder={`Choice ${LETTERS[index]}`}
            />
          </div>
        ))}

        <div className={tools.formActions} style={{ marginTop: 14 }}>
          <button type="button" className={tools.secondary} onClick={addQuestion}>
            <Plus size={16} aria-hidden="true" />
            Add question
          </button>
        </div>

        {questions.length > 0 && (
          <ol className={styles.questionList}>
            {questions.map((question) => (
              <li key={question.id}>
                {question.text} <span className={styles.answer}>Answer: {LETTERS[question.answer]}. {question.choices[question.answer]}</span>{' '}
                <button type="button" className={tools.danger} onClick={() => removeQuestion(question.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ol>
        )}

        <div className={tools.formActions} style={{ marginTop: 16 }}>
          <button type="button" className={tools.primary} onClick={saveAssessment}>
            Save assessment
          </button>
        </div>

        {message && (
          <p className={message.type === 'error' ? tools.error : tools.success} role="alert">
            {message.text}
          </p>
        )}
      </div>

      <section className={widgets.card}>
        <h2 className={widgets.cardTitle}>Saved assessments</h2>
        {assessments.length === 0 ? (
          <p className={styles.empty}>No assessments yet. Create one above.</p>
        ) : (
          <div className={widgets.tableWrap}>
            <table className={widgets.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Questions</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((assessment) => (
                  <tr key={assessment.id}>
                    <td>{assessment.title}</td>
                    <td>{subjectName(assessment.subjectId)}</td>
                    <td>{assessment.questions.length}</td>
                    <td>{assessment.createdOn}</td>
                    <td>
                      <button type="button" className={tools.danger} onClick={() => handleDelete(assessment)}>
                        <Trash2 size={16} aria-hidden="true" />
                        Delete
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