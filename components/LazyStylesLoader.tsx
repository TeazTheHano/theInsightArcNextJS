'use client';

import { useEffect } from 'react';

export const LazyStylesLoader = () => {
  useEffect(() => {
    // Lazy load non-critical styles
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/styles/index.scss';
    document.head.appendChild(link);
  }, []);

  return null; // This component doesn't render anything
};
