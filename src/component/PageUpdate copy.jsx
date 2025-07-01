"use client"
import React from 'react'
import { useState, useRef,useEffect } from 'react';
import dynamic from 'next/dynamic';
import AdminFooter from '@/component/AdminFooter.jsx'
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function PageUpdate({pageDetail}) {

    const router=useRouter();
    const [success, setSuccess] = useState(false);
    const editor = useRef(null);
    const [errorMsg, setErrormsg] = useState("");
    const [formValidation, setFormvalidation] = useState({ url: -1, metaTitle: -1, metaKeywords: -1, metaDescriptions: -1, page: -1, image: -1, title: -1, description: -1 })
    const [imageUrl, setImageurl] = useState(null);
    const [sections, setSections] = useState(pageDetail.sections);

    useEffect(() => {
     
        document.getElementById("imagePreview").src=pageDetail.bannerImage
        sections.forEach((section,i)=>document.getElementById(`imagePreview${i}`).src=section.sectionImage);
    }, [])
    
    

    const addSection = () => {

        setSections((prev) => [...prev, { sectionImage: null, content: null, sectionType: null }])
    }

    const removeSection = (index) => {

        setSections(sections.filter((_, i) => index !== i));

    }

    const handleSection = (event, index) => {

        const { name, value } = event.target;
        if (name === 'sectionImage') {
            const sectionlist = [...sections];
            const file = document.getElementById(`project-section-img${index}`).files[0]
            const imageurl = URL.createObjectURL(file);
            document.getElementById(`imagePreview${index}`).src = imageurl;
            sectionlist[index][name] = file
            setSections(sectionlist);

        }
        else {

            const sectionlist = [...sections];
            sectionlist[index][name] = value;
            setSections(sectionlist);
        }

    }

    const createPage = async (e) => {

        e.preventDefault();
        const url = e.target.url.value.trim();
        const metaTitle = e.target.metatitle.value.trim();
        const metaKeywords = e.target.metakeywords.value.trim();
        const metaDescriptions = e.target.metadescriptions.value.trim();
        const pageType = e.target.page.value.trim()
        const bannerImage = imageUrl
        const mainTitle = e.target.title.value.trim();
        const shortContent = e.target.description.value.trim();

        let arr = [1, 1, 1, 1, 1, 1, 1, 1]
        let flag = true;

        if (url === "") {
            arr[0] = 0;
            flag = false
        }

        if (metaTitle === "") {
            arr[1] = 0;
            flag = false
        }

        if (metaKeywords === "") {
            arr[2] = 0;
            flag = false
        }

        if (metaDescriptions === "") {
            arr[3] = 0;
            flag = false
        }
        // if (pageType === 'select' || pageType === "") {
        //     arr[4] = 0;
        //     flag = false
        // }

        // if (!bannerImage) {
        //     arr[5] = 0;
        //     flag = false
        // }

        if (mainTitle === "") {
            arr[6] = 0;
            flag = false
        }

       
        if (flag) {

            setFormvalidation({ url: arr[0], metaTitle: arr[1], metaKeywords: arr[2], metaDescriptions: arr[3], page: arr[4], image: arr[5], title: arr[6], description: arr[7] });

            let sectiondata = [];
            const content = Array.from(document.querySelectorAll('.content-section'));
            content.forEach((child) => sectiondata.push(child.querySelector('.jodit-wysiwyg').innerHTML));
            const sectionlist = [...sections];
            const formData = new FormData();
            for (let i = 0; i < sectionlist.length; i++) {
                sectionlist[i]['content'] = sectiondata[i];
                formData.append('images', sectionlist[i]['sectionImage'])
            }
            setSections(sectionlist);
            const data = {

                url, metaTitle, metaKeywords, metaDescriptions, sections, mainTitle, pageType,
                pageId:pageDetail.pageId
            }


            formData.append('data', JSON.stringify(data))
            formData.append('bannerimage', imageUrl)
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/createPage`, {
                method: 'PUT',
                body: formData

            })

            const res = await response.json();

            if (res.status) {

                sessionStorage.setItem('successMsg','Page Updated Successfully');
                router.push("/admin/page/list");
               
            }
            else {

                setErrormsg(res.message);
            }
        }

        else {


            setFormvalidation({ url: arr[0], metaTitle: arr[1], metaKeywords: arr[2], metaDescriptions: arr[3], page: arr[4], image: arr[5], title: arr[6], description: arr[7] });

        }

    }

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

    const fileUpload = async () => {


        const thumbnailImage = document.getElementById('project-banner-img').files[0];
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
                                <h4 className="mb-sm-0">Update Page</h4>

                            </div>
                        </div>
                    </div>
                    {/* end page title */}
                    <div className="row">
                        <div className="col-md-8 offset-md-2 col-12 offset-0">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={createPage}>


                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="url-input">Url Name</label>
                                            <input type="text" className="form-control" id="url-input" placeholder="Enter url name" name='url' style={{ border: formValidation.url === 0 && '1px solid red' }} defaultValue={pageDetail.url} />
                                        </div>

                                        {/* <div className="mb-3">
                                            <label className="form-label" htmlFor="select-input">Select Page</label>
                                            <select name="page" id="select-input" className="form-control" style={{ border: formValidation.page === 0 && '1px solid red' }} >

                                               
                                                <option value="Normal Page" selected={pageDetail.pageType==='Normal Page' && true}>Normal Page</option>
                                                <option value="Service Page" selected={pageDetail.pageType==='Service Page' && true}>Service Page</option>
                                                <option value="Product Page" selected={pageDetail.pageType==='Product Page' && true}>Product Page</option>
                                                <option value="Industry Page" selected={pageDetail.pageType==='Industry Page' && true}>Industry Page</option>


                                            </select>

                                        </div> */}

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="project-banner-img">Banner Image</label>
                                            <input className="form-control" id="project-banner-img" type="file" name='image' accept="image/*" onChange={fileUpload} style={{ border: formValidation.image === 0 && '1px solid red' }} />
                                            <div style={{ marginTop: '10px' }}>Choose 1520 x 451 Dimension</div>
                                            {!success && <Image priority width={100} height={100} id='imagePreview' alt='' style={{ marginTop: '10px' }} />}

                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="title-input">Main Title</label>
                                            <input type="text" className="form-control" id="title-input" placeholder="Enter title" name='title' style={{ border: formValidation.title === 0 && '1px solid red' }} defaultValue={pageDetail.mainTitle}/>
                                        </div>

                                        {/* <div className="mb-3">
                                            <label className="form-label" htmlFor="Description">Short Description</label>
                                            <textarea className="form-control" rows={3} placeholder='type...' name='description' id='Description' style={{ border: formValidation.description === 0 && '1px solid red' }} defaultValue={pageDetail.shortContent}/>

                                        </div> */}

                                        <div className="mb-3" >
                                            {sections.length > 0 && sections.map((section, i) => <div key={i} className="content-section">

                                                <h3>Section {i + 1}</h3>
                                                <label className="form-label" htmlFor={`project-section-img${i}`}>Section Image</label>
                                                <input className="form-control" id={`project-section-img${i}`} type="file" name='sectionImage' accept="image/*" onChange={(e) => handleSection(e, i)} src=''/>
                                                <div style={{ marginTop: '10px' }}>Choose 1520 x 451 Dimension</div>
                                                {!success && <Image priority width={section.sectionImage && 100} height={section.sectionImage && 100} id={`imagePreview${i}`} alt='' style={{ marginTop: '10px' }} />}
                                                <br />
                                                <JoditEditor
                                                    config={config}
                                                    className='editor-content'
                                                    ref={editor}
                                                    
                                                    value={section.content}

                                                />
                                                <br />
                                                <label className="form-label" htmlFor="section-type">Select Section Type</label>
                                                <select name="sectionType" id="section-type" className="form-control" required onChange={(e) => handleSection(e, i)}>

                                                    {/* <option value="select" selected>Select</option> */}
                                                    <option value="1" selected={section.sectionType==="1" && true} >odd</option>
                                                    <option value="0" selected={section.sectionType==="0" && true}>even</option>


                                                </select>

                                                <br />



                                                <button type="button" onClick={() => removeSection(i)} className="remove-btn">
                                                    Remove Section
                                                </button>




                                            </div>)}

                                            <br />

                                            <button type="button" onClick={addSection} className="add-btn">
                                                Add Section
                                            </button>
                                            <br />


                                        </div>





                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="meta-title-input">Meta Title</label>
                                            <input type="text" className="form-control" id="meta-title-input" placeholder="Enter meta title" name='metatitle' style={{ border: formValidation.metaTitle === 0 && '1px solid red' }} defaultValue={pageDetail.metaTitle}/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="meta-keywords-input">Meta Keywords</label>
                                            <input type="text" className="form-control" id="meta-keywords-input" placeholder="Enter meta keywords" name='metakeywords' style={{ border: formValidation.metaKeywords === 0 && '1px solid red' }}defaultValue={pageDetail.metaKeywords} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="meta-descriptions-input">Meta Descriptions</label>
                                            <textarea type="text" rows={4} className="form-control" id="meta-descriptions-input" placeholder="Enter meta descriptions" name='metadescriptions' style={{ border: formValidation.metaDescriptions === 0 && '1px solid red' }} defaultValue={pageDetail.metaDescriptions} />
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
                                <p className="text-muted mx-4">Aww yeah, you successfully updated your Page.</p>
                                <div className="mt-4">
                                    <a href="/admin/page/list" className="btn btn-success w-100">Back to Dashboard</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}
