import React, { useState } from "react";
import styles from "../styles.module.css";

const Home = () => {
  const [albums, setAlbums] = useState([
    "Vijay",
    "New Folder",
    "Trip",
    "School",
  ]);
    const [currentAlbum, setCurrentAlbum] = useState(null);
    console.log(currentAlbum);
  return (
    <>
      <h1>Albums</h1>

      {currentAlbum ? (
        <h1>will display particular album</h1>
      ) : (
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
      )}
    </>
  );
};
export default Home;
