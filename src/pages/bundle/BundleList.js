import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../../sidebar";
import 'react-toastify/dist/ReactToastify.css';
import Overlay from "react-overlay-component";
import 'react-pagination-bar/dist/index.css';
import config from "../../config";
import BundleInfo from "./BundleInfo";

function BundleList() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpened4, setmodalOpened4] = useState(false);
    const [selectedBuyer, setSelectedBuyer] = useState({});
    const [records, setRecords] = useState(0);
    const [search, setSearch] = useState("");
    const animate = true;

    const [isaddnew, setisaddnew] = useState(false)

    const [img, setImg] = useState("");

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
        axios.get(`${config.serverURL}admin/bundle/getall`)
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
                                {modalOpened4 && <BundleInfo addnew={isaddnew} categoryData={selectedBuyer} />}
                            </Overlay>
                        </div>
                    </div>
                    <Sidebar />
                    <div className="col-lg-11 col-10">
                        <div className="row upperhead">
                            <div className="col-4">
                                <p className="invoice-tracker"><span className="invoice">Bundle</span> TRACKER</p>
                                <p className="tracker">Tracker to monitor all Bundle.</p>
                            </div>
                            <div className="col-12" style={{ textAlign: 'right', display: 'block' }}>
                                <button type="button" className="btn btn-primary" style={{ display: 'inline-block', margin: 'unset', marginTop: '50px', marginRight: '30px', background: 'white', fontWeight: 600, color: '#254c86', border: 'solid 2px #254c86' }} onClick={() => { setisaddnew(true); setmodalOpened4(true) }}>       New Bundle     </button>
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
                                            <th>NAME</th>
                                            <th>IS AVAILABLE</th>
                                            <th>PRODUCT NAMES</th>
                                            <th>IMAGE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.filter(
                                                (item) =>
                                                    item.name.toLowerCase().includes(search.toLowerCase())
                                            ).map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="invoiceNo" onClick={() => getUserInfoForm(item)}>{item.name}</td>
                                                        <td>{item.is_available ? 'Yes' : 'No'}</td>
                                                        <td>
                                                            <ul>
                                                                {item.products.map((product, index) => (
                                                                    <li key={index}>{product.name}</li>
                                                                ))}
                                                            </ul>
                                                        </td>
                                                        <td>
                                                            <img
                                                                src={`${config.serverURL}/${item.image}`}
                                                                alt={item.name}
                                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                            />
                                                        </td>
                                                    </tr>
                                                );
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

export default BundleList;