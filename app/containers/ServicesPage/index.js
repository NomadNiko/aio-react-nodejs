import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const ServicesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px 40px;
`;

const PageTitle = styled.h1`
  font-size: 48px;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 20px;
`;

const PageSubtitle = styled.p`
  font-size: 20px;
  color: #666;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
  line-height: 1.6;
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-bottom: 60px;
`;

const ServiceCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  h3 {
    font-size: 28px;
    color: #1a1a1a;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .icon {
    font-size: 32px;
    color: #007bff;
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
    padding-left: 20px;
    position: relative;

    &:before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #007bff;
      font-weight: bold;
    }
  }
`;

const CTASection = styled.section`
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  padding: 60px 40px;
  border-radius: 10px;
  text-align: center;
  margin-top: 60px;

  h2 {
    font-size: 36px;
    margin-bottom: 20px;
  }

  p {
    font-size: 20px;
    margin-bottom: 30px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const CTAButton = styled.button`
  background-color: white;
  color: #007bff;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export default function ServicesPage() {
  return (
    <ServicesContainer>
      <PageTitle>
        <FormattedMessage {...messages.pageTitle} />
      </PageTitle>
      <PageSubtitle>
        <FormattedMessage {...messages.pageSubtitle} />
      </PageSubtitle>

      <ServiceGrid>
        <ServiceCard>
          <h3>
            <span className="icon" role="img" aria-label="Chart icon">📊</span>
            <FormattedMessage {...messages.businessConsultingTitle} />
          </h3>
          <p>
            <FormattedMessage {...messages.businessConsultingDescription} />
          </p>
          <ul>
            <li>
              <FormattedMessage {...messages.businessConsultingItem1} />
            </li>
            <li>
              <FormattedMessage {...messages.businessConsultingItem2} />
            </li>
            <li>
              <FormattedMessage {...messages.businessConsultingItem3} />
            </li>
            <li>
              <FormattedMessage {...messages.businessConsultingItem4} />
            </li>
          </ul>
        </ServiceCard>

        <ServiceCard>
          <h3>
            <span className="icon" role="img" aria-label="Computer icon">💻</span>
            <FormattedMessage {...messages.digitalTransformationTitle} />
          </h3>
          <p>
            <FormattedMessage {...messages.digitalTransformationDescription} />
          </p>
          <ul>
            <li>
              <FormattedMessage {...messages.digitalTransformationItem1} />
            </li>
            <li>
              <FormattedMessage {...messages.digitalTransformationItem2} />
            </li>
            <li>
              <FormattedMessage {...messages.digitalTransformationItem3} />
            </li>
            <li>
              <FormattedMessage {...messages.digitalTransformationItem4} />
            </li>
          </ul>
        </ServiceCard>

        <ServiceCard>
          <h3>
            <span className="icon" role="img" aria-label="Marketing icon">📈</span>
            <FormattedMessage {...messages.marketingSolutionsTitle} />
          </h3>
          <p>
            <FormattedMessage {...messages.marketingSolutionsDescription} />
          </p>
          <ul>
            <li>
              <FormattedMessage {...messages.marketingSolutionsItem1} />
            </li>
            <li>
              <FormattedMessage {...messages.marketingSolutionsItem2} />
            </li>
            <li>
              <FormattedMessage {...messages.marketingSolutionsItem3} />
            </li>
            <li>
              <FormattedMessage {...messages.marketingSolutionsItem4} />
            </li>
          </ul>
        </ServiceCard>

        <ServiceCard>
          <h3>
            <span className="icon" role="img" aria-label="Target icon">🎯</span>
            <FormattedMessage {...messages.projectManagementTitle} />
          </h3>
          <p>
            <FormattedMessage {...messages.projectManagementDescription} />
          </p>
          <ul>
            <li>
              <FormattedMessage {...messages.projectManagementItem1} />
            </li>
            <li>
              <FormattedMessage {...messages.projectManagementItem2} />
            </li>
            <li>
              <FormattedMessage {...messages.projectManagementItem3} />
            </li>
            <li>
              <FormattedMessage {...messages.projectManagementItem4} />
            </li>
          </ul>
        </ServiceCard>

        <ServiceCard>
          <h3>
            <span className="icon" role="img" aria-label="People icon">👥</span>
            <FormattedMessage {...messages.trainingDevelopmentTitle} />
          </h3>
          <p>
            <FormattedMessage {...messages.trainingDevelopmentDescription} />
          </p>
          <ul>
            <li>
              <FormattedMessage {...messages.trainingDevelopmentItem1} />
            </li>
            <li>
              <FormattedMessage {...messages.trainingDevelopmentItem2} />
            </li>
            <li>
              <FormattedMessage {...messages.trainingDevelopmentItem3} />
            </li>
            <li>
              <FormattedMessage {...messages.trainingDevelopmentItem4} />
            </li>
          </ul>
        </ServiceCard>

        <ServiceCard>
          <h3>
            <span className="icon" role="img" aria-label="Shield icon">🛡️</span>
            <FormattedMessage {...messages.riskManagementTitle} />
          </h3>
          <p>
            <FormattedMessage {...messages.riskManagementDescription} />
          </p>
          <ul>
            <li>
              <FormattedMessage {...messages.riskManagementItem1} />
            </li>
            <li>
              <FormattedMessage {...messages.riskManagementItem2} />
            </li>
            <li>
              <FormattedMessage {...messages.riskManagementItem3} />
            </li>
            <li>
              <FormattedMessage {...messages.riskManagementItem4} />
            </li>
          </ul>
        </ServiceCard>
      </ServiceGrid>

      <CTASection>
        <h2>
          <FormattedMessage {...messages.ctaTitle} />
        </h2>
        <p>
          <FormattedMessage {...messages.ctaDescription} />
        </p>
        <CTAButton onClick={() => { window.location.href = '/contact'; }}>
          <FormattedMessage {...messages.ctaButton} />
        </CTAButton>
      </CTASection>
    </ServicesContainer>
  );
}

