import { useState, useEffect } from "react";
import spinner from "../../../../assets/loading/bg-spinner.gif";
import bgImage1 from "../../../../assets/loading/Drzewo_BW_Prussian.png";
import bgImage2 from "../../../../assets/loading/Drzewo_BW_White.png";
import bgImage3 from "../../../../assets/loading/Drzewo_Tq_Turqouise.png";
import styles from "./LoadingAnimation.module.css";

const images = [bgImage1, bgImage2, bgImage3];

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
      <img src={spinner} alt="Ładowanie..." className={styles.spinner} />
    </div>
  );
}
