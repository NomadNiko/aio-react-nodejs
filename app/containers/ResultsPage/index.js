import React from 'react';
import styled from 'styled-components';
import { PageTransition } from '../../components/AnimationComponents';
import ResultsHeader from './components/ResultsHeader';
import StatsSection from './components/StatsSection';
import CaseStudies from './components/CaseStudies';
import Testimonials from './components/Testimonials';

const ResultsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px 40px;

  @media (max-width: 768px) {
    padding: 70px 15px 30px;
  }
`;

export default function ResultsPage() {
  return (
    <PageTransition>
      <ResultsContainer>
        <ResultsHeader />
        <StatsSection />
        <CaseStudies />
        <Testimonials />
      </ResultsContainer>
    </PageTransition>
  );
}