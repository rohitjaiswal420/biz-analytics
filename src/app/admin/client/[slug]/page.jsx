import React from 'react'

import Images from '../../../../component/Images.jsx'
export default async function Page({params}) {


    const {slug}=await params;
    let galleryList=[];
    let totalItems;
    let clientName;
    try {
   
      const response=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/imageClient/getClientimage?page=1&clientId=${slug}`,{
   
          method:'GET',
          cache:'no-store',
         
      })
   
      if(!response.ok) throw new error(`Failed to fetch: ${response.status}`);
   
      const res=await response.json();
      
      if(res.status)
      {
        galleryList=res.imagelist;
        totalItems=Math.ceil(res.totalItems/10);
        clientName=res.clientName
      }
      
   
    } catch (error) {
   
      console.log("fetching failed",error);
      
      
    }
  return (

    
    <Images galleryList={galleryList} totalItems={totalItems} clientId={slug} clientName={clientName}/>
    
   
  )
}
