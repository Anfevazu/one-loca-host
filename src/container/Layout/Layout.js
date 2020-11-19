import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout as LayoutWrapper } from 'antd';
import LayoutProvider from 'context/LayoutProvider';
import {
  LOGIN_PAGE,
  REGISTRATION_PAGE,
  CHANGE_PASSWORD_PAGE,
  FORGET_PASSWORD_PAGE,
} from 'settings/constant';
import Header from './Header/Header';
import Footer from './Footer/Footer';
const { Content } = LayoutWrapper;

export default withRouter(function Layout({ children, location }) {
  // const { width } = useWindowSize();
  // const singlePageUrlFromConst = SINGLE_POST_PAGE.split('/');
  // const singlePageUrlFormLocation = location.pathname.split('/');

  return (
    <LayoutProvider>
      {location.pathname === LOGIN_PAGE ||
      location.pathname === CHANGE_PASSWORD_PAGE ||
      location.pathname === FORGET_PASSWORD_PAGE ||
      location.pathname === REGISTRATION_PAGE ? (
        <Content>{children}</Content>
      ) : (
        <Fragment>
          <Header />
          <Content>{children}</Content>
            <Fragment>
              <Footer />
            </Fragment>
        </Fragment>
      )}
    </LayoutProvider>
  );
});
