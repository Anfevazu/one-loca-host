import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HOME_PAGE,
  PRICING_PLAN_PAGE,
} from 'settings/constant';

const MainMenu = ({ className }) => {
  return (
    <Menu className={className}>
      <Menu.Item key="0">
        <NavLink exact to={`${HOME_PAGE}`} className="menu-items">
          Tu Viaje
        </NavLink>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="https://houst.onelocalhost.com"  target="_blank" rel="noopener noreferrer">Quiero ser host</a>
      </Menu.Item>
      {/* <Menu.Item key="2">
        <NavLink to={`${MY_TRIPS}`}>Agent</NavLink>
      </Menu.Item> */}
      <Menu.Item key="3">
        <NavLink to={`${PRICING_PLAN_PAGE}`}>Cómo Funciona</NavLink>
      </Menu.Item>
    </Menu>
  );
};
export default MainMenu;
