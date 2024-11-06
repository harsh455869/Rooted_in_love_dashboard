import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import AppBar from "@mui/material/AppBar";
import config from "../../config";
import Avatar from "react-avatar";
// import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";

function ConsultationCategoryInfo(props) {
    console.log(props);
    // console.log(props.productInfo.productId);
    const [value, setValue] = useState(0);
    const categoryData = props?.categoryData
    const [customerData, setcustomerData] = useState([]);
    const [name, setname] = useState(categoryData?.name)

    const onChangeHandler = () => {
        let data = {
            name
        };
        if (props.addnew) {
            if (name.length < 0) {
                return;
            }
            const res = axios
                .post(
                    `${config.serverURL}admin/consultationcategory/add`,
                    data
                )
                .then(() => {
                    toast("Sucessfully Created", {
                        position: "bottom-center",
                        type: "success",
                    });
                    // window.location.reload()
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        else {
            data = { name, category_id: categoryData?._id }
            const res = axios
                .post(
                    `${config.serverURL}admin/consultationcategory/update`,
                    data
                )
                .then(() => {
                    toast("Sucessfully Updated", {
                        position: "bottom-center",
                        type: "success",
                    });
                    window.location.reload()
                })
                .catch((e) => {
                    console.error(e)
                    console.log(e);
                });
        }
    };

    const handleTabs = (e, val) => {
        console.log(val);
        setValue(val);
    };

    const onDeleteData = () => {
        const data = { category_id: categoryData?._id }
        const res = axios
            .post(
                `${config.serverURL}admin/consultationcategory/delete`
                , data
            )
            .then(() => {

                toast("Sucessfully Deleted", {
                    position: "bottom-center",
                    type: "success",
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1000)


            })
            .catch((e) => {
                console.log(e);
            });

    }

    useEffect(() => {
        if (!props.addnew) {

        }
        else {
            setname('')
            const arr = ['', '', '', '', '']
            //   setbenefits(arr)
        }

    }, []);

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        customerData && (
            <>
                <div className="formadj">
                    <div className="row">
                        <div className="col-12">
                            <p className="information">
                                {
                                    props.addnew ? <>Consultation CATEGORY<span className="bolding"> CREATE</span></> : <>CATEGORY<span className="bolding"> INFO</span></>
                                }

                            </p>
                            <AppBar position="static">
                                <Tabs value={value} onChange={handleTabs}>
                                    <Tab label="Category Details" />
                                    {/* { !props.addnew&&<Tab label="Active User" />} */}
                                    {/* <Tab label="Appointments" /> */}
                                </Tabs>
                            </AppBar>

                            <TabPanel value={value} index={0}>
                                <br />
                                <div className="row">
                                    <div className="col-12">
                                        <label>Category name</label>
                                        <input
                                            className="form"
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => {
                                                setname(e.target.value);
                                            }}
                                        ></input>
                                    </div>

                                </div>

                                <div className="row">
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
                                            {"Delete"}
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
                                            {props.addnew ? 'Create' : 'Save'}
                                        </button>
                                    </div>
                                </div>

                                {/* <div className="row">
                        <div className="col-6"></div>
                        <div className="col-6 sign">
                            <button type="submit" className="btn1" onClick={ () => submitHandler() }>
                                        Update
                            </button>
                        </div>
                    </div>  */}
                            </TabPanel>
                            {!props.addnew && <TabPanel value={value} index={1}>
                                <br />
                                <div className="row">
                                    <div className="col-6">
                                        <label>Is User Active</label>
                                        <input
                                            className="form"
                                            id="isUserActive"
                                            type="text"
                                            value={customerData.isUserActive ? "Yes" : "No"}
                                            onChange={onChangeHandler}
                                            readOnly
                                        ></input>
                                    </div>
                                </div>
                            </TabPanel>}
                        </div>
                    </div>
                </div>
                <ToastContainer></ToastContainer>
            </>
        )
    );
}

function TabPanel(props) {
    const { children, value, index } = props;

    return <div>{value == index && <h1>{children}</h1>}</div>;
}

export default ConsultationCategoryInfo;
