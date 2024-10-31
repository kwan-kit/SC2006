import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./scrollProgressBar.css";

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollProgress = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    setScrollProgress(scrollPercentage);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScrollProgress);
    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  return (
    <motion.div
      className="scroll-progress-bar"
      initial={{ width: 0 }}
      animate={{ width: `${scrollProgress}%` }}
      transition={{ ease: "linear" }}
    />
  );
}
