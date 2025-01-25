import React, { useEffect, useState } from "react";
import styles from "../styles.module.css";
import AddImage from "./AddImage";
import { firestore } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import FullImageView from "./Image";

// react icon
import { MdDeleteForever } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import UpdateImage from "./UpdateImage";

const Album = (props) => {
  const [images, setImages] = useState([]);
  const [addImageVisible, setAddImageVisible] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [filteredImages, setFilteredImages] = useState([]);
  const [imageOpened, setImageOpened] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [optionsOpened, setOptionsOpened] = useState({});
  const [updateImage, setUpdateImage] = useState(false);
  const [updateImageValue, setUpdateImageValue] = useState(null);

  // console.log(imageOpened);

  useEffect(() => {
    console.log("Props:", props);
    // console.log("props.album.albumId: ", props.album.albumId);
    const collectionRef = collection(
      firestore,
      "albums",
      props.album.albumId,
      "images"
    );

    // console.log(collectionRef);
    getDocs(collectionRef).then((querySnapshot) => {
      // console.log("Query Snapshot:", querySnapshot);
      if (!querySnapshot.empty) {
        const allImages = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            title: doc.data().title,
            url: doc.data().url,
          };
        });
        setImages(allImages);
        setFilteredImages(allImages); // Initialize filteredImages with allImages
      }
    });
  }, [props.album.albumId]);

  const addNewImage = async (title, url) => {
    //add images to the images array
    setImages([{ title, url }, ...images]);
    setFilteredImages([{ title, url }, ...images]);

    // Show notification
    props.setNotification("Image Added Successfully");

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

    //Hide notification
    setTimeout(() => {
      props.setNotification("");
    }, 6000);
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

  const openImage = (index) => {
    setImageOpened(true);
    setCurrentImageIndex(index);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === filteredImages.length - 1 ? prevIndex : prevIndex + 1
    );
  };

  const handleImageClose = () => {
    setImageOpened(false);
    setCurrentImageIndex(null);
  };

  const toggleOptions = (index) => {
    setOptionsOpened((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  const toggleOptionsOff = (index) => {
    if (optionsOpened[index] === true) {
      setOptionsOpened((prevState) => ({
        ...prevState,
        [index]: false,
      }));
    }
  };

  const handleDeleteImage = async (imageId) => {
    const updatedFilteredImages = filteredImages.filter(
      (image) => image.id !== imageId
    );
    setFilteredImages(updatedFilteredImages);
    setImages(updatedFilteredImages);

    //set notification for image deleted
    props.setNotification("Image Deleted Successfully");

    //delete image from the firestore database
    const imageRef = doc(
      firestore,
      "albums",
      props.album.albumId,
      "images",
      imageId
    );
    await deleteDoc(imageRef);

    // Hide notification after 6 seconds
    setTimeout(() => {
      props.setNotification("");
    }, 6000);
  };

  const handleUpdateImage = (title, url, id, index) => {
    if (updateImage === false) {
      setUpdateImageValue({ title: title, url: url, id: id, index: index });
    }
    setUpdateImage(!updateImage);
    setAddImageVisible(false);
  };

  const updateImageInfo = async (title, url, imageId, index) => {
    const updatedImages = [...filteredImages];
    updatedImages[index] = { title, url, id: imageId };
    setFilteredImages(updatedImages);
    setImages(updatedImages);

    //set notification for image updation
    props.setNotification("Image Updated Successfully");

    //update in firestore db
    const docRef = doc(
      firestore,
      "albums",
      props.album.albumId,
      "images",
      imageId
    );
    await updateDoc(docRef, {
      title: title,
      url: url,
      albumId: props.album.albumId,
    });

    //hide notification after 6 seconds
    setTimeout(() => {
      props.setNotification("");
    }, 6000);
  };

  const handleUpdateAddVisibility = () => {
    if (updateImage === true) {
      setUpdateImage(false);
      return;
    }
    setAddImageVisible(!addImageVisible);
  };

  return (
    <div className={styles.albumContainerDiv}>
      {updateImage && (
        <UpdateImage
          image={updateImageValue}
          updateImageInfo={updateImageInfo}
        />
      )}
      {imageOpened && (
        <FullImageView
          currentImage={filteredImages[currentImageIndex]}
          handleNext={handleNext}
          handlePrev={handlePrev}
          handleImageClose={handleImageClose}
          setImageOpened={openImage}
        />
      )}

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
            // onClick={() => setAddImageVisible(!addImageVisible)}
            onClick={handleUpdateAddVisibility}
            className={styles.btn}
          >
            {/* {addImageVisible ? "Cancel" : "Add Image"} */}
            {addImageVisible ? "Cancel" : updateImage ? "Close" : "Add Image"}

            {/* {updateImage ? "Cancel" : "Add Image"} */}
          </button>
        </div>
      </div>

      <div className={styles.albumDiv}>
        {filteredImages.length > 0 ? (
          filteredImages.map((image, index) => (
            <div
              onMouseLeave={() => toggleOptionsOff(index)}
              key={index}
              className={styles.imageCardDiv}
            >
              <img
                onClick={() => openImage(index)}
                src={image.url}
                alt="photo-image"
              />
              <p className={styles.imageContent}>{image.title}</p>
              <SlOptionsVertical
                onClick={() => toggleOptions(index)}
                className={styles.optionsIcon}
              />
              {optionsOpened[index] && (
                <div className={styles.optionsDiv}>
                  <h3>
                    <MdModeEditOutline
                      onClick={() =>
                        handleUpdateImage(
                          image.title,
                          image.url,
                          image.id,
                          index
                        )
                      }
                    />
                  </h3>
                  <h3>
                    <MdDeleteForever
                      onClick={() => handleDeleteImage(image.id)}
                    />
                  </h3>
                </div>
              )}
            </div>
          ))
        ) : (
          <h1 style={{ textAlign: "center" }}>No Image</h1>
        )}
      </div>
    </div>
  );
};

export default Album;
