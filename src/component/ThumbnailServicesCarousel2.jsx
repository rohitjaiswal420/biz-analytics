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

export default function ThumbnailServicesCarousel2() {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Initialize Swiper
    swiperRef.current = new Swiper(".thumbs-slider-2", {
      slidesPerView: 4, // Show 4 thumbnails at a time
      spaceBetween: 32, // Spacing between slides
      freeMode: true, // Enable free scrolling
      grabCursor: true, // Enable mouse dragging
      navigation: false, // Show next/prev buttons
      loop: true,
      // Responsive breakpoints
      breakpoints: {
        320: {
          slidesPerView: 1, // 1 slide for mobile
          spaceBetween: 16
        },
        768: {
          slidesPerView: 3, // 3 slides for tablets
          spaceBetween: 24
        },
        1280: {
          slidesPerView: 4, // 3 slides for tablets
          spaceBetween: 32
        },
      }
    });
  }, []);

  return (
    <>
      {/* Thumbnail Slider */}
      <div className="swiper thumbs-slider-2 customSwiper">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            {/* Training Block*/}
            <div className="project-block">
                <div className="inner-box">
                    <div className="image-box">
                        <figure className="image">
                            <Link href="/industries/financial-services">
                                <Image src="/images/industries/financial-services.webp" alt="financial-services" width={411} height={446} />
                            </Link>
                        </figure>
                        <div className="info-box">
                            <Link href="/industries/financial-services" className="read-more">
                                <FontAwesomeIcon icon={faLongArrowAltRight} />
                            </Link>
                            <span className="cat">Industries</span>
                            <h6 className="title">
                                <Link href="/industries/financial-services">Financial Services</Link>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            {/* Training Block*/}
            <div className="project-block">
                <div className="inner-box">
                    <div className="image-box">
                        <figure className="image">
                            <Link href="/industries/healthcare">
                                <Image src="/images/industries/healthcare.webp" alt="healthcare" width={411} height={446} />
                            </Link>
                        </figure>
                        <div className="info-box">
                            <Link href="/industries/healthcare" className="read-more">
                                <FontAwesomeIcon icon={faLongArrowAltRight} />
                            </Link>
                            <span className="cat">Industries</span>
                            <h6 className="title">
                                <Link href="/industries/healthcare">Healthcare</Link>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            {/* Training Block*/}
            <div className="project-block">
                <div className="inner-box">
                    <div className="image-box">
                        <figure className="image">
                            <Link href="/industries/pharma">
                                <Image src="/images/industries/pharma.webp" alt="pharma" width={411} height={446} />
                            </Link>
                        </figure>
                        <div className="info-box">
                            <Link href="/industries/pharma" className="read-more">
                                <FontAwesomeIcon icon={faLongArrowAltRight} />
                            </Link>
                            <span className="cat">Industries</span>
                            <h6 className="title">
                                <Link href="/industries/pharma">Pharma</Link>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            {/* Training Block*/}
            <div className="project-block">
                <div className="inner-box">
                    <div className="image-box">
                        <figure className="image">
                            <Link href="/industries/telecom">
                                <Image src="/images/industries/telecom.webp" alt="telecom" width={411} height={446} />
                            </Link>
                        </figure>
                        <div className="info-box">
                            <Link href="/industries/telecom" className="read-more">
                                <FontAwesomeIcon icon={faLongArrowAltRight} />
                            </Link>
                            <span className="cat">Industries</span>
                            <h6 className="title">
                                <Link href="/industries/telecom">Telecom</Link>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            {/* Training Block*/}
            <div className="project-block">
                <div className="inner-box">
                    <div className="image-box">
                        <figure className="image">
                            <Link href="/industries/retail">
                                <Image src="/images/industries/retail.webp" alt="retail" width={411} height={446} />
                            </Link>
                        </figure>
                        <div className="info-box">
                            <Link href="/industries/retail" className="read-more">
                                <FontAwesomeIcon icon={faLongArrowAltRight} />
                            </Link>
                            <span className="cat">Industries</span>
                            <h6 className="title">
                                <Link href="/industries/retail">Retail</Link>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            {/* Training Block*/}
            <div className="project-block">
                <div className="inner-box">
                    <div className="image-box">
                        <figure className="image">
                            <Link href="/industries/industrial">
                                <Image src="/images/industries/industrial.webp" alt="industrial" width={411} height={446} />
                            </Link>
                        </figure>
                        <div className="info-box">
                            <Link href="/industries/industrial" className="read-more">
                                <FontAwesomeIcon icon={faLongArrowAltRight} />
                            </Link>
                            <span className="cat">Industries</span>
                            <h6 className="title">
                                <Link href="/industries/industrial">Industrial</Link>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            {/* Training Block*/}
            <div className="project-block">
                <div className="inner-box">
                    <div className="image-box">
                        <figure className="image">
                            <Link href="/industries/travel-hospitality">
                                <Image src="/images/industries/travel-and-hospitality.webp" alt="travel-and-hospitality" width={411} height={446} />
                            </Link>
                        </figure>
                        <div className="info-box">
                            <Link href="/industries/travel-hospitality" className="read-more">
                                <FontAwesomeIcon icon={faLongArrowAltRight} />
                            </Link>
                            <span className="cat">Industries</span>
                            <h6 className="title">
                                <Link href="/industries/travel-hospitality">Travel and Hospitality</Link>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
