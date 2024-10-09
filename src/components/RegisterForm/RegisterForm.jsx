import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import "./RegisterForm.css";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords must match.");
      return;
    }

    const registerData = {
      username: username,
      password: password,
      roles: ["Writer"],
    };

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await axiosInstance.post("Auth/Register", registerData);
      setSuccessMessage(
        "Registration successful! Check your email to confirm your registration."
      );
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(
          error.response.data.message ||
            "Registration failed. Please try again."
        );
      } else {
        setErrorMessage(
          "An error occurred during registration. Please try again."
        );
      }
      console.error("Error during registration:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email Address"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Register"}
        </button>
        <button
          type="button"
          onClick={handleLogin}
          className="login-redirect-button"
        >
          I already have an account
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
