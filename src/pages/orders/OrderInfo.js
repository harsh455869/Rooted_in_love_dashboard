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

function OrderInfo(props) {
  console.log(props);
  // console.log(props.productInfo.productId);
  const [value, setValue] = useState(0);
const categoryData=props?.orderData
  const [customerData, setcustomerData] = useState([]);
  const [vehicleData, setVehicleData] = useState({});
 const [name, setname] = useState(categoryData?.name)
 const [area, setarea] = useState('')
 const [status, setstatus] = useState(false)
const [city, setcity] = useState('')
const [orderData, setorderData] = useState(categoryData)
const [image, setimage] = useState(categoryData?.image)
  const onChangeHandler = (e) => {
    if(e.target.value){
      let data = {
        order_status:e.target.value,
        order_id:orderData?._id
      };
      const res = axios
      .post(
        `${config.serverURL}admin/order/status/update`,
        data
      )
      .then(() => {
        toast("Status Updated", {
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
                <>Order<span className="bolding"> INFO</span></>
                }
                
              </p>
              <AppBar position="static">
                <Tabs  value={value} onChange={handleTabs}>
                  <Tab label="Order Details" />
                 {/* { !props.addnew&&<Tab label="Active User" />} */}
                  {/* <Tab label="Appointments" /> */}
                </Tabs>
              </AppBar>

              <TabPanel value={value} index={0}>
                <br />
                {
                  orderData?.products?.map((item)=>{
                    return( <div style={{boxShadow:'revert',borderWidth:1,borderColor:'GrayText'}} className="row my-4">
                      <div style={{display:'flex',justifyContent:'space-between'}}>
                        <div style={{display:'flex',gap:20}}>
                        <img style={{height:'100px',width:'100px',borderRadius:5}} src={config.serverURL+item?.image}/>
                     <div>
                      <h4>{item?.name}</h4>
                      <h6>Quantity:{item?.quantity}</h6>
                      </div>
                      </div>
                     
                      </div>
                    </div>)
                  })
                  
                 
                    
                    
                }
                <div style={{justifyContent:'flex-end'}} className="row">
                <div className="col-5">
                   <p style={{fontSize:16,lineHeight:'17px'}}><span style={{fontSize:18,fontWeight:'bold'}}>Total Amount</span> - Rs.{orderData?.total}</p>
                   <p style={{fontSize:12}}>payment Id:{orderData?.payment_id}</p>
                  </div>
                </div>
                <div className="col-5">
                <p style={{fontSize:20}}>Order Status-</p>
                <select
                      onChange={onChangeHandler}
                      value={orderData.order_status}
                      style={{  fontSize: "12px" }}
                      className="form"
                      id="partnerId"
                      name="enabled"
                    >
                 
                      {['dispatched','delivered','cancelled'].map((option, index) => {
                      
                        return (
                          <>
                            {
                              <option value={option}>
                                {option}
                              </option>
                            }
                          </>
                        );
                      })}
                    </select>
                  </div>
                <div className="row">
                <div className="col-5">
                   <p style={{fontSize:20}}>Customer Info</p>
                   <p
                                style={{
                                  fontWeight: "400",
                                  fontSize: "16px",
                                  marginTop: "0px",
                                }}
                              >
                                Customer Name - {orderData?.user_name} 
                              </p>
                              <p
                                style={{
                                  fontWeight: "400",
                                  fontSize: "16px",
                                  marginTop: "0px",
                                }}
                              >
                                Mobile Number  - {orderData?.user_phoneno} 
                              </p>
                              <p
                                style={{
                                  fontWeight: "400",
                                  fontSize: "16px",
                                  marginTop: "0px",
                                }}
                              >
                                Email  - {orderData?.user_email} 
                              </p>
                              <p
                                style={{
                                  fontWeight: "400",
                                  fontSize: "16px",
                                  marginTop: "0px",
                                }}
                              >
                                Address  - 
                              </p>
                  </div>
                </div>
                <div  className="row">
              
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

export default OrderInfo;
