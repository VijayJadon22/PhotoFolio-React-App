import React, { useState } from "react";
import styles from "../styles.module.css";

const AddImage = (props) => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAddNewImage = () => {
    if (title.trim() && imageUrl.trim()) {
        props.addNewImage(title, imageUrl);
        setTitle("");
        setImageUrl("");
    }
  };
  return (
    <div className={styles.addImagemContainer}>
      <h1>Add Image</h1>
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
      <button onClick={handleAddNewImage} className={styles.btn}>
        Add
      </button>
    </div>
  );
};

export default AddImage;
