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

function ProductInfo(props) {
  console.log(props);
  // console.log(props.productInfo.productId);
  const [value, setValue] = useState(0);
  const productData = props?.productData;
  const [customerData, setcustomerData] = useState([]);
  const [vehicleData, setVehicleData] = useState({});
  const [name, setname] = useState('');
  const [area, setarea] = useState("");
  const [status, setstatus] = useState(false);
  const [city, setcity] = useState("");
  const [benefits, setbenefits] = useState("");
  const [ingredients, setingredients] = useState("");
  const [storage, setstorage] = useState("");
  const [feeding_instruction, setfeeding_instruction] = useState("");
  const [age_needed, setage_needed] = useState([]);
  const [price, setprice] = useState("");
  const [price_between, setprice_between] = useState("");
  const [gst, setgst] = useState("");
  const [is_available, setis_available] = useState("");
  const [hot_selling, sethot_selling] = useState("");
  const [description, setdescription] = useState("");
  const [product_category_id, setproduct_category_id] = useState("");
  const [product_sub_category_id, setproduct_sub_category_id] = useState("");
  const [health_conditions, sethealth_conditions] = useState("");
  const [sizes, setsizes] = useState([]);
  const [images, setimages] = useState([]);
  const [healthconditonsname, sethealthconditonsname] = useState([]);
  const [ageData, setageData] = useState(["adult", "senior", "puppy"]);
  const [allhealthconditions, setallhealthconditions] = useState([]);
  const [size, setsize] = useState("");
  const [prices, setprices] = useState("");
  const [categoryData, setcategoryData] = useState([])
  const [subcategoryData, setsubcategoryData] = useState([])
 const [uri, seturi] = useState('')
  const handleage = (e) => {
    const value = e.target.value;
    const fileter = ageData?.filter((item) => item != value);
    setageData([...fileter]);
    const arr = age_needed;
    setage_needed([...arr, value]);
  };
  const handleremovoeage = (e) => {
    const value = e;

    setageData([...ageData, value]);
    const fileter = age_needed?.filter((item) => item != value);
    setage_needed(fileter);
  };
  const onAddSize = () => {
    setsizes([...sizes, { price: parseInt(prices), size: size }]);
    console.log(sizes);
  };
  const onRemoveSize = (e) => {
    const filter = sizes?.filter(
      (item) => item?.size != e?.size && item?.price != e?.price
    );
    setsizes([...filter]);
  };
  const handlehealth = (e) => {
    const value = JSON.parse(e.target.value);
    console.log(value.name);
    // const fileter = allhealthconditions?.filter(
    //   (item) => item?._id != value?._id
    // );
    // setallhealthconditions([...fileter]);

    sethealth_conditions([...health_conditions, value?._id]);

    sethealthconditonsname([...healthconditonsname, value?.name]);
  };
  const handleremovohealth = (_id, name) => {
    const value = { _id: _id, name: name };

    // setallhealthconditions([...allhealthconditions, value]);
    let fileter = allhealthconditions?.filter(
      (item) => item?._id != value?._id
    );
    sethealth_conditions([...fileter]);
    fileter = allhealthconditions?.filter((item) => item?.name != value?.name);
    sethealthconditonsname([...fileter]);
  };
  const onDeleteData=()=>{
    const data={product_id:productData?._id}
    const res = axios
      .post(
        `${config.serverURL}admin/product/delete`
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
    setimages([...images,base64])
  };
  const onChangeHandler = () => {
    let data = {
      name,
      description,
      benefits,
      ingredients,
      storage,
      feeding_instruction,
      age_needed,
      price,
      price_between,
      gst,
      product_category_id:parseInt(product_category_id),
      product_sub_category_id:parseInt(product_sub_category_id),
      images,
      sizes,
      health_conditions,
      is_available:"1",
      hot_selling:"1"

    };
    console.log(data);
    if (props.addnew) {
      if (name.length < 0) {
        return;
      }
      const res = axios
        .post(`${config.serverURL}admin/product/add`, data)
        .then(() => {
          toast("Sucessfully Created", {
            position: "bottom-center",
            type: "success",
          });
          window.location.reload()
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      data = {  name,
        description,
        benefits,
        ingredients,
        storage,
        feeding_instruction,
        age_needed,
        price,
        price_between,
        gst,
        product_category_id:parseInt(product_category_id),
        product_sub_category_id:parseInt(product_sub_category_id),
        images,
        sizes,
        health_conditions,
        is_available:"1",
        hot_selling:"1"
        , product_id: productData?._id };
      const res = axios
        .post(`${config.serverURL}admin/product/update`, data)
        .then(() => {
          toast("Sucessfully Updated", {
            position: "bottom-center",
            type: "success",
          });
          window.location.reload()
        })
        .catch((e) => {
          console.error(e);
          console.log(e);
        });
    }
  };
const handleRemoveImage=(inex)=>{
  const filter=images?.filter((item,index)=>inex!=index);
  setimages([...filter])

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
    axios
      .get(
        `${config.serverURL}admin/product/getproductdetails?product_id=${productData?._id}`
      )
      .then((res) => {
        const productdata = res.data?.data;
        console.log(res.data);
        setname(productdata?.name)
        setdescription(productdata?.description);
        setbenefits(productdata?.benefits);
        setingredients(productdata?.ingredients);
        setstorage(productdata?.storage);
        setfeeding_instruction(productdata?.feeding_instruction);
        //  console.log(age_needed);
        //  const arr=JSON.parse(productdata?.age_needed)
        //  setage_needed(productdata?.age_needed)
        setprice(productdata?.price);
        setprice_between(productdata?.price_between);
        setgst(productdata?.gst);
        setis_available(productdata?.is_available);
        sethot_selling(productdata?.hot_selling);
        setproduct_category_id(productdata?.product_category_id);
        console.log(productdata?.product_category_id);
        setproduct_sub_category_id(productdata?.product_sub_category_id);
        setimages(productdata?.images)
        setsizes([...productdata?.sizes])
        const ids=[]
        const names=[]
      productdata?.health_conditions?.map((item)=>{
        ids.push(item?.health_condition_id)
        names.push(item?.name)
      })
     
      sethealth_conditions(ids)
      sethealthconditonsname(names)
        console.log(res.data);
      });

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
    axios
      .get(`${config.serverURL}admin/product/gethealthconditionsname`)
      .then((res) => {
        setallhealthconditions(res.data.data);
      });
      axios
      .get(`${config.serverURL}admin/product/getcategorynames`)
      .then((res) => {
        setcategoryData(res.data.data);
      });
      axios
      .get(`${config.serverURL}admin/product/getsubcategorynames`)
      .then((res) => {
        setsubcategoryData(res.data.data);
      });
    if (!props.addnew) {
      console.log("data");
      getData();
    } else {
      const arr = ["", "", "", "", ""];
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
                {props.addnew ? (
                  <>
                    PRODUCT<span className="bolding"> CREATE</span>
                  </>
                ) : (
                  <>
                    PRODUCT<span className="bolding"> INFO</span>
                  </>
                )}
              </p>
              <AppBar position="static">
                <Tabs value={value} onChange={handleTabs}>
                  <Tab label="product Details" />
                  {/* { !props.addnew&&<Tab label="Active User" />} */}
                  {/* <Tab label="Appointments" /> */}
                </Tabs>
              </AppBar>

              <TabPanel value={value} index={0}>
                <br />
                <div className="row">
                  <div className="col-6">
                    <label>product name</label>
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
                  <div className="col-6">
                    <label>product description</label>
                    <textarea
                      className="form"
                      id="name"
                      type="text"
                      style={{}}
                      rows={4}
                      value={description}
                      onChange={(e) => {
                        setdescription(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-6">
                    <label>product benefits</label>
                    <input
                      className="form"
                      id="name"
                      type="text"
                      value={benefits}
                      onChange={(e) => {
                        setbenefits(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="col-6">
                    <label>product ingredients</label>
                    <input
                      className="form"
                      id="name"
                      type="text"
                      value={ingredients}
                      onChange={(e) => {
                        setingredients(e.target.value);
                      }}
                    ></input>
                  </div>
                </div>

                <br />
                <div className="row">
                  <div className="col-6">
                    <label>storage</label>
                    <input
                      className="form"
                      id="name"
                      type="text"
                      value={storage}
                      onChange={(e) => {
                        setstorage(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="col-6">
                    <label>Gst</label>
                    <input
                      className="form"
                      id="name"
                      type="text"
                      value={gst}
                      onChange={(e) => {
                        setgst(e.target.value);
                      }}
                    ></input>
                  </div>
                </div>
                <br/>
                <div className="row">
                  <div className="col-12">
                    <label>feeding instruction</label>
                    <textarea
                    rows={10}
                    
                      className="form"
                      id="text"
                      type='button'
                      value={feeding_instruction}
                     onChange={(e)=>{setfeeding_instruction(e.target.value)}}
                    ></textarea>
                  </div>
                
              </div>
              <br/>
                <div className="row">
                  <div
                    style={{
                      display:'flex',
                      flexDirection: "row",
                    
                    }}
                    className="row flex"
                  >
                    <div className="col-6">
                      <label
                        style={{
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                      >
                        Age Needed
                      </label>
                      <select
                        onChange={handleage}
                        style={{ width: "100%", fontSize: "12px" }}
                        className="form"
                        id="partnerId"
                        name="enabled"
                      >
                        <option value="" defaultChecked>
                          Select
                        </option>
                        {ageData?.map((option) => {
                          return (
                            <>
                              <option onc value={option}>
                                {option}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                   
                    <div className="col-6">
                      <label
                        style={{
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                      >
                      Product Category
                      </label>
                      <select
                      value={parseInt(product_category_id)}
                        onChange={(e)=>{setproduct_category_id(e.target.value);console.log('value is -------',e);}}
                        style={{ width: "100%", fontSize: "12px" }}
                        className="form"
                        id="partnerId"
                        name="enabled"
                      >
                        <option value="" defaultChecked>
                          Select
                        </option>
                        {categoryData?.map((option) => {
                          return (
                            <>
                              <option   value={option?._id}>
                                {option?.name}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                 
                  </div>
                
                  <div className="col-6 row">
                    <div
                      style={{ flexDirection: "row", display: "flex", gap: 10 }}
                    >
                      {(age_needed ? age_needed : [])?.map((item, index) => {
                        return (
                          <p
                            onClick={() => handleremovoeage(item)}
                            style={{ fontSize: 10 }}
                          >
                            {item} {"   "}{" "}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <br />

                <div className="row">
                  <div
                    style={{
                      flexDirection: "row",
display:'flex',
                      alignItems: "center",
                    }}
                    className="row flex"
                  >
                    <div className="col-8">
                      <label
                        style={{
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                      >
                        health conditions
                      </label>
                      <select
                        onChange={handlehealth}
                        style={{ width: "100%", fontSize: "12px" }}
                        className="form"
                        id="partnerId"
                        name="enabled"
                      >
                        <option value="" defaultChecked>
                          Select
                        </option>
                        {allhealthconditions?.map((option) => {
                          return (
                            <>
                              <option value={JSON.stringify(option)}>
                                {option?.name}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-4">
                      <label
                        style={{
                          textAlign: "left",
                          fontSize: "14px",
                        }}
                      >
                      Product SubCategory
                      </label>
                      <select
                      value={product_sub_category_id}
                        onChange={(e)=>setproduct_sub_category_id(e.target.value)}
                        style={{ width: "100%", fontSize: "12px" }}
                        className="form"
                        id="partnerId"
                        name="enabled"
                      >
                        <option value="" defaultChecked>
                          Select
                        </option>
                        {subcategoryData?.map((option) => {
                          return (
                            <>
                              <option  value={option?._id}>
                                {option?.name}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="col-6">
                    <div
                      style={{ flexDirection: "row", display: "flex", gap: 10,flexWrap:'wrap' }}
                    >
                      {(health_conditions ? health_conditions : [])?.map(
                        (item, index) => {
                          return (
                            <p
                              onClick={() =>
                                handleremovohealth(
                                  item,
                                  healthconditonsname[index]
                                )
                              }
                              style={{ fontSize: 10 }}
                            >
                              {healthconditonsname[index]} {"   "}{" "}
                            </p>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-6">
                    <label>product price</label>
                    <input
                      className="form"
                      id="name"
                      type="text"
                      value={price}
                      onChange={(e) => {
                        setprice(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="col-6">
                    <label>product price range</label>
                    <input
                      className="form"
                      id="name"
                      type="text"
                      value={price_between}
                      onChange={(e) => {
                        setprice_between(e.target.value);
                      }}
                    ></input>
                  </div>
                  <br />
                  <br />
                  <label>Add Sizes </label>
                  <div className="row">
                    <div className="col-4">
                      <label>size </label>
                      <input
                        className="form"
                        id="name"
                        type="text"
                        value={size}
                        onChange={(e) => {
                          setsize(e.target.value);
                        }}
                      ></input>
                    </div>
                    <div className="col-4">
                      <label>price</label>
                      <input
                        className="form"
                        id="name"
                        type="text"
                        value={prices}
                        onChange={(e) => {
                          setprices(e.target.value);
                        }}
                      ></input>
                    </div>
                    <div className="col-4">
                      <button
                        onClick={onAddSize}
                        className="col-4"
                        style={{
                          borderWidth: 0,
                          backgroundColor: "#17545E",
                          borderRadius: 10,
                          color: "white",
                          fontSize: 15,
                          padding: 10,
                          alignSelf: "flex-end",
                        }}
                      >
                        {"Add"}
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <label>Available Sizes</label>

                {sizes?.map((item) => {
                  return (
                    <div className="row">
                      <div className="col-4">
                        <input
                          className="form"
                          id="name"
                          type="text"
                          value={item?.size}
                        ></input>
                      </div>
                      <div className="col-4">
                        <input
                          className="form"
                          id="name"
                          type="text"
                          value={item?.price}
                        ></input>
                      </div>
                      <div className="col-4">
                        <button
                          onClick={() => onRemoveSize(item)}
                          className="col-5"
                          style={{
                            borderWidth: 0,
                            backgroundColor: "#17545E",
                            borderRadius: 10,
                            color: "white",
                            fontSize: 15,
                            padding: 10,
                            alignSelf: "flex-end",
                          }}
                        >
                          {"Remove"}
                        </button>
                      </div>
                    </div>
                  );
                })}
                <br/>
                <div className="row">
                  <div className="col-6">
                    <label>Upload Images</label>
                  <input onChange={handleFileUpload} multiple={true} type="file" title={props.addnew?"upload Image":"Change Image"}/>
                  </div>
                  </div>
                  
                  <div className="row">
                  {images?.map((item,index)=>{
                   
                    return( <img onClick={()=>handleRemoveImage(index)} style={{width:200,height:200}} src={(item?.url?.startsWith('storage'))?(config.serverURL+item?.url):item} alt="" srcset=""/>)
                  })}
                  </div>
                <br/>
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
                      {props.addnew ? "Create" : "Save"}
                    </button>
                  </div>
                </div>
                <br />

                <br />
              </TabPanel>
              {!props.addnew && (
                <TabPanel value={value} index={1}>
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
                </TabPanel>
              )}
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

export default ProductInfo;
