import PropTypes from "prop-types"; // Import PropTypes
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // Upewnij się, że ścieżka do hooka useAuth jest poprawna

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth(); // Uzyskujemy dostęp do stanu autoryzacji

  if (!auth) {
    // Jeśli użytkownik nie jest zalogowany, przekieruj na stronę główną
    return <Navigate to="/" replace />;
  }

  // Jeśli użytkownik jest zalogowany, wyświetl chroniony komponent
  return children; // Renderowanie children, czyli komponentów chronionych
};

// Definiowanie typów propsów za pomocą PropTypes
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // children powinny być wymagane i typu node
};

export default ProtectedRoute;
