"use client"
import React from 'react'
import { useState,useEffect } from 'react';
import AdminFooter from '@/component/AdminFooter.jsx'
import Tooltip from '@/component/Tooltip.jsx'
export default function Inquiry({ inquiryList, totalItems }) {

    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrormsg] = useState("");
    const [message, setMessage] = useState("");
    const [inquiryLists, setInquiryLists] = useState(inquiryList);
    const [button, setButton] = useState(totalItems);
    const [idx, setIdx] = useState(1);
    const [name, setName] = useState("");
    const [id, setId] = useState(null);
    const [message1, setMessage1] = useState(typeof window !== 'undefined' && sessionStorage.getItem('successMsg') ? sessionStorage.getItem('successMsg') : "")
    
    
        useEffect(() => {
    
    
            if (message1 !== "") {
                const timer = setTimeout(() => {
                    setMessage1("");
                    sessionStorage.removeItem('successMsg');
                }, 3000);
    
                return () => clearTimeout(timer);
            }
    
        }, [])


    const openPopup = (msg) => {

        setMessage(msg);
        setSuccess(true)
    }


    const deleteRecords = async (inquiryId) => {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/getInquiry`, {
            method: "DELETE",
            body: JSON.stringify({ inquiryId }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const res = await response.json();

        if (res.status) {

            sessionStorage.setItem('successMsg', 'Inquiry deleted Successfully');
            window.location.href = "/admin/inquiry"
            setErrormsg(res.message);

        }

    }


    const searching = async (idx, name) => {


        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/getInquiry?page=${idx}&name=${name}`);
        setName(name);

        const res = await response.json();
        if (res.status) {
            setInquiryLists(res.inquirylist);
            setButton(Math.ceil(res.totalItems / 10));
        }

    }

    const pagination = async (idx) => {

        if (idx > 0 && idx <= button) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/getInquiry?page=${idx}&name=${name}`);
            setIdx(idx);
            const res = await response.json();
            if (res.status) {
                setInquiryLists(res.inquirylist);
                setButton(Math.ceil(res.totalItems / 10));
            }

        }


    }

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">

                    {

                        message1 !== "" && <Tooltip message={message1} />
                    }

                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                                <h4 className="mb-sm-0">Inquiry List</h4>

                            </div>
                        </div>
                    </div>

                    <div className="row"><div className="col-lg-12"><div className="card" id="invoiceList">



                        <div className="card-body"><form><div className="row g-4 mb-3">

                            <div className="col-sm">
                                <div className="d-flex justify-content-sm-end">
                                    <div className="search-box ms-2">
                                        <input type="text" className="form-control search" placeholder="Search..." onChange={(e) => searching(idx, e.target.value)} />
                                        <i className="ri-search-line search-icon" />
                                    </div>
                                </div>
                            </div>
                        </div></form></div>

                        <div className="card-body"><div><div className="table-responsive table-card"><table className="table align-middle table-nowrap" id="invoiceTable"><thead className="text-muted"><tr><th className=" text-uppercase" data-sort="invoice_id">ID</th><th className="text-uppercase" data-sort="customer_name">Name</th><th className=" text-uppercase" data-sort="email">Email</th><th className=" text-uppercase" data-sort="country">Number</th><th className=" text-uppercase" data-sort="date">Date</th><th className=" text-uppercase" data-sort="action">Message</th></tr></thead>

                            {inquiryLists.length > 0 && inquiryLists.map((item, i) => <tbody key={item.inquiryId} className="list form-check-all"><tr><td className="id"><a href="javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" data-id={25000351} className="fw-medium link-primary">{i + 1} </a></td><td className="customer_name"><div className="d-flex align-items-center">{item.fullName} </div></td><td className="email">{item.email}</td><td className="country">{item.phoneNumber}</td><td className="date">{item.date} </td>
                                <td>
                                    <div class="d-flex gap-2">
                                        <div class="edit">
                                            <button class="btn btn-sm btn-success edit-item-btn" onClick={() => openPopup(item.message)}>view</button>
                                        </div>
                                        <div class="remove">
                                            <button class="btn btn-sm btn-danger remove-item-btn" data-bs-toggle="modal" data-bs-target="#deleteRecordModal" onClick={() => setId(item.inquiryId)}>Remove</button>
                                        </div>

                                    </div>
                                </td></tr>



                            </tbody>)}

                        </table><div className="noresult" style={{ display: button > 0 && "none" }}><div className="text-center"><lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style={{ "width": "75px", "height": "75px" }} /><h5 className="mt-2">Sorry! No Result Found</h5></div></div></div><div className="d-flex justify-content-end mt-3">

                                {button > 0 && <div className="pagination-wrap hstack gap-2" style={{ "display": "flex" }}>


                                    <button className="page-item pagination-prev " onClick={() => pagination(idx - 1)}>Previous</button>


                                    <ul className="pagination listjs-pagination mb-0">

                                        {Array.from({ length: button }, (_, i) => <li className="active"><button className="page" key={i} onClick={() => pagination(i + 1)} style={{ backgroundColor: idx === i + 1 && '#ff681a', border: 'none' }}>{i + 1}</button>
                                        </li>)
                                        }

                                    </ul>


                                    <button className="page-item pagination-next" onClick={() => pagination(idx + 1)}>Next</button>


                                </div>}


                            </div></div><div className="modal fade flip" id="deleteOrder" tabIndex={-1} aria-labelledby="deleteOrderLabel" aria-hidden="true"><div className="modal-dialog modal-dialog-centered"><div className="modal-content"><div className="modal-body p-5 text-center"><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#405189,secondary:#f06548" style={{ "width": "90px", "height": "90px" }} /><div className="mt-4 text-center"><h4>You are about to delete a order ?</h4><p className="text-muted fs-15 mb-4">Deleting your order will remove all of your information from our database.</p><div className="hstack gap-2 justify-content-center remove"><button className="btn btn-link link-success fw-medium text-decoration-none" id="deleteRecord-close" data-bs-dismiss="modal"><i className="ri-close-line me-1 align-middle" /> Close</button><button className="btn btn-danger" id="delete-record">Yes, Delete It</button></div></div></div></div></div></div></div></div></div></div>


                    <div
                        className={success ? "modal fade zoomIn show" : "modal fade zoomIn"}
                        id="deletetable"
                        aria-hidden={!success && 'true'}
                        role={success && 'dialog'}
                        aria-modal={success && 'true'}
                        style={{ display: success ? 'block' : 'none', backgroundColor: 'rgb(0,0,0,0.5)' }}



                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content" style={{ overflow: 'auto', maxHeight: '300px' }}>
                                <div className="modal-header">
                                    <button
                                        type="button"
                                        className="btn-close"
                                        // data-bs-dismiss="modal"
                                        onClick={() => setSuccess(false)}


                                    />
                                </div>
                                <h3 className='text-center'>Message</h3>
                                <div className="card-body p-4 text-center">
                                    {message}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="modal fade zoomIn"
                        id="deleteRecordModal"
                        tabIndex={-1}
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        id="btn-close"
                                    />
                                </div>
                                <div className="modal-body">
                                    <div className="mt-2 text-center">
                                        <lord-icon
                                            src="https://cdn.lordicon.com/gsqxdxog.json"
                                            trigger="loop"
                                            colors="primary:#f7b84b,secondary:#f06548"
                                            style={{ width: 100, height: 100 }}
                                        />
                                        <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                                            <h4>Are you Sure ?</h4>
                                            <p className="text-muted mx-4 mb-0">
                                                Are you Sure You want to Remove this Record ?
                                            </p>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                        <button
                                            type="button"
                                            className="btn w-sm btn-light"
                                            data-bs-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="button"
                                            className="btn w-sm btn-danger "
                                            id="delete-record"
                                            onClick={() => deleteRecords(id)}
                                        >
                                            Yes, Delete It!
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>




            </div>
            <AdminFooter />
        </div>
    )
}
