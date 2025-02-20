import React, { useState, useEffect, useRef } from 'react';

function AnimatedNumber({ value, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const startValue = parseInt(value.replace('+', '')); // Clean number from string
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const end = startValue;
    const stepTime = Math.abs(Math.floor(duration / end));
    
    const intervalId = setInterval(() => {
      setCount((prev) => {
        if (prev < end) {
          return prev + 1;
        } else {
          clearInterval(intervalId);
          return prev;
        }
      });
    }, stepTime);

    return () => clearInterval(intervalId);
  }, [startValue, duration, isVisible]);

  return <span ref={elementRef}>{count}+</span>;
}

export default AnimatedNumber;
