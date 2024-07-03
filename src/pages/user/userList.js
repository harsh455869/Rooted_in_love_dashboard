import axios from "axios";
import React,{useEffect,useState} from "react";
import Sidebar from "../../sidebar";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Overlay from "react-overlay-component";
import { Pagination } from "react-pagination-bar";
import 'react-pagination-bar/dist/index.css';
// import InvoiceInfo from "./invoiceInfo";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FontAwesome from 'react-fontawesome';
import config from "../../config";
import CustomerInfo from "./userInfo";

function UserList(){
    const[data,setData] = useState([]);
    const [showForm,setShowForm] = useState(false);
    const[currentPage,setCurrentPage]=useState(1);
    const [pagePostsLimit,setpageSize] = useState(10);
    const [modalOpened,setmodalOpened] = useState(false);
    const [modalOpened3,setmodalOpened3] = useState(false);
    const [modalOpened4,setmodalOpened4] = useState(false);
    const[selectedBuyer,setSelectedBuyer] = useState({});
    const [filter,setFilter] = useState("");
    const [modal, setModal] = useState(false);
    const [modalOpen1, setModalOpen1] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [records,setRecords] = useState(0);
    const [search,setSearch] = useState("");
    const animate = true;
    const navigate = useNavigate();
    const [pending,setPending] = useState("");
    const [verified,setVerified] = useState("");
    const [rejected,setRejected] = useState("");
    const [signed,setSigned] = useState("");
    const [createDate,setCreateDate] = useState("");
    const [verifyDate,setVerifyDate] = useState("");
    const [signDate,setSignDate] = useState("");


    const[img,setImg] = useState("");

    const[order,setOrder] = useState("");
    const [ sortBy, setSortBy ] = useState("");
    const [ sortType, setSortType ] = useState("");
    const [ filterStatus, setFilterStatus ] = useState("");

   

    const onChangeHandler = (e)=>{
        const value = e.target.value;

        if(e.target.id=="search") {
            if(value==""){
                getData()
            }
            setSearch(value);
            //applySearch();
        }
    }


    const enableForm=()=>{
        setmodalOpened(true);
        console.log(modalOpened);
    }

    const closeOverlay = ()=>{
        setmodalOpened(false);
        // setmodalOpened2(false);
        setmodalOpened3(false);
        setmodalOpened4(false);
        console.log(currentPage);
        getData(currentPage);
    }

    const getUserInfoForm=(obj)=>{
        console.log(obj);
        setShowForm(true);
        setmodalOpened4(true);
        console.log(modalOpened4);
        setSelectedBuyer(obj);
    }

   

    const filterForm=()=>{
        setShowForm(true);
        setmodalOpened3(true);
        console.log(modalOpened3);
    }

    const onChangeHandler1 = (e)=>{
        const value = moment(e.target.value).format('L');
        if(e.target.id=="1") {
            setCreateDate(value);
        }
        if(e.target.id=="2") {
            setVerifyDate(value);
        }
        if(e.target.id=="3") {
            setSignDate(value);
        }
    }

    const handlePagination = (pageNumber)=>{
        setCurrentPage(pageNumber);
        getData(pageNumber);
    }

   

    function applySearch(pageNumber=1){
        axios.get(`${config.serverURL}/users?filter={"offset": 0,"limit": ${pagePostsLimit},"skip": ${(pageNumber-1)*pagePostsLimit},"order": "createdAt desc","where": {"userType": "customer","or": [{"name":{"regexp":"/${search}/ig"}},{"mobileNumber":{"regexp":"/${search}/ig"}}]}}`)
        .then((res)=>{
            setData(res.data);
        })

        axios.get(`${ config.serverURL }/users/count?where={"userType": "customer", "or": [{"name":{"regexp":"/${search}/ig"}},{"mobileNumber":{"regexp":"/${search}/ig"}}] }`)
                .then((res) => {
                    setRecords(res.data.count);
                });
    }

    function applySort (pageNumber = 1) {
        if (sortType === "") getData(); 
        else {
            // axios.get(`${ config.serverURL }/users?filter={"offset": 0,"limit": ${ pagePostsLimit },"skip": ${ (pageNumber - 1) * pagePostsLimit },"order": "${ sortBy } ${ sortType }","where": {"userType": "buyer"${ filterStatus !== "" ? `, "status": "${ filterStatus }"` : `` }}}`)
            axios.get(`${config.serverURL}/users?filter={"offset":0,"limit":100,"skip":0,"order":"${ sortBy } ${ sortType }","where":{"userType":"customer"${filterStatus !== "" ? `, "isUserActive": ${filterStatus}` : ``}}}`)
                .then((res) => {
                    setData(res.data);
                    console.log(res.data);
                    setModalOpen2(false);
                });
            axios.get(`${ config.serverURL }/users/count?where={"userType": "customer"${filterStatus !== "" ? `, "isUserActive": ${filterStatus}` : ``}}`)
                .then((res) => {
                    setRecords(res.data.count);
                });
        }
    }

    const [users,setUsers] = useState([]);

    function getData(pageNumber=1){
        // if(!localStorage.getItem("userId")) navigate("/");
        console.log(pageNumber);
        // axios.get(`${config.serverURL}/users?filter={"offset": 0,"limit": ${pagePostsLimit},"skip": ${(pageNumber-1)*pagePostsLimit},"order": "createdAt desc","where": {"userType": "buyer"}}`)
        axios.get(`${config.serverURL}admin/getusers`)
        .then((res)=>{
           setData(res.data?.data)
            // setRecords(res.data.length);
            console.log(res.data);
        })

       
    }

    useEffect(()=>{
        getData();
    },[]);
    return ( data&&
        <>
            <section>
                <div className="row">
                    
                    <div className="col-12">
                        <div className="col-6">
                            <Overlay configs={animate} isOpen={modalOpened4} closeOverlay={closeOverlay}>
                        {modalOpened4 && <CustomerInfo onClose={()=>setmodalOpened4(false)} customerInfo={selectedBuyer}></CustomerInfo> }
                    </Overlay>
                        </div>
                    </div>
                    <Sidebar/>
                    <div className="col-lg-11 col-10">
                        <div className="row upperhead">
                            <div className="col-4">
                                <p className="invoice-tracker"><span className="invoice">CUSTOMER</span> TRACKER</p>
                                <p className="tracker">Tracker to monitor the status of all the customers</p>
                            </div>
                        </div>
                     
                        <div className="row">
                            <div className="col-lg-12 col-12 setheight2">
                                <table className="table">
                                    <thead>
                                          <tr>
                                            {/* <th>IS USER ACTIVE</th>     */}
                                            {/* <th>MEMBERSHIP ID</th> */}
                                            <th>CUSTOMER NAME</th>   
                                            <th>MOBILE NUMBER</th>
                                            {/* <th>MEMBERSHIP STATUS</th> */}
                                            <th>EMAIL</th>
                                            {/* <th>CITY</th>
                                            <th>CREATED AT</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        // .slice((currentPage - 1) * pagePostsLimit, currentPage * pagePostsLimit)
                                        ((data)?(data):[])?.map((item,index)=>{
                                            return <tr key={ index }>
                                                {/* <td>{item.disable ? <img src="./Ellipse 1.svg" width="10%"/>:<img src="../../images/Ellipse 1.svg" width="10%"/>}</td> */}
                                                <td className="invoiceNo" onClick={()=>getUserInfoForm(item)}>{item.name}</td>
                                                {/* <td>{item.name}</td> */}
                                                <td>{item.phoneno}</td>
                                                {/* <td>{item.membershipStatus}</td> */}
                                                <td>{item.email}</td>
                                                {/* <td>{item.city}</td>
                                                <td>{moment(item.createdAt).format("MMM Do YY")}</td> */}
                                            </tr>
                                        })
                                    }
                                    </tbody>    
                                </table>  
                            </div>
                            
                        </div>
                        <div className="col-11 pagingcenter">
                            {/* <Pagination
                            currentPage={currentPage}
                            totalItems={records}
                            itemsPerPage={pagePostsLimit}
                            onPageChange={(pageNumber) => handlePagination(pageNumber)}
                            pageNeighbours={2}
                            /> */}
                        </div>
                    </div>
                </div>
                
            </section>
        </>
    );
}

export default UserList;