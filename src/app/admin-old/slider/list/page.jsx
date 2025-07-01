import React from 'react'
import Sliders from '../../../../component/Sliders.jsx';
export default async function Page() {


  let sliderList = [];
  let totalItems;

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/slider/createSlider?page=1&name=`, {

      method: 'GET',
      cache: 'no-store'
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {
      sliderList = res.sliderlist;
      totalItems=Math.ceil(res.totalItems/10);
    }


  } catch (error) {

    console.log("fetching failed", error);


  }
  return (

    <>
      {
        Sliders && <Sliders sliderList={sliderList}  totalItems={totalItems} />
      }
    </>

  )
}
