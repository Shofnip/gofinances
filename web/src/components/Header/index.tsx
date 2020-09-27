import React from 'react';

import { NavLink } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <NavLink to="/" exact activeClassName="selected">
          Dashboard
        </NavLink>
        <NavLink to="/new-transaction" activeClassName="selected">
          Adicionar
        </NavLink>
        <NavLink to="/import" activeClassName="selected">
          Importar
        </NavLink>
      </nav>
    </header>
  </Container>
);

export default Header;
