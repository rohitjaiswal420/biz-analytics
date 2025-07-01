import { faFacebookSquare, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faEnvelopeOpen, faPaperPlane, faPhoneSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useState } from 'react';
export default function Footer() {

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [validation, setValidation] = useState({ email: -1 })
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const submitForm = async (e) => {

        e.preventDefault();
        let valid = true;
        const email = e.target.email.value.trim();

        if (!validateEmail(email)) {
            valid = false;
        }

        if (valid) {

            setValidation({ email: 1 })
            setLoading(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/createNewsletter`, { method: "POST", body: JSON.stringify({ email }), headers: { 'Content-Type': 'application/json' } });
            const res = await response.json();
            setLoading(false)
            setMessage(res.message);
            e.target.email.value=""
            setTimeout(() => {
                setMessage("");
            }, 3000);
        }
        else {
            setValidation({ email: 0 })
        }


    }


    return (
        <>
            {/* Call To Action */}
            <section className="call-to-action">
                <div className="bg" />
                <div className="auto-container">
                    <div className="outer-box wow fadeIn">
                        <div className="title-box">
                            <h2 className="title">
                                Looking for the best web design <br />
                                solutions?
                            </h2>
                        </div>
                        <div className="btn-box">
                            <Link href="/contact-us" className="theme-btn btn-style-one light">
                                <span className="btn-title">Contact Us</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/*End Call To Action */}
            {/* Main Footer */}
            <footer className="main-footer">
                <div className="bg" />
                <div className="auto-container">
                    <div className="subscribe-form">
                        <div className="title-column">
                            <h5 className="title">
                                <span className='icon'>
                                    <FontAwesomeIcon icon={faEnvelopeOpen} />
                                </span>
                                Subscribe now to get
                                <br />
                                latest updates
                            </h5>
                        </div>
                        <div className="form-column">
                            <form onSubmit={submitForm}>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        className="email"
                                        defaultValue=""
                                        placeholder="Email Address"
                                        required
                                        style={{ border: validation.email === 0 && '1px solid red' }}
                                    />

                                    {loading ? <div style={{ display: 'flex', justifyContent: 'center' }}><div className="spinner-border text-success" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div> </div> : <button type="submit" className="theme-btn" ><FontAwesomeIcon icon={faPaperPlane} /></button>}

                                    

                                </div>
                                {message !== "" && <div style={{ color: message !== "successfully sent!" ? 'red' : 'white', textAlign: 'center', marginTop: '7px' }}>{message}</div>}
                            </form>
                        </div>
                    </div>
                </div>
                {/*Widgets Section*/}
                <div className="widgets-section">
                    <div className="auto-container">
                        <div className="row">
                            {/*Footer Column*/}
                            <div className="footer-column col-lg-5 col-md-4 col-12">
                                <div className="footer-widget about-widget">
                                    <div className="logo">
                                        <Link href="/">
                                            <Image src="/images/logo.png" alt="Logo" width={230} height={43} />
                                        </Link>
                                    </div>
                                    <div className="text">
                                        Lorem ipsum dolor sit amet, consect etur adi pisicing elit sed do eiusmod tempor incididunt ut labore.
                                    </div>
                                    <ul className="social-icon-two">
                                        <li>
                                            <a href="#">
                                                <FontAwesomeIcon icon={faTwitter} />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <FontAwesomeIcon icon={faFacebookSquare} />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <FontAwesomeIcon icon={faInstagram} />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/*Footer Column*/}
                            <div className="footer-column col-lg-3 col-md-4 col-12">
                                <div className="footer-widget links-widget">
                                    <h6 className="widget-title">Explore</h6>
                                    <ul className="user-links">
                                        <li>
                                            <Link href="/about-us">
                                                About Us
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/career">
                                                Career
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/contact-us">
                                                Contact Us
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/privacy-policy">
                                                Privacy Policy
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/terms-condition">
                                                Terms & Condition
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/*Footer Column*/}
                            {/* <div className="footer-column col-xl-3 col-lg-4 col-md-4 col-sm-8">
                                <div className="footer-widget gallery-widget">
                                    <h6 className="widget-title">Portfolio</h6>
                                    <div className="widget-content">
                                        <div className="outer clearfix">
                                            <figure className="image">
                                                <a href="#">
                                                    <img src="images/resource/project-thumb-1.jpg" alt="" />
                                                </a>
                                            </figure>
                                            <figure className="image">
                                                <a href="#">
                                                    <img src="images/resource/project-thumb-2.jpg" alt="" />
                                                </a>
                                            </figure>
                                            <figure className="image">
                                                <a href="#">
                                                    <img src="images/resource/project-thumb-3.jpg" alt="" />
                                                </a>
                                            </figure>
                                            <figure className="image">
                                                <a href="#">
                                                    <img src="images/resource/project-thumb-4.jpg" alt="" />
                                                </a>
                                            </figure>
                                            <figure className="image">
                                                <a href="#">
                                                    <img src="images/resource/project-thumb-5.jpg" alt="" />
                                                </a>
                                            </figure>
                                            <figure className="image">
                                                <a href="#">
                                                    <img src="images/resource/project-thumb-6.jpg" alt="" />
                                                </a>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/*Footer Column*/}
                            <div className="footer-column col-lg-4 col-md-4 col-12">
                                <div className="footer-widget contacts-widget">
                                    <h6 className="widget-title">Contact</h6>
                                    <div className="text">
                                        70,Edgewood Ln, Glastonbury, CT 06033, United States of America
                                    </div>
                                    <ul className="contact-info">
                                        <li>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                            <a href="mailto:needhelp@potisen.com">biz@bizanalyticsystems.com</a>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faPhoneSquare} />
                                            <a href="tel:+1-201-681-3725">+1-201-681-3725</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Footer Bottom*/}
                <div className="footer-bottom">
                    <div className="auto-container">
                        <div className="inner-container">
                            <div className="copyright-text">
                                ©  2025 Biz Analytics, All rights reserved. | Powered by  <a href="https://www.expertcodelab.com/" target="_blank">Expert code lab (p). ltd</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/*End Main Footer */}
        </>
    );
}