import { GraduationCap, Presentation } from 'lucide-react';

import { ROLE_CONFIG, ROLES } from '../../constants/roles.js';
import styles from './RoleSelector.module.css';

const ROLE_ICONS = {
  [ROLES.STUDENT]: GraduationCap,
  [ROLES.TEACHER]: Presentation,
};

/**
 * The "I'm joining as a" picker. Two real radio buttons,
 * so keyboard and screen readers work out of the box.
 */
export default function RoleSelector({ value, onChange }) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>I&apos;m joining as a</legend>

      <div className={styles.options}>
        {Object.values(ROLES).map((role) => {
          const { title, description } = ROLE_CONFIG[role];
          const Icon = ROLE_ICONS[role];
          const isSelected = value === role;

          return (
            <label
              key={role}
              className={`${styles.option} ${isSelected ? styles.optionSelected : ''}`}
            >
              <Icon size={20} aria-hidden="true" className={styles.icon} />
              <span className={styles.text}>
                <span className={styles.title}>{title}</span>
                <span className={styles.description}>{description}</span>
              </span>
              <input
                type="radio"
                name="role"
                value={role}
                checked={isSelected}
                onChange={() => onChange(role)}
                className={styles.radio}
              />
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
