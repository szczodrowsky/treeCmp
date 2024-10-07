import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Flaga, by zapobiec wielokrotnemu wysyłaniu formularza
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    // Sprawdzenie, czy hasła są identyczne
    if (password !== confirmPassword) {
      setErrorMessage("Hasła muszą być identyczne.");
      return;
    }

    const registerData = {
      username: username,
      password: password,
      roles: ["Writter"],
    };

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:5244/api/Auth/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        setSuccessMessage(
          "Rejestracja zakończona sukcesem! Sprawdź swój e-mail, aby potwierdzić rejestrację."
        );
        setTimeout(() => navigate("/"), 3000); // Przekierowanie po 3 sekundach
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
        setErrorMessage(
          errorData.message ||
            "Rejestracja nie powiodła się. Proszę spróbować ponownie."
        );
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage(
        "Wystąpił błąd podczas rejestracji. Proszę spróbować ponownie."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="register-form" onSubmit={handleRegister}>
      <h2>Rejestracja</h2>
      <input
        type="email"
        placeholder="Adres e-mail"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Potwierdź hasło"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Przetwarzanie..." : "Zarejestruj się"}
      </button>
    </form>
  );
}

export default RegisterForm;
