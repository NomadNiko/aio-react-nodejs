import React from 'react';
import styled from 'styled-components';
import { PageTransition } from '../../components/AnimationComponents';
import ServiceHeader from './components/ServiceHeader';
import ServiceCards from './components/ServiceCards';
import CTASection from './components/CTASection';

const ServicesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px 40px;

  @media (max-width: 768px) {
    padding: 70px 15px 30px;
  }
`;

export default function ServicesPage() {
  return (
    <PageTransition>
      <ServicesContainer>
        <ServiceHeader />
        <ServiceCards />
        <CTASection />
      </ServicesContainer>
    </PageTransition>
  );
}
