import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './features/auth/pages/LoginPage.jsx';
import RegisterPage from './features/auth/pages/RegisterPage.jsx';
import PlaceholderPage from './pages/PlaceholderPage.jsx';
import { ROUTES } from './routes/paths.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route
          path={ROUTES.DASHBOARD_STUDENT}
          element={<PlaceholderPage title="Student dashboard" />}
        />
        <Route
          path={ROUTES.DASHBOARD_TEACHER}
          element={<PlaceholderPage title="Teacher dashboard" />}
        />
        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>
    </Router>
  );
}

export default App;