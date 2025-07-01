import { notFound } from 'next/navigation';
import React from 'react'


export default async function SlugPage({ params }) {

    const { slug } = await params;
    let pageDetail = {};
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/slugPage`, {
            cache: "no-store",
            method: 'POST',
            body: JSON.stringify({ url: `/${slug}` })
        });

        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const response = await res.json();
        if (response.status) {
            if (response.pagedetail) {
                pageDetail = response.pagedetail
            }
            else {
                return notFound()
            }
        }
        else {


            return notFound()
        }

    } catch (error) {
        console.error("Fetch error:", error);
        return notFound()
    }




    return (

        <>
            <head>
                <meta name='keywords' content={pageDetail?.metaKeywords} />
                <meta name='description' content={`${pageDetail?.metaDescriptions}`} />
                <title>{pageDetail?.metaTitle}</title>
            </head>
            <section
                className="page-title"
                style={{ backgroundImage: `url(${pageDetail?.bannerImage})` }}
            >
                <div className="auto-container">
                    <div className="title-outer">
                        <h1 className="title">{pageDetail?.mainTitle}</h1>
                        <ul className="page-breadcrumb">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>{pageDetail?.mainTitle}</li>
                        </ul>
                    </div>
                </div>
            </section>

            {
                pageDetail?.sections.map((section, i) => 
                    <section key={i} className={section.sectionType === '0' ? `services-section bg-grey` : `services-section`}>
                        <div className='auto-container'>
                            <div className='row'>
                                <div className={section.sectionType === '0' ? `col-md-4 col-12 order-md-2 order-1` : `col-md-4 col-12`}>
                                    <div className="team-details__top-left">
                                        <div className="team-details__top-img">
                                            {" "}
                                            <img
                                                alt="Team"
                                                loading="lazy"
                                                width={570}
                                                height={530}
                                                decoding="async"
                                                data-nimg={1}
                                            
                                                src={section.sectionImage}
                                                style={{ color: "transparent" }}
                                            />
                                            <div className="team-details__big-text" />
                                        </div>
                                    </div>
                                </div>

                                <div className={section.sectionType === '0' ? `col-md-8 col-12 order-md-1 order-2` : `col-md-8 col-12`}>
                                    <div className="team-details__top-left-1" dangerouslySetInnerHTML={{ __html: section.content }}>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }


        </>

    )
}




