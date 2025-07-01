import Image from "next/image";
import Link from "next/link";

const industryData = {
  "financial-services": {
    title: "Financial Services",
    heading: "Empowering Financial Excellence",
    description: "In the fast-paced world of financial services, we understand the need for data-driven decisions. Our AI and ML expertise provides actionable insights, mitigates risks, and optimizes investment strategies. By harnessing the power of advanced analytics, we help financial institutions navigate complex markets, stay ahead of competitors, and offer personalized services to their clients.",
    src: "/images/industries/financial-services.webp"
  },
  "healthcare": {
    title: "Healthcare",
    heading: "Transforming Healthcare Delivery",
    description: "With our cutting-edge data and AI solutions, we revolutionize patient care and drug discoveries. Our expertise enables precision medicine, predictive diagnoses, and streamlined operations. By unlocking valuable insights from medical data, we empower healthcare providers to make informed decisions, improve patient outcomes, and foster a healthier healthcare ecosystem.",
    src: "/images/industries/healthcare.webp"
  },
  "pharma": {
    title: "Pharma",
    heading: "Accelerating Pharma Advancements",
    description: "The pharmaceutical industry demands rapid advancements, and our data and AI/ML capabilities accelerate drug development and streamline clinical trials. We provide data-backed insights that optimize research processes, enhance market penetration, and foster innovation in drug discovery. With our expertise, we help pharmaceutical companies stay at the forefront of medical breakthroughs.",
    src: "/images/industries/pharma.webp"
  },
  "telecom": {
    title: "Telecom",
    heading: "Connecting the World with Intelligence",
    description: "In the highly competitive telecom sector, our AI-driven analytics optimize network performance, predict customer preferences, and enhance service quality. By transforming data into actionable intelligence, we enable telecom operators to deliver seamless connectivity, offer personalized services, and identify new revenue opportunities.",
    src: "/images/industries/telecom.webp"
  },
  "retail": {
    title: "Retail",
    heading: "Driving Retail Growth with Data",
    description: "The retail industry thrives on customer-centricity, and our data-driven solutions empower retailers with personalized marketing, optimized pricing, and efficient inventory management. By leveraging AI and ML, we help retailers streamline operations, enhance customer experiences, and drive loyalty through tailored offerings.",
    src: "/images/industries/retail.webp"
  },
  "industrial": {
    title: "Industrial",
    heading: "Engineering Industrial Efficiency",
    description: "The industrial landscape demands efficiency, and our intelligent data insights optimize manufacturing processes, predictive maintenance, and supply chain logistics. By embracing AI-powered automation, we enable industrial leaders to achieve higher productivity, reduce downtime, and allocate resources effectively.",
    src: "/images/industries/industrial.webp"
  },
  "travel-hospitality": {
    title: "Travel and Hospitality",
    heading: "Personalized Experiences for Travelers",
    description: "In the competitive travel and hospitality sector, we redefine guest experiences through personalized recommendations, optimized pricing strategies, and enhanced customer engagement. Our data-driven solutions enable seamless guest journeys and streamline hospitality operations, fostering customer loyalty and elevating brand reputation.",
    src: "/images/industries/travel-and-hospitality.webp"
  },
  // Add more as needed
};

export default function IndustryPage({ params }) {
  const industry = industryData[params.slug];

  if (!industry) {
    return <div>Industry not found</div>; // fallback if slug doesn't match
  }

  return (
    <>
        {/* Start main-content */}
        <section className="page-title" style={{ backgroundImage: "url(/images/background/industries.webp)" }}>
            <div className="auto-container">
                <div className="title-outer">
                    <h1 className="title">{industry.title}</h1>
                    <ul className="page-breadcrumb">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>{industry.title}</li>
                    </ul>
                </div>
            </div>
        </section>
        {/* end main-content */}

        {/* About Section */}
        <section className="about-section">
            <div className="auto-container">
                <div className="row">
                    <div className="content-column col-xl-6 col-lg-7 col-md-12 col-sm-12 order-2" data-aos="fade-right" data-aos-delay="300">
                        <div className="inner-column">
                            <div className="sec-title">
                                {/* <span className="sub-title">Get to Know</span> */}
                                <h2>{industry.heading}</h2>
                                <div className="text">
                                    {industry.description}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Image Column */}
                    <div className="image-column col-xl-6 col-lg-5 col-md-12 col-sm-12">
                        <div className="inner-column wow animate__animated animate__fadeInLeft">
                            <figure className="image-1 overlay-anim wow animate__animated animate__fadeInUp">
                                <Image src={industry.src} alt={industry.title} width={411} height={446} />
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/*Emd About Section */}
    </>
  );
}
