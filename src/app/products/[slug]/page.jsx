import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const productsData = {
  "x-form-insights": {
    title: "xForm Insights",
    heading: "xForm Insights",
    description: "xForm Insights performs detailed assessment of your data workloads to provide you with significant insights into your current workloads viz. object types and query level stats, query complexity as well as query processing workflow. Additionally, xForm Insights reveals potential optimization opportunities to help achieve life time cost benefits through simplification and reuse.",
    description2: "These insights are provided both in a graphical summary format as well as detailed report format. A detailed workflow diagram helps your engineers understand the workload operation, so that they can be well maintained, enhanced or modularized.",
    footerDescription: "Get in touch with us for further information and demonstration of our offerings.",
    src: "/images/products/xForm-insights.webp"
  },
  "x-form-accelerate": {
    title: "xForm Accelerate",
    heading: "xForm Accelerate",
    description: "xForm Accelerate offers a simple automation process for conversion of data and scripts from the legacy (source) system to the modern (target) system based on the plug-in you have selected.",
    description2: "In addition to accelerating the conversion of your legacy workloads, xForm offers enhanced usage of the workloads through usage of more granular queries and intermediate outputs that can be indepdently reported on or loaded as appropriate to downstream tools.",
    listHeading: "Each of the plug-ins support two types of transformations:",
    listItems: [
        "Basic or 'Lift-and-shift' plug-in performs basic conversion.",
        "'Modernize' plug-in additionally optimizes your workloads thorugh grouping and de-duplication leading to long-term cost benefits.",
    ],
    footerDescription: "Get in touch with us for further information and demonstration of our offerings.",
    src: "/images/products/xForm-accelerate.webp"
  },
};

export default function ProductsPage({ params }) {
  const products = productsData[params.slug];

  if (!products) {
    return <div>Products not found</div>; // fallback if slug doesn't match
  }

  return (
    <>
        {/* Start main-content */}
        <section className="page-title" style={{ backgroundImage: "url(/images/background/products.webp)" }}>
            <div className="auto-container">
                <div className="title-outer">
                    <h1 className="title">{products.title}</h1>
                    <ul className="page-breadcrumb">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>{products.title}</li>
                    </ul>
                </div>
            </div>
        </section>
        {/* end main-content */}

        {/* About Section */}
        <section className="services-details">
            <div className="container">
                <div className="row">
                    {/* Image Column */}
                    <div className="col-12">
                        <div className="inner-column wow animate__animated animate__fadeInLeft">
                            <figure className="image-1 overlay-anim wow animate__animated animate__fadeInUp">
                                <Image src={products.src} alt={products.title} width={1100} height={400} />
                            </figure>
                        </div>
                    </div>

                    <div className="col-12" data-aos="fade-right" data-aos-delay="300">
                        <div className="services-details__content">
                            <h3>{products.heading}</h3>

                            {
                                products.listHeading && (
                                    <>
                                        <p>{products.listHeading}</p>
                                        <ul className="list-style-two mb-4">
                                            {
                                                products.listItems?.map((item, index) => (
                                                    <li key={index}><FontAwesomeIcon icon={faCheckCircle} /> {item}</li>
                                                ))
                                            }
                                        </ul>
                                    </>
                                )
                            }
                            <p>
                                {products.description}
                            </p>

                            <blockquote className="blockquote-one">
                                {products.footerDescription}
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/*Emd About Section */}
    </>
  );
}
