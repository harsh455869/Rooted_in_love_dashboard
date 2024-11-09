import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import config from "../../config";

function TabPanel(props) {
    const { children, value, index } = props;
    return <div>{value === index && <div>{children}</div>}</div>;
}

function BcsResultInfo(props) {
    const { categoryData, addnew } = props;
    const [value, setValue] = useState(0);
    const [score, setScore] = useState(categoryData?.score || "");
    const [title, setTitle] = useState(categoryData?.title || "");
    const [dogWeight, setDogWeight] = useState(categoryData?.dog_weight || "");
    const [bodyFat, setBodyFat] = useState(categoryData?.body_fat || "");
    const [description, setDescription] = useState(categoryData?.description || "");
    const [images, setImages] = useState(categoryData?.images || []);

    const handleImageChange = async (e, index) => {
        const newImages = [...images];
        // newImages[index] = {
        //     ...newImages[index],
        //     image: e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : newImages[index].image,
        // };
        newImages[index] = {
            ...newImages[index],
            image: e.target.files[0] ? await convertToBase64(e.target.files[0]) : newImages[index].image,
        };
        setImages(newImages);
    };
    // const handleImageChange = async (e, index) => {
    //     const newImages = [...images];
    //     const file = e.target.files[0];

    //     if (file) {
    //         // Convert the selected file to base64
    //         const newImage = await convertToBase64(file);

    //         // Check if the image has changed by comparing it to the existing image URL
    //         if (newImage !== newImages[index].image) {
    //             // Prepare the data to send to the server for updating the image
    //             const imageData = {
    //                 result_id: categoryData?._id,
    //                 result_image_id: newImages[index]._id, // Assuming _id is available to uniquely identify the image
    //                 description: newImages[index].description,
    //                 image: newImage,
    //             };

    //             try {
    //                 // API call to update the image on the server
    //                 await axios.post(`${config.serverURL}admin/bsc/result/image/update`, imageData);

    //                 // Update the image state with the new image
    //                 newImages[index] = {
    //                     ...newImages[index],
    //                     image: newImage,
    //                 };

    //                 // Show success toast
    //                 toast("Image updated successfully", {
    //                     position: "bottom-center",
    //                     type: "success",
    //                 });
    //             } catch (error) {
    //                 console.error("Error updating image:", error);
    //                 toast("Error updating image", {
    //                     position: "bottom-center",
    //                     type: "error",
    //                 });
    //             }
    //         } else {
    //             // If image is the same, just update the state with the new file URL
    //             newImages[index] = {
    //                 ...newImages[index],
    //                 image: newImage,
    //             };
    //         }

    //         setImages(newImages);
    //     }
    // };

    const convertToBase64 = (file) => {
        console.log(file)
        return new Promise(async (resolve, reject) => {
            //const response = await fetch(file);
            //const blob = await response.blob();
            const blob = new Blob([file], { type: file.type });
            console.log("Blob: " + blob + "/" + file.type)
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const result = fileReader.result
                resolve(result.toString());
                console.log(result)
            };
            fileReader.readAsDataURL(blob);
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const handleDescriptionChange = (e, index) => {
        const newImages = [...images];
        newImages[index] = {
            ...newImages[index],
            description: e.target.value,
        };
        setImages(newImages);
    };

    const addImage = () => {
        setImages([...images, { image: "", description: "" }]);
    };

    const uploadImages = async (images) => {
        console.log("called11", images)
        console.log("hello..",images.length,categoryData.images.length)
      
            console.log("hello..")
            for (let i = 0; i < images.length; i++) {
                const image = images[i];
                console.log(image, "called", images)

                if (image.image) {
                    const imageData = {
                        result_id: categoryData?._id,
                        description: image.description,
                        image: image.image,
                    };

                    try {
                        // Send the image to the server
                        await axios.post(`${config.serverURL}admin/bsc/result/image/add`, imageData);
                        toast("Image uploaded successfully", {
                            position: "bottom-center",
                            type: "success",
                        });
                    } catch (error) {
                        console.error("Error uploading image:", error);
                        // toast("Error uploading image", {
                        //     position: "bottom-center",
                        //     type: "error",
                        // });
                    }
                }
            }
       

    };

    const onChangeHandler = () => {
        let data = {
            score,
            title,
            dog_weight: dogWeight,
            body_fat: bodyFat,
            description,
            images
        };
        if (props.addnew) {
            if (title.length < 0) {
                return;
            }
            const res = axios
                .post(
                    `${config.serverURL}admin/bsc/result/add`,
                    data
                )
                .then(() => {
                    toast("Sucessfully Created", {
                        position: "bottom-center",
                        type: "success",
                    });
                    window.location.reload()
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        else {
            console.log(categoryData, "...")
            data = {
                result_id: categoryData?._id, score,
                title,
                dog_weight: dogWeight,
                body_fat: bodyFat,
                description,
                // images
            }
            const res = axios
                .post(
                    `${config.serverURL}admin/bsc/result/update`,
                    data
                )
                .then(async () => {
                    toast("Sucessfully Updated", {
                        position: "bottom-center",
                        type: "success",
                    });
                    await uploadImages(images);
                    window.location.reload()
                })
                .catch((e) => {
                    console.error(e)
                    console.log(e);
                });
        }
    };

    const handleTabs = (e, val) => {
        setValue(val);
    };

    const onDeleteData = () => {
        const data = { result_id: categoryData?._id };
        axios
            .post(`${config.serverURL}admin/bsc/result/delete`, data)
            .then(() => {
                toast("Successfully Deleted", {
                    position: "bottom-center",
                    type: "success",
                });
                setTimeout(() => window.location.reload(), 1000);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const onDeleteDataImage = (id) => {
        const data = { result_image_id: id }
        console.log("image delete data", data)
        const res = axios
            .post(
                `${config.serverURL}admin/bsc/result/image/delete`
                , data
            )
            .then(() => {
                const updatedImages = images.filter((image) => image._id !== id);
                setImages(updatedImages);


                toast("Sucessfully Deleted", {
                    position: "bottom-center",
                    type: "success",
                });
                setTimeout(() => {
                    // window.location.reload();
                }, 1000)


            })
            .catch((e) => {
                console.log(e);
            });

    }

    const renderImages = () => {
        return images.map((image, index) => (
            <div key={index}>
                <div className="image-container">
                    <img
                        src={image.image || "https://via.placeholder.com/150"}
                        alt={`image-${index}`}
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                    <p>{image.description}</p>
                </div>
                <div className="form">
                    <label>Image {index + 1} (optional)</label>
                    <input
                        type="file"
                        onChange={(e) => handleImageChange(e, index)}
                    />
                    <label>Description</label>
                    <textarea
                        className="form"
                        value={image.description}
                        onChange={(e) => handleDescriptionChange(e, index)}
                        rows="3"
                    />
                </div>
                {
                    !addnew &&  <button
                    onClick={() => onDeleteDataImage(image._id)}
                    className="form"
                    style={{
                        borderWidth: 0,
                        backgroundColor: "red",
                        borderRadius: 10,
                        color: "white",
                        fontSize: 15,
                        padding: 10,
                    }}
                >
                    {"Delete"}
                </button>
                }
               
            </div>
        ));
    };

    useEffect(() => {
        if (addnew) {
            setTitle('');
            setScore('');
            setDogWeight('');
            setBodyFat('');
            setDescription('');
            setImages([]);
        }
    }, [addnew]);

    return (
        <>
            <div className="formadj">
                <div className="row">
                    <div className="col-12">
                        <p className="information">
                            {addnew ? (
                                <>BSC RESULT<span className="bolding"> CREATE</span></>
                            ) : (
                                <>BSC RESULT<span className="bolding"> INFO</span></>
                            )}
                        </p>
                        <AppBar position="static">
                            <Tabs value={value} onChange={handleTabs}>
                                <Tab label="BSC RESULT Details" />
                            </Tabs>
                        </AppBar>

                        <TabPanel value={value} index={0}>
                            <div className="row">
                                <div className="col-12">
                                    <label>Title</label>
                                    <input
                                        className="form"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <label>Score</label>
                                    <input
                                        className="form"
                                        type="text"
                                        value={score}
                                        onChange={(e) => setScore(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <label>Dog Weight</label>
                                    <input
                                        className="form"
                                        type="text"
                                        value={dogWeight}
                                        onChange={(e) => setDogWeight(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <label>Body Fat</label>
                                    <input
                                        className="form"
                                        type="text"
                                        value={bodyFat}
                                        onChange={(e) => setBodyFat(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <label>Description</label>
                                    <textarea
                                        className="form"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows="5"
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <label>Images</label>
                                    {renderImages()}
                                    <button type="button" onClick={addImage}>
                                        Add Another Image
                                    </button>
                                </div>
                            </div>

                            <div className="row" style={{ marginTop: 20 }}>
                                <div className="col-6">
                                    <button
                                        onClick={onDeleteData}
                                        className="form"
                                        style={{
                                            borderWidth: 0,
                                            backgroundColor: "red",
                                            borderRadius: 10,
                                            color: "white",
                                            fontSize: 15,
                                            padding: 10,
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                                <div className="col-6">
                                    <button
                                        onClick={onChangeHandler}
                                        className="form"
                                        style={{
                                            borderWidth: 0,
                                            backgroundColor: "#17545E",
                                            borderRadius: 10,
                                            color: "white",
                                            fontSize: 15,
                                            padding: 10,
                                        }}
                                    >
                                        {addnew ? "Create" : "Save"}
                                    </button>
                                </div>
                            </div>
                        </TabPanel>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default BcsResultInfo;
