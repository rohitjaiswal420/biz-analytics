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

export default function BrandSliderCarousel() {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Initialize Swiper
    swiperRef.current = new Swiper(".clients-slider", {
      slidesPerView: 5, // Show 4 thumbnails at a time
      spaceBetween: 16, // Spacing between slides
      freeMode: true, // Enable free scrolling
      grabCursor: true, // Enable mouse dragging
      navigation: false, // Show next/prev buttons
      loop: true,
      // Responsive breakpoints
      breakpoints: {
        320: {
          slidesPerView: 1, // 1 slide for mobile
          spaceBetween: 8
        },
        480: {
          slidesPerView: 2, // 2 slides for small devices
          spaceBetween: 8
        },
        768: {
          slidesPerView: 3, // 3 slides for tablets
          spaceBetween: 16
        },
        1024: {
          slidesPerView: 4, // 4 slides for medium screens
          spaceBetween: 16
        },
        1280: {
          slidesPerView: 5, // 5 slides for larger screens
          spaceBetween: 16
        }
      }
    });
  }, []);

  return (
    <>
      {/* Thumbnail Slider */}
      <div className="swiper clients-slider customSwiper">
        <div className="swiper-wrapper">
            <div className="swiper-slide">
                <span className="slide-item w-100 d-block">
                    <figure className="m-0">
                        <Image className="img-fluid w-50" src="/images/resource/client.png" alt="Decorative Icon" width={130} height={30} />
                    </figure>
                </span>
            </div>
            <div className="swiper-slide">
                <span className="slide-item w-100 d-block">
                    <figure className="m-0">
                        <Image className="img-fluid w-50" src="/images/resource/client.png" alt="Decorative Icon" width={130} height={30} />
                    </figure>
                </span>
            </div>
            <div className="swiper-slide">
                <span className="slide-item w-100 d-block">
                    <figure className="m-0">
                        <Image className="img-fluid w-50" src="/images/resource/client.png" alt="Decorative Icon" width={130} height={30} />
                    </figure>
                </span>
            </div>
            <div className="swiper-slide">
                <span className="slide-item w-100 d-block">
                    <figure className="m-0">
                        <Image className="img-fluid w-50" src="/images/resource/client.png" alt="Decorative Icon" width={130} height={30} />
                    </figure>
                </span>
            </div>
            <div className="swiper-slide">
                <span className="slide-item w-100 d-block">
                    <figure className="m-0">
                        <Image className="img-fluid w-50" src="/images/resource/client.png" alt="Decorative Icon" width={130} height={30} />
                    </figure>
                </span>
            </div>
            <div className="swiper-slide">
                <span className="slide-item w-100 d-block">
                    <figure className="m-0">
                        <Image className="img-fluid w-50" src="/images/resource/client.png" alt="Decorative Icon" width={130} height={30} />
                    </figure>
                </span>
            </div>
            <div className="swiper-slide">
                <span className="slide-item w-100 d-block">
                    <figure className="m-0">
                        <Image className="img-fluid w-50" src="/images/resource/client.png" alt="Decorative Icon" width={130} height={30} />
                    </figure>
                </span>
            </div>
            <div className="swiper-slide">
                <span className="slide-item w-100 d-block">
                    <figure className="m-0">
                        <Image className="img-fluid w-50" src="/images/resource/client.png" alt="Decorative Icon" width={130} height={30} />
                    </figure>
                </span>
            </div>
            <div className="swiper-slide">
                <span className="slide-item w-100 d-block">
                    <figure className="m-0">
                        <Image className="img-fluid w-50" src="/images/resource/client.png" alt="Decorative Icon" width={130} height={30} />
                    </figure>
                </span>
            </div>
        </div>
      </div>
    </>
  );
}
