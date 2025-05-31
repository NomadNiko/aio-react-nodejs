import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { SlideDown, FadeIn } from '../../../components/AnimationComponents';
import messages from '../messages';

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const PageTitle = styled.h1`
  font-size: 48px;
  color: #1a1a1a;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const PageSubtitle = styled.p`
  font-size: 20px;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 0 15px;
  }
`;

const ServiceHeader = () => {
  return (
    <HeaderContainer>
      <SlideDown delay={0.2}>
        <PageTitle>
          <FormattedMessage {...messages.pageTitle} />
        </PageTitle>
      </SlideDown>
      
      <FadeIn delay={0.5}>
        <PageSubtitle>
          <FormattedMessage {...messages.pageSubtitle} />
        </PageSubtitle>
      </FadeIn>
    </HeaderContainer>
  );
};

export default ServiceHeader;