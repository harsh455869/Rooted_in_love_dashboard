import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from "../../config";
import Sidebar from "../../sidebar";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [discount, setDiscount] = useState(0);

    // Fetch profile data on component mount
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`${config.serverURL}admin/profile/get`);
                if (response.data.status_code === 200) {
                    console.log(response.data.data)
                    setProfile(response.data.data);
                    setDiscount(response.data.data.first_time_user_discount);
                }
            } catch (error) {
                console.error("Error fetching profile data", error);
                toast.error("Failed to load profile data.");
            }
        };

        fetchProfileData();
    }, []);

    // Handle discount change
    const handleDiscountChange = (e) => {
        setDiscount(e.target.value);
    };

    // Handle save action
    const handleSave = async () => {
        try {
            const response = await axios.post(`${config.serverURL}admin/firsttimediscount/update`, {
                discount: parseInt(discount, 10),
            });

            if (response.data.status_code === 200) {
                toast.success("Discount updated successfully.");
                // Optionally, fetch the profile again to reflect changes
            } else {
                toast.error("Failed to update discount.");
            }
        } catch (error) {
            console.error("Error updating discount", error);
            toast.error("Failed to update discount.");
        }
    };

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <section>
                <div className="row">

                    <Sidebar />
                    <div className="col-lg-11 col-10" style={{ marginTop: 200, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <h1 style={{ textAlign: 'left', display: 'flex' }}>Profile</h1>
                        <div >
                            <label>Username:</label>
                            <input type="text" value={profile.username} readOnly style={{color:'black'}}/>
                        </div>
                        <div style={{marginTop:20}}>
                            <label>First Time User Discount:</label>
                            <input
                                type="number"
                                value={discount}
                                onChange={handleDiscountChange}
                                style={{color:'black'}}
                            />
                        </div>
                        <button onClick={handleSave} style={{ width: 100 }}>Save</button>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
}

export default Profile;
