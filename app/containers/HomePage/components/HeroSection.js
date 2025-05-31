import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import {
  SlideDown,
  SlideUp,
  FadeIn,
  AnimatedButton,
} from '../../../components/AnimationComponents';

import messages from '../messages';

const HeroContainer = styled.section`
  text-align: center;
  padding: 60px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 10px;
  margin-bottom: 60px;
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  color: #1a1a1a;
  margin-bottom: 20px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 20px;
  color: #666;
  max-width: 600px;
  margin: 0 auto 30px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 18px;
    max-width: 90%;
  }
`;

const CTAButton = styled(AnimatedButton)`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Cairo', sans-serif !important;
  font-weight: 500;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 16px;
  }
`;

const HeroSection = () => {
  const handleGetStarted = () => {
    window.location.href = '/contact';
  };

  return (
    <SlideDown delay={0.3}>
      <HeroContainer>
        <SlideDown delay={0.6}>
          <HeroTitle>
            <FormattedMessage {...messages.heroTitle} />
          </HeroTitle>
        </SlideDown>

        <FadeIn delay={1.0}>
          <HeroSubtitle>
            <FormattedMessage {...messages.heroSubtitle} />
          </HeroSubtitle>
        </FadeIn>

        <SlideUp delay={1.4}>
          <CTAButton
            onClick={handleGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <FormattedMessage {...messages.getStartedButton} />
          </CTAButton>
        </SlideUp>
      </HeroContainer>
    </SlideDown>
  );
};

export default HeroSection;
