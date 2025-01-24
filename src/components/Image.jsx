import React from "react";
import styles from "../styles.module.css";
import { GrClose, GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { MdFullscreen } from "react-icons/md";

const FullImageView = (props) => {
  const { currentImage, handleNext, handlePrev, handleImageClose } = props;
  // console.log(currentImage);

  const handleFullScreen = () => {
    const elem = document.querySelector(`.${styles.imageContainer}`);
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  

  return (
    <div className={styles.imageContainer}>
      <p className={styles.ImageName}>{currentImage.title}</p>
      <GrClose onClick={handleImageClose} className={styles.closeBtn} />
      <img className={styles.image} src={currentImage.url} alt="" set="" />
      <MdFullscreen onClick={handleFullScreen} className={styles.fullScrBtn} />
      <GrLinkNext onClick={handleNext} className={styles.nextBtn} />
      <GrLinkPrevious onClick={handlePrev} className={styles.prevBtn} />
    </div>
   
  );
};

export default FullImageView;
