import React, { useState, useContext } from 'react';
import Sticky from 'react-stickynode';
import { withRouter } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';
import { Button, Drawer } from 'antd';
import Logo from 'components/UI/Logo/Logo';
import Text from 'components/UI/Text/Text';
import TextLink from 'components/UI/TextLink/TextLink';
import Navbar from 'components/Navbar/Navbar';
import { AuthContext } from 'context/AuthProvider';
import { LayoutContext } from 'context/LayoutProvider';
import useWindowSize from 'library/hooks/useWindowSize';
import { AGENT_PROFILE_PAGE } from 'settings/constant';
import AuthMenu from './AuthMenu';
import MainMenu from './MainMenu';
import MobileMenu from './MobileMenu';
import ProfileMenu from './ProfileMenu';
import NavbarSearch from './NavbarSearch';
import HeaderWrapper, {
  MobileNavbar,
  CloseDrawer,
  AvatarWrapper,
  AvatarImage,
  AvatarInfo,
  LogoArea,
} from './Header.style';

import tripFinder from 'assets/images/logo.png';

const LogoIcon = () => (
  <img src={tripFinder} alt="One Local Host" style={{width: "140px"}}/>
);

export default withRouter(function Header({ location }) {
  const [{ searchVisibility }] = useContext(LayoutContext);
  const { loggedIn, user } = useContext(AuthContext);
  const { width } = useWindowSize();
  const [state, setState] = useState(false);
  const sidebarHandler = () => {
    setState(!state);
  };

  const logo = user !== null ? user.picture : ""
  const headerType = location.pathname === '/' ? 'transparent' : 'default';

  return (
    <HeaderWrapper>
      <Sticky
        top={headerType === 'transparent' ? -1 : 0}
        innerZ={10001}
        activeClass="isHeaderSticky"
      >
        {width > 991 ? (
          <Navbar
            logo={
              <>
                {headerType === 'transparent' && <LogoIcon />}
              </>
            }
            navMenu={<MainMenu />}
            authMenu={<AuthMenu />}
            isLogin={loggedIn}
            avatar={<Logo src={logo || ""} />}
            profileMenu={<ProfileMenu avatar={<Logo src={logo || ""} />} />}
            headerType={headerType}
            searchComponent={<NavbarSearch />}
            location={location}
            searchVisibility={searchVisibility}
          />
        ) : (
          <MobileNavbar className={headerType}>
            <LogoArea>
              <>
                {headerType === 'transparent' && <LogoIcon />}
              </>
              <NavbarSearch />
            </LogoArea>
            <Button
              className={`hamburg-btn ${state ? 'active' : ''}`}
              onClick={sidebarHandler}
            >
              <span />
              <span />
              <span />
            </Button>
            <Drawer
              placement="right"
              closable={false}
              onClose={sidebarHandler}
              width="285px"
              className="mobile-header"
              visible={state}
            >
              <CloseDrawer>
                <button onClick={sidebarHandler}>
                  <IoIosClose />
                </button>
              </CloseDrawer>
              {loggedIn ? (
                <AvatarWrapper>
                  <AvatarImage>
                    <Logo src={logo} />
                  </AvatarImage>
                  <AvatarInfo>
                    <Text as="h3" content="Nova Scotia" />
                    <TextLink
                      link={AGENT_PROFILE_PAGE}
                      content="View Profile"
                    />
                  </AvatarInfo>
                </AvatarWrapper>
              ) : (
                <AuthMenu className="auth-menu" />
              )}
              <MobileMenu className="main-menu" />
            </Drawer>
          </MobileNavbar>
        )}
      </Sticky>
    </HeaderWrapper>
  );
});
