"use client"
import React from 'react'
import AdminFooter from '@/component/AdminFooter.jsx'
import { useState} from 'react';
import Image from 'next/image'
import {useRouter} from 'next/navigation'
export default function SliderUpdate({sliderDetail}) {

 
    const router=useRouter()
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrormsg] = useState("");
    const [imageUrl, setImageurl] = useState(null);
    const [imageUrl1, setImageurl1] = useState(sliderDetail.sliderImage);
    const [formValidation, setFormvalidation] = useState({url:-1,sliderSerial:-1,sliderImage:-1,sliderContent:-1})

    const createSlider = async (e) => {

        e.preventDefault();
        let arr = [1,1,1,1];
        let flag = true;
        const url = e.target.url.value.trim();
        const sliderSerial=e.target.serial.value.trim();
        const sliderImage=imageUrl
        const sliderContent=e.target.description.value.trim();
       

        if (url.length < 5) {
            arr[0] = 0;
            flag = false;
        }
       
        if (sliderSerial==="" || sliderSerial <= 0 ) {
            arr[1] = 0;
            flag = false;

        }

        // if (!sliderImage) {
        //     arr[2] = 0;
        //     flag = false;
        // }
       

        if (sliderContent.length < 10) {
            arr[3] = 0;
            flag = false;
        }
       

      
        if (flag) {

            setFormvalidation({url:arr[0],sliderSerial:arr[1],sliderImage:arr[2],sliderContent:arr[3]});
           

            try {

                const data={

                    url,sliderSerial,sliderContent,sliderId:sliderDetail.sliderId
                }
    
                const formData=new FormData();
                formData.append('file',imageUrl);
                formData.append('data',JSON.stringify(data));
    
                const response=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/slider/createSlider`,{
                    method:'PUT',
                    body:formData
                })
    
                const res=await response.json();
               
                if (res.status) {
    
                    sessionStorage.setItem('successMsg','Slider Updated Successfully');
                    router.push("/admin/slider/list");
                
                 
                   
                }
                else {
    
                    setErrormsg(res.message);
                }
                
            } catch (error) {
                
                console.log(error);
                setErrormsg(error.message);
                
            }
          
        }
        else {

        setFormvalidation({url:arr[0],sliderSerial:arr[1],sliderImage:arr[2],sliderContent:arr[3]});
          
        }






    }

    const fileUpload = async () => {


        const thumbnailImage = document.getElementById('project-thumbnail-img').files[0];
        const imageurl = URL.createObjectURL(thumbnailImage);
        setImageurl1(imageurl);
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
                        <h4 className="mb-sm-0">Update Slider</h4>

                    </div>
                </div>
            </div>
            {/* end page title */}
            <div className="row">
                <div className="col-md-8 offset-md-2 col-12 offset-0">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={createSlider}>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="menu-title-input">Slider Url</label>
                                    <input type="text" className="form-control" id="menu-title-input" placeholder="Enter slider url" name='url' style={{ border: formValidation.url === 0 && '1px solid red' }}  defaultValue={sliderDetail.url}/>
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="menu-serial-input">Serial No.</label>
                                    <input type="number" className="form-control" id="menu-serial-input" placeholder="Enter Serial Number" name='serial' style={{ border: formValidation.sliderSerial === 0 && '1px solid red' }} defaultValue={sliderDetail.sliderSerial} />
                                </div>

                                <div className="mb-3">
                                            <label className="form-label" htmlFor="project-thumbnail-img">Slider Image</label>
                                            <input className="form-control" id="project-thumbnail-img" type="file" name='image' accept="image/*" onChange={fileUpload} style={{ border: formValidation.sliderImage === 0 && '1px solid red' }} />
                                            <div style={{marginTop:'10px'}}>Choose 1920 x 970 Dimension</div>
                                            <Image  src={imageUrl1} priority width={ 100} height={100} id='imagePreview' alt=''  style={{ marginTop: '10px' }}/> 
                                            
                                        </div>

                                <div className="mb-3">
                                            <label className="form-label" htmlFor="destination Description">Slider Description</label>
                                            <textarea className="form-control" rows={4} placeholder='type...' name='description' id='destination Description' style={{ border: formValidation.sliderContent === 0 && '1px solid red' }} defaultValue={sliderDetail.sliderContent}/>

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
                        <p className="text-muted mx-4">Aww yeah, you successfully updated your Slider.</p>
                        <div className="mt-4">
                            <a href="/admin/slider/list" className="btn btn-success w-100">Back to Dashboard</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

