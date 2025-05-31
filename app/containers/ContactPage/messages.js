import { defineMessages } from 'react-intl';

const scope = 'app.containers.ContactPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Contact Us',
  },
  pageSubtitle: {
    id: `${scope}.pageSubtitle`,
    defaultMessage:
      "We're here to help. Get in touch with us to discuss how we can support your business goals.",
  },
  getInTouchTitle: {
    id: `${scope}.getInTouchTitle`,
    defaultMessage: 'Get In Touch',
  },
  visitUsTitle: {
    id: `${scope}.visitUsTitle`,
    defaultMessage: 'Visit Us',
  },
  address: {
    id: `${scope}.address`,
    defaultMessage: '123 Business Avenue{br}Suite 400{br}New York, NY 10001',
  },
  callUsTitle: {
    id: `${scope}.callUsTitle`,
    defaultMessage: 'Call Us',
  },
  phoneNumbers: {
    id: `${scope}.phoneNumbers`,
    defaultMessage: 'Main: (555) 123-4567{br}Toll Free: 1-800-BUSINESS',
  },
  emailUsTitle: {
    id: `${scope}.emailUsTitle`,
    defaultMessage: 'Email Us',
  },
  emailAddresses: {
    id: `${scope}.emailAddresses`,
    defaultMessage:
      'General: info@nomadsoft.us{br}Support: support@nomadsoft.us',
  },
  businessHoursTitle: {
    id: `${scope}.businessHoursTitle`,
    defaultMessage: 'Business Hours',
  },
  businessHours: {
    id: `${scope}.businessHours`,
    defaultMessage:
      'Monday - Friday: 9:00 AM - 6:00 PM{br}Saturday - Sunday: Closed',
  },
  successMessage: {
    id: `${scope}.successMessage`,
    defaultMessage:
      "Thank you for your message! We'll get back to you within 24 hours.",
  },
  fullNameLabel: {
    id: `${scope}.fullNameLabel`,
    defaultMessage: 'Full Name *',
  },
  emailLabel: {
    id: `${scope}.emailLabel`,
    defaultMessage: 'Email Address *',
  },
  phoneLabel: {
    id: `${scope}.phoneLabel`,
    defaultMessage: 'Phone Number',
  },
  companyLabel: {
    id: `${scope}.companyLabel`,
    defaultMessage: 'Company Name',
  },
  messageLabel: {
    id: `${scope}.messageLabel`,
    defaultMessage: 'Message *',
  },
  sendButton: {
    id: `${scope}.sendButton`,
    defaultMessage: 'Send Message',
  },
  sendingButton: {
    id: `${scope}.sendingButton`,
    defaultMessage: 'Sending...',
  },
  findUsTitle: {
    id: `${scope}.findUsTitle`,
    defaultMessage: 'Find Us',
  },
  mapPlaceholder: {
    id: `${scope}.mapPlaceholder`,
    defaultMessage: '📍 Business Location',
  },
});
