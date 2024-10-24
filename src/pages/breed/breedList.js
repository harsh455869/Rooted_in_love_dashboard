import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../../sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Overlay from "react-overlay-component";
import config from "../../config";
import BreedInfo from "./breedinfo";

function BreedList() {
    const [data, setData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [modalOpened, setModalOpened] = useState(false);
    const [selectedBreed, setSelectedBreed] = useState({});
    const [search, setSearch] = useState("");
    const [isAddNew, setIsAddNew] = useState(false);

    const getData = () => {
        axios.get(`${config.serverURL}admin/breed/getall`)
            .then((res) => {
                setData(res.data.data);
            })
            .catch((error) => {
                console.error(error);
                toast("Error fetching data", { type: "error" });
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const handleBreedClick = (breed) => {
        setSelectedBreed(breed);
        setModalOpened(true);
    };

    const closeOverlay = () => {
        setIsAddNew(false);
        setModalOpened(false);
        getData(); // Refresh data after closing modal
    };

    return (
        <>
            <section>
                <div className="row">
                    <Sidebar />
                    <div className="col-lg-11 col-10">
                        <div className="row upperhead">
                            <div className="col-4">
                                <p className="invoice-tracker"><span className="invoice">BREED</span> TRACKER</p>
                                <p className="tracker">Tracker to monitor all breeds.</p>
                            </div>
                            <div className="col-12" style={{ textAlign: 'right', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    style={{ background: 'white', color: '#254c86', border: 'solid 2px #254c86' }}
                                    onClick={() => { setIsAddNew(true); setModalOpened(true); }}>
                                    New Breed
                                </button>
                            </div>
                        </div>
                        <div className="row upperhead">
                            <div className="col-5 my-3">
                                <input
                                    className="search"
                                    type="text"
                                    placeholder="Search"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-12">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>NAME</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.filter(item =>
                                            item.name.toLowerCase().includes(search.toLowerCase())
                                        ).map((item) => (
                                            <tr key={item._id} onClick={() => handleBreedClick(item)}>
                                                <td className="invoiceNo">{item.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Overlay configs={{ animate: true }} isOpen={modalOpened} closeOverlay={closeOverlay}>
                {modalOpened && <BreedInfo addnew={isAddNew} breedData={selectedBreed} />}
            </Overlay>
            <ToastContainer />
        </>
    );
}

export default BreedList;
