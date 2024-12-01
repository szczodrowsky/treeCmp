import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5244/api/Auth/Login",
        {
          username: email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;
      console.log("Full server response:", data);

      const token = data.jwtToken;
      console.log("JWT token from response:", token);

      if (token) {
        localStorage.setItem("token", token);
        setAuth(data.user);
        navigate("/dashboard");
      } else {
        console.error("JWT token not found in response.");
        setErrorMessage("JWT token not found. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Invalid email or password. Please try again."); // Ustaw komunikat o błędzie
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleResendConfirmation = () => {
    navigate("/resend-confirmation");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}{" "}
        {/* Wyświetlanie błędu */}
        <input
          type="email"
          id="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Log In</button>
        <button
          type="button"
          id="submit"
          onClick={handleForgotPassword}
          className="forgot-password-button"
        >
          Forgot Password
        </button>
        <button
          type="button"
          onClick={handleResendConfirmation}
          className="forgot-password-button"
        >
          Resend Confirmation Link
        </button>
        <button
          type="button"
          onClick={handleRegister}
          className="forgot-password-button"
        >
          Register as New User
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
