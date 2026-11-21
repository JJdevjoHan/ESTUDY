// Loads the teacher data from public/data.json.
let cached = null;

export function fetchTeacherData() {
  if (!cached) {
    cached = fetch(`${import.meta.env.BASE_URL}data.json`)
      .then((response) => {
        if (!response.ok) throw new Error('Could not load data.json');
        return response.json();
      })
      .catch((error) => {
        cached = null;
        throw error;
      });
  }
  return cached;
}