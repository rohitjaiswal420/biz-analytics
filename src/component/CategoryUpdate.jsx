"use client"
import React from 'react'
import AdminFooter from './AdminFooter.jsx'
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function CategoryUpdate({ categoryDetail }) {


    const router = useRouter();
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrormsg] = useState("");
    const [status, setStatus] = useState(categoryDetail.status?'active':'inactive');
    const [status1, setStatus1] = useState(categoryDetail.status?'active':'inactive');
    const [formValidation, setFormvalidation] = useState({ categoryName: -1, serial: -1 })

    const createGallery = async (e) => {

        e.preventDefault();
        let arr = [1, 1];
        let flag = true;
        let status;
        const categoryName = e.target.category.value.trim();
        const serial = e.target.serial.value.trim();

        if (categoryName === "") {

            arr[2] = 0;
            flag = false;
        }

        if (serial <= 0 || serial === "") {

            arr[3] = 0;
            flag = false;
        }


        if (status1 === 'active') {
            status = true;
        }
        else {
            status = false;
        }

        if (flag) {

            setFormvalidation({ categoryName: arr[0], serial: arr[1] });
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/imageCategory/categoryByid`, { method: 'PUT', body: JSON.stringify({ categoryName, serial, categoryId: categoryDetail.categoryId, status }) })

            const res = await response.json();
            if (res.status) {
                sessionStorage.setItem('successMsg', 'Category Updated Successfully');
                router.push("/admin/category/list");
            }
            else {

                setErrormsg(res.message);
            }

        }
        else {

            setFormvalidation({ categoryName: arr[0], serial: arr[1] });

        }






    }



    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    {/* start page title */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                                <h4 className="mb-sm-0">Update {categoryDetail.categoryName}</h4>

                            </div>
                        </div>
                    </div>
                    {/* end page title */}
                    <div className="row">
                        <div className="col-md-8 offset-md-2 col-12 offset-0">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={createGallery}>






                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="category-input">Category Name</label>
                                            <input type="text" className="form-control" id="category-input" placeholder="Enter Category Name" name='category' style={{ border: formValidation.category === 0 && '1px solid red' }} defaultValue={categoryDetail.categoryName} />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="choices-categories-input" className="form-label">Status</label>
                                            <select className="form-select" onChange={(e) => setStatus1(e.target.value)}  >
                                                <option value={status === 'active' ? 'active' : 'inactive'} >{status === 'active' ? 'active' : 'inactive'}</option>
                                                <option value={status === 'active' ? 'inactive' : 'active'} >{status === 'active' ? 'inactive' : 'active'}</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="menu-serial-input">Serial No.</label>
                                            <input type="number" className="form-control" id="menu-serial-input" placeholder="Enter Serial Number" name='serial' style={{ border: formValidation.serial === 0 && '1px solid red' }} defaultValue={categoryDetail.serial} />
                                        </div>


                                        <div className="text-end mb-4">

                                            <button type="submit" className="btn btn-success w-sm">Update</button>
                                        </div>
                                        {
                                            errorMsg !== "" && <div style={{ color: 'red' }}>{errorMsg}</div>
                                        }
                                    </form>
                                </div>
                                {/* end card body */}
                            </div>
                            {/* end card */}

                            {/* end card */}

                        </div>
                        {/* end col */}

                        {/* end col */}
                    </div>
                    {/* end row */}
                </div>
                {/* container-fluid */}
            </div>
            {/* End Page-content */}
            <AdminFooter />
            <div
                className={success ? "modal fade zoomIn show" : "modal fade zoomIn"}
                id="deletetable"
                aria-hidden={!success && 'true'}
                role={success && 'dialog'}
                aria-modal={success && 'true'}
                style={{ display: success ? 'block' : 'none', backgroundColor: 'rgb(0,0,0,0.5)' }}



            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="btn-close"
                                // data-bs-dismiss="modal"
                                onClick={() => setSuccess(false)}


                            />
                        </div>
                        <div className="card-body p-4 text-center">
                            <div className="avatar-lg mx-auto mt-2">
                                <div className="avatar-title bg-light text-success display-3 rounded-circle">
                                    <i className="ri-checkbox-circle-fill" />
                                </div>
                            </div>
                            <div className="mt-4 pt-2">
                                <h4>Well done !</h4>
                                <p className="text-muted mx-4">Aww yeah, you successfully uploaded your gallery.</p>
                                <div className="mt-4">
                                    <a href="/admin/gallery/list" className="btn btn-success w-100">Back to Dashboard</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
