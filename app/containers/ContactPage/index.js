import React, { useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const ContactContainer = styled.div`
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContactInfo = styled.div`
  h2 {
    font-size: 32px;
    color: #1a1a1a;
    margin-bottom: 30px;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 30px;

  .icon {
    font-size: 24px;
    color: #007bff;
    width: 30px;
  }

  .content {
    flex: 1;

    h3 {
      font-size: 20px;
      color: #1a1a1a;
      margin-bottom: 5px;
    }

    p {
      color: #666;
      line-height: 1.6;
    }
  }
`;

const ContactForm = styled.form`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  color: #1a1a1a;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  border: 1px solid #c3e6cb;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  border: 1px solid #f5c6cb;
`;

const MapSection = styled.section`
  margin-top: 60px;
  background-color: #f8f9fa;
  padding: 60px 40px;
  border-radius: 10px;
  text-align: center;

  h2 {
    font-size: 36px;
    color: #1a1a1a;
    margin-bottom: 30px;
  }
`;

const MapPlaceholder = styled.div`
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
`;

export default function ContactPage() {
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
    // Clear error when user starts typing
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

      // Success! Clear form and show success message
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });

      // Hide success message after 10 seconds
      setTimeout(() => setSubmitted(false), 10000);
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContactContainer>
      <PageTitle>
        <FormattedMessage {...messages.pageTitle} />
      </PageTitle>
      <PageSubtitle>
        <FormattedMessage {...messages.pageSubtitle} />
      </PageSubtitle>

      <ContactGrid>
        <ContactInfo>
          <h2>
            <FormattedMessage {...messages.getInTouchTitle} />
          </h2>

          <InfoItem>
            <span className="icon" role="img" aria-label="Location pin">📍</span>
            <div className="content">
              <h3>
                <FormattedMessage {...messages.visitUsTitle} />
              </h3>
              <p>
                <FormattedMessage
                  {...messages.address}
                  values={{ br: <br /> }}
                />
              </p>
            </div>
          </InfoItem>

          <InfoItem>
            <span className="icon" role="img" aria-label="Phone">📞</span>
            <div className="content">
              <h3>
                <FormattedMessage {...messages.callUsTitle} />
              </h3>
              <p>
                <FormattedMessage
                  {...messages.phoneNumbers}
                  values={{ br: <br /> }}
                />
              </p>
            </div>
          </InfoItem>

          <InfoItem>
            <span className="icon" role="img" aria-label="Email">✉️</span>
            <div className="content">
              <h3>
                <FormattedMessage {...messages.emailUsTitle} />
              </h3>
              <p>
                <FormattedMessage
                  {...messages.emailAddresses}
                  values={{ br: <br /> }}
                />
              </p>
            </div>
          </InfoItem>

          <InfoItem>
            <span className="icon" role="img" aria-label="Clock">🕐</span>
            <div className="content">
              <h3>
                <FormattedMessage {...messages.businessHoursTitle} />
              </h3>
              <p>
                <FormattedMessage
                  {...messages.businessHours}
                  values={{ br: <br /> }}
                />
              </p>
            </div>
          </InfoItem>
        </ContactInfo>

        <ContactForm onSubmit={handleSubmit}>
          {submitted && (
            <SuccessMessage>
              <FormattedMessage {...messages.successMessage} />
            </SuccessMessage>
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormGroup>
            <Label htmlFor="name">
              <FormattedMessage {...messages.fullNameLabel} />
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">
              <FormattedMessage {...messages.emailLabel} />
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">
              <FormattedMessage {...messages.phoneLabel} />
            </Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="company">
              <FormattedMessage {...messages.companyLabel} />
            </Label>
            <Input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">
              <FormattedMessage {...messages.messageLabel} />
            </Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <FormattedMessage {...messages.sendingButton} />
            ) : (
              <FormattedMessage {...messages.sendButton} />
            )}
          </SubmitButton>
        </ContactForm>
      </ContactGrid>

      <MapSection>
        <h2>
          <FormattedMessage {...messages.findUsTitle} />
        </h2>
        <MapPlaceholder>
          <FormattedMessage {...messages.mapPlaceholder} />
        </MapPlaceholder>
      </MapSection>
    </ContactContainer>
  );
}

