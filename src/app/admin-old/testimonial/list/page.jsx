import React from 'react'
import Testimonials from '@/component/Testimonials.jsx'
export default async function Page() {



  let testimonialList = [];
  let totalItems

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/testimonials?page=1&name=`, {

      method: 'GET',
      cache: 'no-store'
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {
      testimonialList = res.testimoniallist;
      totalItems=Math.ceil(res.totalItems/10)
    }


  } catch (error) {

    console.log("fetching failed", error);


  }
  return (
    <>
      {
       testimonialList && <Testimonials testimonialList={testimonialList} totalItems={totalItems}/>
      }
    </>
  )
}
