"use client";
import { useState, useEffect } from "react";
import {usePathname} from 'next/navigation'
const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const router=usePathname();
 
   
   useEffect(() => {
    // Simulate window load event
    
    setLoading(true)
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 500); // 500ms fade-out delay
    };

  

    if (document.readyState === "complete") {
      handleLoad(); // If already loaded, execute immediately
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, [router]);

  
  
  
  return (
    loading && (
        <div className="preloader"></div>
    )
  );
};

export default Preloader;


{/* <nav class="nav main-menu"><ul class="navigation clearfix"><li class="  "><span role="link" class="cursorPointer" tabindex="0">Home</span></li><li class="  "><span role="link" class="cursorPointer" tabindex="0">About Us</span></li><li class="dropdown  "><span>Services</span><ul class="submenu "><li class=""><a href="/services/enterprise-architecture">Enterprise Architecture</a></li><li class=""><a href="/services/datawarehouse-modernization">Datawarehouse Modernization</a></li><li class=""><a href="/services/data-engineering">Data Engineering</a></li><li class=""><a href="/services/ai-ml">AI/ML</a></li><li class=""><a href="/services/cybersecurity">Cybersecurity</a></li><li class=""><a href="/services/cloud-transformation">Cloud Transformation</a></li><li class=""><a href="/services/devops">DevOps</a></li><li class=""><a href="/services/crm">CRM</a></li><li class=""><a href="/services/adoption-management">Adoption Management</a></li><li class=""><a href="/services/iot">IoT</a></li><li class=""><a href="/services/api-management">API Management</a></li><li class=""><a href="/services/testing">Testing</a></li></ul></li><li class="dropdown  "><span>Industries</span><ul class="submenu "><li class=""><a href="/industries/financial-services">Financial Services</a></li><li class=""><a href="/industries/healthcare">Healthcare</a></li><li class=""><a href="/industries/pharma">Pharma</a></li><li class=""><a href="/industries/telecom">Telecom</a></li><li class=""><a href="/industries/retail">Retail</a></li><li class=""><a href="/industries/industrial">Industrial</a></li><li class=""><a href="/industries/travel-hospitality">Travel and Hospitality</a></li></ul></li><li class="  "><span role="link" class="cursorPointer" tabindex="0">Portfolio</span></li><li class=" current "><span role="link" class="cursorPointer" tabindex="0">Career</span></li><li class="  "><span role="link" class="cursorPointer" tabindex="0">Blog</span></li><li class="  "><span role="link" class="cursorPointer" tabindex="0">Contact Us</span></li></ul></nav> */}
