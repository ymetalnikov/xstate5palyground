import React, { useRef, useEffect } from "react";
import styles from "./styles.module.css";

export const Scroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    const thumb = thumbRef.current;

    const updateScrollbar = () => {
      const containerHeight = container!.clientHeight;
      const contentHeight = content!.scrollHeight;
    
      const scrollRatio = containerHeight / contentHeight;
      thumb!.style.height = `${scrollRatio * 100 * 0.90}%`;
    
      const scrollTop = content!.scrollTop;
      const thumbPosition = (scrollTop / contentHeight) * containerHeight * 0.9 + (containerHeight * 0.05);
    
      thumb!.style.top = `${thumbPosition}px`;
    };

    content!.addEventListener("scroll", updateScrollbar);
    updateScrollbar();

    return () => content!.removeEventListener("scroll", updateScrollbar);
  }, []);

  return (
    <div className={styles.scrollContainer} ref={containerRef}>
      <div className={styles.scrollContent} ref={contentRef}>
        <div>
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
          Some
          <br />
        </div>
      </div>
      <div className={styles.customScrollbar}>
        <div className={styles.customScrollbarThumb} ref={thumbRef}></div>
      </div>
    </div>
  );
};
