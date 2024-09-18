import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
        navigate("/");
      } else {
        const errorText = await response.text();
        console.error("Registration failed:", errorText);
        setErrorMessage(
          "Rejestracja nie powiodła się. Proszę spróbować ponownie."
        );
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage(
        "Wystąpił błąd podczas rejestracji. Proszę spróbować ponownie."
      );
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
      <button type="submit">Zarejestruj się</button>
    </form>
  );
}

export default RegisterForm;
