import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';

import {
  HOME_PAGE,
  LISTING_POSTS_PAGE,
  AGENT_PROFILE_PAGE,
  PRICING_PLAN_PAGE,
} from 'settings/constant';

const MainMenu = ({ className }) => {
  return (
    <Menu className={className}>
      <Menu.Item key="0">
        <NavLink exact to={`${HOME_PAGE}`} className="menu-items">
          Inicio
        </NavLink>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="https://houst.onelocalhost.com"  target="_blank">Quiero ser host</a>
      </Menu.Item>
      {/* <Menu.Item key="2">
        <NavLink to={`${AGENT_PROFILE_PAGE}`}>Agent</NavLink>
      </Menu.Item> */}
      <Menu.Item key="3">
        <NavLink to={`${PRICING_PLAN_PAGE}`}>Precios</NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default MainMenu;
