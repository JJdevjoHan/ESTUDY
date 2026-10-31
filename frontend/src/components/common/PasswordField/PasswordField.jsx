import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import TextField from '../TextField/TextField.jsx';
import styles from './PasswordField.module.css';

export default function PasswordField(props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TextField
      {...props}
      type={isVisible ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setIsVisible((previous) => !previous)}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
        >
          {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      }
    />
  );
}
