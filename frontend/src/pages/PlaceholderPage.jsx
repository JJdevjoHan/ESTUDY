import { Link } from 'react-router-dom';

import { ROUTES } from '../routes/paths.js';

// Temporary page until the real dashboards are built.
export default function PlaceholderPage({ title }) {
  return (
    <main style={{ padding: '48px 24px', textAlign: 'center' }}>
      <h1>{title}</h1>
      <p>Coming soon.</p>
      <Link to={ROUTES.LOGIN}>Back to login</Link>
    </main>
  );
}