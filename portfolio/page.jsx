import Image from "next/image";
import Link from 'next/link';
import PortfolioSection from '../../component/PortfolioSection';

export default async function Portfolio() {


    let imageList = null;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/uploadImages/getAllimages`, {
        cache: "no-store",
        method: 'GET'
      });
  
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const response = await res.json();
      if(response.status)
      {
        imageList=response.imageData
      }
      
  
     } catch (error) {
      
        console.error("Fetch error:", error);
    }

    return (
        <>
            {/* Start main-content */}
            <section className="page-title" style={{ backgroundImage: "url(/images/background/career.webp)" }}>
                <div className="auto-container">
                    <div className="title-outer">
                        <h1 className="title">Portfolio</h1>
                        <ul className="page-breadcrumb">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>Portfolio</li>
                        </ul>
                    </div>
                </div>
            </section>
            {/* end main-content */}

            {/* <!-- career Section --> */}
            <section className="featured-products">
                <div className="bg-shape"></div>
                <div className="auto-container">
                   {imageList &&  <PortfolioSection imageList={imageList}/>}
                </div>
            </section>
        </>
    );
}