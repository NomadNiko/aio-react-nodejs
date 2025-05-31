/**
 * Custom hooks for animations
 */

import { useEffect, useState, useRef } from 'react';
import { useAnimation } from 'framer-motion';

/**
 * Hook for scroll-triggered animations using Intersection Observer
 */
export const useScrollAnimation = (threshold = 0.1, triggerOnce = true) => {
  const [isInView, setIsInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce && !hasTriggered) {
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before element is fully visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, triggerOnce, hasTriggered]);

  return [ref, isInView];
};

/**
 * Hook for staggered animations
 */
export const useStaggerAnimation = (itemCount, staggerDelay = 0.1) => {
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  const startAnimation = async () => {
    if (isVisible) return;
    
    setIsVisible(true);
    
    for (let i = 0; i < itemCount; i++) {
      controls.start(`item-${i}`, {
        opacity: 1,
        y: 0,
        transition: {
          delay: i * staggerDelay,
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      });
    }
  };

  return [controls, startAnimation, isVisible];
};

/**
 * Hook for loading animations
 */
export const useLoadingAnimation = (isLoading) => {
  const [showSkeleton, setShowSkeleton] = useState(isLoading);
  const [showContent, setShowContent] = useState(!isLoading);

  useEffect(() => {
    if (isLoading) {
      setShowContent(false);
      setShowSkeleton(true);
    } else {
      // Delay hiding skeleton to allow content to fade in
      setTimeout(() => {
        setShowSkeleton(false);
        setShowContent(true);
      }, 150);
    }
  }, [isLoading]);

  return { showSkeleton, showContent };
};

/**
 * Hook for hover animations
 */
export const useHoverAnimation = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const hoverProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  return [isHovered, hoverProps];
};

/**
 * Hook for sequential text animations
 */
export const useTextAnimation = (texts, interval = 3000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsAnimating(false);
      }, 200);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return [texts[currentIndex], isAnimating, currentIndex];
};

/**
 * Hook for parallax scroll effects
 */
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return [ref, offset];
};

/**
 * Hook for counting animations
 */
export const useCountAnimation = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(start + (end - start) * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, start, isVisible]);

  const startCounting = () => setIsVisible(true);

  return [count, startCounting];
};

/**
 * Hook for page transitions
 */
export const usePageTransition = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const startTransition = () => {
    setIsAnimating(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsAnimating(false);
        resolve();
      }, 300);
    });
  };

  return [isAnimating, startTransition];
};