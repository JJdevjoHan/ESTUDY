import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './features/auth/SystemPages/LoginPage.jsx';
import RegisterPage from './features/auth/SystemPages/RegisterPage.jsx';
import DiagnosticLandingPage from './features/diagnostic/pages/DiagnosticLandingPage.jsx';
import DiagnosticTestPage from './features/diagnostic/pages/DiagnosticTestPage.jsx';
import PlaceholderPage from './pages/PlaceholderPage.jsx';
import RequireDiagnostic, { RequireAuth } from './routes/RequireDiagnostic.jsx';
import { ROUTES } from './routes/paths.js';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

        {/* Logged in, diagnostic not required yet */}
        <Route element={<RequireAuth />}>
          <Route path={ROUTES.DIAGNOSTIC} element={<DiagnosticLandingPage />} />
          <Route path={ROUTES.DIAGNOSTIC_TEST} element={<DiagnosticTestPage />} />
          <Route
            path={ROUTES.DIAGNOSTIC_RESULTS}
            element={<PlaceholderPage title="Diagnostic results" />}
          />
          <Route
            path={ROUTES.DASHBOARD_TEACHER}
            element={<PlaceholderPage title="Teacher dashboard" />}
          />
        </Route>

        {/* Locked until the diagnostic is done */}
        <Route element={<RequireDiagnostic />}>
          <Route
            path={ROUTES.DASHBOARD_STUDENT}
            element={<PlaceholderPage title="Student dashboard" />}
          />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
