import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../../sidebar";
import 'react-toastify/dist/ReactToastify.css';
import Overlay from "react-overlay-component";
import 'react-pagination-bar/dist/index.css';
import config from "../../config";
import ConsultationCategoryInfo from "./ConsultationCategoryInfo";
;

function ConsulationCategoryList() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpened4, setmodalOpened4] = useState(false);
    const [selectedBuyer, setSelectedBuyer] = useState({});
    const [records, setRecords] = useState(0);
    const [search, setSearch] = useState("");
    const animate = true;

    const [isaddnew, setisaddnew] = useState(false)

    const [img, setImg] = useState("");


    const setFile = (e) => {
        console.log("Entered");
        console.log(e.target.files[0].name);
        setImg(e.target.files[0].name);
    }


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

        console.log(pageNumber);
        axios.get(`${config.serverURL}admin/consultation/getall`)
            .then((res) => {
                setData(res.data.data);
                console.log(res.data);
                setRecords(res.data.data?.length);
            })
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
                                {modalOpened4 && <ConsultationCategoryInfo addnew={isaddnew} categoryData={selectedBuyer} />}
                            </Overlay>
                        </div>
                    </div>
                    <Sidebar />
                    <div className="col-lg-11 col-10">
                        <div className="row upperhead">
                            <div className="col-4">
                                <p className="invoice-tracker"><span className="invoice">Category</span> TRACKER</p>
                                <p className="tracker">Tracker to monitor all sub-categories.</p>
                            </div>
                            <div className="col-12" style={{ textAlign: 'right', display: 'block' }}>
                                <button type="button" className="btn btn-primary" style={{ display: 'inline-block', margin: 'unset', marginTop: '50px', marginRight: '30px', background: 'white', fontWeight: 600, color: '#254c86', border: 'solid 2px #254c86' }} onClick={() => { setisaddnew(true); setmodalOpened4(true) }}>       New Sub-Category      </button>
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
                                    <tbody>
                                        {
                                            // .slice((currentPage - 1) * pagePostsLimit, currentPage * pagePostsLimit)
                                            data.filter(
                                                (item) =>
                                                    item.name.toLowerCase().includes(search.toLowerCase())).map((item, index) => {
                                                        return <tr key={index}>
                                                            {/* <td>{item.isUserActive ? <img src="images/Ellipse 4.svg" width="10%"/>: <img src="images/Ellipse 1.svg" width="10%"/>}</td> */}
                                                            <td className="invoiceNo" onClick={() => getUserInfoForm(item)}>{item.name}</td>
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

export default ConsulationCategoryList;