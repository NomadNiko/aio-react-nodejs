/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px 40px;

  @media (max-width: 768px) {
    padding: 70px 15px 30px;
  }
`;

const HeroSection = styled.section`
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
`;

const HeroSubtitle = styled.p`
  font-size: 20px;
  color: #666;
  max-width: 600px;
  margin: 0 auto 30px;
  line-height: 1.6;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const AboutSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const AboutContent = styled.div`
  h2 {
    font-size: 36px;
    color: #1a1a1a;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    color: #666;
    line-height: 1.8;
    margin-bottom: 20px;
  }
`;

const AboutImage = styled.div`
  height: 400px;
  border-radius: 10px;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%),
    url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: overlay;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  padding: 20px;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 24px;
    color: #1a1a1a;
    margin-bottom: 15px;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`;

export default function HomePage() {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroTitle>
          <FormattedMessage {...messages.heroTitle} />
        </HeroTitle>
        <HeroSubtitle>
          <FormattedMessage {...messages.heroSubtitle} />
        </HeroSubtitle>
        <Button onClick={() => { window.location.href = '/contact'; }}>
          <FormattedMessage {...messages.getStartedButton} />
        </Button>
      </HeroSection>

      <AboutSection>
        <AboutContent>
          <h2>
            <FormattedMessage {...messages.aboutTitle} />
          </h2>
          <p>
            <FormattedMessage {...messages.aboutText1} />
          </p>
          <p>
            <FormattedMessage {...messages.aboutText2} />
          </p>
        </AboutContent>
        <AboutImage>
          <FormattedMessage {...messages.aboutImageAlt} />
        </AboutImage>
      </AboutSection>

      <h2
        style={{ textAlign: 'center', fontSize: '36px', marginBottom: '40px' }}
      >
        <FormattedMessage {...messages.whyChooseUsTitle} />
      </h2>
      <FeatureGrid>
        <FeatureCard>
          <h3>
            <FormattedMessage {...messages.expertTeamTitle} />
          </h3>
          <p>
            <FormattedMessage {...messages.expertTeamText} />
          </p>
        </FeatureCard>
        <FeatureCard>
          <h3>
            <FormattedMessage {...messages.provenResultsTitle} />
          </h3>
          <p>
            <FormattedMessage {...messages.provenResultsText} />
          </p>
        </FeatureCard>
        <FeatureCard>
          <h3>
            <FormattedMessage {...messages.customSolutionsTitle} />
          </h3>
          <p>
            <FormattedMessage {...messages.customSolutionsText} />
          </p>
        </FeatureCard>
      </FeatureGrid>
    </HomeContainer>
  );
}
