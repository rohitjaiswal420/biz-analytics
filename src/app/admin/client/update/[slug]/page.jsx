import ImageUpdate from '../../../../../component/ImageUpdate'
export default async function Page({params}) {

    const {slug}=await params;
    let categoryList = [];
    let clientDetail=null;
    try {
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/imageClient/getClient`, {
  
        method: 'POST',
        cache: 'no-store',
        body:JSON.stringify({clientId:slug})
      })
  
      if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);
  
      const res = await response.json();
  
      if (res.status) {
         categoryList = res.categorylist;
         clientDetail=res.clientdetail;
      }
  
  
    } catch (error) {
  
      console.log("fetching failed", error);
    }
  


    return (
      
        <ImageUpdate categoryList={categoryList} clientDetail={clientDetail}/>
    )
}
