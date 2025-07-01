"use client";
import { faLongArrowAltRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

export default function TestimonialsSlider({ testimonialList }) {
    const swiperRef = useRef(null);

    useEffect(() => {
        // Initialize Swiper
        swiperRef.current = new Swiper(".testimonial-slider", {
            slidesPerView: 2.2, // Show 4 thumbnails at a time
            spaceBetween: 16, // Spacing between slides
            freeMode: true, // Enable free scrolling
            grabCursor: true, // Enable mouse dragging
            navigation: false, // Show next/prev buttons
            loop: true,
            breakpoints: {
                320: {
                    slidesPerView: 1, // 1 slide for mobile
                    spaceBetween: 8
                },
                768: {
                    slidesPerView: 2.5, // 3 slides for tablets
                    spaceBetween: 8
                },
                1280: {
                    slidesPerView: 2.2, // 3 slides for tablets
                    spaceBetween: 16
                },
            }
        });
    }, []);

    return (
        <>
            {/* Thumbnail Slider */}
            <div className="swiper testimonial-slider customSwiper">
                <div className="swiper-wrapper">
                   
                    {testimonialList.map((testimonials) => <div className="swiper-slide" key={testimonials.testimonialId}>
                        {/* Testimonial Block */}
                        <div className="testimonial-block">
                            <div className="inner-box">
                                <div className="image-box">
                                    <figure className="image">
                                        <Image src={testimonials.image} alt="Decorative Icon" width={98} height={98} />
                                    </figure>
                                    <div className="info-box">
                                        <h4 className="name">{testimonials.name}</h4>
                                        <span className="designation">{testimonials.url}</span>
                                    </div>
                                    <div className="rating">
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                    </div>
                                </div>
                                <div className="text">
                                   {testimonials.description}
                                </div>
                            </div>
                        </div>
                    </div>)}
                    
                </div>
            </div>
        </>
    );
}
