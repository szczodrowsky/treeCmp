import { useState, useEffect } from "react";
import styles from "./LoadingAnimation.module.css";

const images = [
  "/assets/loading/Drzewo_BW_Prussian.png",
  "/assets/loading/Drzewo_BW_White.png",
  "/assets/loading/Drzewo_Tq_Turqouise.png",
];

export function LoadingAnimation() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={styles.loadingContainer}
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      {/* Bezpośrednia ścieżka do pliku w `public` */}
      <img
        src="/assets/loading/bg-spinner.gif"
        alt="Ładowanie..."
        className={styles.spinner}
      />
    </div>
  );
}
