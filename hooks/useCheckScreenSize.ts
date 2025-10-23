"use client"

import { useEffect, useState } from "react";

// Custom hook to detect if current screen size is in the provided sizes based on body classes
const useCheckScreenSize = (sizes: ('xl' | 'lg' | 'md' | 'sm')[]) => {
    const getCurrentSize = () => {
        if (document.body.classList.contains('size-and-spacing-sm')) return 'sm';
        if (document.body.classList.contains('size-and-spacing-md')) return 'md';
        if (document.body.classList.contains('size-and-spacing-lg')) return 'lg';
        if (document.body.classList.contains('size-and-spacing-xl')) return 'xl';
        return null;
    };

    const [isInSizes, setIsInSizes] = useState<boolean>(() => {
        const currentSize = getCurrentSize();
        return currentSize ? sizes.includes(currentSize) : false;
    });

    useEffect(() => {
        const checkScreenSize = () => {
            const currentSize = getCurrentSize();
            setIsInSizes(currentSize ? sizes.includes(currentSize) : false);
        };

        const observer = new MutationObserver(checkScreenSize);
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });

        // Initial check
        checkScreenSize();

        return () => observer.disconnect();
    }, [sizes]);

    return isInSizes;
};

export default useCheckScreenSize;
