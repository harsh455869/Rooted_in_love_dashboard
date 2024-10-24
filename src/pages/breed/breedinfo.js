import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import config from "../../config";

function BreedInfo(props) {
  const [value, setValue] = useState(0);
  const [name, setName] = useState(props.breedData?.name || '');
console.log(props,"..")
  const onChangeHandler = async () => {
    const breedData = {
      name,
      breed_id: props.breedData?._id // Set breed_id for update
    };

    try {
      if (props.addnew) {
        // Create Breed
        if (!name) {
          toast("Name is required", { position: "bottom-center", type: "error" });
          return;
        }
        await axios.post(`${config.serverURL}admin/breed/add`, { name });
        toast("Successfully Created", { position: "bottom-center", type: "success" });
      } else {
        // Update Breed
        if (!breedData.breed_id) {
          toast("Breed ID is required for update", { position: "bottom-center", type: "error" });
          return;
        }
        await axios.post(`${config.serverURL}admin/breed/update`, breedData);
        toast("Successfully Updated", { position: "bottom-center", type: "success" });
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
      toast("An error occurred", { position: "bottom-center", type: "error" });
    }
  };

  const onDeleteData = () => {
    const data = { breed_id: props.breedData._id };
    console.log(props.breedData._id,"..")
    axios.post(`${config.serverURL}admin/breed/delete`, data)
      .then(() => {
        toast("Successfully Deleted", { position: "bottom-center", type: "success" });
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
    } else if (props.breedData) {
      setName(props.breedData.name);
    }
  }, [props.addnew, props.breedData]);

  return (
    <div className="formadj">
      <div className="row">
        <div className="col-12">
          <p className="information">
            {props.addnew ? "BREED CREATE" : "BREED INFO"}
          </p>
          <AppBar position="static">
            <Tabs value={value} onChange={(e, val) => setValue(val)}>
              <Tab label="Breed Details" />
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

export default BreedInfo;
 