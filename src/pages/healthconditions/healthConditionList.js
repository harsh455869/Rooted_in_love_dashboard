import axios from "axios";
import React, { useEffect, useState } from "react";
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
import HealthConditionInfo from "./healthConditionInfo";
// import healthconditionInfo from "./healthconditionInfo";

function HealthConditionList() {
    const [data, setData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagePostsLimit, setpageSize] = useState(10);
    const [modalOpened, setmodalOpened] = useState(false);
    const [modalOpened3, setmodalOpened3] = useState(false);
    const [modalOpened4, setmodalOpened4] = useState(false);
    const [selectedBuyer, setSelectedBuyer] = useState({});
    const [filter, setFilter] = useState("");
    const [modal, setModal] = useState(false);
    const [modalOpen1, setModalOpen1] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [records, setRecords] = useState(0);
    const [search, setSearch] = useState("");
    const animate = true;
    const navigate = useNavigate();
    const [pending, setPending] = useState("");
    const [verified, setVerified] = useState("");
    const [rejected, setRejected] = useState("");
    const [signed, setSigned] = useState("");
    const [createDate, setCreateDate] = useState("");
    const [verifyDate, setVerifyDate] = useState("");
    const [signDate, setSignDate] = useState("");
    const [isaddnew, setisaddnew] = useState(false)

    const [img, setImg] = useState("");

    const [order, setOrder] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortType, setSortType] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    const setFile = (e) => {
        console.log("Entered");
        console.log(e.target.files[0].name);
        setImg(e.target.files[0].name);
    }

    const setCheckBox = (e) => {
        console.log("Entered");
        const value = e.target.value;

        //! FILTER   
        if (e.target.id.includes("active")) {
            setFilterStatus(true);
        }
        if (e.target.id.includes("inactive")) {
            setFilterStatus(false);
        }
        if (e.target.id.includes("not")) {
            setFilterStatus("");
        }

        //! SORT
        if (e.target.id.includes("ASC")) {
            setSortType("asc");
        }
        if (e.target.id.includes("DESC")) {
            setSortType("desc");
        }
        if (e.target.id.includes("N")) {
            setSortType("");
        }

        setOrder(value);
        setSortBy("createdAt");
    }

    const onChangeHandler = (e) => {
        const value = e.target.value;

        if (e.target.id == "search") {
            if (value == "") {
                getData()
            }
            setSearch(value);
            //applySearch();
        }
    }


    const enableForm = () => {
        setmodalOpened(true);
        console.log(modalOpened);
    }

    const closeOverlay = () => {
        setisaddnew(false)
        setmodalOpened(false);
        // setmodalOpened2(false);
        setmodalOpened3(false);
        setmodalOpened4(false);
        console.log(currentPage);
        getData(currentPage);
    }

    const getUserInfoForm = (obj) => {
        console.log(obj);
        setShowForm(true);
        setmodalOpened4(true);
        console.log(modalOpened4);
        setSelectedBuyer(obj);
    }

    function applyFilters(pageNumber = 1) {
        console.log("Entered");

        if (filterStatus === "") getData();
        else {
            axios.get(`${config.serverURL}/societies?filter={"offset": 0,"limit": ${pagePostsLimit},"skip": ${(pageNumber-1)*pagePostsLimit},"order": "${sortType !== "" ? `${ sortBy } ${ sortType }` : "string"}","where": {}}`)
            .then((res)=>{
                setData(res.data);
                console.log(res.data);
                setModalOpen1(false);
            })
            axios.get(`${config.serverURL}/societies/count?where={}`)
            .then((res)=>{
                setRecords(res.data.count);
            })
        }
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

    // const changeFilter = ()=>{
    //     axios.get(`${config.serverURL}/auth/weighingData/getAll?page=${currentPage}&pageSize=${pagePostsLimit}&sortBy=slipNo&sortOrder=descending`,{headers : {token:localStorage.getItem("token")}},{params:{vehicleType : filter}})
    //     .then((res)=>{  
    //         console.log(res.data); 
    //         closeOverlay(); 
    //     })
    // }

    function applySearch(pageNumber=1){
        axios.get(`${config.serverURL}/societies?filter={"offset": 0,"limit": ${pagePostsLimit},"skip": ${(pageNumber-1)*pagePostsLimit},"order": "createdAt desc","where": {"or": [{"name":{"regexp":"/${search}/ig"}},{"area":{"regexp":"/${search}/ig"}}]}}`)
        .then((res)=>{
            setData(res.data);
        })

        axios.get(`${ config.serverURL }/societies/count?where={ "or": [{"name":{"regexp":"/${search}/ig"}},{"area":{"regexp":"/${search}/ig"}}] }`)
                .then((res) => {
                    setRecords(res.data.count);
                });
    }

    function applySort (pageNumber = 1) {
        if (sortType === "") getData(); 
        else {
            // axios.get(`${ config.serverURL }/users?filter={"offset": 0,"limit": ${ pagePostsLimit },"skip": ${ (pageNumber - 1) * pagePostsLimit },"order": "${ sortBy } ${ sortType }","where": {"userType": "buyer"${ filterStatus !== "" ? `, "status": "${ filterStatus }"` : `` }}}`)
            axios.get(`${config.serverURL}/societies?filter={"offset":0,"limit":100,"skip":0,"order":"${ sortBy } ${ sortType }"}`)
                .then((res) => {
                    setData(res.data);
                    console.log(res.data);
                    setModalOpen2(false);
                });
            axios.get(`${ config.serverURL }/societies/count`)
                .then((res) => {
                    setRecords(res.data.count);
                });
        }
    }

    const [users,setUsers] = useState([]);

    function getData(pageNumber=1){
        // if(!localStorage.getItem("userId")) navigate("/");
        console.log(pageNumber);
        // axios.get(`${config.serverURL}/vehicles?filter={"offset": 0,"limit": ${pagePostsLimit},"skip": ${(pageNumber-1)*pagePostsLimit},"order": "createdAt desc","where": {"userType": "buyer"}}`)
        axios.get(`${config.serverURL}admin/product/gethealthconditionsname`)
        .then((res)=>{
            setData(res.data.data);
            console.log(res.data);
            setRecords(res.data.data?.length);
        })
       

        // axios.get(`${config.serverURL}/auth/automationConfig/getAll`)
        // .then((res)=>{
        //     setUsers(res.data.data);
        //     console.log(res.data.data);
        // })

        // axios.get(`${config.serverURL}/discount-vouchers/count?where={}`)
        // .then((res)=>{
           
        //     console.log(res.data.count);
        // })
    }

    useEffect(()=>{
        getData();
    },[]);
    return ( 
        <>
            <section>
                <div className="row">
                    
                    <div className="col-12">
                        <div className="col-6">
                            <Overlay configs={animate} isOpen={modalOpened4} closeOverlay={closeOverlay}>
                        {modalOpened4 && <HealthConditionInfo addnew={isaddnew} healthconditionData={selectedBuyer}/>}
                    </Overlay>
                        </div>
                    </div>
                 <Sidebar/>
                    <div className="col-lg-11 col-10">
                        <div className="row upperhead">
                            <div className="col-4">
                                <p className="invoice-tracker"><span className="invoice">HEALTH-CONDITION</span> TRACKER</p>
                                <p className="tracker">Tracker to monitor all categories.</p>
                            </div>
                            <div className="col-12" style={{textAlign:'right',display: 'block'}}>
                             <button type="button" className="btn btn-primary" style={{display: 'inline-block',margin:'unset',marginTop: '50px',marginRight: '30px',background: 'white',fontWeight: 600,color: '#254c86',border: 'solid 2px #254c86'}} onClick={()=>{setisaddnew(true);setmodalOpened4(true)}}>       New healthcondition      </button>
                        </div>
                        </div>
                        <div className="row upperhead">
                            <div className="col-5 my-3">
                            <input id="search" className="search" type="text"  placeholder="Search" onChange={(e)=>setSearch(e.target.value)} />
                            </div>
                           
                            <div className="col-1"></div>
                            <div className="col-4">
                                <p className="showingrecords">Showing Records...{records}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-12 setheight2">
                                <table className="table">
                                    <thead>
                                          <tr>
                                            {/* <th>IS USER ACTIVE</th>    */}
                                            <th>NAME</th>   
                                            <th></th>
                                            <th></th>
                                            
                                            {/* <th>CITY</th> */}
                                           { /* <th>VEHICLE TYPE</th>
                                            <th>MODEL</th>
                                            <th>BRAND</th>
                                            <th>AREA</th>
                                            <th>ADDRESS</th>
                                            <th>CITY</th>*/}
                                             {/* <th>CREATED AT</th>  */}
                                        </tr>
                                    </thead>
                                    <tbody style={{overflow:'scroll'}}>
                                    {
                                        // .slice((currentPage - 1) * pagePostsLimit, currentPage * pagePostsLimit)
                                        data.filter(
                                            (item) =>
                                            item.name.toLowerCase().includes(search.toLowerCase())).map((item,index)=>{
                                            return <tr key={ index }>
                                                {/* <td>{item.isUserActive ? <img src="images/Ellipse 4.svg" width="10%"/>: <img src="images/Ellipse 1.svg" width="10%"/>}</td> */}
                                                <td className="invoiceNo" onClick={()=>getUserInfoForm(item)}>{item.name}</td>
                                               <td></td>
                                               <td></td>
                                               
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

export default HealthConditionList;