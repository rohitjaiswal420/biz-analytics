

import ImageList from '../../../../component/ImageList.jsx';
export default async function Page() {

  let imageList = null;
  let totalItems;
 
  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/imageClient/getClient?page=1&name=`, {

      method: 'GET',
      cache: 'no-store'
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);
    const res = await response.json();

    if (res.status) {
      imageList = res.clientlist;
      totalItems= Math.ceil(res.totalItems/10)
     
    }


  } catch (error) {

    console.log("fetching failed", error);


  }

  return (
    <>
      {
        ImageList  && <ImageList imageList={imageList} totalItems={totalItems} />
      }
    </>
  )
}
