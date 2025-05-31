/**
 * Reusable animation components using Framer Motion
 */

import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useScrollAnimation } from '../../utils/useAnimations';
import { 
  fadeInUp, 
  fadeInDown, 
  fadeInLeft, 
  fadeInRight,
  fadeIn,
  scaleIn,
  staggerContainer,
  cardEntrance,
  shimmer,
  getVariant
} from '../../utils/animations';

/**
 * AnimatedSection - Wrapper for scroll-triggered animations
 */
export const AnimatedSection = ({ 
  children, 
  variant = fadeInUp, 
  threshold = 0.1, 
  triggerOnce = true,
  delay = 0,
  ...props 
}) => {
  const [ref, isInView] = useScrollAnimation(threshold, triggerOnce);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariant(variant)}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.object,
  threshold: PropTypes.number,
  triggerOnce: PropTypes.bool,
  delay: PropTypes.number,
};

/**
 * StaggerContainer - For staggered child animations
 */
export const StaggerContainer = ({ 
  children, 
  staggerDelay = 0.1, 
  delayChildren = 0.1,
  threshold = 0.1,
  ...props 
}) => {
  const [ref, isInView] = useScrollAnimation(threshold);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayChildren,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

StaggerContainer.propTypes = {
  children: PropTypes.node.isRequired,
  staggerDelay: PropTypes.number,
  delayChildren: PropTypes.number,
  threshold: PropTypes.number,
};

/**
 * FadeIn - Simple fade in animation
 */
export const FadeIn = ({ children, delay = 0, ...props }) => (
  <AnimatedSection variant={fadeIn} delay={delay} {...props}>
    {children}
  </AnimatedSection>
);

FadeIn.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
};

/**
 * SlideUp - Slide up from bottom
 */
export const SlideUp = ({ children, delay = 0, ...props }) => (
  <AnimatedSection variant={fadeInUp} delay={delay} {...props}>
    {children}
  </AnimatedSection>
);

SlideUp.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
};

/**
 * SlideDown - Slide down from top
 */
export const SlideDown = ({ children, delay = 0, ...props }) => (
  <AnimatedSection variant={fadeInDown} delay={delay} {...props}>
    {children}
  </AnimatedSection>
);

SlideDown.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
};

/**
 * SlideLeft - Slide from right to left
 */
export const SlideLeft = ({ children, delay = 0, ...props }) => (
  <AnimatedSection variant={fadeInRight} delay={delay} {...props}>
    {children}
  </AnimatedSection>
);

SlideLeft.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
};

/**
 * SlideRight - Slide from left to right
 */
export const SlideRight = ({ children, delay = 0, ...props }) => (
  <AnimatedSection variant={fadeInLeft} delay={delay} {...props}>
    {children}
  </AnimatedSection>
);

SlideRight.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
};

/**
 * ScaleIn - Scale in animation
 */
export const ScaleIn = ({ children, delay = 0, ...props }) => (
  <AnimatedSection variant={scaleIn} delay={delay} {...props}>
    {children}
  </AnimatedSection>
);

ScaleIn.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
};

/**
 * AnimatedCard - Card with entrance animation
 */
export const AnimatedCard = ({ children, delay = 0, ...props }) => (
  <AnimatedSection variant={cardEntrance} delay={delay} {...props}>
    {children}
  </AnimatedSection>
);

AnimatedCard.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
};

/**
 * AnimatedButton - Button with hover and press animations
 */
export const AnimatedButton = styled(motion.button)`
  cursor: pointer;
  border: none;
  background: transparent;
  
  &:focus {
    outline: none;
  }
`;

AnimatedButton.defaultProps = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2 },
};

/**
 * SkeletonLoader - Loading skeleton with shimmer effect
 */
const SkeletonWrapper = styled(motion.div)`
  background: linear-gradient(
    90deg,
    #f0f0f0 0%,
    #e0e0e0 50%,
    #f0f0f0 100%
  );
  background-size: 200% 100%;
  border-radius: 4px;
`;

export const SkeletonLoader = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '4px',
  ...props 
}) => (
  <SkeletonWrapper
    style={{ width, height, borderRadius }}
    variants={shimmer}
    initial="initial"
    animate="animate"
    {...props}
  />
);

SkeletonLoader.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string,
};

/**
 * AnimatedCounter - Animated number counter
 */
export const AnimatedCounter = ({ 
  from = 0, 
  to, 
  duration = 2, 
  suffix = '',
  ...props 
}) => {
  const [ref, isInView] = useScrollAnimation(0.5, true);
  const [count, setCount] = React.useState(from);

  React.useEffect(() => {
    if (!isInView) return;

    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(from + (to - from) * progress));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, from, to, duration]);

  return (
    <motion.span ref={ref} {...props}>
      {count}{suffix}
    </motion.span>
  );
};

AnimatedCounter.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number.isRequired,
  duration: PropTypes.number,
  suffix: PropTypes.string,
};

/**
 * PageTransition - Wrapper for page transitions
 */
export const PageTransition = ({ children, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    {...props}
  >
    {children}
  </motion.div>
);

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * HoverCard - Card with hover effects
 */
export const HoverCard = styled(motion.div)`
  cursor: pointer;
  
  &:hover {
    z-index: 1;
  }
`;

HoverCard.defaultProps = {
  whileHover: { 
    scale: 1.02, 
    y: -5,
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
  },
  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
};

/**
 * StaggeredList - List with staggered item animations
 */
export const StaggeredList = ({ children, ...props }) => (
  <StaggerContainer {...props}>
    {React.Children.map(children, (child, index) => (
      <motion.div key={index} variants={fadeInUp}>
        {child}
      </motion.div>
    ))}
  </StaggerContainer>
);

StaggeredList.propTypes = {
  children: PropTypes.node.isRequired,
};