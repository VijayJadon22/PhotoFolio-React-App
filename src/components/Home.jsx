import React, { useState } from "react";
import styles from "../styles.module.css";
import { firestore } from "../firebase";
import AddAlbum from "./AddAlbum";

const Home = () => {
  const [albums, setAlbums] = useState([
    "Vijay",
    "New Folder",
    "Trip",
    "School",
  ]);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [newAlbum, setNewAlbum] = useState(false);
  console.log(currentAlbum);

  const addNewAlbum = (albumName) => {
    setAlbums([albumName, ...albums]);
  };
  return (
    <>
      {newAlbum ? <AddAlbum addAlbum={addNewAlbum} /> : null}
      {currentAlbum ? (
        <h1>will display particular album</h1>
      ) : (
        <div className={styles.container}>
          <div className={styles.addAlbumDiv}>
            <h1>Your Albums</h1>
            {newAlbum ? (
              <button onClick={() => setNewAlbum(false)} className={styles.btn}>
                Close
              </button>
            ) : (
              <button onClick={() => setNewAlbum(true)} className={styles.btn}>
                Add Album
              </button>
            )}
          </div>
          <div className={styles.albumContainer}>
            {albums.map((ele, index) => {
              return (
                <div key={index} className={styles.albumFolder}>
                  <img
                    className={styles.defaultAlbumImage}
                    src="https://th.bing.com/th/id/OIP.3LvSVOUoDxdPmeOhmquxNgHaHa?rs=1&pid=ImgDetMain"
                    alt="default-image"
                  />
                  <h4>{ele}</h4>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default Home;
