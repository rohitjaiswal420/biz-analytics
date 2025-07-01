"use client"
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import Image from 'next/image'
import AdminFooter from '@/component/AdminFooter.jsx'
import { useRouter } from 'next/navigation';
export default function Page() {



    const router=useRouter();
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrormsg] = useState("");
    const [imageUrl, setImageurl] = useState(null);

    const [formValidation, setFormvalidation] = useState({name:-1,image:-1,serial:-1,description:-1})
    const createTestimonials = async (e) => {

        e.preventDefault();
        let arr = [1, 1, 1, 1];
        let flag = true;
        const name = e.target.name.value.trim();
        const image= imageUrl;
        const serial = e.target.serial.value.trim();
        const description = e.target.description.value.trim();
       


        if (name.length <= 2 ) {
            arr[0] = 0;
            flag = false;

        }


        if (!image) {
            arr[1] = 0;
           // flag = false;
        }

        if (serial === "") {
            arr[2] = 0;
            flag = false;

        }


        if (description.length <  10) {
            arr[3] = 0;
            flag = false;
        }



        if (flag) {

            setFormvalidation({name:arr[0],image:arr[1],serial:arr[2],description:arr[3]});


            const data = {

                name,image,serial,description
            }

            const formData = new FormData();
            formData.append('file', imageUrl);
            formData.append('data', JSON.stringify(data));

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/testimonials`, {
                method: 'POST',
                body: formData
            })

            const res = await response.json();

            if (res.status) {

                sessionStorage.setItem('successMsg','Testimonial Created Successfully');
                router.push("/admin/testimonial/list");
               
            }
            else {

                setErrormsg(res.message);
            }

        }
        else {

            setFormvalidation({name:arr[0],image:arr[1],serial:arr[2],description:arr[3]});

        }





    }

    const fileUpload = () => {


        const thumbnailImage = document.getElementById('project-thumbnail-img').files[0];
        const imagePreview = document.getElementById('imagePreview');
        const imageurl = URL.createObjectURL(thumbnailImage);
        imagePreview.src = imageurl
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
                                <h4 className="mb-sm-0">Create Testimonial</h4>

                            </div>
                        </div>
                    </div>
                    {/* end page title */}
                    <div className="row">
                        <div className="col-md-8 offset-md-2 col-12 offset-0">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={createTestimonials}>


                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="menu-title-input">Name</label>
                                            <input type="text" className="form-control" id="menu-title-input" placeholder="Enter Name" name='name' style={{ border: formValidation.name === 0 && '1px solid red' }} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="project-thumbnail-img">Image</label>
                                            <input className="form-control" id="project-thumbnail-img" type="file" name='image' accept="image/*" onChange={fileUpload} style={{ border: formValidation.image === 0 && '1px solid red' }} />
                                            <div style={{marginTop:'10px'}}>Choose 300 x 300 Dimension</div>
                                            {!success && <Image priority width={imageUrl && 100} height={imageUrl && 100} id='imagePreview' alt='' />}

                                        </div>



                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="menu-serial-input">Review url</label>
                                            <input type="text" className="form-control" id="menu-serial-input" placeholder="Enter review link" name='serial' style={{ border: formValidation.serial === 0 && '1px solid red' }} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="project-thumbnail-img">Description</label>
                                            <textarea className="form-control" rows={4} placeholder='type...' name='description' style={{ border: formValidation.description === 0 && '1px solid red' }} />

                                        </div>


                                        <div className="text-end mb-4">

                                            <button type="submit" className="btn btn-success w-sm">Create</button>
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
            <AdminFooter/>
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
                                <p className="text-muted mx-4">Aww yeah, you successfully created your testimonial.</p>
                                <div className="mt-4">
                                    <a href="/admin/testimonial/list" className="btn btn-success w-100">Back to Dashboard</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
