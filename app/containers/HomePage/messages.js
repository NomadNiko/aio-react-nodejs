/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage';

export default defineMessages({
  heroTitle: {
    id: `${scope}.heroTitle`,
    defaultMessage: 'Welcome to Business Solutions',
  },
  heroSubtitle: {
    id: `${scope}.heroSubtitle`,
    defaultMessage:
      'Empowering your business with innovative solutions and exceptional service',
  },
  getStartedButton: {
    id: `${scope}.getStartedButton`,
    defaultMessage: 'Get Started Today',
  },
  aboutTitle: {
    id: `${scope}.aboutTitle`,
    defaultMessage: 'About Our Company',
  },
  aboutText1: {
    id: `${scope}.aboutText1`,
    defaultMessage:
      'We are a leading provider of comprehensive business solutions, dedicated to helping companies of all sizes achieve their goals. With years of experience and a team of experts, we deliver results that matter.',
  },
  aboutText2: {
    id: `${scope}.aboutText2`,
    defaultMessage:
      'Our mission is to provide innovative, cost-effective solutions that drive growth and success for our clients. We believe in building long-term partnerships based on trust, transparency, and exceptional service.',
  },
  aboutImageAlt: {
    id: `${scope}.aboutImageAlt`,
    defaultMessage: 'Professional Business Team',
  },
  whyChooseUsTitle: {
    id: `${scope}.whyChooseUsTitle`,
    defaultMessage: 'Why Choose Us',
  },
  expertTeamTitle: {
    id: `${scope}.expertTeamTitle`,
    defaultMessage: 'Expert Team',
  },
  expertTeamText: {
    id: `${scope}.expertTeamText`,
    defaultMessage:
      'Our experienced professionals bring deep industry knowledge and proven expertise to every project.',
  },
  provenResultsTitle: {
    id: `${scope}.provenResultsTitle`,
    defaultMessage: 'Proven Results',
  },
  provenResultsText: {
    id: `${scope}.provenResultsText`,
    defaultMessage:
      'We have a track record of delivering measurable results that exceed our clients expectations.',
  },
  customSolutionsTitle: {
    id: `${scope}.customSolutionsTitle`,
    defaultMessage: 'Custom Solutions',
  },
  customSolutionsText: {
    id: `${scope}.customSolutionsText`,
    defaultMessage:
      'Every business is unique. We tailor our approach to meet your specific needs and objectives.',
  },
});
