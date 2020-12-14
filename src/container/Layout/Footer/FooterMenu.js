import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';

import {
  HOME_PAGE,
  LISTING_POSTS_PAGE,
  PRICING_PLAN_PAGE,
  PRIVACY_PAGE,
  CONTACT_US
} from 'settings/constant';

const FooterMenu = () => {
  return (
    <Menu>
      <Menu.Item key="0">
        <NavLink to={`${HOME_PAGE}`}>Tu Viaje</NavLink>
      </Menu.Item>
      <Menu.Item key="1">
        <NavLink to={`${LISTING_POSTS_PAGE}`}>Quiero ser host</NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <NavLink to={`${PRICING_PLAN_PAGE}`}>Cómo Funciona</NavLink>
      </Menu.Item>
      <Menu.Item key="3">
        <NavLink to={`${CONTACT_US}`}>Contáctanos</NavLink>
      </Menu.Item>
      <Menu.Item key="4">
        <NavLink to={`${PRIVACY_PAGE}`}>Politicas de privacidad</NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default FooterMenu;
