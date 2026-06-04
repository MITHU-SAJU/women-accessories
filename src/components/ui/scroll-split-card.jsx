import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./scroll-split-card.css";

const ScrollSplitCard = ({ containerRef, imageSrc, cards = [] }) => {
  const trackRef = useRef(null);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate dynamic translations and widths based on screen size
  let translateDistance = 180;
  let containerMaxWidth = 900;

  if (windowWidth > 1400) {
    translateDistance = 220;
    containerMaxWidth = 960;
  } else if (windowWidth > 1200) {
    translateDistance = 170;
    containerMaxWidth = 860;
  } else if (windowWidth > 992) {
    translateDistance = 130;
    containerMaxWidth = 720;
  } else if (windowWidth > 768) {
    translateDistance = 90;
    containerMaxWidth = 560;
  } else {
    translateDistance = 35;
    containerMaxWidth = 290;
  }

  // Track the scroll of the scroll-split track component
  const { scrollYProgress } = useScroll({
    target: trackRef,
    container: containerRef || undefined,
    offset: ["start start", "end end"],
  });

  // 1. Horizontal Split translations (progress: 0.0 -> 0.45)
  // Left card moves left, center card stays, right card moves right
  const xLeft = useTransform(
    scrollYProgress,
    [0, 0.45, 1.0],
    ["0px", `-${translateDistance}px`, `-${translateDistance}px`]
  );
  const xMiddle = "0px";
  const xRight = useTransform(
    scrollYProgress,
    [0, 0.45, 1.0],
    ["0px", `${translateDistance}px`, `${translateDistance}px`]
  );

  // 2. Staggered 3D Flip rotations (progress: 0.4 -> 0.85)
  // Card 1 flips first, then Card 2, then Card 3
  const rotateYLeft = useTransform(scrollYProgress, [0.38, 0.68, 1.0], [0, 180, 180]);
  const rotateYMiddle = useTransform(scrollYProgress, [0.46, 0.76, 1.0], [0, 180, 180]);
  const rotateYRight = useTransform(scrollYProgress, [0.54, 0.84, 1.0], [0, 180, 180]);

  // 3. Border radius transformations (progress: 0.0 -> 0.2)
  // As cards split, their non-rounded corners round up to 16px
  const trLeftRadius = useTransform(scrollYProgress, [0, 0.2], [0, 16]);
  const middleRadius = useTransform(scrollYProgress, [0, 0.2], [0, 16]);
  const tlRightRadius = useTransform(scrollYProgress, [0, 0.2], [0, 16]);

  // 4. Scroll down indicator opacity (progress: 0.0 -> 0.2)
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // 5. Bottom text CTA fade and slide up (progress: 0.8 -> 0.98)
  const ctaOpacity = useTransform(scrollYProgress, [0.78, 0.95], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.78, 0.95], [30, 0]);

  // Helper to render distinct inline SVG icons for each card
  const getCardIcon = (index) => {
    if (index === 0) {
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ssc-icon">
          <path d="M21 3l-6 6"></path>
          <path d="M21 3v6"></path>
          <path d="M21 3h-6"></path>
          <path d="M10.5 13.5L3 21"></path>
          <path d="M9 15l-3 3"></path>
        </svg>
      );
    }
    if (index === 1) {
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ssc-icon">
          <circle cx="12" cy="5" r="3"></circle>
          <circle cx="5" cy="19" r="3"></circle>
          <circle cx="19" cy="19" r="3"></circle>
        </svg>
      );
    }
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ssc-icon">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2l.5-.5"></path>
        <path d="M12 15l-1-1 7.5-7.5c1.41-1.41 3.09-1.41 4.5 0s1.41 3.09 0 4.5l-7.5 7.5-1-1z"></path>
      </svg>
    );
  };

  return (
    <div ref={trackRef} className="ssc-track">
      <div className="ssc-sticky">
        {/* Scroll Indicator */}
        <motion.div style={{ opacity: scrollIndicatorOpacity }} className="ssc-scroll-hint">
          <p>Scroll down</p>
          <div className="ssc-chevron-down">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </div>
        </motion.div>

        {/* Cards Outer Layout */}
        <div className="ssc-container" style={{ maxWidth: `${containerMaxWidth}px` }}>
          {cards.map((card, i) => {
            // Determine separate animation values for each card index
            let xValue, rotateYValue, borderRadiusStyle;

            if (i === 0) {
              xValue = xLeft;
              rotateYValue = rotateYLeft;
              borderRadiusStyle = {
                borderTopLeftRadius: "16px",
                borderBottomLeftRadius: "16px",
                borderTopRightRadius: trLeftRadius,
                borderBottomRightRadius: trLeftRadius,
              };
            } else if (i === 1) {
              xValue = xMiddle;
              rotateYValue = rotateYMiddle;
              borderRadiusStyle = {
                borderRadius: middleRadius,
              };
            } else {
              xValue = xRight;
              rotateYValue = rotateYRight;
              borderRadiusStyle = {
                borderTopLeftRadius: tlRightRadius,
                borderBottomLeftRadius: tlRightRadius,
                borderTopRightRadius: "16px",
                borderBottomRightRadius: "16px",
              };
            }

            return (
              <motion.div
                key={i}
                className="ssc-card-container"
                style={{
                  x: xValue,
                  rotateY: rotateYValue,
                  ...borderRadiusStyle,
                }}
              >
                {/* FRONT FACE (Image Slice) */}
                <div className="ssc-card-face ssc-card-front">
                  <div
                    className="ssc-card-image"
                    style={{
                      backgroundImage: `url(${imageSrc})`,
                      left: `${-i * 100}%`,
                    }}
                  />
                  <div className="ssc-card-overlay" />
                </div>

                {/* BACK FACE (Content Card) */}
                <div
                  className="ssc-card-face ssc-card-back"
                  style={{
                    backgroundColor: card.bgColor || "#ffffff",
                    color: card.textColor || "#111111",
                  }}
                >
                  <div className="ssc-card-content">
                    <div className="ssc-card-icon-container">
                      {getCardIcon(i)}
                    </div>
                    <h3 className="ssc-card-title">{card.title}</h3>
                    <p className="ssc-card-desc">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Text */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="ssc-cta"
        >
          <p>So cool, right?</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollSplitCard;
