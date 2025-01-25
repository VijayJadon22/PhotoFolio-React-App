import React, { useState } from "react";
import styles from "../styles.module.css";

const UpdateImage = (props) => {
  const [title, setTitle] = useState(props.image.title);
  const [imageUrl, setImageUrl] = useState(props.image.url);

  const updateImageInfo = () => {
    if (title.trim() !== "" && imageUrl.trim() !== "") {
      props.updateImageInfo(title, imageUrl, props.image.id, props.image.index);
    }
  };

  return (
    <div className={styles.addImagemContainer}>
      <h1>Update Image</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.inputImage}
        type="text"
        placeholder="Title"
      />
      <input
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className={styles.inputImage}
        type="text"
        placeholder="Image URL"
      />
      <button onClick={updateImageInfo} className={styles.btn}>
        Add
      </button>
    </div>
  );
};

export default UpdateImage;
