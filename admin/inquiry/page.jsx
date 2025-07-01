
import Inquiry from '@/component/Inquiry.jsx'
export default async function Page() {

  let inquiryList = [];
  let totalItems;

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/getInquiry?page=1&name=`, {

      method: 'GET',
      cache: 'no-store'
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {
      inquiryList = res.inquirylist;
      totalItems= Math.ceil(res.totalItems/10)
    }


  } catch (error) {

    console.log("fetching failed", error);


  }

  return (
    <>
      {
        inquiryList && <Inquiry inquiryList={inquiryList} totalItems={totalItems}/>
      }
    </>
  )
}
