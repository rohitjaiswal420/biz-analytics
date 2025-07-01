"use client"; // Ensures this runs only on the client-side

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const AosClient = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once
      easing: "ease-in-out", // Easing function
      offset: 100, // Offset (in pixels) from the top before animation starts
    });
  }, []);

  return null; // This component doesn't render anything, it just initializes AOS
};

export default AosClient;
