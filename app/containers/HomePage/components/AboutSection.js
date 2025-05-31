import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { SlideLeft, SlideRight, FadeIn } from '../../../components/AnimationComponents';
import messages from '../messages';

const AboutContainer = styled.section`
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

    @media (max-width: 768px) {
      font-size: 28px;
      text-align: center;
    }
  }

  p {
    font-size: 18px;
    color: #666;
    line-height: 1.8;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      font-size: 16px;
      text-align: center;
    }

    &:last-child {
      margin-bottom: 0;
    }
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
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    height: 300px;
    font-size: 16px;
  }
`;

const AboutSection = () => {
  return (
    <AboutContainer>
      <SlideLeft threshold={0.3} delay={0.2}>
        <AboutContent>
          <FadeIn delay={0.5}>
            <h2>
              <FormattedMessage {...messages.aboutTitle} />
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.8}>
            <p>
              <FormattedMessage {...messages.aboutText1} />
            </p>
          </FadeIn>
          
          <FadeIn delay={1.1}>
            <p>
              <FormattedMessage {...messages.aboutText2} />
            </p>
          </FadeIn>
        </AboutContent>
      </SlideLeft>
      
      <SlideRight threshold={0.3} delay={0.6}>
        <AboutImage>
          <FormattedMessage {...messages.aboutImageAlt} />
        </AboutImage>
      </SlideRight>
    </AboutContainer>
  );
};

export default AboutSection;