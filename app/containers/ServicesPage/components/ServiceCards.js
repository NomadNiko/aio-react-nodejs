import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import { StaggerContainer, HoverCard } from '../../../components/AnimationComponents';
import { fadeInUp } from '../../../utils/animations';
import messages from '../messages';

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ServiceCard = styled(HoverCard)`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  cursor: default;

  h3 {
    font-size: 28px;
    color: #1a1a1a;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;

    @media (max-width: 768px) {
      font-size: 24px;
    }
  }

  .icon {
    font-size: 32px;
    color: #007bff;
    transition: transform 0.3s ease;
  }

  &:hover .icon {
    transform: scale(1.2) rotate(10deg);
  }

  p {
    color: #666;
    line-height: 1.8;
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    color: #666;
    padding: 8px 0;
    padding-left: 28px;
    position: relative;
    transition: all 0.3s ease;

    &:before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #007bff;
      font-weight: bold;
      font-size: 18px;
      transition: all 0.3s ease;
    }

    &:hover {
      color: #333;
      padding-left: 35px;

      &:before {
        transform: scale(1.3);
      }
    }
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const services = [
  {
    icon: '📊',
    iconLabel: 'Chart icon',
    titleKey: 'businessConsultingTitle',
    descriptionKey: 'businessConsultingDescription',
    items: [
      'businessConsultingItem1',
      'businessConsultingItem2',
      'businessConsultingItem3',
      'businessConsultingItem4',
    ],
  },
  {
    icon: '💻',
    iconLabel: 'Computer icon',
    titleKey: 'digitalTransformationTitle',
    descriptionKey: 'digitalTransformationDescription',
    items: [
      'digitalTransformationItem1',
      'digitalTransformationItem2',
      'digitalTransformationItem3',
      'digitalTransformationItem4',
    ],
  },
  {
    icon: '📈',
    iconLabel: 'Marketing icon',
    titleKey: 'marketingSolutionsTitle',
    descriptionKey: 'marketingSolutionsDescription',
    items: [
      'marketingSolutionsItem1',
      'marketingSolutionsItem2',
      'marketingSolutionsItem3',
      'marketingSolutionsItem4',
    ],
  },
  {
    icon: '🎯',
    iconLabel: 'Target icon',
    titleKey: 'projectManagementTitle',
    descriptionKey: 'projectManagementDescription',
    items: [
      'projectManagementItem1',
      'projectManagementItem2',
      'projectManagementItem3',
      'projectManagementItem4',
    ],
  },
  {
    icon: '👥',
    iconLabel: 'People icon',
    titleKey: 'trainingDevelopmentTitle',
    descriptionKey: 'trainingDevelopmentDescription',
    items: [
      'trainingDevelopmentItem1',
      'trainingDevelopmentItem2',
      'trainingDevelopmentItem3',
      'trainingDevelopmentItem4',
    ],
  },
  {
    icon: '🛡️',
    iconLabel: 'Shield icon',
    titleKey: 'riskManagementTitle',
    descriptionKey: 'riskManagementDescription',
    items: [
      'riskManagementItem1',
      'riskManagementItem2',
      'riskManagementItem3',
      'riskManagementItem4',
    ],
  },
];

const ServiceCards = () => {
  return (
    <StaggerContainer 
      threshold={0.1} 
      staggerDelay={0.15} 
      delayChildren={0.6}
    >
      <ServiceGrid>
        {services.map((service, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <ServiceCard
              whileHover={{
                y: -10,
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <h3>
                <span className="icon" role="img" aria-label={service.iconLabel}>
                  {service.icon}
                </span>
                <FormattedMessage {...messages[service.titleKey]} />
              </h3>
              <p>
                <FormattedMessage {...messages[service.descriptionKey]} />
              </p>
              <ul>
                {service.items.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.8 + itemIndex * 0.1,
                      duration: 0.4,
                    }}
                  >
                    <FormattedMessage {...messages[item]} />
                  </motion.li>
                ))}
              </ul>
            </ServiceCard>
          </motion.div>
        ))}
      </ServiceGrid>
    </StaggerContainer>
  );
};

export default ServiceCards;