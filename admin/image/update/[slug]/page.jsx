import ImageUpdate from '../../../../../component/ImageUpdate'
export default async function Page({params}) {

    const {slug}=await params;
    let categoryList = [];
    let imageDetail=null;
    try {
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/imageCategory/getCategory`, {
  
        method: 'POST',
        cache: 'no-store',
        body:JSON.stringify({imageId:slug})
      })
  
      if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);
  
      const res = await response.json();
  
      if (res.status) {
         categoryList = res.categorylist;
         imageDetail=res.imagedetail;
      }
  
  
    } catch (error) {
  
      console.log("fetching failed", error);
    }
  


    return (
      
        <ImageUpdate categoryList={categoryList} imageDetail={imageDetail}/>
    )
}
