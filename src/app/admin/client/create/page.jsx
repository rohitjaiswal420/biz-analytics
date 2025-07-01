import ImageUpload from '../../../../component/ImageUpload'
export default async function Page() {

    let categoryList = [];
    try {
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/imageCategory/getCategory`, {
  
        method: 'GET',
        cache: 'no-store'
      })
  
      if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);
  
      const res = await response.json();
  
      if (res.status) {
         categoryList = res.categorylist;
      }
  
  
    } catch (error) {
  
      console.log("fetching failed", error);
    }
  


    return (
      
        <ImageUpload categoryList={categoryList}/>
    )
}
