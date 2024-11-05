import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import config from "../../config";

function ConsultationInfo(props) {
    console.log(props.orderData, "data test...")
    const consultationData = props?.orderData;
    const [value, setValue] = useState(0);
    const [name, setName] = useState(consultationData?.name || '');
    const [price, setPrice] = useState(consultationData?.price || '');
    const [emailBody, setEmailBody] = useState(consultationData?.email_body || '');
    const [emailSubject, setEmailSubject] = useState(consultationData?.email_subject || '');
    const [categoryId, setCategoryId] = useState(consultationData?.category_id || '');
    const [categories, setCategories] = useState([]);
    const [whatYouGet, setWhatYouGet] = useState(consultationData?.what_you_get || '');
    const [whoIsThisFor, setWhoIsThisFor] = useState(consultationData?.who_is_this_for || '');
    const [whatYouWontGet, setWhatYouWontGet] = useState(consultationData?.what_you_wont_get || '');
    const [video, setVideo] = useState(consultationData?.video || null);
    const [consultationid, setConsultationId] = useState(consultationData?._id || '')

    useEffect(() => {

        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${config.serverURL}admin/consultation/getall`);
                console.log(response, "...responsess")
                setCategories(response.data.data);
            } catch (error) {
                console.error(error);
                toast("Failed to fetch categories", { position: "bottom-center", type: "error" });
            }
        };

        fetchCategories();
    }, []);

    const onChangeHandler = async () => {
        const consultationData = {
            name,
            price,
            category_id: categoryId,
            what_you_get: whatYouGet,
            who_is_this_for: whoIsThisFor,
            what_you_wont_get: whatYouWontGet,
            video,
            email_subject: emailSubject,
            email_body: emailBody,
        };

        console.log(consultationData, "consultationData");

        try {
            if (props.addnew) {
                if (!name || !price || !categoryId) {
                    toast("Name, Price, and Category ID are required", { position: "bottom-center", type: "error" });
                    return;
                }
                await axios.post(`${config.serverURL}admin/consultation/add`, consultationData);
                toast("Successfully Created", { position: "bottom-center", type: "success" });
            } else {
                const consultationData = {
                    consultation_id: consultationid,
                    name,
                    price,
                    category_id: categoryId,
                    what_you_get: whatYouGet,
                    who_is_this_for: whoIsThisFor,
                    what_you_wont_get: whatYouWontGet,
                    video,
                    email_subject: emailSubject,
                    email_body: emailBody,
                };
                console.log(consultationData, "consultationDataconsultationData")
                if (!name || !price || !categoryId) {
                    toast("Name, Price, and Category ID are required", { position: "bottom-center", type: "error" });
                    return;
                }
                await axios.post(`${config.serverURL}admin/consultation/update`, consultationData);
                toast("Successfully Created", { position: "bottom-center", type: "success" });
            }

            window.location.reload();
        } catch (error) {
            console.error(error);
            toast("An error occurred", { position: "bottom-center", type: "error" });
        }
    };

    const onDeleteData = () => {
        const data = { consultation_id: consultationData?._id };
        axios.post(`${config.serverURL}admin/consultation/delete`, data)
            .then(() => {
                toast("Successfully Deleted", {
                    position: "bottom-center",
                    type: "success",
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (props.addnew) {
            setName('');
            setPrice('');
            setEmailBody('');
            setEmailSubject('');
            setCategoryId('');
            setWhatYouGet('');
            setWhoIsThisFor('');
            setWhatYouWontGet('');
            setVideo(null);
        }
    }, [props.addnew]);

    return (
        <div className="formadj">
            <div className="row">
                <div className="col-12">
                    <p className="information">
                        {props.addnew ? "CONSULTATION CREATE" : "CONSULTATION INFO"}
                    </p>
                    <AppBar position="static">
                        <Tabs value={value} onChange={(e, val) => setValue(val)}>
                            <Tab label="Consultation Details" />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <div className="row">
                            <div className="col-12">
                                <label>Name</label>
                                <input
                                    className="form"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label>Price</label>
                                <input
                                    className="form"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label>Category</label>
                                <select
                                    className="form"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label>What You Get</label>
                                <textarea
                                    className="form"
                                    value={whatYouGet}
                                    onChange={(e) => setWhatYouGet(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label>Who Is This For</label>
                                <textarea
                                    className="form"
                                    value={whoIsThisFor}
                                    onChange={(e) => setWhoIsThisFor(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label>What You Won't Get</label>
                                <textarea
                                    className="form"
                                    value={whatYouWontGet}
                                    onChange={(e) => setWhatYouWontGet(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label>Video (YouTube Embed Link)</label>
                                <input
                                    className="form"
                                    type="text"
                                    value={video}
                                    onChange={(e) => setVideo(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label>Email Subject</label>
                                <input
                                    className="form"
                                    type="text"
                                    value={emailSubject}
                                    onChange={(e) => setEmailSubject(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label>Email Body</label>
                                <textarea
                                    className="form"
                                    value={emailBody}
                                    onChange={(e) => setEmailBody(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* <div className="row" style={{ marginTop: 20 }}>
                            <div className="col-6">
                                <button onClick={onChangeHandler} className="form" style={{ backgroundColor: "#17545E", color: "white" }}>
                                    {props.addnew ? 'Create' : 'Save'}
                                </button>
                            </div>
                        </div> */}
                        <div className="row" style={{ marginTop: 20 }}>
                            <div className="col-6">
                                <button onClick={onDeleteData} className="form" style={{ backgroundColor: "red", color: "white" }}>
                                    Delete
                                </button>
                            </div>
                            <div className="col-6">
                                <button onClick={onChangeHandler} className="form" style={{ backgroundColor: "#17545E", color: "white" }}>
                                    {props.addnew ? 'Create' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </TabPanel>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

function TabPanel(props) {
    const { children, value, index } = props;
    return <div>{value === index && <div>{children}</div>}</div>;
}

export default ConsultationInfo;
