import React from 'react'
import MenuList from '../../../../component/MenuList';
export default async function Page() {


    let menuList=[];
    //let totalItems;
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/menu`, {
    
          method: 'GET',
          cache: 'no-store'
        })
    
        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);
    
        const res = await response.json();
    
        if (res.status) {
          
          menuList = res.menulist;
         // totalItems= Math.ceil(res.totalItems/10)
        }
    
    
      } catch (error) {
    
        console.log("fetching failed", error);
    
    
      }


  return (
    <MenuList menuList={menuList} />
  )
}


