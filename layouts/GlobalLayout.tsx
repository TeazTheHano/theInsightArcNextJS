import React, { useEffect, useState } from 'react'
import { useTheme } from '../hooks/useTheme';
import NavigationUnit from '../components/NavigationUnit/NavigationUnit';
import Footer from '../components/HeaderAndFooter/Footer';
import Divider from '../components/Divider/Divider';
import CircleFollowMouse from '../components/CircleFollowMouse/CircleFollowMouse';

import styles from './GlobalLayout.module.css'

export default function GlobalLayout({ children }: { children: React.ReactNode }) {

  const { resolvedTheme } = useTheme(); // Lấy theme và setTheme từ Context

  const [sizeAndSpacing, setSizeAndSpacing] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');

  // Apply size and spacing class to body
  useEffect(() => {
    function updateSizeAndSpacing() {
      if (window.innerWidth < 768) {
        setSizeAndSpacing('sm');
      } else if (window.innerWidth < 1024) {
        setSizeAndSpacing('md');
      } else if (window.innerWidth < 1440) {
        setSizeAndSpacing('lg');
      } else {
        setSizeAndSpacing('xl');
      }
    }

    updateSizeAndSpacing();
    window.addEventListener('resize', updateSizeAndSpacing);
    return () => window.removeEventListener('resize', updateSizeAndSpacing);
  }, []);

  useEffect(() => {
    document.body.classList.remove('size-and-spacing-sm', 'size-and-spacing-md', 'size-and-spacing-lg', 'size-and-spacing-xl');
    document.body.classList.add(`size-and-spacing-${sizeAndSpacing}`);
    localStorage.setItem('size-and-spacing', `size-and-spacing-${sizeAndSpacing}`)
  }, [sizeAndSpacing]);

  useEffect(() => {
    const labelElement = document.querySelector(`.App`);
    if (labelElement) {
      const computedStyle = getComputedStyle(labelElement);
      document.body.style.setProperty('background-color', computedStyle.backgroundColor);
    }
  }, [resolvedTheme]);

  return (
    <div className={`App theme-${resolvedTheme} size-and-spacing-${sizeAndSpacing} ${styles.appLayout}`} style={{ backgroundColor: 'var(--Schemes-Surface)' }}>
      {/* Thanh điều hướng */}
      <NavigationUnit />

      {/* Content */}
      <div className={styles.contentContainerLayout}>
        <main>
          {children}
        </main>

        <Divider />
        <Footer />
      </div>

      {/* Circle that follows the mouse */}
      {
        resolvedTheme === 'dark' ?
          <CircleFollowMouse /> : null
      }
    </div>
  )
}