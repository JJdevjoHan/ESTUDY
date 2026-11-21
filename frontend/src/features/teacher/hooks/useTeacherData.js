import { useEffect, useState } from 'react';
import { fetchTeacherData } from '../services/teacherApi.js';

const EMPTY = {
  SUBJECT_NAMES: [],
  earlyWarningFlags: [],
  performanceGroups: [],
  recentUpdates: [],
};

export default function useTeacherData() {
  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    fetchTeacherData()
      .then((result) => {
        if (active) setData(result);
      })
      .catch(() => {
        if (active) setError('Could not load the teacher data.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { ...data, loading, error };
}