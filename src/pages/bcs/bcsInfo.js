import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import AppBar from "@mui/material/AppBar";
import config from "../../config";

function BcsInfo(props) {

  // console.log(props.productInfo.productId);
  const [value, setValue] = useState(0);
  const bcsData = props?.bcsData
  const [customerData, setcustomerData] = useState([]);

  const [title, settitle] = useState(bcsData?.title)
  const [question, setquestion] = useState(bcsData?.question)
  const [image, setimage] = useState(bcsData?.image)
  const [option_text, setoption_text] = useState('')
  const [option_image, setoption_image] = useState('')
  const [options, setoptions] = useState(bcsData?.options)

  const onhandleOption = (question_id) => {
    let data = {
      question_id: bcsData?._id,
      option_text,
      image: option_image
    }
    console.log(data);
    const res = axios
      .post(
        `${config.serverURL}admin/bsc/option/add`,
        data
      )
      .then(() => {
        toast("Sucessfully Created", {
          position: "bottom-center",
          type: "success",
        });
        alert('option added successfully')
        props.onChange()
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const onChangeHandler = () => {
    let data = {
      title, question, image
    };
    console.log(data);
    if (props.addnew) {
      if (title.length < 0) {
        return;
      }
      const res = axios
        .post(
          `${config.serverURL}admin/bsc/question/add`,
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
      data = { title, bcs_id: bcsData?._id }
      const res = axios
        .post(
          `${config.serverURL}admin/bsc/question/update`,
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
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertToBase64(file);
    // console.log(base64);
    setimage(base64);
  };
  const handleOptionFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertToBase64(file);
    setoption_image(base64);
  };

  useEffect(() => {
    console.log(bcsData, "bcsDatabcsData")
  }, [bcsData])

  const onDeleteData = () => {
    const data = { question_id: bcsData?._id }
    const res = axios
      .post(
        `${config.serverURL}admin/bsc/question/delete`
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
      settitle('')
      setquestion('')
      setimage('')
      setoptions([])
      const arr = ['', '', '', '', '']
    }

  }, []);

  return (
    customerData && (
      <>
        <div className="formadj">
          <div className="row">
            <div className="col-12">
              <p className="information">
                {
                  props.addnew ? <>BCS<span className="bolding"> CREATE</span></> : <>BCS<span className="bolding"> INFO</span></>
                }
              </p>

              <TabPanel value={value} index={0}>
                <br />
                <div className="row">
                  <div className="col-12">
                    <label>Title</label>
                    <input
                      className="form"
                      id="name"
                      type="text"
                      value={title}
                      onChange={(e) => {
                        settitle(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <label>Question</label>
                      <input
                        className="form"
                        id="name"
                        type="text"
                        value={question}
                        onChange={(e) => {

                          setquestion(e.target.value);
                        }}
                      ></input>
                    </div></div>
                  <div className="col-6">
                    <img style={{ width: 200, height: 200 }} src={image?.startsWith('storage') ? config.serverURL + image : image} alt="" srcset="" />
                    <label>{props?.addnew ? 'Select Image' : 'Change Image'}</label>
                    <input onChange={handleFileUpload} type="file" title={props.addnew ? "upload Image" : "Change Image"}>
                    </input>
                  </div>
                </div>
                {!props.addnew && <h2> Options</h2>}
                <div>
                  {options?.map((item, index) => {
                    return (
                      <div className="row">
                        <div className="col-6">
                          <label>Option {index + 1}</label>
                          <input
                            className="form"
                            id="text"
                            type='text'
                            value={item?.option_text}
                            readOnly

                          ></input>
                        </div>
                        <div className="col-6">
                          <div className="col-6">
                            <img style={{ width: 50, height: 50 }} src={item?.image?.startsWith('storage') ? config.serverURL + item?.image : item?.image} alt="" srcset="" />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                {!props?.addnew && <div className="row" style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                  <div className="col-4">
                    <label>Option Text </label>
                    <input
                      className="form"
                      id="text"
                      type='text'
                      value={option_text}
                      onChange={(e) => setoption_text(e.target.value)}
                    ></input>
                  </div>
                  <div className="col-4">
                    <div className="col-6">
                      <img style={{ width: 50, height: 50 }} src={option_image} alt="" srcset="" />
                      <label>{'Select Image'}</label>
                      <input onChange={handleOptionFileUpload} type="file" title={props.addnew ? "upload Image" : "Change Image"}>
                      </input>
                    </div>
                  </div>
                  <button
                    onClick={onhandleOption}
                    className="col-3"
                    style={{
                      borderWidth: 0,
                      backgroundColor: "#17545E",
                      borderRadius: 10,
                      color: "white",
                      fontSize: 15,
                      padding: 10,
                    }}
                  >
                    {"Add Option"}
                  </button>
                </div>}
                <div className="row">
                  <div className="col-6">
                  </div>
                  {/* <div className="col-6">
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
                  </div> */}
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
                </div>

              </TabPanel>
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

export default BcsInfo;

// {!props.addnew && <TabPanel value={value} index={1}>
// <br />
// <div className="row">
//   <div className="col-6">
//     <label>Is User Active</label>
//     <input
//       className="form"
//       id="isUserActive"
//       type="text"
//       value={customerData.isUserActive ? "Yes" : "No"}
//       onChange={onChangeHandler}
//       readOnly
//     ></input>
//   </div>
// </div>
// </TabPanel>}