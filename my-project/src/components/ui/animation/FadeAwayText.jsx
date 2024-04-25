import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FadeAwayText = ({ children }) => {
  const [fadeOpacity, setFadeOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const opacity = 0.7 - currentScrollY / window.innerHeight;
      setFadeOpacity(opacity < 0 ? 0 : opacity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <motion.div
        style={{ opacity: fadeOpacity }}
        initial={{ opacity: 1 }}
        animate={{ opacity: fadeOpacity }}
        transition={{ duration: 1 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default FadeAwayText;
