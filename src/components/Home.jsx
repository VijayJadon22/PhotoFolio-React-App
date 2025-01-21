import React, { useEffect, useState } from "react";
import styles from "../styles.module.css";
import { firestore } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
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
  const [notification, setNotification] = useState("");
  console.log(currentAlbum);

  useEffect(() => {
    //get albums from firstore database by getDocs
    getDocs(collection(firestore, "albums")).then((doc) => {
      const allAlbums = doc.docs.map((ele) => {
        return {
          id: ele.id,
          name: ele.data().albumName,
        };
      });
      setAlbums(allAlbums);
    });
  }, []);

  const addNewAlbum = async (albumName) => {
    setAlbums([{ name: albumName }, ...albums]);
    setNotification("Album added successfully");

    //   add new album to the firstore databse
    const collectionRef = collection(firestore, "albums");
    await addDoc(collectionRef, { albumName });

    // Show notification

    // Hide notification after 5 seconds
    setTimeout(() => {
      setNotification("");
    }, 6000);
  };
  return (
    <>
      {notification && (
        <div className={styles.notifcationDiv}>
          <img
            width={"30px"}
            src="https://static.vecteezy.com/system/resources/previews/011/858/556/original/green-check-mark-icon-with-circle-tick-box-check-list-circle-frame-checkbox-symbol-sign-png.png"
            alt="tick-image"
          />
          {notification}
        </div>
      )}
      {newAlbum && <AddAlbum addAlbum={addNewAlbum} />}
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
                  <h4>{ele.name}</h4>
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
