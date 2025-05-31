import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import {
  SlideUp,
  StaggerContainer,
  HoverCard,
} from '../../../components/AnimationComponents';
import { fadeInUp } from '../../../utils/animations';
import messages from '../messages';

const FeaturesContainer = styled.section`
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 36px;
  margin-bottom: 40px;
  color: #1a1a1a;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 30px;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const FeatureCard = styled(HoverCard)`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: default;

  h3 {
    font-size: 24px;
    color: #1a1a1a;
    margin-bottom: 15px;

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  p {
    color: #666;
    line-height: 1.6;
    font-size: 16px;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

const features = [
  {
    titleKey: 'expertTeamTitle',
    textKey: 'expertTeamText',
  },
  {
    titleKey: 'provenResultsTitle',
    textKey: 'provenResultsText',
  },
  {
    titleKey: 'customSolutionsTitle',
    textKey: 'customSolutionsText',
  },
];

const FeaturesSection = () => (
  <FeaturesContainer>
    <SlideUp threshold={0.3}>
      <SectionTitle>
        <FormattedMessage {...messages.whyChooseUsTitle} />
      </SectionTitle>
    </SlideUp>

    <StaggerContainer threshold={0.2} staggerDelay={0.25} delayChildren={0.4}>
      <FeatureGrid>
        {features.map((feature, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <FeatureCard
              whileHover={{
                scale: 1.02,
                y: -8,
                boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
              }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <h3>
                <FormattedMessage {...messages[feature.titleKey]} />
              </h3>
              <p>
                <FormattedMessage {...messages[feature.textKey]} />
              </p>
            </FeatureCard>
          </motion.div>
        ))}
      </FeatureGrid>
    </StaggerContainer>
  </FeaturesContainer>
);

export default FeaturesSection;
