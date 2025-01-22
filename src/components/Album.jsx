import React, { useEffect, useState } from "react";
import styles from "../styles.module.css";
import AddImage from "./AddImage";
import { firestore } from "../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

const Album = (props) => {
  const [images, setImages] = useState([]);
  const [addImageVisible, setAddImageVisible] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [filteredImages, setFilteredImages] = useState([]);
  console.log(props);

  useEffect(() => {
    const collectionRef = collection(
      firestore,
      "albums",
      props.album.albumId,
      "images"
    );
    getDocs(collectionRef).then((data) => {
      const allImages = data.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.data().title,
          url: doc.data().url,
        };
      });
      setImages(allImages);
      setFilteredImages(allImages); // Initialize filteredImages with allImages
    });
  }, [props.album.albumId]);

  const addNewImage = async (title, url) => {
    //add images to the images array
    setImages([{ title, url }, ...images]);
    setFilteredImages([{ title, url }, ...images]);

    // add new image to the firstore databse
    const collectionRef = collection(
      firestore,
      "albums",
      props.album.albumId,
      "images"
    );
    await addDoc(collectionRef, {
      title,
      url,
      albumId: props.album.albumId,
    });
  };

  const goBack = () => {
    setAddImageVisible(false);
    setInputVisible(false);
    props.goBack();
  };

  const filterImages = (e) => {
    const query = e.target.value.toLowerCase();
    if (query === "") {
      setFilteredImages(images);
      //Reset to all images if query is empty, without including this condition also our state will work perfectly fine as we will erase the data of the input field it will be set to empty string "" and this will return true for all titles in includes function in filter so all images will be set again
    } else {
      setFilteredImages(
        images.filter((image) => image.title.toLowerCase().includes(query))
      );
    }
  };

  return (
    <div className={styles.albumContainerDiv}>
      {addImageVisible && <AddImage addNewImage={addNewImage} />}
      <div className={styles.albumHeading}>
        <div className={styles.divContainer}>
          <div onClick={goBack} className={styles.backBtnDiv}>
            <img
              width={"40px"}
              src="https://www.svgrepo.com/show/167326/left-arrow.svg"
              alt="back-image"
            />
          </div>
          <h1>Images in {props.album.albumName}</h1>
        </div>
        <div className={styles.divContainer}>
          {inputVisible && (
            <input
              onChange={filterImages}
              placeholder="Enter image name"
              type="text"
              className={styles.searchInput}
            />
          )}
          <div
            onClick={() => setInputVisible(!inputVisible)}
            className={styles.searchDiv}
          >
            <img
              width={"35px"}
              src="https://www.freeiconspng.com/uploads/search-icon-png-4.png"
              alt="search-image"
            />
          </div>
          <button
            onClick={() => setAddImageVisible(!addImageVisible)}
            className={styles.btn}
          >
            {addImageVisible ? "Cancel" : "Add Image"}
          </button>
        </div>
      </div>

      <div className={styles.albumDiv}>
        {filteredImages.length > 0 ? (
          filteredImages.map((image, index) => (
            <div key={index} className={styles.imageCardDiv}>
              <img src={image.url} />
              <p className={styles.imageContent}>{image.title}</p>
            </div>
          ))
        ) : (
          <p>No Image</p>
        )}
      </div>
    </div>
  );
};

export default Album;
