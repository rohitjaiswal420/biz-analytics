'use client';

import { useEffect, useRef, useState } from 'react';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';
import Link from 'next/link';
import Image from 'next/image';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Fancybox } from "@fancyapps/ui";

const PortfolioSection = ({ imageList }) => {
  const gridRef = useRef(null);
  const isotopeInstance = useRef(null);
  const [filterKey, setFilterKey] = useState(`.${imageList[0].categoryId}`);
  const [portfolioData, setPortfoliodata] = useState(imageList[0]);

 
  useEffect(() => {
    if (gridRef.current) {
      // Wait until images are fully loaded
      imagesLoaded(gridRef.current, () => {
        isotopeInstance.current = new Isotope(gridRef.current.querySelector('.isotope-container'), {
          itemSelector: '.product-block',
          layoutMode: 'masonry',
        });
      });
    }

    return () => {
      if (isotopeInstance.current) {
        isotopeInstance.current.destroy();
      }
    };
  }, []);

  const ran=()=>{
    return String(Math.random()*10+1000);
  }


  const handleFilterClick = (filter,id) => {
    setFilterKey(`.${filter}`);
    console.log(imageList.filter((item) => item.categoryId === id))
    const data=imageList.filter((item) => item.categoryId === id)
    console.log(data[0],"jhsh");
    
    setPortfoliodata(data[0]);

  };

  const handleImageClick = async (clientId) => {
    
   
    let images =[]
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/imageClient/getClientimage`, {
  
      method: 'POST',
      body:JSON.stringify({clientId})
    })

    const res = await response.json();

    if (res.status) {
      images = res.imagelist;
    }
  
    Fancybox.show(
       images.map((src) => ({
        src:src.imageUrl,
        type: "image",
      }))
    );
  };

  return (
    <div className="isotope-layout">
      {/* Filters */}
      <div className="filters clearfix">
        <ul className="filter-tabs filter-btns clearfix isotope-filters">
         
          {imageList.map((item, i) => (
            <li
              key={item.categoryId}
              className={`filter ${filterKey === `.${item.categoryId}` ? 'active' : ''}`}
              onClick={() => handleFilterClick(item.categoryId,item.categoryId)}
              style={{ cursor: 'pointer' }}
            >
              {item.categoryName}
            </li>
          ))}
        </ul>
      </div>

      {/* Grid */}
      <div ref={gridRef}>
        <div className="filter-list row isotope-container">
         

          {portfolioData.client.map((item, idx) => (
            <div
              key={item.clientId}
             
              className={`product-block  col-lg-3 col-md-6 col-sm-12`}
            >
              <div className="inner-box">
                <div className="image">
                  <figure onClick={() => handleImageClick(item.clientId)} style={{ cursor: 'pointer' }}>
                    <Image
                      src={item.thumbnailImage}
                      width={600}
                      height={600}
                      alt={item.altTag}
                      unoptimized
                    />
                  </figure>
                </div>
                <h3>{item.clientName}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioSection;
