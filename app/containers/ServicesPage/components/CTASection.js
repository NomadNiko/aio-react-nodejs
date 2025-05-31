import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import {
  SlideUp,
  FadeIn,
  AnimatedButton,
} from '../../../components/AnimationComponents';
import messages from '../messages';

const CTAContainer = styled(motion.section)`
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  padding: 60px 40px;
  border-radius: 10px;
  text-align: center;
  margin-top: 60px;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    animation: pulse 4s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  h2 {
    font-size: 36px;
    margin-bottom: 20px;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      font-size: 28px;
    }
  }

  p {
    font-size: 20px;
    margin-bottom: 30px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      font-size: 18px;
      padding: 0 15px;
    }
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const CTAButton = styled(AnimatedButton)`
  background-color: white;
  color: #007bff;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  font-family: 'Cairo', sans-serif !important;
  position: relative;
  z-index: 1;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 16px;
  }
`;

const CTASection = () => {
  const handleGetStarted = () => {
    window.location.href = '/contact';
  };

  return (
    <SlideUp threshold={0.3}>
      <CTAContainer
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <FadeIn delay={0.4}>
          <h2>
            <FormattedMessage {...messages.ctaTitle} />
          </h2>
        </FadeIn>

        <FadeIn delay={0.6}>
          <p>
            <FormattedMessage {...messages.ctaDescription} />
          </p>
        </FadeIn>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <CTAButton
            onClick={handleGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <FormattedMessage {...messages.ctaButton} />
          </CTAButton>
        </motion.div>
      </CTAContainer>
    </SlideUp>
  );
};

export default CTASection;
