import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { changeLocale } from 'containers/LanguageProvider/actions';
import { appLocales } from '../../i18n';

const LanguageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const FlagButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  border-radius: 3px;
  transition: all 0.2s ease;
  opacity: ${props => (props.active ? '1' : '0.7')};
  transform: scale(${props => (props.active ? '1' : '0.9')});

  &:hover {
    opacity: 1;
    transform: scale(1);
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    padding: 4px;
  }
`;

const FlagIcon = styled.img`
  width: 20px;
  height: 14px;
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: block;

  @media (max-width: 768px) {
    width: 24px;
    height: 17px;
  }
`;

import flagUs from '../../images/flag-us.svg';
import flagEs from '../../images/flag-es.svg';
import flagDe from '../../images/flag-de.svg';

const languageFlags = {
  en: flagUs,
  es: flagEs,
  de: flagDe,
};

const languageNames = {
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
};

function LanguageSelector({ locale, onLocaleChange }) {
  const handleLanguageChange = lang => {
    onLocaleChange(lang);
  };

  return (
    <LanguageWrapper>
      {appLocales.map(lang => (
        <FlagButton
          key={lang}
          active={locale === lang}
          onClick={() => handleLanguageChange(lang)}
          title={languageNames[lang]}
        >
          <FlagIcon src={languageFlags[lang]} alt={languageNames[lang]} />
        </FlagButton>
      ))}
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
