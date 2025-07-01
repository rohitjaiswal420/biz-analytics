"use client"
import React from 'react'
import { useState, useEffect,useRef } from 'react'
import AdminFooter from './AdminFooter'
import Image from 'next/image'
import Tooltip from './Tooltip'
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
export default function DetailPage({ Details }) {



    const [formValidation, setFormvalidation] = useState({ content: -1 })
    const [socialMedia, setSocialmedia] = useState(Details.socialMedia);
    const [phoneNumber, setPhonenumber] = useState(Details.phoneNumber);
    const [email, setEmail] = useState(Details.email);
    const [address, setAddress] = useState(Details.address);
    const [errorMsg, setErrormsg] = useState("");
    const [imageUrl2, setImageurl2] = useState(Details.lightLogo);
    const [imageUrl3, setImageurl3] = useState(Details.darkLogo);
    const [imageUrl, setImageurl] = useState(null);
    const [imageUrl1, setImageurl1] = useState(null);
    const [message, setMessage] = useState(typeof window !== 'undefined' && sessionStorage.getItem('successMsg') ? sessionStorage.getItem('successMsg') : "")
    const editor=useRef(null);
    useEffect(() => {

        if (message !== "") {
            const timer = setTimeout(() => {
                setMessage("");
                sessionStorage.removeItem('successMsg');
            }, 3000);

            return () => clearTimeout(timer);
        }

    }, [])

    const config = {
        readonly: false,
        toolbar: true,
        minHeight: 300,
        spellcheck: true,
        placeholder: 'Type something here...',
        uploader: {
            insertImageAsBase64URI: true,
        }

    };


    const manageDetails = async (e) => {

        e.preventDefault();
        const content = e.target.content.value.trim();
        const location = document.querySelector('.jodit-wysiwyg').innerHTML;
       
        let flag = true;
        if (content === "") {
            flag = false;
        }

        if (location === "<p><br></p>") {
            flag = false;
        }
        

        if (flag) {
            setFormvalidation({ content: 1 });
            const formData = new FormData();
            formData.append('light-logo', imageUrl);
            formData.append('dark-logo', imageUrl1);
            const data = {

                phoneNumber, email, address, socialMedia, content, detailsId: Details.detailsId,location
            }
            formData.append('data', JSON.stringify(data));

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/details`, {
                method: 'POST',
                body: formData
            })

            const res = await response.json();
            if (res.status) {

                window.location.href = '/admin/details'
                sessionStorage.setItem('successMsg', "Details updated successfully");
            }
            else {

                setErrormsg(res.message);
            }

        }
        else {

            setFormvalidation({ content: 0 });
        }
    }

    const removeSocialmedia = (idx) => {

        setSocialmedia(socialMedia.filter((_, i) => i !== idx));
    }

    const addSocialmedia = () => {

        setSocialmedia((prev) => [...prev, { url: "", icon: "" }]);
    }

    const handleSocialmedia = (e, idx) => {

        const { name, value } = e.target;
        const updatedsection = [...socialMedia];
        updatedsection[idx][name] = value;
        setSocialmedia(updatedsection);
    }

    const removeNumber = (idx) => {

        setPhonenumber(phoneNumber.filter((_, i) => i !== idx));
    }

    const addNumber = () => {

        setPhonenumber((prev) => [...prev, { number: "" }]);
    }

    const handleNumber = (e, idx) => {

        const { name, value } = e.target;
        const updatedsection = [...phoneNumber];
        updatedsection[idx][name] = value;
        setPhonenumber(updatedsection);
    }


    const removeEmail = (idx) => {

        setEmail(email.filter((_, i) => i !== idx));
    }

    const addEmail = () => {

        setEmail((prev) => [...prev, { email: "" }]);
    }

    const handleEmail = (e, idx) => {

        const { name, value } = e.target;
        const updatedsection = [...email];
        updatedsection[idx][name] = value;
        setEmail(updatedsection);
    }


    const removeAddress = (idx) => {

        setAddress(address.filter((_, i) => i !== idx));
    }

    const addAddress = () => {

        setAddress((prev) => [...prev, { address: "" }]);
    }

    const handleAddress = (e, idx) => {

        const { name, value } = e.target;
        const updatedsection = [...address];
        updatedsection[idx][name] = value;
        setAddress(updatedsection);
    }




    const fileUpload = async () => {


        const thumbnailImage = document.getElementById('project-banner-img').files[0];
        const imageurl = URL.createObjectURL(thumbnailImage);
        setImageurl2(imageurl)
        setImageurl(thumbnailImage);




    }

    const fileUpload1 = async () => {


        const thumbnailImage = document.getElementById('project-banner-img1').files[0];
        const imageurl = URL.createObjectURL(thumbnailImage);
        setImageurl3(imageurl)
        setImageurl1(thumbnailImage);




    }


    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    {message !== "" && <Tooltip message={message} />
                    }
                    {/* start page title */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                                <h4 className="mb-sm-0">Manage Details</h4>

                            </div>
                        </div>
                    </div>
                    {/* end page title */}
                    <div className="row">
                        <div className="col-md-8 offset-md-2 col-12 offset-0">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={manageDetails}>

                                        {/* cardBodySec */}
                                        <div className="cardBodySec">
                                            <h4>
                                                Update Number
                                                {phoneNumber.length <= 2 && <button type="button" onClick={addNumber} className="add-btn" >
                                                    <i className="ri-add-line" /> Add
                                                </button>}
                                            </h4>
                                            {phoneNumber.length > 0 && phoneNumber.map((number, i) => <div key={i} className="content-section">
                                                <label className="form-label" htmlFor="phone-input">Number {phoneNumber.length === 1 ? "" : i + 1}</label>
                                                <div class="input-group">
                                                    <input type="text" className="form-control" id="phone-input" placeholder="Enter phone number" name='number' required value={number.number} onChange={(e) => handleNumber(e, i)} />
                                                    <span class="input-group-text inputGrp">
                                                        {phoneNumber.length > 1 && <button type="button" onClick={() => removeNumber(i)} className="remove-btn">
                                                            <i className="ri-delete-bin-line" />
                                                        </button>
                                                        }
                                                    </span>
                                                </div>
                                            </div>)}
                                        </div>

                                        {/* cardBodySec */}
                                        <div className="cardBodySec">
                                            <h4>
                                                Update Email
                                                {email.length <= 2 && <button type="button" onClick={addEmail} className="add-btn" >
                                                    <i className="ri-add-line" /> Add
                                                </button>}
                                            </h4>
                                            {email.length > 0 && email.map((item, i) => <div key={i} className="content-section">
                                                <label className="form-label" htmlFor="email-input">Email {email.length === 1 ? "" : i + 1}</label>
                                                <div class="input-group">
                                                    <input type="email" className="form-control" id="email-input" placeholder="Enter email" name='email' value={item.email} onChange={(e) => handleEmail(e, i)} required />
                                                    <span class="input-group-text inputGrp">
                                                        {email.length > 1 && <button type="button" onClick={() => removeEmail(i)} className="remove-btn">
                                                            <i className="ri-delete-bin-line" />
                                                        </button>
                                                        }
                                                    </span>
                                                </div>
                                            </div>)}
                                        </div>

                                        {/* cardBodySec */}
                                        <div className="cardBodySec">
                                            <h4>
                                                Update Logo
                                            </h4>
                                            <div className='uploadLogoSec'>
                                                <label className="form-label" htmlFor="project-banner-img">Logo light</label>
                                                <input className="form-control" id="project-banner-img" type="file" accept="image/*" onChange={fileUpload} />
                                                <div style={{ marginTop: '10px' }}>Choose 1520 x 451 Dimension</div>
                                                <Image width={100} height={100} id='imagePreview' alt='' src={imageUrl2} />
                                            </div>
                                        </div>

                                        {/* cardBodySec */}
                                        <div className="cardBodySec">
                                            <div className='uploadLogoSec'>
                                                <label className="form-label" htmlFor="project-banner-img1">Logo dark</label>
                                                <input className="form-control" id="project-banner-img1" type="file" accept="image/*" onChange={fileUpload1} />
                                                <div style={{ marginTop: '10px' }}>Choose 1520 x 451 Dimension</div>
                                                <Image width={100} height={100} id='imagePreview1' alt='' src={imageUrl3} />
                                            </div>
                                        </div>

                                        {/* cardBodySec */}
                                        <div className="cardBodySec">
                                            <h4>
                                                Update Address
                                                {address.length <= 2 && <button type="button" onClick={addAddress} className="add-btn" >
                                                    <i className="ri-add-line" /> Add
                                                </button>}
                                            </h4>
                                            {address.length > 0 && address.map((item, i) => <div key={i} className="content-section">
                                                <label className="form-label" htmlFor="Address">Address {address.length === 1 ? "" : i + 1}</label>
                                                <div class="input-group">
                                                    <textarea className="form-control" rows={3} placeholder='type...' name='address' id='Address' required value={item.address} onChange={(e) => handleAddress(e, i)} />
                                                    <span class="input-group-text inputGrp">
                                                        {address.length > 1 && <button type="button" onClick={() => removeAddress(i)} className="remove-btn">
                                                            <i className="ri-delete-bin-line" />
                                                        </button>
                                                        }
                                                    </span>
                                                </div>
                                            </div>)}
                                        </div>

                                        {/* cardBodySec */}
                                        <div className="cardBodySec">
                                            <h4>
                                                Update Footer
                                            </h4>
                                            <textarea className="form-control" rows={3} placeholder='type...' name='content' id='Footer-Content' style={{ border: formValidation.content === 0 && '1px solid red' }} defaultValue={Details.content} />
                                        </div>

                                        {/* cardBodySec */}
                                        <div className="cardBodySec" >
                                            <h4>
                                                Update Social Media
                                                <button type="button" onClick={addSocialmedia} className="add-btn" >
                                                    <i className="ri-add-line" /> Add
                                                </button>
                                            </h4>
                                            {socialMedia.length > 0 && socialMedia.map((socialmedia, i) => <div key={i} className="content-section">
                                                <h3>
                                                    Social Media {socialMedia.length === 1 ? "" : i + 1}
                                                    {socialMedia.length > 1 && <button type="button" onClick={() => removeSocialmedia(i)} className="remove-btn">
                                                        <i className="ri-delete-bin-line" />
                                                    </button>}
                                                </h3>
                                                <label className="form-label" htmlFor="url-input">Social Media Url</label>
                                                <input type="text" className="form-control" id="url-input" placeholder="Enter url" name='url' required value={socialmedia.url} onChange={(e) => handleSocialmedia(e, i)} />
                                                <label className="form-label" htmlFor="icon-Type">Social  Media Icon</label>
                                                <input name="icon" id="icon-Type" className="form-control" required onChange={(e) => handleSocialmedia(e, i)} value={socialmedia.icon} placeholder='Enter icon' />
                                            </div>)}
                                        </div>

                                        <div className="cardBodySec" >
                                            <label className="form-label" htmlFor="header">Update Location</label>
                                            <JoditEditor
                                                config={config}
                                                className='editor-content'
                                                ref={editor}
                                                required
                                                value={Details.location}

                                            />
                                        </div>
                                        <div className="cardBodySec text-end">
                                            <button type="submit" className="btn btn-success w-sm ms-auto">Update</button>
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
            {/* <div
                className={success ? "modal fade zoomIn show" : "modal fade zoomIn"}
                id="deletetable"
                aria-hidden={ 'true'}
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
                                <p className="text-muted mx-4">Aww yeah, you successfully created your Page.</p>
                                <div className="mt-4">
                                    <a href="/admin/page/list" className="btn btn-success w-100">Back to Dashboard</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

