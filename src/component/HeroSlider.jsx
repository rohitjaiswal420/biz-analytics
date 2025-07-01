"use client";
import { useEffect } from "react";
import $ from "jquery";
import Image from "next/image";
import Link from "next/link";

export default function HeroSlider({sliderList}) {
    useEffect(() => {
      console.log(sliderList,"jjd");
        const initializeRevolution = () => {
          if (typeof window !== "undefined" && window.jQuery) {
    
            if (window.jQuery.fn?.revolution) {
              
              // Force jQuery to recognize the revolution function
              $.fn.revolution = window.jQuery.fn.revolution;
              const showArrows = sliderList.length > 1;
    
              $("#rev_slider_one").show().revolution({
                sliderType: "standard",
                jsFileLocation: "plugins/revolution/js/",
                sliderLayout: "auto",
                dottedOverlay: "on",
                delay: 10000,
                navigation: {
                  keyboardNavigation: "off",
                  keyboard_direction: "horizontal",
                  mouseScrollNavigation: "off",
                  mouseScrollReverse: "default",
                  onHoverStop: "off",
                  touch: {
                    touchenabled: "on",
                    touchOnDesktop: "off",
                    swipe_threshold: 75,
                    swipe_min_touches: 1,
                    swipe_direction: "horizontal",
                    drag_block_vertical: false,
                  },
                  arrows: {
                    style: "gyges",
                    enable: showArrows,
                    hide_onmobile: true,
                    hide_under: 600,
                    hide_onleave: true,
                    tmp: "",
                    left: {
                      h_align: "left",
                      v_align: "center",
                      h_offset: 0,
                      v_offset: 0,
                    },
                    right: {
                      h_align: "right",
                      v_align: "center",
                      h_offset: 0,
                      v_offset: 0,
                    },
                  },
                },
                responsiveLevels: [1200, 1040, 802, 480],
                visibilityLevels: [1200, 1040, 802, 480],
                gridwidth: [1200, 1040, 800, 480],
                gridheight: [870, 800, 800, 800],
                lazyType: "none",
                parallax: {
                  type: "mouse",
                  origo: "enterpoint",
                  speed: 1000,
                  levels: [1, 2, 3, 4, 5],
                },
                shadow: 0,
                spinner: "off",
                stopLoop: "off",
                stopAfterLoops: -1,
                stopAtSlide: -1,
                shuffle: "off",
                autoHeight: "off",
                hideThumbsOnMobile: "off",
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                debugMode: false,
                fallbacks: {
                  simplifyAll: "off",
                  nextSlideOnWindowFocus: "off",
                  disableFocusListener: false,
                },
              });
            } else {
              setTimeout(initializeRevolution, 500); // Retry after 500ms
            }
          }
        };
    
        initializeRevolution();
    }, []);

  return (
    <>
  {/*Main Slider*/}
  <section className="main-slider">
    <div
      className="rev_slider_wrapper fullwidthbanner-container"
      id="rev_slider_one_wrapper"
      data-source="gallery"
    >
      <div
        className="rev_slider fullwidthabanner"
        id="rev_slider_one"
        data-version="5.4.1"
      >
        <ul>
          {/* Slide 1 */}

          {sliderList.map((slider,i)=><li data-index={`rs-${i}`} data-transition="zoomout" key={slider.sliderId}>
            {/* MAIN IMAGE */}
            <Image
              src={slider.sliderImage}
              alt="ai-driven-analytics" width={1894} height={870}
              className="rev-slidebg"
            />
            <div
              className="tp-caption"
              data-paddingbottom="[15,15,15,15]"
              data-paddingleft="[15,15,15,15]"
              data-paddingright="[15,15,15,15]"
              data-paddingtop="[0,0,0,0]"
              data-responsive_offset="on"
              data-type="text"
              data-height="none"
              data-width="['750','750','750','650']"
              data-whitespace="normal"
              data-hoffset="['0','0','0','0']"
              data-voffset="['20','20','0','0']"
              data-x="['left','left','left','left']"
              data-y="['middle','middle','middle','middle']"
              data-textalign="['top','top','top','top']"
              data-frames='[{"delay":1000,"speed":1500,"frame":"0","from":"y:[-100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;","mask":"x:0px;y:0px;s:inherit;e:inherit;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"auto:auto;","ease":"Power3.easeInOut"}]'
            >
              <h3>
                {slider.sliderContent}
               
              </h3>
            </div>
            <div
              className="tp-caption"
              data-paddingbottom="[0,0,0,0]"
              data-paddingleft="[15,15,15,15]"
              data-paddingright="[15,15,15,15]"
              data-paddingtop="[0,0,0,0]"
              data-responsive_offset="on"
              data-type="text"
              data-height="none"
              data-width="['700','750','700','450']"
              data-whitespace="normal"
              data-hoffset="['0','0','0','0']"
              data-voffset="['215','215','215','215']"
              data-x="['left','left','left','left']"
              data-y="['middle','middle','middle','middle']"
              data-textalign="['top','top','top','top']"
              data-frames='[{"delay":1000,"speed":1500,"frame":"0","from":"y:[-100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;","mask":"x:0px;y:0px;s:inherit;e:inherit;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"auto:auto;","ease":"Power3.easeInOut"}]'
            >
              <Link
                href={slider.url}
                className="theme-btn btn-style-one bg-theme-color2"
              >
                <span className="btn-title">Explore now</span>
              </Link>
            </div>
          </li>)}
        
       
        </ul>
      </div>
    </div>
  </section>
  {/* End Main Slider*/}
</>


  );
}
