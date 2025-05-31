import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import {
  SlideLeft,
  StaggerContainer,
} from '../../../components/AnimationComponents';
import { fadeInUp } from '../../../utils/animations';
import messages from '../messages';

const ContactInfoContainer = styled.div``;

const InfoTitle = styled.h2`
  font-size: 32px;
  color: #1a1a1a;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 28px;
    text-align: center;
  }
`;

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 30px;

  .icon {
    font-size: 24px;
    color: #007bff;
    width: 30px;
    transition: transform 0.3s ease;
  }

  .content {
    flex: 1;

    h3 {
      font-size: 20px;
      color: #1a1a1a;
      margin-bottom: 5px;

      @media (max-width: 768px) {
        font-size: 18px;
      }
    }

    p {
      color: #666;
      line-height: 1.6;

      @media (max-width: 768px) {
        font-size: 14px;
      }
    }
  }

  &:hover .icon {
    transform: scale(1.2);
  }

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const infoItems = [
  {
    icon: '📍',
    iconLabel: 'Location pin',
    titleKey: 'visitUsTitle',
    contentKey: 'address',
  },
  {
    icon: '📞',
    iconLabel: 'Phone',
    titleKey: 'callUsTitle',
    contentKey: 'phoneNumbers',
  },
  {
    icon: '✉️',
    iconLabel: 'Email',
    titleKey: 'emailUsTitle',
    contentKey: 'emailAddresses',
  },
  {
    icon: '🕐',
    iconLabel: 'Clock',
    titleKey: 'businessHoursTitle',
    contentKey: 'businessHours',
  },
];

const ContactInfo = () => (
  <ContactInfoContainer>
    <SlideLeft threshold={0.3}>
      <InfoTitle>
        <FormattedMessage {...messages.getInTouchTitle} />
      </InfoTitle>
    </SlideLeft>

    <StaggerContainer threshold={0.2} staggerDelay={0.1} delayChildren={0.3}>
      {infoItems.map((item, index) => (
        <InfoItem
          key={index}
          variants={fadeInUp}
          whileHover={{
            x: 8,
            transition: { duration: 0.3, ease: 'easeOut' },
          }}
        >
          <span className="icon" role="img" aria-label={item.iconLabel}>
            {item.icon}
          </span>
          <div className="content">
            <h3>
              <FormattedMessage {...messages[item.titleKey]} />
            </h3>
            <p>
              <FormattedMessage
                {...messages[item.contentKey]}
                values={{ br: <br /> }}
              />
            </p>
          </div>
        </InfoItem>
      ))}
    </StaggerContainer>
  </ContactInfoContainer>
);

export default ContactInfo;
