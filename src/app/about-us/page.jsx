// "use client";
// import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPhone, faUserFriends } from '@fortawesome/free-solid-svg-icons';

export default async function About() {
    let Details;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/homePage`, {
            cache: "no-store",
            method: 'GET'
        });

        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const response = await res.json();
        if (response.status) {
            Details=response.Details
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }

    return (
        <>
            {/* Start main-content */}
            <section className="page-title" style={{ backgroundImage: "url(/images/background/about-us.webp)" }}>
                <div className="auto-container">
                    <div className="title-outer">
                        <h1 className="title">About Us</h1>
                        <ul className="page-breadcrumb">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>About us</li>
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
                                    <span className="sub-title">Get to Know</span>
                                    <h2>AI Analytics Explained: How Machines Make Sense of Data</h2>
                                    <div className="text">
                                        Lorem ipsum dolor sit amet, consectetur notted adipisicing elit sed do eiusmod tempor incididunt ut labore et simply free text dolore magna aliqua lonm andhn.
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
                                    {/* <a href="tel:+1-201-681-3725" className="info-btn">
                                        <span className="icon">
                                        <FontAwesomeIcon icon={faPhone} />
                                    </span>
                                        <small>Call Anytime</small> +1-201-681-3725
                                    </a> */}
                                    <a href={`tel: ${Details.phoneNumber[0].number}`} className="info-btn">
                                        <span className="icon">
                                            <FontAwesomeIcon icon={faPhone} />
                                        </span>
                                        <small>Call Anytime</small> {Details.phoneNumber[0].number}
                                    </a>
                                    <Link href="/contact-us" className="theme-btn btn-style-one">
                                    <span className="btn-title">Explore now</span>
                                    </Link>
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
                                        <div className="text">
                                            <strong>30+</strong> Years of
                                            <br /> experience
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*Emd About Section */}

            {/* <!-- Services Section --> */}
            <section className="services-section py-0">
                <div className="auto-container">
                    <div className="sec-title text-center">
                        <span className="sub-title">Our Team</span>
                        <h2>Member's</h2>
                    </div>
                </div>
            </section>

            {/* <!-- Services Section --> */}
            <section className="services-section bg-grey">
                <div className="auto-container">
                    <div className="row">
                        <div className="col-md-4 col-12">
                            <div className="team-details__top-left">
                                <div className="team-details__top-img">
                                    {" "}
                                    <Image src="/images/team.webp" alt="Team" width={570} height={530} />
                                    <div className="team-details__big-text" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-12">
                            <div className="team-details__top-right">
                                <div className="team-details__top-content">
                                    <h3 className="team-details__top-name-1">Jyoti Kumari</h3>
                                    <p className="team-details__top-title">Visionary Founder</p>
                                    <p className="team-details__top-text-2">
                                    Introducing Jyoti, the visionary founder at the helm of Biz Analytics, driving its overarching strategy, delivery processes, and providing unwavering leadership. With a profound background in management and a distinct ability to synthesize business and technology, she offers insights that transcend boundaries. Jyoti's academic journey, encompassing an MS followed by an MBA from the USA, reflects a fusion of scholastic brilliance and pragmatic expertise, propelling Biz Analytics towards the frontiers of innovation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Services Section --> */}
            <section className="services-section">
                <div className="auto-container">
                    <div className="row">
                        <div className="col-md-4 col-12 order-md-2 order-1">
                            <div className="team-details__top-left">
                                <div className="team-details__top-img">
                                    {" "}
                                    <Image src="/images/team.webp" alt="Team" width={570} height={530} />
                                    <div className="team-details__big-text" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-12 order-md-1 order-2">
                            <div className="team-details__top-left-1">
                                <div className="team-details__top-content">
                                    <h3 className="team-details__top-name-1">Saurabh</h3>
                                    <p className="team-details__top-title">Visionary Leader</p>
                                    <p className="team-details__top-text-2">
                                    Meet Saurabh, a visionary leader with an impressive track record of over 25 years at the dynamic nexus of business and technology. Throughout his journey, he has championed transformative IT solutions across a diverse spectrum of sectors, including Investment Banking, Finance, Banking, Insurance, Healthcare, Heavy Equipment, and Charity. Saurabh's mastery in architecture seamlessly fuses business strategy with pragmatic technological solutions, leaving an indelible trail of innovation. Beyond his versatile leadership, he plays a pivotal role in steering business development and delivery across the US and Europe, fostering global growth and impact. With an MS in Computer Science, Saurabh stands resolute at the forefront of technological evolution. His profound expertise spans enterprise architecture and an array of transformative digital technologies, encompassing AI/ML, Cloud Transformation, Data Analytics, and API.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}