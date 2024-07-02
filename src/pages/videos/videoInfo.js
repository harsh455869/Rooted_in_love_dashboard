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

function VideoInfo(props) {
  console.log(props);
  // console.log(props.productInfo.productId);
  const [value, setValue] = useState(0);
const videoList=props?.videoData
  const [customerData, setcustomerData] = useState([]);
  const [vehicleData, setVehicleData] = useState({});
  const [title, settitle] = useState(videoList?.title)
  const [url, seturl] = useState(videoList?.url)
 
const [city, setcity] = useState('')
  const onChangeHandler = () => {
    let data = {
      title
      ,url
    };
    if(props.addnew){
      if(title.length<0  ){
        return;
      }
      const res = axios
      .post(
        `${config.serverURL}admin/home/video/add`,
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
    else{
      data={video_id:videoList?._id,title,url}
      const res = axios
      .post(
        `${config.serverURL}admin/home/video/update`,
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
      });}
  };

  function submitHandler() {
    axios
      .patch(
        `${config.serverURL}/users/` + props.voucherInfo.userId,
        customerData,
        {
          headers: {
            token: localStorage.getItem("token"),
            userId: localStorage.getItem("userId"),
          },
        }
      )
      .then((res) => {
        if (res.data.statusname == 200) {
          toast("Sucessfully Updated", {
            position: "bottom-center",
            type: "success",
          });
          getData();
        }
      })
      .catch((err) => {
        console.log(err);
        toast(err.response.data.message, {
          position: "bottom-center",
          type: "error",
        });
      });
  }

  const handleTabs = (e, val) => {
    console.log(val);
    setValue(val);
  };
 
  function getData() {
    // axios
    //   .get(
    //     `${config.serverURL}/admin/product/getproductcategory/${props.voucherInfo.societyId}`
    //   )
    //   .then((res) => {
    //     setcustomerData(res.data);
    //     console.log(customerData);
    //  setname(res.data.name)
    //  setarea(res.data.area)
    //  setstatus(res.data.status)
    //  setcity(res.data.city)
    //   });

    // axios
    //   .get(
    //     `${config.serverURL}/users?filter={"where":{"discountVoucherId": "${props.voucherInfo.discountVoucherId}","societiestatus":true}}`
    //   )
    //   .then((res) => {
    //     // console.log(res.data);
    //     setAppointmentList(res.data);
    //     console.log(appointmentList);
    //   });
  }

  useEffect(() => {
    if(!props.addnew){
      getData();
    }
    else{
      seturl(''
        
      )
      settitle('')
      const arr=['','','','','']
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
                  props.addnew?<>VIDEO<span className="bolding"> CREATE</span></>:<>VIDEO<span className="bolding"> INFO</span></>
                }
                
              </p>
              <AppBar position="static">
                <Tabs value={value} onChange={handleTabs}>
                  <Tab label="Video Details" />
                 {/* { !props.addnew&&<Tab label="Active User" />} */}
                  {/* <Tab label="Appointments" /> */}
                </Tabs>
              </AppBar>

              <TabPanel value={value} index={0}>
                <br />
                <div className="row">
                  <div className="col-12">
                    <label>Video Title</label>
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
                  {/* <div className="col-6">
                    <label>Area</label>
                    <input
                      className="form"
                      id="mobileNumber"
                      type="text"
                      value={area}
                      onChange={(e) => {
                        setarea(e.target.value);
                      }}
                    ></input>
                    <br />
                  </div> */}
                </div>
                <div className="row">
                  <div className="col-12">
                    <label>Video Url</label>
                    <input
                      className="form"
                      id="name"
                      type="text"
                      value={url}
                      onChange={(e) => {
                        seturl(e.target.value);
                      }}
                    ></input>
                  </div>
                  {/* <div className="col-6">
                    <label>City</label>
                    <input
                      className="form"
                      id="text"
                      type='text'
                      value={city}
                      onChange={(e) => {
                        setcity(e.target.value)
                      }}
                    ></input>
                  </div> */}
              </div>
                <div className="row">
                  <div className="col-6">
                    {/* <input className="form" id="isUserActive" type="text" value={customerData.isUserActive ? "Yes" : "No"} onChange={onChangeHandler} readOnly></input> */}
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
                      {props.addnew?'Create':'Save'}
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
             {!props.addnew&& <TabPanel value={value} index={1}>
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

export default VideoInfo;
