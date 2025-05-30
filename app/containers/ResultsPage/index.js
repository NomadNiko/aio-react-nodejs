import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const ResultsContainer = styled.div`
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

const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 48px;
    margin-bottom: 10px;
    font-weight: 700;
  }

  p {
    font-size: 18px;
    opacity: 0.9;
  }
`;

const CaseStudySection = styled.section`
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 40px;
`;

const CaseStudyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
`;

const CaseStudyCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CaseStudyImage = styled.div`
  height: 200px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  padding: 15px;
  text-align: center;
`;

const CaseStudyContent = styled.div`
  padding: 30px;

  h3 {
    font-size: 24px;
    color: #1a1a1a;
    margin-bottom: 15px;
  }

  p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .results {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 5px;
    margin-top: 20px;

    h4 {
      font-size: 18px;
      color: #007bff;
      margin-bottom: 10px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      color: #666;
      padding: 5px 0;
      padding-left: 20px;
      position: relative;

      &:before {
        content: '→';
        position: absolute;
        left: 0;
        color: #007bff;
        font-weight: bold;
      }
    }
  }
`;

const TestimonialSection = styled.section`
  background-color: #f8f9fa;
  padding: 60px 40px;
  border-radius: 10px;
  margin-top: 60px;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const TestimonialCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);

  p {
    color: #666;
    line-height: 1.8;
    font-style: italic;
    margin-bottom: 20px;
  }

  .author {
    display: flex;
    align-items: center;
    gap: 15px;

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .info {
      h4 {
        color: #1a1a1a;
        margin: 0;
        font-size: 16px;
      }

      span {
        color: #999;
        font-size: 14px;
      }
    }
  }
`;

export default function ResultsPage() {
  return (
    <ResultsContainer>
      <PageTitle>
        <FormattedMessage {...messages.pageTitle} />
      </PageTitle>
      <PageSubtitle>
        <FormattedMessage {...messages.pageSubtitle} />
      </PageSubtitle>

      <StatsSection>
        <StatCard>
          <h3>500+</h3>
          <p>
            <FormattedMessage {...messages.satisfiedClients} />
          </p>
        </StatCard>
        <StatCard>
          <h3>95%</h3>
          <p>
            <FormattedMessage {...messages.clientRetentionRate} />
          </p>
        </StatCard>
        <StatCard>
          <h3>$10M+</h3>
          <p>
            <FormattedMessage {...messages.revenueGenerated} />
          </p>
        </StatCard>
        <StatCard>
          <h3>150+</h3>
          <p>
            <FormattedMessage {...messages.projectsCompleted} />
          </p>
        </StatCard>
      </StatsSection>

      <CaseStudySection>
        <SectionTitle>
          <FormattedMessage {...messages.successStoriesTitle} />
        </SectionTitle>
        <CaseStudyGrid>
          <CaseStudyCard>
            <CaseStudyImage
              style={{
                background:
                  'linear-gradient(45deg, #ff6b6b 0%, #ee5a52 100%), url("https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay',
              }}
            >
              <FormattedMessage {...messages.techInnovation} />
            </CaseStudyImage>
            <CaseStudyContent>
              <h3>
                <FormattedMessage {...messages.techStartupTitle} />
              </h3>
              <p>
                <FormattedMessage {...messages.techStartupDescription} />
              </p>
              <div className="results">
                <h4>
                  <FormattedMessage {...messages.keyResults} />
                </h4>
                <ul>
                  <li>
                    <FormattedMessage {...messages.techResult1} />
                  </li>
                  <li>
                    <FormattedMessage {...messages.techResult2} />
                  </li>
                  <li>
                    <FormattedMessage {...messages.techResult3} />
                  </li>
                </ul>
              </div>
            </CaseStudyContent>
          </CaseStudyCard>

          <CaseStudyCard>
            <CaseStudyImage
              style={{
                background:
                  'linear-gradient(45deg, #4ecdc4 0%, #44a08d 100%), url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay',
              }}
            >
              <FormattedMessage {...messages.retailExcellence} />
            </CaseStudyImage>
            <CaseStudyContent>
              <h3>
                <FormattedMessage {...messages.retailBrandTitle} />
              </h3>
              <p>
                <FormattedMessage {...messages.retailBrandDescription} />
              </p>
              <div className="results">
                <h4>
                  <FormattedMessage {...messages.keyResults} />
                </h4>
                <ul>
                  <li>
                    <FormattedMessage {...messages.retailResult1} />
                  </li>
                  <li>
                    <FormattedMessage {...messages.retailResult2} />
                  </li>
                  <li>
                    <FormattedMessage {...messages.retailResult3} />
                  </li>
                </ul>
              </div>
            </CaseStudyContent>
          </CaseStudyCard>

          <CaseStudyCard>
            <CaseStudyImage
              style={{
                background:
                  'linear-gradient(45deg, #f093fb 0%, #f5576c 100%), url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay',
              }}
            >
              <FormattedMessage {...messages.manufacturingInnovation} />
            </CaseStudyImage>
            <CaseStudyContent>
              <h3>
                <FormattedMessage {...messages.manufacturingTitle} />
              </h3>
              <p>
                <FormattedMessage {...messages.manufacturingDescription} />
              </p>
              <div className="results">
                <h4>
                  <FormattedMessage {...messages.keyResults} />
                </h4>
                <ul>
                  <li>
                    <FormattedMessage {...messages.manufacturingResult1} />
                  </li>
                  <li>
                    <FormattedMessage {...messages.manufacturingResult2} />
                  </li>
                  <li>
                    <FormattedMessage {...messages.manufacturingResult3} />
                  </li>
                </ul>
              </div>
            </CaseStudyContent>
          </CaseStudyCard>
        </CaseStudyGrid>
      </CaseStudySection>

      <TestimonialSection>
        <SectionTitle>
          <FormattedMessage {...messages.testimonialsTitle} />
        </SectionTitle>
        <TestimonialGrid>
          <TestimonialCard>
            <p>
              "<FormattedMessage {...messages.testimonial1} />"
            </p>
            <div className="author">
              <div
                className="avatar"
                style={{
                  background:
                    'linear-gradient(45deg, #667eea 0%, #764ba2 100%), url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=387&q=80")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundBlendMode: 'overlay',
                }}
              />
              <div className="info">
                <h4>
                  <FormattedMessage {...messages.testimonial1Author} />
                </h4>
                <span>
                  <FormattedMessage {...messages.testimonial1Company} />
                </span>
              </div>
            </div>
          </TestimonialCard>

          <TestimonialCard>
            <p>
              "<FormattedMessage {...messages.testimonial2} />"
            </p>
            <div className="author">
              <div
                className="avatar"
                style={{
                  background:
                    'linear-gradient(45deg, #f093fb 0%, #f5576c 100%), url("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundBlendMode: 'overlay',
                }}
              />
              <div className="info">
                <h4>
                  <FormattedMessage {...messages.testimonial2Author} />
                </h4>
                <span>
                  <FormattedMessage {...messages.testimonial2Company} />
                </span>
              </div>
            </div>
          </TestimonialCard>

          <TestimonialCard>
            <p>
              "<FormattedMessage {...messages.testimonial3} />"
            </p>
            <div className="author">
              <div
                className="avatar"
                style={{
                  background:
                    'linear-gradient(45deg, #4ecdc4 0%, #44a08d 100%), url("https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundBlendMode: 'overlay',
                }}
              />
              <div className="info">
                <h4>
                  <FormattedMessage {...messages.testimonial3Author} />
                </h4>
                <span>
                  <FormattedMessage {...messages.testimonial3Company} />
                </span>
              </div>
            </div>
          </TestimonialCard>
        </TestimonialGrid>
      </TestimonialSection>
    </ResultsContainer>
  );
}

