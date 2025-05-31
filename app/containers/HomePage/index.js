/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import styled from 'styled-components';
import { PageTransition } from '../../components/AnimationComponents';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px 40px;

  @media (max-width: 768px) {
    padding: 70px 15px 30px;
  }
`;

export default function HomePage() {
  return (
    <PageTransition>
      <HomeContainer>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
      </HomeContainer>
    </PageTransition>
  );
}
