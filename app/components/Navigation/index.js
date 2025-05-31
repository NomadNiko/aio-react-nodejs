import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import LanguageSelector from '../LanguageSelector';
import messages from './messages';

const Nav = styled.nav`
  background-color: #1a1a1a;
  padding: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: relative;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  padding: 20px 0;
  z-index: 1002;
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1002;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 768px) {
    display: block;
  }

  span {
    display: block;
    width: 25px;
    height: 3px;
    background-color: #fff;
    margin: 5px 0;
    transition: all 0.3s ease;
    transform-origin: center;

    &:nth-child(1) {
      transform: ${props =>
    props.isOpen ? 'rotate(45deg) translateY(8px)' : 'rotate(0)'};
    }

    &:nth-child(2) {
      opacity: ${props => (props.isOpen ? '0' : '1')};
      transform: ${props =>
    props.isOpen ? 'translateX(-20px)' : 'translateX(0)'};
    }

    &:nth-child(3) {
      transform: ${props =>
    props.isOpen ? 'rotate(-45deg) translateY(-8px)' : 'rotate(0)'};
    }
  }
`;

const NavMenu = styled.ul`
  list-style: none;
  display: flex;
  gap: 30px;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    width: 100%;
    flex-direction: column;
    background-color: #1a1a1a;
    padding: 20px;
    gap: 0;
    transform: ${props =>
    props.isOpen ? 'translateY(0)' : 'translateY(-100%)'};
    opacity: ${props => (props.isOpen ? '1' : '0')};
    visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
`;

const NavItem = styled.li`
  margin: 0;

  &.mobile-language-selector {
    display: none;

    @media (max-width: 768px) {
      display: block;
      border-bottom: none;
      padding-top: 20px;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &:last-child {
      border-bottom: none;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  padding: 10px 0;
  position: relative;
  transition: color 0.3s ease;
  display: inline-block;

  &:hover {
    color: #007bff;
  }

  &.active {
    color: #007bff;
  }

  @media (min-width: 769px) {
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: #007bff;
      transition: width 0.3s ease;
    }

    &:hover::after,
    &.active::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    display: block;
    padding: 15px 0;
    font-size: 18px;
  }
`;

const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: ${props => (props.isOpen ? '1' : '0')};
    visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
    transition: all 0.3s ease;
    z-index: 999;
  }
`;

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Nav>
        <NavContainer>
          <Logo>
            <FormattedMessage {...messages.companyName} />
          </Logo>
          <NavMenu isOpen={isOpen}>
            <NavItem>
              <StyledNavLink exact to="/" onClick={closeMenu}>
                <FormattedMessage {...messages.home} />
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink to="/services" onClick={closeMenu}>
                <FormattedMessage {...messages.services} />
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink to="/results" onClick={closeMenu}>
                <FormattedMessage {...messages.results} />
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink to="/contact" onClick={closeMenu}>
                <FormattedMessage {...messages.contact} />
              </StyledNavLink>
            </NavItem>
            <NavItem className="mobile-language-selector">
              <LanguageSelector />
            </NavItem>
          </NavMenu>
          <NavRight>
            <div className="desktop-language-selector">
              <LanguageSelector />
            </div>
          </NavRight>
          <HamburgerButton onClick={toggleMenu} isOpen={isOpen}>
            <span />
            <span />
            <span />
          </HamburgerButton>
        </NavContainer>
      </Nav>
      <Overlay isOpen={isOpen} onClick={closeMenu} />
    </>
  );
}

export default Navigation;
