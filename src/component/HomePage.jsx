"use client"
import Image from "next/image";
import HeroSlider from "@/component/HeroSlider";
import CircularGraph from "@/component/CircularGraph";
import ThumbnailServicesCarousel from "@/component/ThumbnailServicesCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faLongArrowAltRight, faPhone, faUserCircle, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import BrandSliderCarousel from "../component/BrandSlider";
import TestimonialsSlider from "../component/TestimonialsSlider";
import ThumbnailServicesCarousel2 from "../component/ThumbnailServicesCarousel2";
import Form from '../component/Form.jsx'
import { useEffect ,useState} from "react";
import Popup from "./Popup";
export default function HomePage({ sliderList, blogList, testimonialList, Details }) {

    const [popup, setPopup] = useState(false);
    useEffect(() => {
       
        
        console.log(sliderList,"home page jjd");
        const subscribe = async (email) => {

            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/createNewsletter?email=${email}`, {
                method: 'GET'
            });


        }
        const query = window.location.search;
        const email = new URLSearchParams(query).get('email');
        if (email) {
            subscribe(email)
        }



    }, [])



    return (
        <>

            <HeroSlider sliderList={sliderList} />

            {
                popup && <Popup popup={setPopup} />
            }


            {/* About Section */}
            <section className="about-section">
                <div className="auto-container">
                    <div className="row">
                        <div
                            className="content-column col-xl-6 col-lg-7 col-md-12 col-sm-12 order-2"
                            data-aos="fade-right"
                            data-aos-delay="300"
                        >
                            <div className="inner-column">
                                <div className="sec-title">
                                    <span className="sub-title">Get to Know</span>
                                    <h2>AI Analytics Explained: How Machines Make Sense of Data</h2>
                                    <div className="text">
                                        Lorem ipsum dolor sit amet, consectetur notted adipisicing elit
                                        sed do eiusmod tempor incididunt ut labore et simply free text
                                        dolore magna aliqua lonm andhn.
                                    </div>
                                </div>
                                <ul className="list-style-two">
                                    <li>
                                        <FontAwesomeIcon icon={faCheckCircle} /> Understanding AI Analytics: A Game Changer for Businesses
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheckCircle} /> The Evolution of AI in Analytics: A Smarter Future
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheckCircle} /> Why AI Analytics Matters: Driving Smarter Decisions
                                    </li>
                                </ul>
                                <div className="btn-box">
                                    <a href={`tel: ${Details.phoneNumber[0].number}`} className="info-btn">
                                        <span className="icon">
                                            <FontAwesomeIcon icon={faPhone} />
                                        </span>
                                        <small>Call Anytime</small> {Details.phoneNumber[0].number}
                                    </a>
                                    <button className="theme-btn btn-style-one" onClick={()=> setPopup(true)}>
                                        <span className="btn-title">Explore now</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Image Column */}
                        <div className="image-column col-xl-6 col-lg-5 col-md-12 col-sm-12">
                            <div className="inner-column wow animate__animated animate__fadeInLeft">
                                <figure className="image-1 overlay-anim wow animate__animated animate__fadeInUp">
                                    <Image src="/images/about/about-1.webp" alt="About" width={464} height={497} />
                                </figure>
                                <figure className="image-2 overlay-anim wow animate__animated animate__fadeInRight">
                                    <Image src="/images/about/about-2.webp" alt="About" width={200} height={254} />
                                </figure>
                                <div className="experience bounce-y">
                                    <div className="inner">
                                        <span className="icon">
                                            <FontAwesomeIcon icon={faUserFriends} />
                                        </span>
                                        {/* <i className="icon flaticon-discuss" /> */}
                                        <div className="text">
                                            <strong>30+</strong> Years of <br />
                                            experience
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*Emd About Section */}


            {/* Services Section */}
            <section className="services-section pt-0">
                <div className="auto-container">
                    <div className="sec-title text-center">
                        <span className="sub-title">What We’re Offering</span>
                        <h2>
                            Services we’re offering to <br />
                            our customers
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <ThumbnailServicesCarousel />
                        </div>
                    </div>
                    <div className="bottom-box">
                        <div className="text">
                            Trust the experts for all your{" "}
                            <strong>web design &amp; development</strong> needs.
                        </div>
                        <Link href="page-services.html" className="theme-btn btn-style-one">
                            <span className="btn-title">Explore now</span>
                        </Link>
                    </div>
                </div>
            </section>
            {/* End Services Section*/}

            {/* Features Section */}
            <section className="features-section">
                <div className="bg bg-pattern-1" />
                <div className="auto-container">
                    <div className="row">
                        {/* Content Column */}
                        <div className="content-column col-xl-5 col-lg-6 col-md-12">
                            <div className="inner-column wow animate__animated animate__fadeInRight">
                                <div className="sec-title">
                                    <span className="sub-title">Welcome to AI/GenAI/Agentic AI</span>
                                    <h2>Our Capabilities</h2>
                                </div>
                                <div className="feature-block">
                                    <div className="inner-box">
                                        <div className="content">
                                            <span className="icon">
                                                <i className="fa fa-check" />
                                            </span>
                                            <h5 className="title">LLM Implementation</h5>
                                            <div className="text">
                                                Deploy and customize large language models for your specific needs
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="feature-block">
                                    <div className="inner-box">
                                        <div className="content">
                                            <span className="icon">
                                                <i className="fa fa-check" />
                                            </span>
                                            <h5 className="title">AI Strategy & Roadmap</h5>
                                            <div className="text">
                                                Develop comprehensive AI strategies aligned with business objectives
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="feature-block">
                                    <div className="inner-box">
                                        <div className="content">
                                            <span className="icon">
                                                <i className="fa fa-check" />
                                            </span>
                                            <h5 className="title">Custom AI Model Development</h5>
                                            <div className="text">
                                                Build tailored AI solutions for unique business challenges
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="feature-block">
                                    <div className="inner-box">
                                        <div className="content">
                                            <span className="icon">
                                                <i className="fa fa-check" />
                                            </span>
                                            <h5 className="title">Autonomous Agent Development</h5>
                                            <div className="text">
                                                Create intelligent agents that automate complex tasks
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="feature-block">
                                    <div className="inner-box">
                                        <div className="content">
                                            <span className="icon">
                                                <i className="fa fa-check" />
                                            </span>
                                            <h5 className="title">AI Governance & Ethics</h5>
                                            <div className="text">
                                                Implement responsible AI practices and ethical frameworks
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Content Column */}
                        <div className="image-column col-xl-7 col-lg-6 col-md-12 col-sm-12">
                            <div className="inner-column wow animate__animated animate__fadeInLeft">
                                <div className="image-box">
                                    <figure className="image">
                                        <Image src="/images/welcome-biz.webp" alt="AI/GenAI/Agentic AI" width={1032} height={669} />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Offer Section */}

            {/* Projects section two*/}
            <section className="projects-section-two p-0">
                <div
                    className="bg-image"
                    style={{ backgroundImage: "url(./images/industries/work-compeleted.webp)" }}
                />
                <div className="auto-container">
                    <div className="upper-box">
                        <div className="counter-column">
                            <div className="count-box">
                                <span className="title">Work Completed</span>
                                <div className="numbers">86900+</div>
                            </div>
                        </div>
                        <div className="text-column">
                            <div className="text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius
                                mod tempor incididunt ut labore et dolore magna aliqua.
                            </div>
                        </div>
                    </div>
                    <div className="sec-title text-center light">
                        <span className="sub-title">Recent Work</span>
                        <h2>Work showcase</h2>
                    </div>

                    <div className="carousel-outer">
                        <ThumbnailServicesCarousel2 />
                    </div>
                </div>
            </section>
            {/* End Projects Section */}

            {/* Why Choose Us */}
            <section className="why-choose-us">
                <div className="bg bg-pattern-2" />
                <div className="auto-container">
                    <div className="row">
                        <div
                            className="content-column col-xl-6 col-lg-7 col-md-12 col-sm-12 order-2 wow animate__animated animate__fadeInRight"
                            data-wow-delay="600ms"
                        >
                            <div className="inner-column">
                                <div className="sec-title">
                                    <span className="sub-title">Our Benefits</span>
                                    <h2>Data Engineering & Infrastructure</h2>
                                    <div className="text">
                                        Unlock the full potential of your data with our comprehensive data engineering services.
                                    </div>
                                </div>
                                <blockquote className="blockquote-one">
                                    We help organizations build a robust data infrastructure that scales with their needs
                                </blockquote>
                                <div className="btn-box">
                                    <Link
                                        href="/services/data-engineering"
                                        className="theme-btn btn-style-one"
                                    >
                                        <span className="btn-title">Explore now</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* Image Column */}
                        <div className="image-column col-xl-6 col-lg-5 col-md-12 col-sm-12">
                            <div className="inner-column wow animate__animated animate__fadeInLeft">
                                <div className="image-box">
                                    <span className="bg-shape" />
                                    <figure className="image-1 overlay-anim wow animate__animated animate__fadeInUp">
                                        <Image src="/images/our-benefit/benefit-1.webp" alt="Benefits" width={280} height={277} />
                                    </figure>
                                    <figure className="image-2 overlay-anim wow animate__animated animate__fadeInRight">
                                        <Image src="/images/our-benefit/benefit-2.webp" alt="Benefits" width={280} height={277} />
                                    </figure>
                                    <figure className="image-3 overlay-anim wow animate__animated animate__fadeInRight">
                                        <Image src="/images/our-benefit/benefit-3.webp" alt="Benefits" width={280} height={423} />
                                    </figure>
                                    {/* <figure className="logo">
                    <Image src="/images/our-benefit/fav-icon.png" alt="Benefits" width={370} height={296} />
                  </figure> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*Emd Why Choose Us */}

            {/* FAQ Section */}
            <section className="faqs-section">
                <div className="bg bg-pattern-4" />
                <div className="auto-container">
                    <div className="sec-title text-center">
                        <span className="sub-title">You’ve have Any Questions?</span>
                        <h2>Frequently asked questions</h2>
                    </div>
                    <div className="row">
                        <div className="faq-column col-lg-6 col-md-12 col-sm-12">
                            <div className="inner-column">
                                <div className="accordion accordion-box" id="faqAccordion">
                                    {/* Block 1 */}
                                    <div className="accordion-item block">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className="accordion-button acc-btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Interdum et malesuada fames ac ante ipsum
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body content">
                                                Suspendisse finibus urna mauris, vitae consequat quam vel.
                                            </div>
                                        </div>
                                    </div>

                                    {/* Block 2 */}
                                    <div className="accordion-item block">
                                        <h2 className="accordion-header" id="headingTwo">
                                            <button className="accordion-button acc-btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                Maecenas condimentum sollicitudin ligula
                                            </button>
                                        </h2>
                                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body content">
                                                Suspendisse finibus urna mauris, vitae consequat quam vel.
                                            </div>
                                        </div>
                                    </div>

                                    {/* Block 3 */}
                                    <div className="accordion-item block">
                                        <h2 className="accordion-header" id="headingThree">
                                            <button className="accordion-button acc-btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                Duis rhoncus orci ut metus rhoncus
                                            </button>
                                        </h2>
                                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body content">
                                                Suspendisse finibus urna mauris, vitae consequat quam vel.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Image Column */}
                        <div className="image-column col-lg-6 col-md-12 col-sm-12">
                            <div className="inner-column">
                                <div className="image-box">
                                    <figure className="image overlay-anim">
                                        <Image src="/images/faq/faq-home.webp" alt="Questions" width={348} height={413} />
                                    </figure>
                                </div>
                                <div className="graph-box">
                                    <CircularGraph value={90} label="Affordable cost" />
                                    <CircularGraph value={50} label="Quality of work" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*End FAQ Section */}


            {/* Clients Section   */}
            <section className="clients-section">
                <div className="auto-container">
                    {/* Sponsors Outer */}
                    <div className="sponsors-outer">
                        {/*clients carousel*/}
                        <BrandSliderCarousel />
                    </div>
                </div>
            </section>
            {/*End Clients Section */}

            {/* Testimonial Section */}
            <section className="testimonial-section">
                <div className="bg bg-pattern-5" />
                <div className="auto-container">
                    <div className="row">
                        <div className="title-column col-xl-5 col-lg-4 col-md-12">
                            <div className="sec-title light">
                                <span className="sub-title">Our testimonials</span>
                                <h2>What they’re talking about us</h2>
                                <div className="text">
                                    Lorem Ipsum is simply dummy text of free available in market the
                                    printing and typesetting industry.
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-column col-xl-7 col-lg-8 col-md-12">
                            <div className="carousel-outer">
                                <TestimonialsSlider testimonialList={testimonialList} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Testimonial Section */}

            {/* News Section */}
            <section className="news-section">
                <div className="bg bg-pattern-6" />
                <div className="auto-container">
                    <div className="sec-title text-center">
                        <span className="sub-title">News &amp; Articles</span>
                        <h2>Latest from the blog</h2>
                    </div>
                    <div className="row">
                        {
                            blogList.map((blog) => (
                                <div className="news-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp" key={blog.blogId}>
                                    <div className="inner-box">
                                        <div className="image-box">
                                            <figure className="image">
                                                <Link href={`/blog${blog.blogUrl}`}>
                                                    <Image src={blog.blogImage} alt={blog.blogTitle} width={374} height={299} />
                                                </Link>
                                            </figure>
                                        </div>
                                        <div className="content-box">
                                            <span className="date">{blog.publishedDate}</span>
                                            {/* <span className="post-info">
                                                <FontAwesomeIcon icon={faUserCircle} /> {blog.author}
                                            </span> */}
                                            <h5 className="title">
                                                <Link href={`/blog${blog.blogUrl}`}>
                                                    {blog.blogTitle}
                                                </Link>
                                            </h5>
                                            <div className="text">
                                                {blog.blogDescription.substring(0, 100)}...
                                            </div>
                                            <Link href={`/blog${blog.blogUrl}`} className="read-more">
                                                <FontAwesomeIcon icon={faLongArrowAltRight} /> Read More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                        <div className="col-12 text-center my-3">
                            <Link href="/blog" className="theme-btn btn-style-one">View More</Link>
                        </div>
                    </div>
                </div>
            </section>
            {/*End News Section */}


            {/* Contact Section */}
            <section className="contact-section pt-0 pb-0">
                <div className="auto-container">
                    <div className="row">
                        {/* Form Column */}
                        <div className="form-column col-lg-6 col-md-12 col-sm-12">
                            <div className="inner-column">
                                {/* Contact Form */}
                                <div className="contact-form wow animate__animated animate__fadeInLeft">
                                    <div className="sec-title">
                                        <span className="sub-title" >Contact Now</span>
                                        <h2>Get in touch with us</h2>
                                    </div>
                                    {/*Contact Form*/}
                                    <Form />
                                </div>
                                {/*End Contact Form */}
                            </div>
                        </div>
                        {/* Image Column */}
                        <div className="image-column col-lg-6 col-md-12">
                            <div className="inner-column">
                                <figure className="image">
                                    <Image src="/images/get-in-touch.webp" alt="Contact" width={862} height={631} />
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Contact Info Section */}



        </>
    )
}
