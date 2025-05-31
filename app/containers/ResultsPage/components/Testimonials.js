import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import {
  SlideUp,
  StaggerContainer,
} from '../../../components/AnimationComponents';
import { fadeInUp } from '../../../utils/animations';
import messages from '../messages';

const TestimonialSectionContainer = styled(motion.section)`
  background-color: #f8f9fa;
  padding: 60px 40px;
  border-radius: 10px;
  margin-top: 60px;

  @media (max-width: 768px) {
    padding: 40px 20px;
    margin-top: 40px;
  }
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

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const TestimonialCard = styled(motion.div)`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;

  &:before {
    content: '"';
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 60px;
    color: #007bff;
    opacity: 0.2;
    font-family: Georgia, serif;
  }

  p {
    color: #666;
    line-height: 1.8;
    font-style: italic;
    margin-bottom: 20px;
    position: relative;
    z-index: 1;
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
      transition: transform 0.3s ease;
    }

    .info {
      h4 {
        color: #1a1a1a;
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }

      span {
        color: #999;
        font-size: 14px;
      }
    }
  }

  &:hover {
    .author .avatar {
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    padding: 25px 20px;
  }
`;

const testimonials = [
  {
    text: 'testimonial1',
    author: 'testimonial1Author',
    company: 'testimonial1Company',
    avatar:
      'linear-gradient(45deg, #667eea 0%, #764ba2 100%), url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=387&q=80")',
  },
  {
    text: 'testimonial2',
    author: 'testimonial2Author',
    company: 'testimonial2Company',
    avatar:
      'linear-gradient(45deg, #f093fb 0%, #f5576c 100%), url("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
  },
  {
    text: 'testimonial3',
    author: 'testimonial3Author',
    company: 'testimonial3Company',
    avatar:
      'linear-gradient(45deg, #4ecdc4 0%, #44a08d 100%), url("https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
  },
];

const Testimonials = () => (
  <SlideUp threshold={0.3}>
    <TestimonialSectionContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <SectionTitle>
        <FormattedMessage {...messages.testimonialsTitle} />
      </SectionTitle>

      <StaggerContainer threshold={0.2} staggerDelay={0.2} delayChildren={0.4}>
        <TestimonialGrid>
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <TestimonialCard
                whileHover={{
                  y: -5,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  "<FormattedMessage {...messages[testimonial.text]} />"
                </motion.p>
                <motion.div
                  className="author"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <motion.div
                    className="avatar"
                    style={{
                      background: testimonial.avatar,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundBlendMode: 'overlay',
                    }}
                    whileHover={{ rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="info">
                    <h4>
                      <FormattedMessage {...messages[testimonial.author]} />
                    </h4>
                    <span>
                      <FormattedMessage {...messages[testimonial.company]} />
                    </span>
                  </div>
                </motion.div>
              </TestimonialCard>
            </motion.div>
          ))}
        </TestimonialGrid>
      </StaggerContainer>
    </TestimonialSectionContainer>
  </SlideUp>
);

export default Testimonials;
