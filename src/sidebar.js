import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "./config";


function Sidebar() {
    const navigation = useNavigate()
    const gotoDashboard = (screen) => {
        navigation(`/${screen}`);
    }

    const getLogout = () => {
        axios.post(`${config.serverURL}/users/logout`, { userId: localStorage.getItem("userId") })
            .then((res) => {
                console.log(res.data);
                if (res.data.description === "User is Logged Out") {
                    localStorage.removeItem("token");
                    localStorage.removeItem('userId');
                    return navigation("/");
                } else {
                    localStorage.removeItem("token");
                    localStorage.removeItem('userId');
                    return navigation("/");
                }
            }, { headers: { "token": localStorage.getItem("token") } })
    }

    return (
        <div className="col-lg-1 col-2 sidebarbg">

            <div className="row" >
               
                <div className="col-12" onClick={() => gotoDashboard('userList')}>
                    <img className="timer" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJlUe5QjsmfcQiaRcSBKl5TO4SsHT993cc6A&s" />
                    <p className="filter" style={{ color: 'black', textAlign: 'center' }}>Customer</p>
                </div>
                <div className="col-12" onClick={() => gotoDashboard('orders')}>
                    <img className="dashboard" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8lZsA3JNe_0bPy53ADp_sM-kbStGyEJ999A&s" />
                    <p className="filter" style={{ color: 'black', textAlign: 'center' }}>Orders</p>
                </div>
                <div className="col-12" onClick={() => gotoDashboard('consultationscategories')}>
                    <img className="dashboard" src="https://cdn-icons-png.flaticon.com/512/2603/2603910.png" />
                    <p className="filter" style={{ color: 'black', textAlign: 'center' }}>Consultations Category</p>
                </div>
                <div className="col-12" onClick={() => gotoDashboard('consults')}>
                    <img className="dashboard" src="https://cdn-icons-png.flaticon.com/512/1478/1478254.png" />
                    <p className="filter" style={{ color: 'black', textAlign: 'center' }}>Consultations</p>
                </div>
                <div className="col-12" onClick={() => gotoDashboard('categories')}>
                    <img className="dashboard" src="https://cdn-icons-png.flaticon.com/512/2603/2603910.png" />
                    <p className="filter" style={{ color: 'black', textAlign: 'center' }}>Category</p>
                </div>
                <div className="col-12" onClick={() => gotoDashboard('subcategories')}>
                    <img className="dashboard" src="https://cdn-icons-png.flaticon.com/512/2603/2603910.png" />
                    <p className="filter" style={{ color: 'black', textAlign: 'center' }}>SubCategory</p>
                </div>

                <div className="col-12" onClick={() => gotoDashboard('products')}>
                    <img className="dashboard" src="https://static.thenounproject.com/png/3407390-200.png" />
                    <p className="filter" style={{ color: 'black', textAlign: 'center' }}>Product</p>
                </div>
                <div className="col-12" onClick={() => gotoDashboard('videos')}>
                    <img className="dashboard" src="https://t3.ftcdn.net/jpg/01/09/40/34/360_F_109403483_qocRmeSFXJ6KlF3yoaDBuI3CZOiNGfCw.jpg" />
                    <p className="filter" style={{ color: 'black', textAlign: 'center' }}>Video</p>
                </div>

                <div className="col-12" onClick={() => gotoDashboard('healthconditions')}>
                    <img className="dashboard" src="https://banner2.cleanpng.com/20191024/sxu/transparent-health-icon-medical-icon-lifeline-in-a-heart-outli-5db133e3932a99.7637511515718942436028.jpg" />
                    <p className="filter" style={{ color: 'black', textAlign: 'center' }}>Health Condition</p>
                </div>
                <div className="col-12" onClick={() => gotoDashboard('bcs')}>
                    <img className="dashboard" src="https://banner2.cleanpng.com/20191024/sxu/transparent-health-icon-medical-icon-lifeline-in-a-heart-outli-5db133e3932a99.7637511515718942436028.jpg" />
                    <p className="filter" style={{ color: 'black', textAlign: 'center' }}>Bcs</p>
                </div>
                <div className="col-12" onClick={() => gotoDashboard('breed')}>
                    <img className="dashboard" src="https://cdn-icons-png.flaticon.com/512/2603/2603910.png" />
                    <p className="filter" style={{ color: 'black', textAlign: 'center' }}>Breed</p>
                </div>
                <div className="col-12" onClick={() => gotoDashboard('profile')}>
                    <img className="dashboard" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJlUe5QjsmfcQiaRcSBKl5TO4SsHT993cc6A&s" />
                    <p className="filter" style={{ color: 'black', textAlign: 'center' }}>Profile</p>
                </div>

               

                {/* <div className="col-12" onClick={getLogout}>
                    <img className="logout" src="images/logout.png" />
                    <p className="filter" style={{color:'black',textAlign:'center'}}>Logout</p>
                
           </div> */}
            </div>
        </div>
    )
}

export default Sidebar;