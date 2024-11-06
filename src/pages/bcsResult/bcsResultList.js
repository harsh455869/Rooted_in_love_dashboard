import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../../sidebar";
import 'react-toastify/dist/ReactToastify.css';
import Overlay from "react-overlay-component";
import 'react-pagination-bar/dist/index.css';
import config from "../../config";
import BcsResultInfo from "./bcsResultInfo";

function BcsResultList() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpened4, setmodalOpened4] = useState(false);
    const [selectedBuyer, setSelectedBuyer] = useState({});
    const [records, setRecords] = useState(0);
    const [search, setSearch] = useState("");
    const animate = true;

    const [isaddnew, setisaddnew] = useState(false)

    const closeOverlay = () => {
        setisaddnew(false)
        setmodalOpened4(false);
        console.log(currentPage);
        getData(currentPage);
    }

    const getUserInfoForm = (obj) => {
        console.log(obj);
        setmodalOpened4(true);
        setSelectedBuyer(obj);
    }

    function getData(pageNumber = 1) {
        console.log(pageNumber);
        axios.get(`${config.serverURL}admin/bsc/result/getall`)
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
                                {modalOpened4 && <BcsResultInfo addnew={isaddnew} categoryData={selectedBuyer} />}
                            </Overlay>
                        </div>
                    </div>
                    <Sidebar />
                    <div className="col-lg-11 col-10">
                        <div className="row upperhead">
                            <div className="col-4">
                                <p className="invoice-tracker"><span className="invoice">BCS RESULT</span> TRACKER</p>
                                <p className="tracker">Tracker to monitor all BCS RESULTS.</p>
                            </div>
                            <div className="col-12" style={{ textAlign: 'right', display: 'block' }}>
                                <button type="button" className="btn btn-primary" style={{ display: 'inline-block', margin: 'unset', marginTop: '50px', marginRight: '30px', background: 'white', fontWeight: 600, color: '#254c86', border: 'solid 2px #254c86' }} onClick={() => { setisaddnew(true); setmodalOpened4(true) }}>New BCS RESULT</button>
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
                                            <th>Score</th>
                                            <th>Title</th>
                                            <th>Dog Weight</th>
                                            <th>Body Fat</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {       
                                            data.filter(
                                                (item) =>
                                                    item.title.toLowerCase().includes(search.toLowerCase()) ||
                                                    item.dog_weight.toLowerCase().includes(search.toLowerCase()) ||
                                                    item.body_fat.toLowerCase().includes(search.toLowerCase()) ||
                                                    item.description.toLowerCase().includes(search.toLowerCase())
                                            ).map((item, index) => {
                                                return (
                                                    <tr key={index} onClick={() => getUserInfoForm(item)}>
                                                        <td>{item.score}</td>
                                                        <td>{item.title}</td>
                                                        <td>{item.dog_weight}</td>
                                                        <td>{item.body_fat}</td>
                                                        <td>{item.description}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BcsResultList;
