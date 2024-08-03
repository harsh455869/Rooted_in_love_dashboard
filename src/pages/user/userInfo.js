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


function CustomerInfo(props) {
  console.log(props);
  // console.log(props.productInfo.productId);
  const [value, setValue] = useState(0);

  const [customerData, setCustomerData] = useState(props?.customerInfo);
  const [appointmentData, setAppointmentData] = useState({});
  const [vehicleData, setVehicleData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [appointmentList, setAppointmentList] = useState([]);
  const [vehicleDataIndex, setvehicleDataIndex] = useState(-1);
  const [loading, setloading] = useState(false);
  const [customerName, setcustomerName] = useState(customerData?.name)
  const [mobileNumber, setmobileNumber] = useState(customerData?.phoneno)
  const [email, setemail] = useState(customerData?.email)
  const [city, setcity] = useState('')
  const [isUserActive, setisUserActive] = useState(customerData?.disable)
  const [userType, setuserType] = useState("customer")
  const [orderData, setorderData] = useState([])
  const [active, setactive] = useState(false)
  const onChangeHandler = (e) => {
    let value = e.target.value;
    let obj = appointmentData;

    if (e.target.id === "partnerId" && e.target.value) {
      value = JSON.parse(value);
      console.log(value);
      obj.employeeId = value.userId;
      obj.managerName = value.name;
      obj.mobileNumber = value.mobileNumber;
      obj.appointmentSlot = value.timeSlot;
      obj.vehicleId = value.vehicleId;
      obj.customerId = value.customerId;
      obj.membershipId = value.membershipId;
      obj.paymentStatus = "completed";
      obj.status = "upcoming";
      setvehicleDataIndex(value.index);
      console.log(value.index + "----------------------");
    } else if (e.target.id === "appointmentDate") {
      obj[e.target.id] = `${value}T00:00:00.000Z`;
    } else {
      obj[e.target.id] = value;
    }
    setAppointmentData(obj);
    console.log(obj);
  };
  const onChangeHandlerData = () => {
    const data = {
      disable:!isUserActive,
      name:customerName,
      phoneno:mobileNumber,
      email,
      
      user_id:props.customerInfo?._id
     };
    const res = axios
      .post(
        `${config.serverURL}admin/user/update`,
        data
      )
      .then(() => {
      
        toast("Sucessfully Updated", {
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

      
  };
  const onDeleteData=()=>{
    const data={user_id:props?.customerInfo?._id}
    const res = axios
      .post(
        `${config.serverURL}admin/user/update`
        
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
  const Bookappointments = async () => {
    console.log("appintmnet");
    setloading(true);

    const membershipEndAt = vehicleData[vehicleDataIndex].membershipEndAt;
    // const membershipEndAt=moment().add(30,'days');
    let oneDayData = appointmentData;
    let dated = new Date(oneDayData.appointmentDate);
    //   console.log(oneDayData.appointmentDate);
    let appointmentListData = [];

    const date1 = moment(membershipEndAt);
    const date2 = moment(dated);
    const diff = date1.diff(date2, "days");
    let currentDate;
    // console.log(new Date(dated.setDate(dated.getDate()+8)));
    currentDate = new Date(dated);
    for (let i = 1; i <diff+1; i++) {
      oneDayData = { ...oneDayData, appointmentDate: currentDate };
      appointmentListData.push(oneDayData);

      currentDate = new Date(
        dated.getFullYear(),
        dated.getMonth(),
        dated.getDate() + i
      );
    }

    try {
      const responses = await axios.all(
        appointmentListData.map((conf) =>
          axios.post(`${config.serverURL}/appointments`, conf)
        )
      );
     
      const responseData = responses.map((response) => response.data);
      if (responseData) {
        const updateddata={
          isAssignable:false
        }
        const res =await axios
        .patch(
          `${config.serverURL}/vehicles/${oneDayData?.vehicleId}`,
          updateddata
        )
        
        console.log(responseData);
       
        toast("Sucessfully Created", {
          position: "bottom-center",
          type: "success",
        });
      
        getData()
      }
    } catch (error) {
      toast(error.response.data.message, {
        position: "bottom-center",
        type: "error",
      });
      console.error("Error making POST requests:", error);
    }

    setloading(false);
   
  };
  function submitHandler(appointmentData) {
    axios
      .post(`${config.serverURL}/appointments`, appointmentData)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  const handleTabs = (e, val) => {
    console.log(val);
    setValue(val);
  };

  function getData() {
    console.log(props, props.customerInfo.userId);
    // axios
    //   .get(`${config.serverURL}/users/${props.customerInfo.userId}`)
    //   .then((res) => {
    //     console.log(res.data);
    //     setCustomerData(res.data);
    //     console.log(customerData);
    //     setcustomerName(res?.data?.name)
    //     setmobileNumber(res?.data?.mobileNumber)
    //     setemail(res?.data?.email)
    //     setcity(res?.data?.city)
    //     setactive((res?.data?.status)=='active'?false:true)
    //   });
    // axios.get(`${config.serverURL}admin/order/getall`)
    // .then((res)=>{
    //     setorderData(res?.data?.data);
   
    // }).catch(()=>{

    // })
    // axios
    //   .get(
    //     `${config.serverURL}/users?filter={"order":"createdAt desc","where":{"userType":"partner"}}`
    //   )
    //   .then((res) => {
    //     // console.log(res.data);
    //     setEmployeeData(res.data);
    //     console.log(employeeData);
    //   });

    // axios
    //   .get(
    //     `${config.serverURL}/appointments?filter={"order":"createdAt desc","where":{"customerId": "${props.customerInfo.userId}"},"include":[{"relation":"employee","scope":{"offset":0,"skip":0,"order":"desc","fields":{},"include":[]}},{"relation":"vehicle","scope":{"offset":0,"skip":0,"order":"desc","fields":{},"include":[]}},{"relation":"userReview"}]}`
    //   )
    //   .then((res) => {
    //     // console.log(res.data);
    //     setAppointmentList(res.data);
    //     console.log(appointmentList);
    //   });
  }

  useEffect(() => {
    getData();
  }, [setCustomerData]);

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
                CUSTOMER<span className="bolding"> INFO</span>
              </p>
              <AppBar position="static">
                <Tabs value={value} onChange={handleTabs}>
                  <Tab label="Customer Details" />
                  <Tab label="Pet List" />
                  
                  {/* <Tab label="Orders" />  */}
                </Tabs>
              </AppBar>

              <TabPanel value={value} index={0}>
                <br />
                <div className="row">
                  <div className="col-6">
                    <label>Customer Name</label>
                    <input
                      className="form"
                      id="name"
                      type="text"
                      value={customerName}
                      onChange={(e)=>setcustomerName(e.target.value)}
                      
                    ></input>
                  </div>
                  <div className="col-6">
                    <label>Mobile Number</label>
                    <input
                      className="form"
                      id="mobileNumber"
                      type="number"
                      value={mobileNumber}
                      
                      onChange={(e)=>setmobileNumber(e.target.value)}
                      
                    ></input>
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <label>Email</label>
                    <input
                      className="form"
                      id="email"
                      type="text"
                      value={email}
                      onChange={(e)=>setemail(e.target.value)}
                      
                    ></input>
                  </div>
                  <div className="col-6">
                    <label>Is Disable</label>
                    <input
                      className="form"
                      id="isUserActive"
                      type="text"
                      value={active}
                      onClick={()=>{setactive(!active)}}
                      
                    ></input>
                  </div>
                </div>
                <br/>
                {/* <div className="row">
                  <div className="col-6">
                    <label>Is User Active</label>
                    <input
                      className="form"
                      id="isUserActive"
                      type="text"
                      value={customerData?.isUserActive ? "Yes" : "No"}
                    
                      readOnly
                    ></input>
                  </div>
                 
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
                      onClick={onChangeHandlerData}
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
                      {"Update"}
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

            <TabPanel  value={value} index={1}>
            {customerData?.pets?.map((item, index) => {
                  return (
                    item && (
                      <>
                        <p className="dateadj">
                          {moment(item.createdAt).format("MMM Do YY")}
                        </p>
                        <div className="row historyitem mb-4">
                          <div className="col-1 mb-3">
                            {/* <Avatar name={ item.firstName } round={ true } size={ 70 } /> */}
                          </div>
                          <div className="col-8">
                            {/* <p className="actionBy">{ item.hotel?.propertyName } <span style={{"fontWeight": "400", "fontSize": "14px", "marginLeft": "5px"}}>(Room No: {item.room?.roomNumber} {item.roomType})</span></p> */}
                            <div>
                              {/* <p style={{ fontWeight: 400, fontSize: '16px' }}>Vehicle Number - {new Date(item.appointmentDate).toLocaleDateString('en-GB', {month: 'short' ,day: 'numeric', year: 'numeric',  })}</p> */}
                              <p
                                style={{
                                  fontWeight: 400,
                                  fontSize: "16px",
                                  marginTop: "30px",
                                }}
                              >
                                <img
                                  src={config.serverURL+item.image}
                                  style={{ width: "500px" }}
                                  alt="https://spinycar-resources.s3.ap-south-1.amazonaws.com/images%20%2820%29.jpeg.jpeg"
                                />
                              </p>{" "}
                              <p
                                style={{
                                  fontWeight: "400",
                                  fontSize: "16px",
                                  marginTop: "0px",
                                }}
                              >
                                Pet Name - {item.name} 
                              </p>
                              <p
                                style={{
                                  fontWeight: "400",
                                  fontSize: "16px",
                                  marginTop: "0px",
                                }}
                              >
                               Sex- {item.sex}
                              </p>
                              <p
                                style={{
                                  fontWeight: "400",
                                  fontSize: "16px",
                                  marginTop: "0px",
                                }}
                              >
                                Breed type - {item.breed_type}
                              </p>
                              <p
                                style={{
                                  fontWeight: "400",
                                  fontSize: "16px",
                                  marginTop: "0px",
                                }}
                              >
                                weight - {item.weight}
                              </p>
                              <p
                                style={{
                                  fontWeight: "400",
                                  fontSize: "16px",
                                  marginTop: "0px",
                                }}
                              >
                                dob - {item.dob}
                              </p>
                              {/* {item.membershipId && (
                                <p
                                  style={{
                                    fontWeight: "400",
                                    fontSize: "16px",
                                    marginTop: "0px",
                                  }}
                                >
                                  Membership Status -{" "}
                                  {new Date().getTime() >
                                  new Date(item.membershipEndAt).getTime()
                                    ? "Expired"
                                    : "Active"}
                                </p>
                              )}
                              {item.membershipId && (
                                <p
                                  style={{
                                    fontWeight: "400",
                                    fontSize: "16px",
                                    marginTop: "0px",
                                  }}
                                >
                                  Membership Start Date -{" "}
                                  {moment(item.membershipStartAt).format(
                                    "MMM Do YY"
                                  )}
                                </p>
                              )}
                              {item.membershipId && (
                                <p
                                  style={{
                                    fontWeight: "400",
                                    fontSize: "16px",
                                    marginTop: "0px",
                                  }}
                                >
                                  Membership End Date -{" "}
                                  {moment(item.membershipEndAt).format(
                                    "MMM Do YY"
                                  )}
                                </p>
                              )}
                              {item.membershipId && (
                                <p
                                  style={{
                                    fontWeight: "400",
                                    fontSize: "16px",
                                    marginTop: "0px",
                                  }}
                                >
                                  Time Slot - {item.timeSlot}
                                </p>
                              )} */}
                            </div>
                            {/* <label style={{"fontWeight": "400", "fontSize": "14px"}}>Booking Price - ₹{item.bookingPrice} { item.isDiscountVoucherApplied ? "Discount Applied" : "No Discount" } | <span style={{"color": "green"}}>{ item.isDiscountVoucherApplied ? item.discountVoucherAmount + "₹ OFF" : "-" }</span> | Total Cost - ₹{item.totalCost}</label>
                                        <label style={{"fontWeight": "400", "fontSize": "14px", "margin": "16px 0px"}}>{moment(item.checkInDate).format("MMM Do YY")} - {moment(item.checkOutDate).format("MMM Do YY")}</label>
                                        <label ondstyle={{"fontWeight": "400", "fontSize": "14px", "margin": "16px 0px"}}>Payment Done - ₹{(item.totalCost*20)/100} Payment At Hotel - ₹{(item.totalCost*80)/100}</label>
                                        <label style={{"fontWeight": "400", "fontSize": "14px", "margin": "16px 0px"}}>Booking Hours - {item.hours} hours</label> */}
                          </div>
                          {/* <div className="col-3">
                            <p className="history">
                              {item.membership?.name || "N/A"}
                            </p>
                          </div> */}
                          {/* {item.membershipId && (
                            <div
                              className="col-12 mb-4 mr-4"
                              style={{ textAlign: "right", display: "block" }}
                            >
                             
                            </div>
                          )} */}
                        </div>
                        {/* <div className="col-1">
                                                {sortBy=="createdAt" && order=="ascending" ? <input id="N" onChange={(e)=>setCheckBox(e)} className="checkbox" type="checkbox" value="ascending" checked="true"/>: <input id="ASC" onChange={(e)=>setCheckBox(e)} className="checkbox" type="checkbox" value="ascending"/>}
                                            </div> */}
                      </>
                    )
                  );
                })}
            </TabPanel>
            <TabPanel value={value} index={2}>
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

export default CustomerInfo;
