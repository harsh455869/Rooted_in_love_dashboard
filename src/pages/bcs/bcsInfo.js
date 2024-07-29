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
import { useNavigate, useNavigation } from "react-router-dom";
// import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";

function BcsInfo(props) {
 
  // console.log(props.productInfo.productId);
  const [value, setValue] = useState(0);
const bcsData=props?.bcsData
  const [customerData, setcustomerData] = useState([]);
  const [vehicleData, setVehicleData] = useState({});
 const [title, settitle] = useState(bcsData?.title)
 const [question, setquestion] = useState(bcsData?.question)
 const [image, setimage] = useState(bcsData?.image)
const [option_text, setoption_text] = useState('')
const [option_image, setoption_image] = useState('')
const [options, setoptions] = useState(bcsData?.options)
 const onhandleOption=(question_id)=>{
  let data={
    question_id:bcsData?._id,
    option_text,
    image:option_image


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
     title,question,image
      
    };
    console.log(data);
    if(props.addnew){
      if(title.length<0 ){
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
    else{
      data={title,bcs_id:bcsData?._id}
      // const res = axios
      // .post(
      //   `${config.serverURL}admin/bsc/question/add`,
      //   data
      // )
      // .then(() => {
      //   toast("Sucessfully Updated", {
      //     position: "bottom-center",
      //     type: "success",
      //   });
      //   window.location.reload()
      // })
      // .catch((e) => {
      //   console.error(e)
      //   console.log(e);
      // });
    }
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
    // console.log(base64);
    setoption_image(base64);
  };
  function getData() {
    // axios
    //   .get(
    //     `${config.serverURL}/admin/product/getproductbcs/${props.voucherInfo.societyId}`
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
  const onDeleteData=()=>{
    const data={bcs_id:bcsData?._id}
    const res = axios
      .post(
        `${config.serverURL}admin/productbcs/delete`
        ,data
      )
      .then(() => {
      
        toast("Sucessfully Deleted", {
          position: "bottom-center",
          type: "success",
        });
        setTimeout(()=>{
          window.location.reload();
        }, 1000)

       
     
      
       
        
       
      })
      .catch((e) => {
        console.log(e);
      });
     
  }

  useEffect(() => {
    if(!props.addnew){
      getData();
    }
    else{
      settitle('')
      setquestion('')
      setimage('')
      setoptions([])
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
                  props.addnew?<>BCS<span className="bolding"> CREATE</span></>:<>BCS<span className="bolding"> INFO</span></>
                }
                
              </p>
              <AppBar position="static">
                <Tabs value={value} onChange={handleTabs}>
                  <Tab label="Bcs Details" />
                 {/* { !props.addnew&&<Tab label="Active User" />} */}
                  {/* <Tab label="Appointments" /> */}
                </Tabs>
              </AppBar>

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
                  <img style={{width:200,height:200}} src={image?.startsWith('storage')?config.serverURL+image:image} alt="" srcset=""/>
                  <label>{props?.addnew?'Select Image':'Change Image'}</label>
                  <input onChange={handleFileUpload} type="file" title={props.addnew?"upload Image":"Change Image"}>
               
                  </input>
                    {/* <input className="form" id="isUserActive" type="text" value={customerData.isUserActive ? "Yes" : "No"} onChange={onChangeHandler} readOnly></input> */}
                  </div>
                
                </div>
              {!props.addnew&&<h2> Options</h2>}
              <div>
                {options?.map((item,index)=>{
return( 
   <div className="row">
  <div className="col-6">
    <label>Option {index+1}</label>
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
                  <img style={{width:50,height:50}} src={item?.image?.startsWith('storage')?config.serverURL+item?.image:item?.image} alt="" srcset=""/>
                  
                    {/* <input className="form" id="isUserActive" type="text" value={customerData.isUserActive ? "Yes" : "No"} onChange={onChangeHandler} readOnly></input> */}
                  </div>
  </div>
</div> 
)
                })}
              </div>
              {!props?.addnew&&<div className="row" style={{flexDirection:'row',display:'flex',alignItems:'center'}}>
  <div className="col-4">
    <label>Option Text </label>
    <input
      className="form"
      id="text"
      type='text'
      value={option_text}
     onChange={(e)=>setoption_text(e.target.value)}
    ></input>
  </div>
  <div className="col-4">
  <div className="col-6">
                  <img style={{width:50,height:50}} src={option_image} alt="" srcset=""/>
                  <label>{'Select Image'}</label>
                  <input onChange={handleOptionFileUpload} type="file" title={props.addnew?"upload Image":"Change Image"}>
               
                  </input>
                    {/* <input className="form" id="isUserActive" type="text" value={customerData.isUserActive ? "Yes" : "No"} onChange={onChangeHandler} readOnly></input> */}
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
</div> }
                <div className="row">
                <div className="col-6">
                    {/* <button
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
                    </button> */}
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

export default BcsInfo;
