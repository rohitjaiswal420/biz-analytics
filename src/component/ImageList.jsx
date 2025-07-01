"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import AdminFooter from '@/component/AdminFooter.jsx'
import Tooltip from '@/component/Tooltip.jsx'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export default function ImageList({ imageList, totalItems }) {

    const router = useRouter();
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrormsg] = useState("");
    const [popup, setPopup] = useState(false);
    const [deleteView, setDeleteview] = useState(-1);
    const [message, setMessage] = useState("");
    const [imageLists, setimageLists] = useState(imageList);
    const [button, setButton] = useState(totalItems);
    const [idx, setIdx] = useState(1);
    const [name, setName] = useState("");
    const [id, setId] = useState(null);
    const [clientid, setClientid] = useState("");
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


    const openPopup = (categoryId) => {

        setDeleteview(1);
        setId(categoryId);
        setPopup(true)
    }


    const deleteRecords = async (clientId) => {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/imageClient`, {
            method: "DELETE",
            body: JSON.stringify({ clientId }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const res = await response.json();

        if (res.status) {

            sessionStorage.setItem('successMsg', 'client deleted Successfully');
            window.location.href = "/admin/client/list"
            setErrormsg(res.message);

        }

    }


    const searching = async (idx, name) => {


        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/imageClient/getClient?page=${idx}&name=${name}`);
        setName(name);

        const res = await response.json();
        if (res.status) {
            setimageLists(res.clientlist);
            setButton(Math.ceil(res.totalItems / 10));
        }

    }

    const pagination = async (idx) => {

        if (idx > 0 && idx <= button) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/imageClient/getClient?page=${idx}&name=${name}`);
            setIdx(idx);
            const res = await response.json();
            if (res.status) {
                setimageLists(res.clientlist);
                setButton(Math.ceil(res.totalItems / 10));
            }

        }


    }

    const uploadImages = async (e) => {

        e.preventDefault();
        const file = e.target.file.files;

        const formData = new FormData();
        formData.append('data', JSON.stringify({ clientId: clientid }));
        for (let i = 0; i < file.length; i++) {
            formData.append('file', file[i]);
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/uploadImages`, { method: 'POST', body: formData });
        const res = await response.json();
        if (res.status) {
            bootstrap.Modal.getInstance(document.getElementById('deletetable')).hide();
            sessionStorage.setItem('successMsg', 'Image Uploaded Successfully');
            router.push(`/admin/client/${clientid}`);
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
                                <h4 className="mb-sm-0">Client List</h4>

                            </div>
                        </div>
                    </div>

                    <div className="row"><div className="col-lg-12"><div className="card" id="invoiceList">



                        <div className="card-body"><form><div className="row g-4 mb-3">
                            <div className="col-sm-auto">


                                <div>
                                    <Link href="/admin/client/create" className="btn btn-success"><i className="ri-add-line align-bottom me-1" />Add New Client</Link>
                                </div>



                            </div>


                            <div className="col-sm">
                                <div className="d-flex justify-content-sm-end">
                                    <div className="search-box ms-2">
                                        <input type="text" className="form-control search" placeholder="Search..." onChange={(e) => searching(idx, e.target.value)} />
                                        <i className="ri-search-line search-icon" />
                                    </div>
                                </div>
                            </div>
                        </div></form></div>

                        <div className="card-body"><div><div className="table-responsive table-card"><table className="table align-middle table-nowrap" id="invoiceTable"><thead className="text-muted"><tr><th className=" text-uppercase" data-sort="invoice_id">ID</th><th className="text-uppercase" data-sort="customer_name">Client Name</th><th className="text-uppercase" data-sort="customer_name">Category</th><th className=" text-uppercase" data-sort="email">Serial</th><th className=" text-uppercase" data-sort="action">Images</th></tr></thead>

                            {imageLists.length > 0 && imageLists.map((item, i) => <tbody key={item.clientId} className="list form-check-all"><tr><td className="id"><a href="javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" data-id={25000351} className="fw-medium link-primary">{item.clientId} </a></td><td className="customer_name"><div className="d-flex align-items-center">{item.clientName} </div></td><td className="customer_name"><div className="d-flex align-items-center">{item.categoryName} </div></td><td className="email">{item.serial}</td>
                                <td>
                                    <div class="d-flex gap-2">
                                        <div class="edit">
                                            <Link class="btn btn-sm btn-success edit-item-btn" href={`/admin/client/update/${item.clientId}`}>Edit</Link>
                                        </div>
                                        <div class="edit">
                                            <Link class="btn btn-sm btn-success edit-item-btn" href={`/admin/client/${item.clientId}`}>view</Link>
                                        </div>
                                        <div class="remove">
                                            <button class="btn btn-sm btn-danger remove-item-btn" data-bs-toggle="modal"
                                                data-bs-target="#deletetable" onClick={() => setClientid(item.clientId)}>Upload</button>
                                        </div>
                                        <div class="remove">
                                            <button class="btn btn-sm btn-danger remove-item-btn" onClick={() => openPopup(item.clientId)}>Remove</button>
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
                        className="modal fade zoomIn"
                        id="deletetable"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"


                                    />
                                </div>
                                <div className="modal-body">
                                    <div className="mt-2 text-center">

                                        <i class="ri-home-line ri-pencil-fill" style={{ fontSize: 'x-large' }}></i>
                                        <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">

                                            <form onSubmit={uploadImages}>
                                                <div className="mb-3">

                                                    <label className="">
                                                        Choose file <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        placeholder="Enter name"
                                                        name='file'
                                                        required
                                                        multiple
                                                        accept='image/*'
                                                    />



                                                </div>
                                                <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                                    <button
                                                        type="button"
                                                        className="btn w-sm btn-light"
                                                        data-bs-dismiss="modal"
                                                    >
                                                        Close
                                                    </button>

                                                    {
                                                        loading ? <div style={{ display: 'flex', justifyContent: 'center' }}><div className="spinner-border text-success" role="status">
                                                            <span className="sr-only">Loading...</span>
                                                        </div> </div> :
                                                            <>
                                                                <button
                                                                    type="submit"
                                                                    className="btn w-sm btn-danger "

                                                                >
                                                                    submit
                                                                </button>


                                                            </>

                                                    }


                                                </div>
                                            </form>

                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className={popup ? "modal fade zoomIn show" : "modal fade zoomIn"}
                        //  id="deletetable"
                        aria-hidden={!popup && 'true'}
                        role={popup && 'dialog'}
                        aria-modal={popup && 'true'}
                        style={{ display: popup ? 'block' : 'none', backgroundColor: 'rgb(0,0,0,0.5)' }}



                    >
                        <div className="modal-dialog modal-dialog-centered">
                            {deleteView === 1 && <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="btn-close" aria-label="Close" id="btn-close" onClick={() => setPopup(false)} />
                                </div>
                                <div className="modal-body">
                                    <div className="mt-2 text-center">
                                        <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style={{ "width": "100px", "height": "100px" }} />
                                        <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                                            <h4>Are you Sure ?</h4>
                                            <p className="text-muted mx-4 mb-0">Are you Sure You want to Remove this Record ?</p>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                        <button type="button" className="btn w-sm btn-light" onClick={() => setPopup(false)}>Close</button>
                                        <button type="button" className="btn w-sm btn-danger " id="delete-record" onClick={() => deleteRecords(id)}>Yes, Delete It!</button>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>


                </div>




            </div>
            <AdminFooter />
        </div>
    )
}
