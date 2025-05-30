import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { changeLocale } from 'containers/LanguageProvider/actions';
import { appLocales } from '../../i18n';
import messages from './messages';

const LanguageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const LanguageLabel = styled.span`
  color: #fff;
  font-size: 14px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const LanguageSelect = styled.select`
  background-color: #333;
  color: #fff;
  border: 1px solid #555;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #007bff;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  option {
    background-color: #333;
    color: #fff;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 8px 12px;
  }
`;

const languageNames = {
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
};

function LanguageSelector({ locale, onLocaleChange }) {
  const handleChange = event => {
    onLocaleChange(event.target.value);
  };

  return (
    <LanguageWrapper>
      <LanguageLabel>
        <FormattedMessage {...messages.language} />:
      </LanguageLabel>
      <LanguageSelect value={locale} onChange={handleChange}>
        {appLocales.map(lang => (
          <option key={lang} value={lang}>
            {languageNames[lang]}
          </option>
        ))}
      </LanguageSelect>
    </LanguageWrapper>
  );
}

LanguageSelector.propTypes = {
  locale: PropTypes.string.isRequired,
  onLocaleChange: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

const mapDispatchToProps = dispatch => ({
  onLocaleChange: locale => dispatch(changeLocale(locale)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageSelector);

