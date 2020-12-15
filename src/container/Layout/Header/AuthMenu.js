import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';

import { LOGIN_PAGE } from 'settings/constant';

const AuthMenu = ({ className }) => {
  return (
    <Menu className={className}>
      {/* <Menu.Item key="0">
        <NavLink to={LOGIN_PAGE}>Login</NavLink>
      </Menu.Item> */}
      <Menu.Item key="1">
      <NavLink to={LOGIN_PAGE} style={{width: '100px', borderRadius: '8px'}}>Registrate</NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default AuthMenu;
