import React, { useState } from "react";
import styles from "../styles.module.css";

const AddAlbum = (props) => {
  const [album, setAlbum] = useState("");

  const handleAddAlbum = () => {
    if (album.trim()) {
      props.addAlbum(album);
      setAlbum("");
    }
  };
  return (
    <div className={styles.addAlbumContainer}>
      <h1>Create an album</h1>
      <div className={styles.inputDiv}>
        <input
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          className={styles.input}
          type="text"
          placeholder="Enter Album Name"
        />
        <button onClick={handleAddAlbum} className={styles.addbtn}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddAlbum;
