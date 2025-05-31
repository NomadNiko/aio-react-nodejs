import React, { useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import { SlideRight, StaggerContainer, AnimatedButton } from '../../../components/AnimationComponents';
import { fadeInUp } from '../../../utils/animations';
import messages from '../messages';

const FormContainer = styled(motion.form)`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const FormGroup = styled(motion.div)`
  margin-bottom: 25px;
`;

const Label = styled(motion.label)`
  display: block;
  font-size: 16px;
  color: #1a1a1a;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled(motion.input)`
  width: 100%;
  padding: 12px 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-family: 'Cairo', sans-serif !important;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    transform: translateY(-1px);
  }

  &:hover {
    border-color: #bbb;
  }
`;

const TextArea = styled(motion.textarea)`
  width: 100%;
  padding: 12px 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: 'Cairo', sans-serif !important;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    transform: translateY(-1px);
  }

  &:hover {
    border-color: #bbb;
  }
`;

const SubmitButton = styled(AnimatedButton)`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-family: 'Cairo', sans-serif !important;
  font-weight: 500;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled(motion.div)`
  background-color: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  border: 1px solid #c3e6cb;
`;

const ErrorMessage = styled(motion.div)`
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  border: 1px solid #f5c6cb;
`;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });

      setTimeout(() => setSubmitted(false), 10000);
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formFields = [
    { name: 'name', type: 'text', labelKey: 'fullNameLabel', required: true },
    { name: 'email', type: 'email', labelKey: 'emailLabel', required: true },
    { name: 'phone', type: 'tel', labelKey: 'phoneLabel', required: false },
    { name: 'company', type: 'text', labelKey: 'companyLabel', required: false },
  ];

  return (
    <SlideRight threshold={0.3} delay={0.2}>
      <FormContainer
        onSubmit={handleSubmit}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {submitted && (
          <SuccessMessage
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <FormattedMessage {...messages.successMessage} />
          </SuccessMessage>
        )}

        {error && (
          <ErrorMessage
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {error}
          </ErrorMessage>
        )}

        <StaggerContainer 
          threshold={0.1} 
          staggerDelay={0.1} 
          delayChildren={0.6}
        >
          {formFields.map((field, index) => (
            <FormGroup key={field.name} variants={fadeInUp}>
              <Label htmlFor={field.name}>
                <FormattedMessage {...messages[field.labelKey]} />
              </Label>
              <Input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </FormGroup>
          ))}

          <FormGroup variants={fadeInUp}>
            <Label htmlFor="message">
              <FormattedMessage {...messages.messageLabel} />
            </Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </FormGroup>

          <motion.div variants={fadeInUp}>
            <SubmitButton
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {isLoading ? (
                <FormattedMessage {...messages.sendingButton} />
              ) : (
                <FormattedMessage {...messages.sendButton} />
              )}
            </SubmitButton>
          </motion.div>
        </StaggerContainer>
      </FormContainer>
    </SlideRight>
  );
};

export default ContactForm;