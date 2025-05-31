import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import { SlideUp, FadeIn } from '../../../components/AnimationComponents';
import messages from '../messages';

const MapContainer = styled.section`
  margin-top: 60px;
  background-color: #f8f9fa;
  padding: 60px 40px;
  border-radius: 10px;
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 40px;
    padding: 40px 20px;
  }
`;

const MapTitle = styled.h2`
  font-size: 36px;
  color: #1a1a1a;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 20px;
  }
`;

const MapPlaceholder = styled(motion.div)`
  height: 400px;
  border-radius: 10px;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%),
    url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: overlay;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    height: 300px;
    font-size: 16px;
  }
`;

const MapSection = () => {
  return (
    <MapContainer>
      <SlideUp threshold={0.3}>
        <MapTitle>
          <FormattedMessage {...messages.findUsTitle} />
        </MapTitle>
      </SlideUp>
      
      <FadeIn threshold={0.2} delay={0.3}>
        <MapPlaceholder
          whileHover={{ 
            scale: 1.02,
            rotateY: 2,
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ 
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FormattedMessage {...messages.mapPlaceholder} />
        </MapPlaceholder>
      </FadeIn>
    </MapContainer>
  );
};

export default MapSection;