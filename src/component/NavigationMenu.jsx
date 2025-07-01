"use client"; 
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; 

const NavigationMenu = ({toggleMenu,Details,pagelist}) => {
  const menuRef = useRef(null);
  const pathname = usePathname(); 
  const [activePath, setActivePath] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const router = useRouter();


  
  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const [menuItems] = useState([
    { mainTitle: "Home", url: "/" },
    { mainTitle: "About Us", url: "/about-us" },
    { mainTitle: "Services", url: "#", dropdown: true, submenu: pagelist[0][0].menu},
    { mainTitle: "Industries", url: "#", dropdown: true, submenu: [
        { mainTitle: "Financial Services", url: "/industries/financial-services" },
        { mainTitle: "Healthcare", url: "/industries/healthcare" },
        { mainTitle: "Pharma", url: "/industries/pharma" },
        { mainTitle: "Telecom", url: "/industries/telecom" },
        { mainTitle: "Retail", url: "/industries/retail" },
        { mainTitle: "Industrial", url: "/industries/industrial" },
        { mainTitle: "Travel and Hospitality", url: "/industries/travel-hospitality" },
    ]},
    { mainTitle: "Portfolio", url: "/portfolio" },
    { mainTitle: "Career",url: "/career" },
    { mainTitle: "Blog",url: "/blog" },
    { mainTitle: "Contact Us", url: "/contact-us" }
  ]);

  // Function to check if the item is active
  const isActive = (href) => {
    return activePath.replace(/\/$/, "") === href.replace(/\/$/, "") ? "current" : "";
  };

  // Dropdown toggle only for mobile
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth > 768) return;

    const menuContainer = menuRef.current;
    if (!menuContainer) return;

    const handleClick = (event) => {
      const clickedElement = event.target;
      const dropdownLi = clickedElement.closest(".dropdown");

      if (dropdownLi) {
        const submenu = dropdownLi.querySelector(".submenu");
        if (submenu) {
          submenu.classList.toggle("active");
        }
      }
    };

    menuContainer.addEventListener("click", handleClick);

    return () => {
      menuContainer.removeEventListener("click", handleClick);
    };
  }, []);

  // Toggle dropdown (close others when one opens)
  const toggleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index)); // Close if same, otherwise open new
  };

  const handleLinkClick = (href) => {
    setOpenDropdown(null);
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      toggleMenu();
    }
    router.push(href);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  return (

   
    <ul className="navigation clearfix" ref={menuRef}>
      {menuItems.map((item, index) => (
        <li key={index} className={`${item.dropdown ? "dropdown" : ""} ${isActive(item.url)} ${openDropdown === index ? "open" : ""}`}>
          {item.url === "#" ? (
            <span onClick={() => toggleDropdown(index)}>{item.mainTitle}</span> // Prevents Link for non-navigational items
          ) : (
            <span role="link" className="cursorPointer" tabIndex={0} onClick={() => handleLinkClick(item.url)}>{item.mainTitle}</span>
          )}
          {item.submenu && (
            <ul className={`submenu ${openDropdown === index ? "active" : ""}`}>
              {item.submenu.map((subItem, subIndex) => (

                <li key={subIndex} className={isActive(subItem.url)} onClick={() => toggleDropdown(index)}>
                  <Link href={subItem.url}
                    onClick={() => {
                      if (typeof window !== "undefined" && window.innerWidth < 992) {
                        toggleMenu();
                      }
                    }}
                  >{subItem.mainTitle}</Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavigationMenu;



// [
//       { name: "Enterprise Architecture", href: "/services/enterprise-architecture" },
//       { name: "Datawarehouse Modernization", href: "/services/datawarehouse-modernization" },
//       { name: "Data Engineering", href: "/services/data-engineering" },
//       { name: "AI/ML", href: "/services/ai-ml" },
//       { name: "Cybersecurity", href: "/services/cybersecurity" },
//       { name: "Cloud Transformation", href: "/services/cloud-transformation" },
//       { name: "DevOps", href: "/services/devops" },
//       { name: "CRM", href: "/services/crm" },
//       { name: "Adoption Management", href: "/services/adoption-management" },
//       { name: "IoT", href: "/services/iot" },
//       { name: "API Management", href: "/services/api-management" },
//       { name: "Testing", href: "/services/testing" },
//     ]
