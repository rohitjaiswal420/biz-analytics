
import React from 'react'
import TestimonialUpdate from '../../../../../component/TestimonialUpdate';

export default async function Page({ params }) {

    const { slug } = await params;
    let testimonialDetail = null;

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/testimonials/testimonialByid`, {

            method: 'POST',
            cache: 'no-store',
            body: JSON.stringify({ testimonialId: slug })
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {


            testimonialDetail = res.testimonialdetail;


        }
       

    } catch (error) {

        console.log("fetching failed", error);


    }


    return (
        <>
            {
                testimonialDetail && <TestimonialUpdate testimonial={testimonialDetail} /> 
            }
        </>
    )
}
