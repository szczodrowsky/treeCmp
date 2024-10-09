import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

const useAxiosInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              localStorage.removeItem("token");
              navigate("/");
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
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);
};

export default useAxiosInterceptor;
