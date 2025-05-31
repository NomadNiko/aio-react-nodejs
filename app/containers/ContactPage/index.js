import React from 'react';
import styled from 'styled-components';
import { PageTransition } from '../../components/AnimationComponents';
import ContactHeader from './components/ContactHeader';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';
import MapSection from './components/MapSection';

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px 40px;

  @media (max-width: 768px) {
    padding: 70px 15px 30px;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

export default function ContactPage() {
  return (
    <PageTransition>
      <ContactContainer>
        <ContactHeader />
        
        <ContactGrid>
          <ContactInfo />
          <ContactForm />
        </ContactGrid>

        <MapSection />
      </ContactContainer>
    </PageTransition>
  );
}