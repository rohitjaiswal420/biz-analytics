"use client"
import React from 'react'
import AdminFooter from './AdminFooter.jsx'
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function ImageUpdate({ categoryList,clientDetail }) {


    const router = useRouter();
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrormsg] = useState("");
    const [imageUrl, setImageurl] = useState(null);
    const [imageUrl1, setImageurl1] = useState(clientDetail.thumbnailImage);
    const [formValidation, setFormvalidation] = useState({ gallery: -1, alt: -1, category: -1,serial: -1,subCategory:-1 })

    const createGallery = async (e) => {

        e.preventDefault();
        let arr = [1, 1, 1, 1, 1];
        let flag = true;
        const altTag = e.target.alt.value.trim();
        const category = JSON.parse(e.target.category.value).id.trim();
        const categoryName = JSON.parse(e.target.category.value).name.trim();
        const serial = e.target.serial.value.trim();
        const subCategory=e.target.subCategory.value.trim();
        // if (!imageUrl) {
        //     arr[0] = 0;
        //     flag = false;
        // }

        if (altTag === "") {
            arr[1] = 0;
            flag = false;
        }

        if (category === "" || category === "select") {

            arr[2] = 0;
            flag = false;
        }

        if (serial <= 0 || serial === "") {

            arr[3] = 0;
            flag = false;
        }

        if (subCategory === "") {

            arr[4] = 0;
            flag = false;
        }

        if (flag) {

            setFormvalidation({ gallery: arr[0], alt: arr[1], category: arr[2],serial:arr[3],subCategory:arr[4] });
            const formData = new FormData();
            formData.append('data', JSON.stringify({ altTag, categoryId: category,serial,clientName:subCategory,clientId:clientDetail.clientId ,categoryName}));
            formData.append('file', imageUrl);

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/imageClient`, { method: 'PUT', body: formData })

            const res = await response.json();
            if (res.status) {
                sessionStorage.setItem('successMsg', 'Client Updated Successfully');
                router.push("/admin/client/list");
            }
            else {

                setErrormsg(res.message);
            }

        }
        else {

            setFormvalidation({ gallery: arr[0], alt: arr[1], category: arr[2],serial:arr[3],subCategory:arr[4]  });

        }






    }

    const fileUpload = async () => {


        const thumbnailImage = document.getElementById('project-thumbnail-img').files[0];
        const imageurl = URL.createObjectURL(thumbnailImage);
        setImageurl1(imageurl)
        setImageurl(thumbnailImage);




    }




    return (
        <div className="main-content">
        <div className="page-content">
            <div className="container-fluid">
                {/* start page title */}
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                            <h4 className="mb-sm-0">Update {clientDetail.clientName}</h4>

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
                                        <label className="form-label" htmlFor="menu-serial-input">Thumbnail Image</label>
                                        <input type="file" className="form-control" id="project-thumbnail-img" placeholder="Enter choose file" name='gallery' style={{ border: formValidation.gallery === 0 && '1px solid red' }} onChange={fileUpload} />
                                        <div style={{ marginTop: '10px' }}>Choose 400 x 300 Dimension</div>
                                         <Image src={imageUrl1} priority width={100} height={100} id='imagePreview' alt="" style={{ marginTop: '10px' }} unoptimized/>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="category-input">Select Category</label>

                                        <select name="category" className="form-control" style={{ border: formValidation.category === 0 && '1px solid red' }} >

                                            <option  value={JSON.stringify({ id: "select", name: "select" })}>Select</option>
                                            {
                                                categoryList.map((item) => <option value={JSON.stringify({ id: item.categoryId, name: item.categoryName })} key={item.categoryId} selected={item.categoryId===clientDetail.categoryId&&true}>{item.categoryName.toUpperCase()}</option>)
                                            }


                                        </select>

                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="alt-input">Alt Tag</label>
                                        <input type="text" className="form-control" id="alt-input" placeholder="Enter Alt Tag" name='alt' style={{ border: formValidation.alt === 0 && '1px solid red' }} defaultValue={clientDetail.altTag}/>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="alt-subCategory">Client Name</label>
                                        <input type="text" className="form-control" id="alt-subCategory" placeholder="Enter Client Name" name='subCategory' style={{ border: formValidation.subCategory === 0 && '1px solid red' }} defaultValue={clientDetail.clientName} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="menu-serial-input">Serial No.</label>
                                        <input type="number" className="form-control" id="menu-serial-input" placeholder="Enter Serial Number" name='serial' style={{ border: formValidation.serial === 0 && '1px solid red' }} defaultValue={clientDetail.serial}/>
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
