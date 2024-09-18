import { Routes, Route } from "react-router-dom"; // Import tylko Routes i Route
import { AuthProvider } from "./contexts/AuthContext";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
