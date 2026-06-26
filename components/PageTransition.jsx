'use client';

import { motion } from 'framer-motion';

/**
 * PageTransition Component
 * Wraps page content to provide smooth entrance animations.
 */
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for "premium" smoothness
      }}
    >
      {children}
    </motion.div>
  );
}