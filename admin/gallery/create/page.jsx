"use client"
import React from 'react'
import AdminFooter from '@/component/AdminFooter.jsx'
import { useState} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function Page() {


    const router=useRouter();
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrormsg] = useState("");
    const [imageUrl,setImageurl] = useState(null);
    const [formValidation, setFormvalidation] = useState({gallery:-1,alt:-1})

    const createGallery = async (e) => {

        e.preventDefault();
        let arr = [1,1];
        let flag = true;
        
        const alt=e.target.alt.value.trim();

        if(!imageUrl)
        {
            arr[0]=0;
            flag=false;
        }

        if(alt==="")
        {
            arr[1]=0;
            flag=false;
        }
      
        if (flag) {

            setFormvalidation({gallery:arr[0],alt:arr[1]});
            const formData=new FormData();
            formData.append('data',JSON.stringify({alt}));
            formData.append('file',imageUrl);
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/uploadImage`,{method:'POST',body:formData})

            const res=await response.json();
            if(res.status)
            {
                sessionStorage.setItem('successMsg','Image Uploaded Successfully');
                router.push("/admin/gallery/list");
               
                
            }
            else{

                setErrormsg(res.message);
            }

        }
        else {

        setFormvalidation({gallery:arr[0],alt:arr[1]});
          
        }






    }

    const fileUpload = async () => {


        const thumbnailImage = document.getElementById('project-thumbnail-img').files[0];
        const imagePreview=document.getElementById('imagePreview');
        const imageurl=URL.createObjectURL(thumbnailImage);
        imagePreview.src=imageurl
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
                        <h4 className="mb-sm-0">Create Gallery</h4>

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
                                    <label className="form-label" htmlFor="menu-serial-input">Upload Images</label>
                                    <input type="file" className="form-control" id="project-thumbnail-img" placeholder="Enter Serial Number" name='gallery' style={{ border: formValidation.gallery === 0 && '1px solid red' }} onChange={fileUpload} />
                                    <div style={{marginTop:'10px'}}>Choose 400 x 300 Dimension</div>
                                    { !success && <Image src priority width={imageUrl && 100} height={imageUrl && 100} id='imagePreview' alt=''  style={{ marginTop: '10px' }}/>}
                                </div>
                              
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="alt-input">Alt Tag</label>
                                    <input type="text" className="form-control" id="alt-input" placeholder="Enter Alt Tag" name='alt' style={{ border: formValidation.alt === 0 && '1px solid red' }} />
                                </div>
                               

                                <div className="text-end mb-4">

                                    <button type="submit" className="btn btn-success w-sm">Upload</button>
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
