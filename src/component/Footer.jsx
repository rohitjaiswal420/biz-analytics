
"use client"
import { faFacebookSquare, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faEnvelopeOpen, faPaperPlane, faPhoneSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Popup from './Popup';
import Newsletter from './Newsletter';
export default function Footer({ Details }) {


    const [popup, setPopup] = useState(false);
    const obj = {
        faFacebookSquare,
        faInstagram, faTwitter
    }

    return (
        <>
            {/* Call To Action */}
            {
                popup && <Popup popup={setPopup}/>
            }
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
                            <button className="theme-btn btn-style-one light" onClick={() => setPopup(true)}>
                                <span className="btn-title">Contact Us</span>
                            </button>
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
                        <Newsletter />
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
                                            <Image src={Details.lightLogo} alt="Logo" width={230} height={43} />
                                        </Link>
                                    </div>
                                    <div className="text">
                                        {Details.content}
                                    </div>
                                    <ul className="social-icon-two">

                                        {
                                            Details.socialMedia.map((item, i) => <li key={i}>
                                                <a href={item.url}>
                                                    <FontAwesomeIcon icon={obj[item.icon]} />
                                                </a>
                                            </li>)
                                        }
                                        {/* <li>
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
                                        </li> */}
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
                                    <div className="text" >
                                        {Details.address[0].address}
                                    </div>

                                    <ul className="contact-info">
                                        <li>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                            <a href={`mailto:${Details.email[0].email}`}>{Details.email[0].email}</a>
                                        </li>

                                        <li>
                                            <FontAwesomeIcon icon={faPhoneSquare} />
                                            <a href={`tel:${Details.phoneNumber[0].number}`}>{Details.phoneNumber[0].number}</a>
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