import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useAxiosInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              localStorage.removeItem("token");
              navigate("/startPage");
              break;
            case 403:
              alert("Brak uprawnień do tego zasobu.");
              break;
            case 404:
              alert("Nie znaleziono zasobu.");
              break;
            case 500:
              alert("Wewnętrzny błąd serwera. Spróbuj ponownie później.");
              break;
            default:
              alert(`Wystąpił błąd: ${error.response.status}`);
              break;
          }
        } else {
          alert("Błąd sieciowy. Sprawdź połączenie z internetem.");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(requestInterceptor);
    };
  }, [navigate]);
};

export default useAxiosInterceptor;
