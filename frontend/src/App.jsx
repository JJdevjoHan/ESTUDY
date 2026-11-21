import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DiagnosticLandingPage from './features/diagnostic/pages/DiagnosticLandingPage.jsx';
import DiagnosticTestPage from './features/diagnostic/pages/DiagnosticTestPage.jsx';
import LoginPage from './features/auth/AuthenticationPages/LoginPage.jsx';
import RegisterPage from './features/auth/AuthenticationPages/RegisterPage.jsx';
import LandingPage from './features/landing/pages/LandingPage.jsx';
import RequireDiagnostic, { RequireAuth, RequireRole } from './routes/RequireDiagnostic.jsx';
import { ROUTES } from './routes/paths.js';
import { ROLES } from './features/auth/constants/roles.js';
import TeacherDashboardPage from './features/teacher/pages/TeacherDashboardPage.jsx';
import SubjectsPage from './features/teacher/pages/SubjectsPage.jsx';
import StudentProfilePage from './features/teacher/pages/StudentProfilePage.jsx';
import { TEACHER_ROUTES } from './features/teacher/routes/teacherPaths.js';
import StudentDashboardPage from './features/students/pages/StudentDashboardPage.jsx';
import ForgotPasswordPage from './features/auth/AuthenticationPages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './features/auth/AuthenticationPages/ResetPasswordPage.jsx';
import DiagnosticResultsPage from './features/diagnostic/pages/DiagnosticResultsPage.jsx';
import LogoutPage from './features/auth/AuthenticationPages/LogoutPage.jsx';
import AssessmentMakerPage from './features/teacher/pages/AssessmentMakerPage.jsx';
import ProfilePage from './features/profile/pages/ProfilePage.jsx';


function App() {
  return (
    <Router>
      <Routes>
       
        <Route element={<LandingPage />}>
          <Route index element={null} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
        </Route>
        
          <Route path={ROUTES.LOGOUT} element={<LogoutPage />} />

        <Route element={<RequireAuth />}>
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.DIAGNOSTIC} element={<DiagnosticLandingPage />} />
          <Route path={ROUTES.DIAGNOSTIC_TEST} element={<DiagnosticTestPage />} />
          <Route path={ROUTES.DIAGNOSTIC_RESULTS} element={<DiagnosticResultsPage />} />
        </Route>

        <Route element={<RequireRole role={ROLES.TEACHER} />}>
          <Route path={ROUTES.DASHBOARD_TEACHER} element={<TeacherDashboardPage />} />
          <Route path={TEACHER_ROUTES.SUBJECTS} element={<SubjectsPage />} />
          <Route path={TEACHER_ROUTES.STUDENT_PROFILE} element={<StudentProfilePage />} />
          <Route path={TEACHER_ROUTES.ASSESSMENT} element={<AssessmentMakerPage />} />
          <Route path={TEACHER_ROUTES.REQUESTS} element={<RequestQueuePage />} />
        </Route>

        {/* students must finish the diagnostic before the dashboard opens */}
        <Route element={<RequireRole role={ROLES.STUDENT} />}>
          <Route element={<RequireDiagnostic />}>
            <Route path={ROUTES.DASHBOARD_STUDENT} element={<StudentDashboardPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>

    </Router>
    
  );
}

export default App;