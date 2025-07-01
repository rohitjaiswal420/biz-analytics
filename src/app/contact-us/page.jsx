
// import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocation, faPhone } from '@fortawesome/free-solid-svg-icons';
import Form from '@/component/Form.jsx'
export default async function Contact() {

    let Details = {};
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/details`, {
            cache: "no-store",
            method: 'GET'
        });

        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const response = await res.json();
        if (response.status) {
            Details = response.details;
        }

    } catch (error) {
        console.error("Fetch error:", error);
    }

   
   
    return (
        <>
            {/* Start main-content */}
            <section className="page-title" style={{ backgroundImage: "url(/images/background/contact-us.webp)" }}>
                <div className="auto-container">
                    <div className="title-outer">
                        <h1 className="title">Contact Us</h1>
                        <ul className="page-breadcrumb">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>Contact</li>
                        </ul>
                    </div>
                </div>
            </section>
            {/* end main-content */}

            {/*Contact Details Start*/}
            <section className="contact-details">
                <div className="container ">
                    <div className="row">
                        <div className="col-xl-5 col-lg-6 mb-md-60">
                            <div className="contact-details__right">
                                <div className="sec-title">
                                    <span className="sub-title">Need any help?</span>
                                    <h2>Get in touch with us</h2>
                                    <div className="text">
                                       {Details.content}
                                    </div>
                                </div>
                                <ul className="list-unstyled contact-details__info">
                                    <li>
                                        <div className="icon">
                                            <span>
                                                <FontAwesomeIcon icon={faPhone} />
                                            </span>
                                        </div>
                                        <div className="text">
                                            <h6>Have any question?</h6>
                                            <a href={`tel: ${Details.phoneNumber[0].number}`}>
                                                <span>Free</span>  {Details.phoneNumber[0].number}
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span>
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </span>
                                        </div>
                                        <div className="text">
                                            <h6>Write email</h6>
                                            <a href={`mailto:${Details.email[0].email}`}>{Details.email[0].email}</a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span>
                                                <FontAwesomeIcon icon={faLocation} />
                                            </span>
                                        </div>
                                        <div className="text">
                                            <h6>Visit anytime</h6>
                                            <span>{Details.address[0].address}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-6" dangerouslySetInnerHTML={{__html:Details.location}}>
                            {/* Google Map HTML Codes */}
                            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.6862217581224!2d-72.54875931493268!3d41.68411959716939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e65018014ac041%3A0xd195084bbe1e0bf2!2s70%20Edgewood%20Ln%2C%20Glastonbury%2C%20CT%2006033%2C%20USA!5e0!3m2!1sen!2sin!4v1744012007981!5m2!1sen!2sin"
                                width="100%" height={550} frameBorder={0} allowFullScreen="" /> */}
                        </div>
                    </div>
                </div>
            </section>
            {/*Contact Details End*/}

            {/*Contact Details Start*/}
            <section className="team-contact-form">
                <div className="container pb-100">
                    <div className="sec-title text-center">
                        <span className="sub-title">Contact With Us Now</span>
                        <h2 className="section-title__title">
                            Feel Free to Write Our <br /> Tecnology Experts
                        </h2>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            {/* Contact Form */}
                           
                            <Form/>
                            {/* Contact Form Validation*/}
                        </div>
                    </div>
                </div>
            </section>
            {/*Contact Details End*/}
        </>
    );
}