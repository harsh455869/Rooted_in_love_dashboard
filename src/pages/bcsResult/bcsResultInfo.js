import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Avatar from "react-avatar";
import config from "../../config";

// TabPanel Component for managing tab content
function TabPanel(props) {
    const { children, value, index } = props;
    return <div>{value === index && <div>{children}</div>}</div>;
}

// Main Component
function BcsResultInfo(props) {
    const { categoryData, addnew } = props;
    const [value, setValue] = useState(0);
    const [name, setName] = useState(categoryData?.name || "");
    const [score, setScore] = useState(categoryData?.score || "");
    const [title, setTitle] = useState(categoryData?.title || "");
    const [dogWeight, setDogWeight] = useState(categoryData?.dog_weight || "");
    const [bodyFat, setBodyFat] = useState(categoryData?.body_fat || "");
    const [description, setDescription] = useState(categoryData?.description || "");
    const [images, setImages] = useState(categoryData?.images || []);

    // Handle image and description change
    const handleImageChange = (e, index) => {
        const newImages = [...images];
        newImages[index] = {
            ...newImages[index],
            image: e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : newImages[index].image,
        };
        setImages(newImages);
    };

    const handleDescriptionChange = (e, index) => {
        const newImages = [...images];
        newImages[index] = {
            ...newImages[index],
            description: e.target.value,
        };
        setImages(newImages);
    };

    // Handle adding a new image and description
    const addImage = () => {
        setImages([...images, { image: "", description: "" }]);
    };

    const onChangeHandler = () => {
        console.log(score, title, dogWeight, bodyFat, "data result...", images)
        let data = {
            score,
            title,
            dog_weight: dogWeight,
            body_fat: bodyFat,
            description,
            // images, 
        };
        console.log(data, "data result...")
        const apiUrl = addnew
            ? `${config.serverURL}admin/bsc/result/add`
            : `${config.serverURL}admin/bsc/result/update`;


        axios
            .post(apiUrl, data)
            .then((res) => {
                toast(addnew ? res.data.message : "Successfully Updated", {
                    position: "bottom-center",
                    type: "success",
                });
                console.log(res,"...")
                // if (!addnew) 
                window.location.reload();
            })
            .catch((e) => {
                console.error(e);
            });
    };
    
    // const onChangeHandler = () => {
    //     console.log(score, title, dogWeight, bodyFat, "data result...", images)

    //     const formData = new FormData();

    //     // Append the non-image data
    //     formData.append("score", score);
    //     formData.append("title", title);
    //     formData.append("dog_weight", dogWeight);
    //     formData.append("body_fat", bodyFat);
    //     formData.append("description", description);

    //     // Append the images and their descriptions
    //     images.forEach((image, index) => {
    //         if (image.image) {
    //             // Append the file itself (image blob)
    //             formData.append(`image_${index}`, image.image);
    //         }
    //         if (image.description) {
    //             // Append description
    //             formData.append(`description_${index}`, image.description);
    //         }
    //     });

    //     // Set the correct URL for adding or updating data
    //     const apiUrl = addnew
    //         ? `${config.serverURL}admin/bsc/result/add`
    //         : `${config.serverURL}admin/bsc/result/update`;

    //     // Send the FormData using Axios
    //     axios.post(apiUrl, formData)
    //         .then((res) => {
    //             toast(addnew ? res.data.message : "Successfully Updated", {
    //                 position: "bottom-center",
    //                 type: "success",
    //             });
    //             console.log(res, "...", formData, "..>>");
    //             // window.location.reload()
    //         })
    //         .catch((e) => {
    //             console.error(e);
    //         });
    // };
    
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
            </div>
        ));
    };

    return (
        <>
            <div className="formadj">
                <div className="row">
                    <div className="col-12">
                        <p className="information">
                            {addnew ? (
                                <>BCS RESULT<span className="bolding"> CREATE</span></>
                            ) : (
                                <>BCS RESULT<span className="bolding"> INFO</span></>
                            )}
                        </p>
                        <AppBar position="static">
                            <Tabs value={value} onChange={handleTabs}>
                                <Tab label="BCS RESULT Details" />
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

                            <div className="row" style={{marginTop:20}}>
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
