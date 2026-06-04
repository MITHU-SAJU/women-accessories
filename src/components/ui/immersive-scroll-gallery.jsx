import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./immersive-scroll-gallery.css";

const DEFAULT_IMAGES = [
  {
    // Index 0: Center text card, no image needed
    src: "",
  },
  {
    // Index 1
    src: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop",
  },
  {
    // Index 2
    src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
  },
  {
    // Index 3
    src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
  },
  {
    // Index 4
    src: "https://images.unsplash.com/photo-1611085583191-a3b1a1a89c8a?q=80&w=800&auto=format&fit=crop",
  },
  {
    // Index 5
    src: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop",
  },
  {
    // Index 6
    src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
  },
];

const ImmersiveScrollGallery = ({ images = DEFAULT_IMAGES, className = "" }) => {
  const containerRef = useRef(null);

  // Scroll and transform hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scale mappings for the immersive zoom out effect
  const scaleCenter = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const opacityImage = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const opacitySection2 = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);
  const scaleSection2 = useTransform(scrollYProgress, [0.65, 0.85], [0.9, 1]);

  // Map scale animations to the respective image items
  const pictures = images.map((img, index) => {
    let scaleVal;
    if (index === 0) {
      scaleVal = scaleCenter;
    } else {
      scaleVal = [scale4, scale5, scale6, scale5, scale6, scale8, scale9][(index - 1) % 7];
    }
    return {
      ...img,
      scale: scaleVal,
    };
  });

  return (
    <div ref={containerRef} className={`isg-container-height ${className}`}>
      <div className="isg-sticky-wrapper">
        {/* Zooming Images / Cards */}
        {pictures.map((pic, index) => {
          const isCenter = index === 0;
          return (
            <motion.div
              key={index}
              style={{ scale: pic.scale, opacity: opacityImage }}
              className="isg-motion-layer"
            >
              <div className={`isg-card isg-card-pos-${index} ${isCenter ? "isg-center-text-card" : "isg-image-card"}`}>
                {isCenter ? (
                  <div className="isg-center-content">
                    <span className="isg-center-tag">Yall's Elegance</span>
                    <h2 className="isg-center-heading">Why Choose Us?</h2>
                    <div className="isg-center-decorator"></div>
                  </div>
                ) : (
                  <img
                    src={pic.src}
                    alt={`Luxury Yaal's Elegance ${index}`}
                    className="isg-card-img"
                  />
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Brand Core Values (Why Choose Us details) */}
        <motion.div
          style={{
            opacity: opacitySection2,
            scale: scaleSection2,
          }}
          className="isg-info-section"
        >
          <div className="wcu-content text-center container">
            <span className="wcu-badge mb-3">OUR CORE VALUES</span>
            <h2 className="wcu-main-title mb-5">Centuries of Artistry, Sourced Sustainably</h2>
            
            <div className="row gy-5 gx-md-5 mt-2">
              <div className="col-md-6 text-start">
                <div className="wcu-item mb-5">
                  <div className="wcu-indicator">01</div>
                  <h4 className="wcu-item-title">Est. 1924 Heritage</h4>
                  <p className="wcu-item-desc">A century of heritage techniques, passed down through master artisans, preserved in every single detail.</p>
                </div>
                
                <div className="wcu-item">
                  <div className="wcu-indicator">02</div>
                  <h4 className="wcu-item-title">Ethically Sourced Gems</h4>
                  <p className="wcu-item-desc">We use conflict-free diamonds and metals that respect our planet, our artisans, and mining communities.</p>
                </div>
              </div>

              <div className="col-md-6 text-start">
                <div className="wcu-item mb-5">
                  <div className="wcu-indicator">03</div>
                  <h4 className="wcu-item-title">Artisan Handcrafted</h4>
                  <p className="wcu-item-desc">No mass production. Every Yaal's Elegance is made-to-order by hands devoted to the preservation of classic Indian craft.</p>
                </div>
                
                <div className="wcu-item">
                  <div className="wcu-indicator">04</div>
                  <h4 className="wcu-item-title">Lifetime Guarantee</h4>
                  <p className="wcu-item-desc">Enjoy free cleaning, resizing, professional servicing, and a lifetime certificate of authenticity with every purchase.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ImmersiveScrollGallery;
