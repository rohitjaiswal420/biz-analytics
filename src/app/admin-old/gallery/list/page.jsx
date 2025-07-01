import React from 'react'
import Gallery from '@/component/gallery.jsx';
export default async function Page() {


    let galleryList=[];
    let totalItems;

    try {
   
      const response=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/uploadImage?page=1&name=`,{
   
          method:'GET',
          cache:'no-store'
      })
   
      if(!response.ok) throw new error(`Failed to fetch: ${response.status}`);
   
      const res=await response.json();
      
      if(res.status)
      {
        galleryList=res.gallerylist;
        totalItems=Math.ceil(res.totalItems/10)
      }
      
   
    } catch (error) {
   
      console.log("fetching failed",error);
      
      
    }
  return (

    
    <Gallery galleryList={galleryList} totalItems={totalItems}/>
    
   
  )
}
