
import Pagelist from "../../../../component/Pagelist";

export default async function Page() {



  let pageList = [];
  let totalItems;

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/createPage?page=1&name=&url=`, {

      method: 'GET',
      cache: 'no-store'
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {
      pageList = res.pagelist;
      totalItems= Math.ceil(res.totalItems/10)
    }


  } catch (error) {

    console.log("fetching failed", error);


  }


  return (
    <>
      {
        pageList && <Pagelist pageList={pageList} totalItems={totalItems}/>
      }
    </>
  )
}
