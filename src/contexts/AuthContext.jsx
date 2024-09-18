import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth({ token });
    } else {
      // Sprawdź, czy nawigacja do '/' jest wywoływana
      console.log("AuthProvider: No token, checking navigation");
      // navigate('/'); // Odkomentowanie tego spowoduje przekierowanie zawsze na /
    }
  }, []); // Usuń `navigate` z zależności, aby uniknąć pętli

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
