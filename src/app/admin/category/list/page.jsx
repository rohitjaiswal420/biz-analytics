import React from 'react'
import CategoryList from '../../../../component/CategoryList';
export default async function Page() {


    let categoryList=[];
    let totalItems;
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/imageCategory/?page=1&name=`, {
    
          method: 'GET',
          cache: 'no-store'
        })
    
        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);
    
        const res = await response.json();
    
        if (res.status) {
          
          categoryList = res.categorylist;
          totalItems= Math.ceil(res.totalItems/10)
        }
    
    
      } catch (error) {
    
        console.log("fetching failed", error);
    
    
      }


  return (
    <CategoryList categoryList={categoryList} totalItems={totalItems}/>
  )
}


