"use client"
import React from 'react'
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import AdminFooter from '@/component/AdminFooter.jsx'
import Image from 'next/image';
import { useState,useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Page({blogdata, Metadescriptions,Categorylist,Blogstatus,Blogstatus1,blogDescription}) {


    const router=useRouter();
    //const { slug } = useParams();
    const editor=useRef(null);
    //const [blogdata, setBlogdata] = useState(blogData);
    const [imageUrl, setImageurl] = useState(null);
    const [imageUrl1, setImageurl1] = useState(blogdata.blogImage);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrormsg] = useState("");
   
    const [categoryList, setCategorylist] = useState(Categorylist);
    const [category, setCategory] = useState("");
    const [metaDescriptions,setMetadescriptions]=useState(Metadescriptions);
    const [description, setDescription] = useState(blogDescription);
    const [blogStatus,setBlogstatus]=useState(Blogstatus);
    const [blogStatus1,setBlogstatus1]=useState(Blogstatus1);
    const [formValidation, setFormvalidation] = useState({ blogTitle: -1, blogContent: -1, blogDescription: -1, blogImage: -1,metaDescriptions:-1,metaKeywords:-1,metaTitle:-1,blogSerial:-1,blogCategory:-1 })

    // useEffect(() => {

    //     const getBlog = async () => {

    //         const option = {
    //             method: "POST",
    //             url: `${process.env.NEXT_PUBLIC_BASE_URL}/singleBlog`,
    //             data: {
    //                 blogId: slug
    //             },
    //             headers: {
    //                 'api_key': process.env.NEXT_PUBLIC_SECRET_KEY,
    //             }
    //         }

    //         const response = await axios.request(option);
    //         if (response.data.status) {
    //             setBlogdata(response.data.blogdetail);
    //             setDescription(response.data.blogdetail.blogDescription);
    //             setImageurl(response.data.blogdetail.blogImage);
    //             if(response.data.blogdetail.blogStatus)
    //             {
    //                setBlogstatus('active')
    //                setBlogstatus1('active')
    //             }
    //             else{
    //                 setBlogstatus('inactive')
    //                 setBlogstatus1('inactive')
    //             }
    //             setMetadescriptions(response.data.blogdetail.metaDescriptions);
    //             setCategorylist(response.data.category);
    //         }

    //     }

    //     getBlog();
    // }, [])

    const editBlog = async (e) => {

        e.preventDefault();
        let arr = [1,1,1,1,1,1,1,1,1,1];
        let flag = true;
        const blogTitle = e.target.title.value.trim();
        const blogImage = imageUrl;
        const blogDescription = description;
        const blogContent = document.querySelector('.jodit-wysiwyg').innerHTML;
        const metadescriptions=metaDescriptions;
        const metaKeywords=e.target.metakeywords.value.trim();;
        const metaTitle=e.target.metatitle.value.trim();;
        const blogSerial=e.target.serial.value.trim();
        const blogUrl=e.target.url.value.trim();
        let  blogCategory
        if(category==="")
        {
          blogCategory=blogdata.blogCategory
        }
        else{
            blogCategory=category;
        }
     
        let blogstatus;
        if(blogStatus1==='active')
        {
            blogstatus=true;
        }
        else{
            blogstatus=false;
        }
        

        if (blogTitle.length < 5) {
            arr[0] = 0;
            flag = false;
        }
        // if (blogImage === "") {
        //     arr[1] = 0;
        //     flag = false;
        // }
        if (blogDescription.length < 10) {
            arr[2] = 0;
            flag = false;

        }
        if (blogContent === '<p><br></p>') {
            arr[3] = 0;
            flag = false;
        }

        if (metadescriptions.length < 10) {
            arr[4] = 0;
            flag = false;

        }
        if (metaKeywords.length < 10) {
            arr[5] = 0;
            flag = false;

        }
        if (metaTitle.length < 5) {
            arr[6] = 0;
            flag = false;

        }
        if (blogSerial==="" || blogSerial <= 0 ) {
            arr[7] = 0;
            flag = false;

        }

        if(blogCategory==="select" || blogCategory==="")
        {
            arr[8] = 0;
            flag = false;
        }


        if (blogUrl==="") {
            arr[9] = 0;
            flag = false;
        }
        

        if (flag) {

            setFormvalidation({ blogTitle: arr[0], blogImage: arr[1], blogDescription: arr[2], blogContent: arr[3] ,metaDescriptions:arr[4],metaKeywords:arr[5],metaTitle:arr[6],blogSerial:arr[7],blogCategory:arr[8],blogUrl:arr[9]});

            const data={
                blogTitle,blogDescription, blogContent,metaDescriptions:metadescriptions,metaKeywords,metaTitle,blogSerial,blogCategory,blogStatus:blogstatus,blogUrl,blogId:blogdata.blogId
            }

            const formData=new FormData();
            formData.append('file',imageUrl);
            formData.append('data',JSON.stringify(data));

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/updateBlog`,{method: "POST",body:formData});
            const res=await response.json();
            if (res.status) {

                sessionStorage.setItem('successMsg','Blogs Updated Successfully');
                router.push("/admin/blog");
                

            }
            else {
                setErrormsg(res.message);
            }

        }
        else {

            setFormvalidation({ blogTitle: arr[0], blogImage: arr[1], blogDescription: arr[2], blogContent: arr[3] ,metaDescriptions:arr[4],metaKeywords:arr[5],metaTitle:arr[6],blogSerial:arr[7],blogCategory:arr[8],blogUrl:arr[9]});

        }






    }

    const fileUpload = async () => {


        const thumbnailImage = document.getElementById('project-thumbnail-img').files[0];
        const imageurl=URL.createObjectURL(thumbnailImage);
        setImageurl1(imageurl);
        setImageurl(thumbnailImage);

       
        

    }

    const config = {
        readonly: false,
        toolbar: true,
        minHeight: 300,
        spellcheck: true,
        placeholder: 'Type something here...',
        uploader: {
            insertImageAsBase64URI: true
        }

    };

    return (

        <>
         { Object.keys(blogdata).length > 0  && <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    {/* start page title */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                                <h4 className="mb-sm-0">Edit Blog</h4>

                            </div>
                        </div>
                    </div>
                    {/* end page title */}
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={editBlog}>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="project-title-input">Blog Title</label>
                                            <input type="text" className="form-control" id="project-title-input" placeholder="Enter project title" name='title' style={{ border: formValidation.blogTitle === 0 && '1px solid red' }} defaultValue={blogdata.blogTitle} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="project-url-input">Blog Url</label>
                                            <input type="text" className="form-control" id="project-url-input" placeholder="Enter blog url" name='url' style={{ border: formValidation.blogUrl === 0 && '1px solid red' }} defaultValue={blogdata.blogUrl} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="project-thumbnail-img">Blog Image</label>
                                            <input className="form-control" id="project-thumbnail-img" type="file" name='image' accept="image/*" onChange={fileUpload} style={{ border: formValidation.blogImage === 0 && '1px solid red' }} />

                                            <div style={{marginTop:'10px'}}>Choose 723 x 489 Dimension</div>
                                            
                                            <Image  src={imageUrl1} priority width={ 100} height={100} id='imagePreview' alt=''  style={{ marginTop: '10px' }}/> 
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="project-thumbnail-img">Blog Description</label>
                                            <textarea className="form-control" rows={4} placeholder='type...' name='description' style={{ border: formValidation.blogDescription === 0 && '1px solid red' }} value={description} onChange={(e) => setDescription(e.target.value)} /> 



                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Blog Content</label>


                                            <JoditEditor //value={abstract}
                                                config={config}
                                                id='editor-content'
                                                value={blogdata.blogContent}
                                                ref={editor}
                                            // onChange={(value) => setAbstract(value)}
                                            />

                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="blog-serial-input">Serial No.</label>
                                            <input type="number" className="form-control" id="blog-serial-input" placeholder="Enter Serial Number" name='serial' style={{ border: formValidation.blogSerial === 0 && '1px solid red' }} defaultValue={blogdata.blogSerial}/>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="meta-title-input">Meta Title</label>
                                            <input type="text" className="form-control" id="meta-title-input" placeholder="Enter meta title" name='metatitle' style={{ border: formValidation.metaTitle === 0 && '1px solid red' }} defaultValue={blogdata.metaTitle}/>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="meta-keywords-input">Meta Keywords</label>
                                            <input type="text" className="form-control" id="meta-keywords-input" placeholder="Enter meta keywords" name='metakeywords' style={{ border: formValidation.metaKeywords === 0 && '1px solid red' }} defaultValue={blogdata.metaKeywords} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="meta-descriptions-input">Meta Descriptions</label>
                                            <textarea type="text" rows={4}className="form-control" id="meta-descriptions-input"  placeholder="Enter meta descriptions" name='metadescriptions' style={{ border: formValidation.metaDescriptions === 0 && '1px solid red' }} value={metaDescriptions} onChange={(e)=>setMetadescriptions(e.target.value)} /> 
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
                        <div className="col-lg-4">

                            {/* end card */}
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Privacy</h5>
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label htmlFor="choices-categories-input" className="form-label">Status</label>
                                        <select className="form-select" onChange={(e) =>setBlogstatus1(e.target.value)}  >
                                            <option value={blogStatus==='active'?'active':'inactive'} >{blogStatus==='active'?'active':'inactive'}</option>
                                            <option value={blogStatus==='active'?'inactive':'active'} >{blogStatus==='active'?'inactive':'active'}</option>
                                        </select>
                                    </div>
                                </div>
                                {/* end card body */}
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Tags</h5>
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label htmlFor="choices-categories-input" className="form-label">Categories</label>
                                        <select className="form-select" onChange={(e) => setCategory(e.target.value)} style={{ border: formValidation.blogCategory === 0 && '1px solid red' }} >
                                        
                                            {categoryList.length > 0 && categoryList.map((item)=>item.categoryName===blogdata.blogCategory ?<option value={item.categoryName} selected>{item.categoryName}</option>:<option value={item.categoryName} >{item.categoryName}</option>)}

                                           
                                            
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="choices-text-input" className="form-label">Hashtags</label>
                                        <div className="choices" data-type="text"><div className="choices__inner"><input className="form-control choices__input" id="choices-text-input" data-choices data-choices-limit="Required Limit" placeholder="Enter Skills" type="text" defaultValue="UI/UX, Figma, HTML, CSS, Javascript, C#, Nodejs" hidden tabIndex={-1} data-choice="active" /><div className="choices__list choices__list--multiple"><div className="choices__item choices__item--selectable" data-item data-id={1} data-value="UI/UX">UI/UX</div><div className="choices__item choices__item--selectable" data-item data-id={2} data-value=" Figma"> Figma</div><div className="choices__item choices__item--selectable" data-item data-id={3} data-value=" HTML"> HTML</div><div className="choices__item choices__item--selectable" data-item data-id={4} data-value=" CSS"> CSS</div><div className="choices__item choices__item--selectable" data-item data-id={5} data-value=" Javascript"> Javascript</div><div className="choices__item choices__item--selectable" data-item data-id={6} data-value=" C#"> C#</div><div className="choices__item choices__item--selectable" data-item data-id={7} data-value=" Nodejs"> Nodejs</div></div><input type="search" className="choices__input choices__input--cloned" autoComplete="off" autoCapitalize="off" spellCheck="false" role="textbox" aria-autocomplete="list" aria-label="Skills" style={{ "min-width": "1ch", "width": "1ch" }} /></div><div className="choices__list choices__list--dropdown" aria-expanded="false"><div className="choices__list" aria-multiselectable="true" role="listbox" /></div></div>
                                    </div>
                                </div>
                                {/* end card body */}
                            </div>
                            {/* end card */}

                            {/* end card */}
                        </div>
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
                                <p className="text-muted mx-4">Aww yeah, you successfully updated your Blog.</p>
                                <div className="mt-4">
                                    <a href="/admin/blog" className="btn btn-success w-100">Back to Dashboard</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>}

        </>
    )
}
