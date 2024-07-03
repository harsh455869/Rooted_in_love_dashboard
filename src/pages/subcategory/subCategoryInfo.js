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

function SubCategoryInfo(props) {
  console.log(props);
  // console.log(props.productInfo.productId);
  const [value, setValue] = useState(0);
const categoryData=props?.categoryData
  const [customerData, setcustomerData] = useState([]);
  const [vehicleData, setVehicleData] = useState({});
 const [name, setname] = useState(categoryData?.name)
 const [area, setarea] = useState('')
 const [status, setstatus] = useState(false)
const [city, setcity] = useState('')
const [image, setimage] = useState(categoryData?.image)
  const onChangeHandler = () => {
    let data = {
      name,image:image
      
    };
    if(props.addnew){
      if(name.length<0){
        return;
      }
      const res = axios
      .post(
        `${config.serverURL}admin/productsubcategory/add`,
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
      data={name,sub_category_id:categoryData?._id,image}
      const res = axios
      .post(
        `${config.serverURL}admin/productsubcategory/update`,
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
  const onDeleteData=()=>{
    const data={sub_category_id:categoryData?._id}
    const res = axios
      .post(
        `${config.serverURL}admin/productsubcategory/delete`
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
    //     `${config.serverURL}/admin/product/getproductcategory/${props.voucherInfo.SUB-CATEGORYId}`
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
      if(props?.addnew){
        setname(''
        
        )
        setimage('')
      }
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
                  props.addnew?<>SUB-CATEGORY<span className="bolding"> CREATE</span></>:<>SUB-CATEGORY<span className="bolding"> INFO</span></>
                }
                
              </p>
              <AppBar position="static">
                <Tabs value={value} onChange={handleTabs}>
                  <Tab label="Sub-Category Details" />
                 {/* { !props.addnew&&<Tab label="Active User" />} */}
                  {/* <Tab label="Appointments" /> */}
                </Tabs>
              </AppBar>

              <TabPanel value={value} index={0}>
                <br />
                <div className="row">
                  <div className="col-12">
                    <label>Sub-Category name</label>
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
                  <div className="col-6">
                  <img style={{width:200,height:200}} src={config.serverURL+image} alt="" srcset=""/>
                  <input onChange={handleFileUpload} type="file" title={props.addnew?"upload Image":"Change Image"}>
               
                  </input>
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
                    <br/>
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

                </div>
                <div className="row">
                <div className="col-6">
                   
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

export default SubCategoryInfo;
