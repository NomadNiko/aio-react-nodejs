import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { motion, useAnimation } from 'framer-motion';
import { StaggerContainer } from '../../../components/AnimationComponents';
import { useScrollAnimation } from '../../../utils/useAnimations';
import messages from '../messages';

const StatsSectionContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const StatCard = styled(motion.div)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: rotate 20s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  h3 {
    font-size: 48px;
    margin-bottom: 10px;
    font-weight: 700;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      font-size: 40px;
    }
  }

  p {
    font-size: 18px;
    opacity: 0.9;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const CountUp = ({ end, duration = 2000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useScrollAnimation(0.3, true);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      const start = 0;
      const increment = end / (duration / 16); // 60fps
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setCount(Math.floor(current));
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return (
    <motion.span ref={ref}>
      {prefix}{count}{suffix}
    </motion.span>
  );
};

const stats = [
  { value: 500, suffix: '+', messageKey: 'satisfiedClients' },
  { value: 95, suffix: '%', messageKey: 'clientRetentionRate' },
  { value: 10, prefix: '$', suffix: 'M+', messageKey: 'revenueGenerated' },
  { value: 150, suffix: '+', messageKey: 'projectsCompleted' },
];

const StatsSection = () => {
  return (
    <StaggerContainer 
      threshold={0.3} 
      staggerDelay={0.15} 
      delayChildren={0.8}
    >
      <StatsSectionContainer>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            }}
            transition={{ duration: 0.3 }}
          >
            <h3>
              <CountUp 
                end={stat.value} 
                prefix={stat.prefix || ''} 
                suffix={stat.suffix || ''} 
              />
            </h3>
            <p>
              <FormattedMessage {...messages[stat.messageKey]} />
            </p>
          </StatCard>
        ))}
      </StatsSectionContainer>
    </StaggerContainer>
  );
};

export default StatsSection;