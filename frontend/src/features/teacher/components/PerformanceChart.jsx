import styles from './Widgets.module.css';

const COLORS = ['#972828', '#e45742', '#eb7f31'];
const MAX = 60;
const TICKS = [60, 50, 40, 30, 20, 10, 0];

export default function PerformanceChart({ subjects, groups }) {
  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Overall Performance Analytics</h2>

      <ul className={styles.legend}>
        {subjects.map((name, i) => (
          <li key={name}>
            <span className={styles.swatch} style={{ background: COLORS[i] }} />
            {name}
          </li>
        ))}
      </ul>

      <div className={styles.plot}>
        <div className={styles.yAxis} aria-hidden="true">
          {TICKS.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <div className={styles.chartArea}>
          <div className={styles.bars}>
            {groups.map((group) => (
              <div key={group.label} className={styles.group}>
                {group.values.map((value, i) => (
                  <div
                    key={subjects[i]}
                    className={styles.bar}
                    style={{ height: `${(value / MAX) * 100}%`, background: COLORS[i] }}
                    title={`${subjects[i]}: ${value}% of students`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className={styles.labels}>
            {groups.map((group) => (
              <span key={group.label}>{group.label}</span>
            ))}
          </div>
          <p className={styles.axisTitle}>Performance Quintiles (% of students)</p>
        </div>
      </div>
    </section>
  );
}