import React from 'react'
//import SliderUpdate from '/component/SliderUpdate';
import SliderUpdate from '../../../../../component/SliderUpdate.jsx';

export default async function Page({ params }) {

  const { slug } = await params;


  let sliderDetail = {};

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/slider/sliderByid`, {

      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify({ sliderId: slug })
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {
      sliderDetail = res.sliderdetail;
    }


  } catch (error) {

    console.log("fetching failed", error);


  }

  return (
    <>
      {
        sliderDetail && <SliderUpdate sliderDetail={sliderDetail} />
      }
    </>
  )
}
