"use client";
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEnvelope, faMapMarker, faPhone, faTimes } from '@fortawesome/free-solid-svg-icons';
import NavigationMenu from './NavigationMenu';
import { faFacebook, faFacebookSquare, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import Popup from '@/component/Popup.jsx'
export default function Header({ Details,pagelist }) {


    const [popup, setPopup] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
   
    const obj = {
        faFacebookSquare,
        faInstagram, faTwitter
    }

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    }



    useEffect(() => {

        setPopup(true);


        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            // Sticky header logic
            if (scrollPosition > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        // Attach scroll event listener
        window.addEventListener("scroll", handleScroll);

        // Cleanup function
        return () => {
            window.removeEventListener("scroll", handleScroll);

        };
    }, []);

    return (
        <>
            {/* Main Header*/}
            {
                popup && <Popup popup={setPopup} />
            }
            <header className={`main-header header-style-one ${isSticky ? "fixed-header" : ""}`}>
                {/* Header Top */}

                <div className="header-top">
                    <div className="inner-container">
                        <div className="top-left">
                            {/* Info List */}
                            <ul className="list-style-one">
                                <li>
                                    <FontAwesomeIcon icon={faEnvelope} className='topBarIcon' />
                                    <a href={`mailto:${Details.email[0].email}`}>{Details.email[0].email}</a>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faMapMarker} className='topBarIcon' /> {Details.address[0].address}
                                </li>
                            </ul>
                        </div>
                        <div className="top-right">
                            <ul className="social-icon-one">
                                {
                                    Details.socialMedia.map((item, i) => <li key={i}>
                                        <a href={item.url}>
                                            <FontAwesomeIcon icon={obj[item.icon]} />
                                        </a>
                                    </li>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Header Top */}
                <div className="header-lower">
                    <div className="container-fluid">
                        {/* Main box */}
                        <div className="main-box">
                            <div className="logo-box">
                                <div className="logo">
                                    <Link href="/">
                                        <Image src={Details.lightLogo} alt="Logo" width={270} height={73} />
                                    </Link>
                                </div>
                            </div>
                            {/*Nav Box*/}
                            <div className="nav-outer">
                                <nav className="nav main-menu">
                                    <NavigationMenu toggleMenu={toggleMenu} Details={Details} pagelist={pagelist}/>
                                </nav>
                                {/* Main Menu End*/}
                            </div>
                            <div className="outer-box">
                                <a href={`tel:${Details.phoneNumber[0].number}`} className="info-btn">
                                    <span className='callIcon'>
                                        <FontAwesomeIcon icon={faPhone} size='lg' />
                                    </span>
                                    <small>Call Anytime</small>{Details.phoneNumber[0].number}
                                </a>
                                {/* Mobile Nav toggler */}
                                <div className="mobile-nav-toggler" onClick={toggleMenu}>
                                    <FontAwesomeIcon icon={faBars} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu  */}
                <div className={`mobile-menu ${isMenuVisible ? "active" : ""}`}>
                    <div className="menu-backdrop" onClick={toggleMenu} />
                    {/*Here Menu Will Come Automatically Via Javascript / Same Menu as in Header*/}
                    <nav className="menu-box">
                        <div className="upper-box">
                            <div className="nav-logo">
                                <Link href="/">
                                    <Image src={Details.lightLogo} alt="Logo" width={270} height={73} />
                                </Link>
                            </div>
                            <div className="close-btn" onClick={toggleMenu}>
                                <FontAwesomeIcon icon={faTimes} />
                            </div>
                        </div>
                        <nav className='nav main-menu'>
                            <NavigationMenu toggleMenu={toggleMenu} Details={Details} pagelist={pagelist}/>
                        </nav>
                        <ul className="contact-list-one">
                            <li>
                                {/* Contact Info Box */}
                                <div className="contact-info-box">
                                    <span className='icon'>
                                        <FontAwesomeIcon icon={faPhone} />
                                    </span>
                                    {/* <i className="icon lnr-icon-phone-handset" /> */}
                                    <span className="title">Call Now</span>
                                    <a href={`tel:${Details.phoneNumber[0].number}`}>{Details.phoneNumber[0].number}</a>
                                </div>
                            </li>
                            <li>
                                {/* Contact Info Box */}
                                <div className="contact-info-box">
                                    <span className='icon'>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                    {/* <span className="icon lnr-icon-envelope1" /> */}
                                    <span className="title">Send Email</span>
                                    <a href={`mailto:${Details.email[0].email}`}>{Details.email[0].email}</a>
                                </div>
                            </li>
                        </ul>
                        <ul className="social-links">
                            {
                                Details.socialMedia.map((item, i) => <li key={i}>
                                    <a href={item.url}>
                                        <FontAwesomeIcon icon={obj[item.icon]} />
                                    </a>
                                </li>)
                            }
                        </ul>
                    </nav>
                </div>
                {/* End Mobile Menu */}

                {/* Sticky Header  */}
                <div className={`sticky-header animate__animated ${isSticky ? "fixed-header animate__slideInDown" : ""}`}>
                    <div className="auto-container">
                        <div className="inner-container">
                            {/*Logo*/}
                            <div className="logo">
                                <Link href="/">
                                    <Image src={Details.darkLogo} alt="Logo" width={270} height={73} />
                                </Link>
                            </div>
                            {/*Right Col*/}
                            <div className="nav-outer">
                                {/* Main Menu */}
                                <nav className="main-menu">
                                    <div className="navbar-collapse show collapse clearfix">
                                        <NavigationMenu toggleMenu={toggleMenu} Details={Details} pagelist={pagelist}/>
                                    </div>
                                </nav>
                                {/* Main Menu End*/}
                                {/*Mobile Navigation Toggler*/}
                                <div className="mobile-nav-toggler" onClick={toggleMenu}>
                                    <FontAwesomeIcon icon={faBars} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Sticky Menu */}
            </header>
            {/*End Main Header */}
        </>
    );
}