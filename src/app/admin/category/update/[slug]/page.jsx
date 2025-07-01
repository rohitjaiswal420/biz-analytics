import CategoryUpdate from '../../../../../component/CategoryUpdate.jsx'
export default async function Page({params}) {

    const {slug}=await params;
    let categoryDetail=null;
    try {
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/imageCategory/categoryByid`, {
  
        method: 'POST',
        cache: 'no-store',
        body:JSON.stringify({categoryId:slug})
      })
  
      if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);
  
      const res = await response.json();
  
      if (res.status) {
        
         categoryDetail=res.categorydetail;
      }
  
  
    } catch (error) {
  
      console.log("fetching failed", error);
    }
  


    return (
      
        <CategoryUpdate  categoryDetail={categoryDetail}/>
    )
}
