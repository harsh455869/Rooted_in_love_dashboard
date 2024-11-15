import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import AppBar from "@mui/material/AppBar";
import config from "../../config";

function BundleInfo(props) {
    const [value, setValue] = useState(0);
    const categoryData = props?.categoryData;
    const [name, setName] = useState(categoryData?.name || '');
    const [freeDelivery, setFreeDelivery] = useState("0");
    const [isAvailable, setIsAvailable] = useState("1");
    const [discount, setDiscount] = useState(0);
    const [products, setProducts] = useState([{ product_id: "", size_id: null, qty: 1 }]);
    const [image, setImage] = useState("");  // Image state
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialImage, setInitialImage] = useState("");
    // Fetch product data from the API
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${config.serverURL}admin/product/getall`);
                if (response.data.status_code === 200) {
                    setAllProducts(response.data.data);
                } else {
                    toast("Failed to fetch products", { position: "bottom-center", type: "error" });
                }
            } catch (error) {
                toast("Error fetching products", { position: "bottom-center", type: "error" });
            }
            setLoading(false);
        };
        fetchProducts();

        // Check if an image is saved in localStorage
        const storedImage = localStorage.getItem("bundleImage");
        if (storedImage) {
            setImage(storedImage);  // Set the image from localStorage
        }
    }, []);

    const handleProductChange = (index, productId) => {
        const updatedProducts = [...products];
        updatedProducts[index].product_id = productId;
        updatedProducts[index].size_id = null;
        setProducts(updatedProducts);
    };

    const handleSizeChange = (index, sizeId) => {
        const updatedProducts = [...products];
        updatedProducts[index].size_id = sizeId;
        setProducts(updatedProducts);
    };

    const handleQuantityChange = (index, qty) => {
        const updatedProducts = [...products];
        updatedProducts[index].qty = qty;
        setProducts(updatedProducts);
    };

    const addProductField = () => {
        setProducts([...products, { product_id: "", size_id: null, qty: 1 }]);
    };

    const removeProductField = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
    };

    
  const convertToBase64 = (file) => {
    console.log(file)
    return new Promise(async (resolve, reject) => {
      //const response = await fetch(file);
      //const blob = await response.blob();
      const blob = new Blob([file], { type: file.type });
      console.log("Blob: " + blob + "/" + file.type)
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const result = fileReader.result
        resolve(result.toString());
        console.log(result)
      };
      fileReader.readAsDataURL(blob);
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

    const onChangeHandler = async () => {
        let data = {
            name,
            free_delivery: freeDelivery,
            is_available: isAvailable,
            discount,
            products,
            // image
        };
        if (image && image instanceof File) {
            const base64Img = await convertToBase64(image);
            data.image = base64Img; // Add image only if it's changed
          } else if (image !== initialImage) {
            // If no new image is selected but image is different from the initial image (edited bundle),
            // it means the user wants to keep the original image.
            data.image = image; // No change, send the current image (could be URL or base64)
          }
      

        const apiEndpoint = props.addnew
            ? `${config.serverURL}admin/bundle/create`
            : `${config.serverURL}admin/bundle/update`;

        if (props.addnew) {
            if (name.length < 1) {
                return;
            }
            axios
                .post(apiEndpoint, data)
                .then((res) => {
                    if(res.data.status_code === 200){
                        
                    }
                    toast("Successfully Created", { position: "bottom-center", type: "success" });
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            console.log(categoryData._id,"////DATA>>",data)
            data = { bundle_id: categoryData?._id, ...data };
            console.log("..new,,",data)
            axios
                .post(apiEndpoint, data)
                .then(() => {
                    toast("Successfully Updated", { position: "bottom-center", type: "success" });
                    // window.location.reload();
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    };

    const onDeleteData = () => {
        const data = { bundle_id: categoryData?._id };
        axios
            .post(`${config.serverURL}admin/bundle/delete`, data)
            .then((res) => {
                console.log(res,"..")
                toast(res ? res.data.message : "Deleted Successfully", { position: "bottom-center", type: "success" });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    // Handle file selection and convert to Base64
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result;
                setImage(base64Image);
                localStorage.setItem("bundleImage", base64Image);  // Store the Base64 image in localStorage
            };
            reader.readAsDataURL(file);  // Convert image to Base64
        }
    };

    useEffect(() => {
        if (!props.addnew) {
            setName(categoryData?.name || "");
            setFreeDelivery(categoryData?.free_delivery || "0");
            setIsAvailable(categoryData?.is_available || "1");
            setDiscount(categoryData?.discount || 0);
            setProducts(categoryData?.products || [{ product_id: "", size_id: null, qty: 1 }]);
            setImage(categoryData?.image || "");
            setInitialImage(categoryData?.image || "");
        }
    }, [props.addnew, categoryData]);

    return (
        <>
            <div className="formadj">
                <div className="row">
                    <div className="col-12">
                        <p className="information">
                            {props.addnew ? "Bundle CREATE" : "Bundle INFO"}
                        </p>
                        <AppBar position="static">
                            <Tabs value={value} onChange={(e, val) => setValue(val)}>
                                <Tab label="Bundle Details" />
                            </Tabs>
                        </AppBar>

                        <TabPanel value={value} index={0}>
                            <div className="row">
                                <div className="col-12">
                                    <label>Bundle Name</label>
                                    <input
                                        className="form"
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <label>Free Delivery</label>
                                    <select
                                        className="form"
                                        value={freeDelivery}
                                        onChange={(e) => setFreeDelivery(e.target.value)}
                                    >
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                </div>
                                <div className="col-6">
                                    <label>Is Available</label>
                                    <select
                                        className="form"
                                        value={isAvailable}
                                        onChange={(e) => setIsAvailable(e.target.value)}
                                    >
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <label>Discount (%)</label>
                                    <input
                                        className="form"
                                        type="number"
                                        value={discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                        min="0"
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <label>Products</label>
                                    {products.map((product, index) => (
                                        <div key={index}>
                                            <select
                                                className="form"
                                                value={product.product_id}
                                                onChange={(e) => handleProductChange(index, e.target.value)}
                                            >
                                                <option value="">Select Product</option>
                                                {allProducts.map((productOption) => (
                                                    <option key={productOption._id} value={productOption._id}>
                                                        {productOption.name}
                                                    </option>
                                                ))}
                                            </select>

                                            {product.product_id && (
                                                <select
                                                    className="form"
                                                    value={product.size_id || ""}
                                                    onChange={(e) => handleSizeChange(index, e.target.value)}
                                                >
                                                    <option value="">Select Size</option>
                                                    {/* You can add size options dynamically if needed */}
                                                </select>
                                            )}

                                            <input
                                                className="form"
                                                type="number"
                                                placeholder="Quantity"
                                                value={product.qty}
                                                onChange={(e) => setDiscount(e.target.value)}
                                                min="0"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => removeProductField(index)}
                                                style={{ color: "red", padding: "5px" }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={addProductField}
                                        style={{ padding: "5px", marginTop: "10px" }}
                                    >
                                        Add Product
                                    </button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <label>Image</label>
                                    {image && (
                                        <div>
                                            <img
                                                src={image}
                                                alt="Bundle"
                                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                            />
                                        </div>
                                    )}
                                    <input
                                        className="form"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
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
                                        Delete
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
                        </TabPanel>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

function TabPanel(props) {
    const { children, value, index } = props;
    return <div>{value === index && <div>{children}</div>}</div>;
}

export default BundleInfo;
