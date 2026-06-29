"use client"

import React, { useEffect, useRef, useState } from 'react';
import styles from './CircleFollowMouse.module.css';

const CircleFollowMouse: React.FC = () => {
  const circleRef = useRef<HTMLDivElement>(null);
  const [hasMouse, setHasMouse] = useState(false);
  const hasMouseRef = useRef(false);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') {
        if (!hasMouseRef.current) {
          hasMouseRef.current = true;
          setHasMouse(true);
        }
        if (circleRef.current) {
          circleRef.current.style.left = `${event.clientX - 25}px`;
          circleRef.current.style.top = `${event.clientY - 25}px`;
        }
      }
    };

    document.addEventListener('pointermove', handlePointerMove);

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return hasMouse ? <div ref={circleRef} className={styles.circle} /> : null;
};

export default CircleFollowMouse;