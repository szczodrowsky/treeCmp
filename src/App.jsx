import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import Dashboard from "./components/Dashboard/Dashboard";
import PhyloView from "./components/Dashboard/PhyloView/PhyloView";
import MetricsDetail from "./components/Dashboard/OutputFiles/MetricsDetail";
import useAxiosInterceptor from "./hooks/useAxiosInterceptor";
import ConfirmEmailPage from "./components/ConfirmEmailPage/ConfirmEmailPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage/ResetPasswordPage";
import ResendConfirmationPage from "./components/ResendConfirmationPage/ResendConfirmationPage";
import ConfirmationSentPage from "./components/ConfirmationSentPage/ConfirmationSentPage"; // Import strony potwierdzenia

function App() {
  useAxiosInterceptor();

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/phylo-viewer" element={<PhyloView />} />
        <Route path="/metrics-viewer" element={<MetricsDetail />} />
        <Route
          path="/confirm-email/:userId/:token"
          element={<ConfirmEmailPage />}
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/reset-password/:userId/:token"
          element={<ResetPasswordPage />}
        />
        <Route
          path="/resend-confirmation"
          element={<ResendConfirmationPage />}
        />
        <Route path="/confirmation-sent" element={<ConfirmationSentPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
