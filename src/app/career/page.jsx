"use client";
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function Career() {

    return (
        <>
            {/* Start main-content */}
            <section className="page-title" style={{ backgroundImage: "url(/images/background/career.webp)" }}>
                <div className="auto-container">
                    <div className="title-outer">
                        <h1 className="title">Career</h1>
                        <ul className="page-breadcrumb">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>Career</li>
                        </ul>
                    </div>
                </div>
            </section>
            {/* end main-content */}

            {/* <!-- career Section --> */}
            <section className="pricing-section">
                <div className="bg"></div>
                <div className="auto-container">
                    <div className="row">

                        {/* career Block */}
                        <div className="pricing-block col-lg-4 col-md-6 col-sm-12">
                            <div className="inner-box">
                                <div className="title-box">
                                    <h4 className="title">Data Analyst</h4>
                                    <div className="text">
                                        Location: US East Coast / Bangalore / Remote
                                    </div>
                                </div>
                                <Link href="/" className="theme-btn btn-style-one">
                                    <span className="btn-title">Know more</span>
                                </Link>
                            </div>
                        </div>

                        {/* career Block */}
                        <div className="pricing-block col-lg-4 col-md-6 col-sm-12">
                            <div className="inner-box">
                                <div className="title-box">
                                    <h4 className="title">Data Engineer</h4>
                                    <div className="text">
                                        Location: US East Coast / Bangalore / Remote
                                    </div>
                                </div>
                                <Link href="/" className="theme-btn btn-style-one">
                                    <span className="btn-title">Know more</span>
                                </Link>
                            </div>
                        </div>

                        {/* career Block */}
                        <div className="pricing-block col-lg-4 col-md-6 col-sm-12">
                            <div className="inner-box">
                                <div className="title-box">
                                    <h4 className="title">Information Architect</h4>
                                    <div className="text">
                                        Location: US East Coast / Bangalore / Remote
                                    </div>
                                </div>
                                <Link href="/" className="theme-btn btn-style-one">
                                    <span className="btn-title">Know more</span>
                                </Link>
                            </div>
                        </div>

                        {/* career Block */}
                        <div className="pricing-block col-lg-4 col-md-6 col-sm-12">
                            <div className="inner-box">
                                <div className="title-box">
                                    <h4 className="title">Business Intelligence Developer</h4>
                                    <div className="text">
                                        Location: US East Coast / Bangalore / Remote
                                    </div>
                                </div>
                                <Link href="/" className="theme-btn btn-style-one">
                                    <span className="btn-title">Know more</span>
                                </Link>
                            </div>
                        </div>

                        {/* career Block */}
                        <div className="pricing-block col-lg-4 col-md-6 col-sm-12">
                            <div className="inner-box">
                                <div className="title-box">
                                    <h4 className="title">Technical Project Manager - Data</h4>
                                    <div className="text">
                                        Location: US East Coast / Bangalore / Remote
                                    </div>
                                </div>
                                <Link href="/" className="theme-btn btn-style-one">
                                    <span className="btn-title">Know more</span>
                                </Link>
                            </div>
                        </div>

                    </div>

                    <div className='row'>
                        <div className='col-12'>
                            <p>
                                <strong>Note:</strong> These job descriptions are intended to provide a general overview and is subject to change based on the needs of the company and the evolving nature of the role.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}