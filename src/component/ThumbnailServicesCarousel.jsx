"use client";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

export default function ThumbnailServicesCarousel() {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Initialize Swiper
    swiperRef.current = new Swiper(".thumbs-slider", {
      slidesPerView: 3, // Show 4 thumbnails at a time
      spaceBetween: 16, // Spacing between slides
      freeMode: true, // Enable free scrolling
      grabCursor: true, // Enable mouse dragging
      navigation: false, // Show next/prev buttons
      loop: true,
      // Responsive breakpoints
      breakpoints: {
        320: {
          slidesPerView: 1, // 1 slide for mobile
          spaceBetween: 10
        },
        768: {
          slidesPerView: 3, // 3 slides for tablets
          spaceBetween: 8
        },
        1280: {
          slidesPerView: 3, // 3 slides for tablets
          spaceBetween: 16
        },
      }
    });
  }, []);

  return (
    <>
      {/* Thumbnail Slider */}
      <div className="swiper thumbs-slider customSwiper">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="service-block wow fadeInUp">
                <div className="inner-box">
                    <div className="icon-box">
                      <Image src="/images/services/fractional-cto-services.svg" alt="Fractional CTO Services" width={72} height={98} />
                    </div>
                    <h5 className="title"><Link href="/services/devops">Fractional CTO Services</Link></h5>
                    <div className="text">Drive technological innovation and strategic growth with our Fractional CTO services.</div>
                    <Link href="/services/devops" className="read-more">
                      <span className="icon">
                        <FontAwesomeIcon icon={faLongArrowAltRight} />
                      </span>
                      Read more
                    </Link>
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="service-block wow fadeInUp">
                <div className="inner-box">
                    <div className="icon-box">
                    <Image src="/images/services/enterprise-architecture-consulting.svg" alt="Enterprise Architecture Consulting" width={72} height={98} />
                    </div>
                    <h5 className="title"><Link href="/services/enterprise-architecture">Enterprise Architecture Consulting</Link></h5>
                    <div className="text">Transform your business with our enterprise architecture consulting services.</div>
                    <Link href="/services/enterprise-architecture" className="read-more">
                      <span className="icon">
                        <FontAwesomeIcon icon={faLongArrowAltRight} />
                      </span>
                      Read more
                    </Link>
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="service-block wow fadeInUp">
                <div className="inner-box">
                    <div className="icon-box">
                    <Image src="/images/services/iot-solutions-services.svg" alt="IoT Solutions & Services" width={72} height={98} />
                    </div>
                    <h5 className="title"><Link href="/services/iot">IoT Solutions & Services</Link></h5>
                    <div className="text">Harness the power of connected devices with our comprehensive IoT solutions.</div>
                    <Link href="/services/iot" className="read-more">
                      <span className="icon">
                        <FontAwesomeIcon icon={faLongArrowAltRight} />
                      </span>
                      Read more
                    </Link>
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="service-block wow fadeInUp">
                <div className="inner-box">
                    <div className="icon-box">
                    <Image src="/images/services/api-management.svg" alt="API Management" width={72} height={98} />
                    </div>
                    <h5 className="title"><Link href="/services/api-management">API Management</Link></h5>
                    <div className="text">Enable seamless digital experiences with our API management services.</div>
                    <Link href="/services/api-management" className="read-more">
                      <span className="icon">
                        <FontAwesomeIcon icon={faLongArrowAltRight} />
                      </span>
                      Read more
                    </Link>
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="service-block wow fadeInUp">
                <div className="inner-box">
                    <div className="icon-box">
                    <Image src="/images/services/data-engineering-infrastructure.svg" alt="Data Engineering & Infrastructure" width={72} height={98} />  
                    </div>
                    <h5 className="title"><Link href="/services/data-engineering">Data Engineering & Infrastructure</Link></h5>
                    <div className="text">Unlock the full potential of your data with our comprehensive data engineering services.</div>
                    <Link href="/services/data-engineering" className="read-more">
                      <span className="icon">
                        <FontAwesomeIcon icon={faLongArrowAltRight} />
                      </span>
                      Read more
                    </Link>
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="service-block wow fadeInUp">
                <div className="inner-box">
                    <div className="icon-box">
                      <Image src="/images/services/advanced-analytics.svg" alt="Advanced Analytics" width={72} height={98} />
                    </div>
                    <h5 className="title"><Link href="/services/cloud-transformation">Advanced Analytics</Link></h5>
                    <div className="text">Transform raw data into actionable insights with our advanced analytics solutions.</div>
                    <Link href="/services/cloud-transformation" className="read-more">
                      <span className="icon">
                        <FontAwesomeIcon icon={faLongArrowAltRight} />
                      </span>
                      Read more
                    </Link>
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="service-block wow fadeInUp">
                <div className="inner-box">
                    <div className="icon-box">
                      <Image src="/images/services/ai-genai-agentic-ai.svg" alt="AI/GenAI/Agentic AI" width={72} height={98} />
                    </div>
                    <h5 className="title"><Link href="/services/ai-ml">AI/GenAI/Agentic AI</Link></h5>
                    <div className="text">Navigate the future of artificial intelligence with our cutting-edge AI consulting services.</div>
                    <Link href="/services/ai-ml" className="read-more">
                      <span className="icon">
                        <FontAwesomeIcon icon={faLongArrowAltRight} />
                      </span>
                      Read more
                    </Link>
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="service-block wow fadeInUp">
                <div className="inner-box">
                    <div className="icon-box">
                      <Image src="/images/services/salesforce-solutions.svg" alt="Salesforce Solutions" width={72} height={98} />
                    </div>
                    <h5 className="title"><Link href="/services/crm">Salesforce Solutions</Link></h5>
                    <div className="text">Maximize your CRM investment with our comprehensive Salesforce consulting services.</div>
                    <Link href="/services/crm" className="read-more">
                      <span className="icon">
                        <FontAwesomeIcon icon={faLongArrowAltRight} />
                      </span>
                      Read more
                    </Link>
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="service-block wow fadeInUp">
                <div className="inner-box">
                    <div className="icon-box">
                      <Image src="/images/services/adoption-management.svg" alt="Adoption Management" width={72} height={98} />
                    </div>
                    <h5 className="title"><Link href="/services/adoption-management">Adoption Management</Link></h5>
                    <div className="text">Ensure successful technology implementation with our adoption management services.</div>
                    <Link href="/services/adoption-management" className="read-more">
                      <span className="icon">
                        <FontAwesomeIcon icon={faLongArrowAltRight} />
                      </span>
                      Read more
                    </Link>
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="service-block wow fadeInUp">
                <div className="inner-box">
                    <div className="icon-box">
                      <Image src="/images/services/quality-assurance-testing.svg" alt="Quality Assurance & Testing" width={72} height={98} />
                    </div>
                    <h5 className="title"><Link href="/services/testing">Quality Assurance & Testing</Link></h5>
                    <div className="text">Ensure software reliability with our comprehensive testing services.</div>
                    <Link href="/services/testing" className="read-more">
                      <span className="icon">
                        <FontAwesomeIcon icon={faLongArrowAltRight} />
                      </span>
                      Read more
                    </Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
