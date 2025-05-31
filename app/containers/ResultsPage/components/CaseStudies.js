import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import { SlideUp, StaggerContainer, HoverCard } from '../../../components/AnimationComponents';
import { fadeInUp } from '../../../utils/animations';
import messages from '../messages';

const CaseStudySectionContainer = styled.section`
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 30px;
  }
`;

const CaseStudyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const CaseStudyCard = styled(HoverCard)`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  cursor: default;
`;

const CaseStudyImage = styled(motion.div)`
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
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    transition: background 0.3s ease;
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

const CaseStudyContent = styled.div`
  padding: 30px;

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
      padding: 8px 0;
      padding-left: 25px;
      position: relative;
      transition: all 0.3s ease;

      &:before {
        content: '→';
        position: absolute;
        left: 0;
        color: #007bff;
        font-weight: bold;
        transition: all 0.3s ease;
      }

      &:hover {
        color: #333;
        padding-left: 30px;

        &:before {
          transform: translateX(5px);
        }
      }
    }
  }
`;

const caseStudies = [
  {
    image: 'linear-gradient(45deg, #ff6b6b 0%, #ee5a52 100%), url("https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
    imageLabel: 'techInnovation',
    title: 'techStartupTitle',
    description: 'techStartupDescription',
    results: ['techResult1', 'techResult2', 'techResult3'],
  },
  {
    image: 'linear-gradient(45deg, #4ecdc4 0%, #44a08d 100%), url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
    imageLabel: 'retailExcellence',
    title: 'retailBrandTitle',
    description: 'retailBrandDescription',
    results: ['retailResult1', 'retailResult2', 'retailResult3'],
  },
  {
    image: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%), url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
    imageLabel: 'manufacturingInnovation',
    title: 'manufacturingTitle',
    description: 'manufacturingDescription',
    results: ['manufacturingResult1', 'manufacturingResult2', 'manufacturingResult3'],
  },
];

const CaseStudies = () => {
  return (
    <CaseStudySectionContainer>
      <SlideUp threshold={0.3}>
        <SectionTitle>
          <FormattedMessage {...messages.successStoriesTitle} />
        </SectionTitle>
      </SlideUp>

      <StaggerContainer 
        threshold={0.2} 
        staggerDelay={0.2} 
        delayChildren={0.4}
      >
        <CaseStudyGrid>
          {caseStudies.map((study, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <CaseStudyCard
                whileHover={{
                  y: -10,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <CaseStudyImage
                  style={{
                    background: study.image,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'overlay',
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                >
                  <span>
                    <FormattedMessage {...messages[study.imageLabel]} />
                  </span>
                </CaseStudyImage>
                <CaseStudyContent>
                  <h3>
                    <FormattedMessage {...messages[study.title]} />
                  </h3>
                  <p>
                    <FormattedMessage {...messages[study.description]} />
                  </p>
                  <motion.div 
                    className="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h4>
                      <FormattedMessage {...messages.keyResults} />
                    </h4>
                    <ul>
                      {study.results.map((result, resultIndex) => (
                        <motion.li
                          key={resultIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.8 + resultIndex * 0.1,
                            duration: 0.4,
                          }}
                        >
                          <FormattedMessage {...messages[result]} />
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </CaseStudyContent>
              </CaseStudyCard>
            </motion.div>
          ))}
        </CaseStudyGrid>
      </StaggerContainer>
    </CaseStudySectionContainer>
  );
};

export default CaseStudies;