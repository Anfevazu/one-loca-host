import React, { useContext, useState, useRef } from 'react';
import { Menu } from 'antd';
import useOnClickOutside from 'library/hooks/useOnClickOutside';
import { NavLink, withRouter } from 'react-router-dom';
import { AuthContext } from 'context/AuthProvider';
import {
  AGENT_PROFILE_PAGE,
  AGENT_ACCOUNT_SETTINGS_PAGE
} from 'settings/constant';
import Text from 'components/UI/Text/Text';

const ProfileMenu = ({ avatar, history }) => {
  const { logOut } = useContext(AuthContext);
  const [state, setState] = useState(false);

  const handleDropdown = () => {
    setState(!state);
  };

  const closeDropdown = () => {
    setState(false);
  };

  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setState(false));
  function handleLogout() {
    logOut();
    history.push('/');
  }

  return (
    <div className="avatar-dropdown" ref={dropdownRef}>
      <div className="dropdown-handler" onClick={handleDropdown}>
       {avatar}
      </div>

      <Menu className={`dropdown-menu ${state ? 'active' : 'hide'}`}>
        <Menu.Item onClick={closeDropdown} key="0">
          <NavLink to={AGENT_PROFILE_PAGE}>Mis Viajes</NavLink>
        </Menu.Item>
        {/* <Menu.Item onClick={closeDropdown} key="1">
          <NavLink to={ADD_HOTEL_PAGE}>Add Hotel</NavLink>
        </Menu.Item> */}
        <Menu.Item onClick={closeDropdown} key="1">
          <NavLink to={AGENT_ACCOUNT_SETTINGS_PAGE}>Mi cuenta</NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <button onClick={handleLogout}>Salir</button>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default withRouter(ProfileMenu);
