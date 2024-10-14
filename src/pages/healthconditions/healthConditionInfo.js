import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import AppBar from "@mui/material/AppBar";
import config from "../../config";

function HealthConditionInfo(props) {
  const [value, setValue] = useState(0);
  const healthconditionData = props?.healthconditionData;
  const [name, setName] = useState(healthconditionData?.name || '');
  const [searchTermRecommended, setSearchTermRecommended] = useState('');
  const [searchTermHotSelling, setSearchTermHotSelling] = useState('');
  const [selectedRecommended, setSelectedRecommended] = useState(healthconditionData?.recommended_product || []);
  const [selectedHotSelling, setSelectedHotSelling] = useState(healthconditionData?.hot_selling_product || []);
  const [Product, setProduct] = useState([]);

  console.log(healthconditionData, "...")
  const getAllProducts = async () => {
    try {
      const res = await axios.get(`${config.serverURL}admin/product/getall`);
      toast("Successfully fetched", {
        position: "bottom-center",
        type: "success",
      });
      setProduct(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const filteredRecommendedProducts = Product.filter(product =>
    product.name.toLowerCase().includes(searchTermRecommended.toLowerCase())
  );

  const filteredHotSellingProducts = Product.filter(product =>
    product.name.toLowerCase().includes(searchTermHotSelling.toLowerCase())
  );

  const handleAddRecommendedProduct = (product) => {
    if (!selectedRecommended.some(p => p._id === product._id)) {
      setSelectedRecommended([...selectedRecommended, product]);
      setSearchTermRecommended('');
    }
  };

  const handleAddHotSellingProduct = (product) => {
    if (!selectedHotSelling.some(p => p._id === product._id)) {
      setSelectedHotSelling([...selectedHotSelling, product]);
      setSearchTermHotSelling('');
    }
  };

  const handleRemoveRecommendedProduct = (id) => {
    setSelectedRecommended(selectedRecommended.filter(p => p._id !== id));
  };

  const handleRemoveHotSellingProduct = (id) => {
    setSelectedHotSelling(selectedHotSelling.filter(p => p._id !== id));
  };

  // const onChangeHandler = () => {
  //   let data = {
  //     name,
  //     recommendedProduct: selectedRecommended.map(p => p._id),
  //     hotSellingProduct: selectedHotSelling.map(p => p._id)

  //   };
  //   if (props.addnew) {
  //     if (name.length < 0) {
  //       return;
  //     }
  //     const res = axios
  //       .post(
  //         `${config.serverURL}admin/healthcondition/add`,
  //         data
  //       )
  //       .then(() => {
  //         toast("Sucessfully Created", {
  //           position: "bottom-center",
  //           type: "success",
  //         });
  //         window.location.reload()
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }
  //   else {
  //     data = { name, health_condition_id: healthconditionData?._id }
  //     const res = axios
  //       .post(
  //         `${config.serverURL}admin/healthcondition/update`,
  //         data
  //       )
  //       .then(() => {
  //         toast("Sucessfully Updated", {
  //           position: "bottom-center",
  //           type: "success",
  //         });
  //         window.location.reload()
  //       })
  //       .catch((e) => {
  //         console.error(e)
  //         console.log(e);
  //       });
  //   }
  // };

  const onChangeHandler = async () => {
    let healthConditionData = {
        name,
        recommended_product: selectedRecommended.length > 0 ? selectedRecommended.map(p => p._id) : null,
        hot_selling_product: selectedHotSelling.length > 0 ? selectedHotSelling.map(p => p._id) : null,
    };

    try {
        if (props.addnew) {
            if (name.length < 1) {
                return;
            }
            // Create Health Condition
            await axios.post(`${config.serverURL}admin/healthcondition/add`, healthConditionData);
            toast("Successfully Created", {
                position: "bottom-center",
                type: "success",
            });
        } else {
            // Update Health Condition
            healthConditionData.health_condition_id = healthconditionData?._id; // Add the health condition ID for the update
            await axios.post(`${config.serverURL}admin/healthcondition/update`, healthConditionData);
            toast("Successfully Updated", {
                position: "bottom-center",
                type: "success",
            });
        }

        // Update related products regardless of add or update
        await axios.post(`${config.serverURL}admin/healthcondition/relatedproducts/add`, {
            health_condition_id: healthconditionData?._id,
            recommended_product: healthConditionData.recommended_product,
            hot_selling_product: healthConditionData.hot_selling_product,
        });

        window.location.reload();
    } catch (error) {
        console.error(error);
        toast("An error occurred", {
            position: "bottom-center",
            type: "error",
        });
    }
};

  const onDeleteData = () => {
    const data = { health_condition_id: healthconditionData?._id };
    axios.post(`${config.serverURL}admin/healthcondition/delete`, data)
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
      setSelectedHotSelling([]);
      setSelectedRecommended([]);
    }
  }, [props.addnew]);
  

  return (
    <div className="formadj">
      <div className="row">
        <div className="col-12">
          <p className="information">
            {props.addnew ? "HEALTH-CONDITION CREATE" : "HEALTH-CONDITION INFO"}
          </p>
          <AppBar position="static">
            <Tabs value={value} onChange={(e, val) => setValue(val)}>
              <Tab label="Health-Condition Details" />
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
                <label>Recommended Product</label>
                <input
                  className="form"
                  type="text"
                  value={searchTermRecommended}
                  onChange={(e) => setSearchTermRecommended(e.target.value)}
                />
                {searchTermRecommended && filteredRecommendedProducts.length > 0 && (
                  <ul className="dropdown">
                    {filteredRecommendedProducts.map(product => (
                      <li key={product._id} onClick={() => handleAddRecommendedProduct(product)}>
                        {product.name}
                      </li>
                    ))}
                  </ul>
                )}
                <div>
                  {selectedRecommended.map(product => (
                    <span key={product._id} className="selected-product" style={{ margin: 10 }}>
                      {product.name}{' '}{' '}
                      <button onClick={() => handleRemoveRecommendedProduct(product._id)}> x </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <label>Hot Selling Product</label>
                <input
                  className="form"
                  type="text"
                  value={searchTermHotSelling}
                  onChange={(e) => setSearchTermHotSelling(e.target.value)}
                />
                {searchTermHotSelling && filteredHotSellingProducts.length > 0 && (
                  <ul className="dropdown">
                    {filteredHotSellingProducts.map(product => (
                      <li key={product._id} onClick={() => handleAddHotSellingProduct(product)}>
                        {product.name}
                      </li>
                    ))}
                  </ul>
                )}
                <div>
                  {selectedHotSelling.map(product => (
                    <span key={product._id} className="selected-product" style={{ margin: 10 }}>
                      {product.name}{'   '}{'   '}
                      <button onClick={() => handleRemoveHotSellingProduct(product._id)}> x </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
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

export default HealthConditionInfo;
