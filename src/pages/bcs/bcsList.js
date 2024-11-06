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
import BcsInfo from "./bcsInfo";

function BcsList() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagePostsLimit, setpageSize] = useState(10);
    const [modalOpened4, setmodalOpened4] = useState(false);
    const [selectedBuyer, setSelectedBuyer] = useState({});
    const [records, setRecords] = useState(0);
    const [search, setSearch] = useState("");
    const animate = true;
    const [isaddnew, setisaddnew] = useState(false)
    const [sortBy, setSortBy] = useState("");
    const [sortType, setSortType] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    const closeOverlay = () => {
        setisaddnew(false)
        setmodalOpened4(false);
        console.log(currentPage);
        getData(currentPage);
    }

    const getUserInfoForm = (obj) => {
        console.log(obj);
        setmodalOpened4(true);
        console.log(modalOpened4);
        setSelectedBuyer(obj);
    }

    function getData(pageNumber = 1) {
        // if(!localStorage.getItem("userId")) navigate("/");
        console.log(pageNumber);
        // axios.get(`${config.serverURL}/vehicles?filter={"offset": 0,"limit": ${pagePostsLimit},"skip": ${(pageNumber-1)*pagePostsLimit},"order": "createdAt desc","where": {"userType": "buyer"}}`)
        axios.get(`${config.serverURL}admin/bsc/getall`)
            .then((res) => {
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

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <section>
                <div className="row">

                    <div className="col-12">
                        <div className="col-6">
                            <Overlay configs={animate} isOpen={modalOpened4} closeOverlay={closeOverlay}>
                                {modalOpened4 && <BcsInfo onChange={() => { setmodalOpened4(false); getData() }} addnew={isaddnew} bcsData={selectedBuyer} />}
                            </Overlay>
                        </div>
                    </div>
                    <Sidebar />
                    <div className="col-lg-11 col-10">
                        <div className="row upperhead">
                            <div className="col-4">
                                <p className="invoice-tracker"><span className="invoice">BCS</span> TRACKER</p>
                                <p className="tracker">Tracker to monitor all BCS Question & options.</p>
                            </div>
                            <div className="col-12" style={{ textAlign: 'right', display: 'block' }}>
                                <button type="button" className="btn btn-primary" style={{ display: 'inline-block', margin: 'unset', marginTop: '50px', marginRight: '30px', background: 'white', fontWeight: 600, color: '#254c86', border: 'solid 2px #254c86' }} onClick={() => { setisaddnew(true); setmodalOpened4(true) }}>       New BCS      </button>
                            </div>
                        </div>
                        <div className="row upperhead">
                            <div className="col-5 my-3">
                                <input id="search" className="search" type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
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
                                            <th>Title</th>
                                            <th>Question</th>
                                            <th>image</th>

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
                                    <tbody>
                                        {
                                            // .slice((currentPage - 1) * pagePostsLimit, currentPage * pagePostsLimit)
                                            data.filter(
                                                (item) =>
                                                    item?.title?.toLowerCase().includes(search.toLowerCase())).map((item, index) => {
                                                        return <tr key={index}>
                                                            {/* <td>{item.isUserActive ? <img src="images/Ellipse 4.svg" width="10%"/>: <img src="images/Ellipse 1.svg" width="10%"/>}</td> */}
                                                            <td className="invoiceNo" onClick={() => getUserInfoForm(item)}>{item.title}</td>
                                                            <td>{item?.question}</td>
                                                            <td><img style={{ width: 50, height: 50 }} src={config.serverURL + item?.image} /></td>

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

export default BcsList;