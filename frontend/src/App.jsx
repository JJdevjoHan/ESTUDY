import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DiagnosticLandingPage from './features/diagnostic/pages/DiagnosticLandingPage.jsx';
import DiagnosticTestPage from './features/diagnostic/pages/DiagnosticTestPage.jsx';
import LoginPage from './features/auth/AuthenticationPages/LoginPage.jsx';
import RegisterPage from './features/auth/AuthenticationPages/RegisterPage.jsx';
import PlaceholderPage from './pages/PlaceholderPage.jsx';
import RequireDiagnostic, { RequireAuth } from './routes/RequireDiagnostic.jsx';
import { ROUTES } from './routes/paths.js';
import TeacherDashboardPage from './features/teacher/pages/TeacherDashboardPage.jsx';
import SubjectsPage from './features/teacher/pages/SubjectsPage.jsx';
import StudentProfilePage from './features/teacher/pages/StudentProfilePage.jsx';
import { TEACHER_ROUTES } from './features/teacher/routes/teacherPaths.js';

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
          <Route element={<RequireRole role={ROLES.TEACHER} />}>
          <Route path={ROUTES.DASHBOARD_TEACHER} element={<TeacherDashboardPage />} />
          <Route path={TEACHER_ROUTES.SUBJECTS} element={<SubjectsPage />} />
          <Route path={TEACHER_ROUTES.STUDENT_PROFILE} element={<StudentProfilePage />} />
          </Route>
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
