// src/components/ServiceContent.jsx
"use client";
import { faAngleRight, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ServiceContent({ service }) {
    const sidebarRef = useRef(null);
    const pageTitleRef = useRef(null);
    const removeStickRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        let titleVisible = true;
        let removeStickVisible = false;
        let lastScrollY = window.scrollY;
    
        const updateStickyState = () => {
            const sidebarTop = sidebarRef.current?.getBoundingClientRect().top || 0;
            const scrollingDown = window.scrollY > lastScrollY;
            const reachedBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
    
            const shouldStick =
                !titleVisible &&
                !removeStickVisible &&
                !reachedBottom &&
                scrollingDown &&
                sidebarTop <= 100;
    
            setIsSticky(shouldStick);
            lastScrollY = window.scrollY;
        };
    
        const handleScroll = () => {
            updateStickyState();
        };
    
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.target === pageTitleRef.current) {
                        titleVisible = entry.isIntersecting;
                    }
                    if (entry.target === removeStickRef.current) {
                        removeStickVisible = entry.isIntersecting;
                    }
                }
                updateStickyState();
            },
            {
                threshold: 0.1,
            }
        );
    
        if (pageTitleRef.current) observer.observe(pageTitleRef.current);
        if (removeStickRef.current) observer.observe(removeStickRef.current);
        window.addEventListener("scroll", handleScroll);
    
        return () => {
            if (pageTitleRef.current) observer.unobserve(pageTitleRef.current);
            if (removeStickRef.current) observer.unobserve(removeStickRef.current);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);    

    return (
        <>
            {/* Start main-content */}
            <section ref={pageTitleRef} className="page-title" style={{ backgroundImage: "url(/images/background/services.webp)" }}>
                <div className="auto-container">
                    <div className="title-outer">
                        <h1 className="title">{service.mainTitle}</h1>
                        <ul className="page-breadcrumb">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>{service.mainTitle}</li>
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
                        <div className="col-lg-5 col-md-6 col-12">
                            <div className={`service-sidebar ${isSticky ? "stickSideBar" : ""}`} ref={sidebarRef}>
                                <div className="sidebar-widget service-sidebar-single">
                                    <div className="sidebar-service-list">
                                        <ul className="nav nav-pills flex-column" id="pills-tab" role="tablist">
                                            {service.sections.map((tab, index) => (
                                                <li className="nav-item" role="presentation" key={tab.id}>
                                                    <button
                                                        className={`nav-link ${index === 0 ? "active" : ""}`}
                                                        id={`pills-${tab.id}-tab`}
                                                        data-bs-toggle="pill"
                                                        data-bs-target={`#pills-${tab.id}`}
                                                        type="button"
                                                        role="tab"
                                                        aria-controls={`pills-${tab.id}`}
                                                        aria-selected={index === 0 ? "true" : "false"}
                                                    >
                                                        <em><FontAwesomeIcon icon={faAngleRight} /></em> <span>{tab.label}</span>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7 col-md-6 col-12">
                            <div className="services-details__content">
                                <div className="tab-content w-100" id="pills-tabContent">
                                    {service.sections.map((tab, index) => (
                                        <div
                                        key={tab.id}
                                        className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
                                        id={`pills-${tab.id}`}
                                        role="tabpanel"
                                        aria-labelledby={`pills-${tab.id}-tab`}
                                        >
                                            <figure className="image-1">
                                                <Image src={tab.sectionImage} alt={service.mainTitle} width={776} height={388} unoptimized />
                                            </figure>
                                            <ul>
                                                {/* {tab.content.map((item, idx) => ( */}
                                                    <li ><p dangerouslySetInnerHTML={{__html:tab.content}}></p></li>
                                                {/* ))} */}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*Emd About Section */}

            <section className="removeStickSideBar" ref={removeStickRef}>&nbsp;</section>
        </>
    );
}
