import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import Container from 'components/UI/Container/Container';
import AuthProvider from 'context/AuthProvider';
import ActiveTripsLists from './ActiveTripsLists';
import HistoryTripsList from './HistoryTripsList';
import {
  AGENT_PROFILE_FAVOURITE,
} from 'settings/constant';
import AgentDetailsPage, { NavigationArea } from './AgentDetails.style';

const ProfileNavigation = (props) => {
  const { match, className } = props;
  return (
    <NavigationArea>
      <Container fluid={true}>
        <Menu className={className}>
          <Menu.Item key="0">
            <NavLink exact to={`${match.url}`}>
              Mis viajes activos
            </NavLink>
          </Menu.Item>
          <Menu.Item key="1">
            <NavLink to={`${match.url}${AGENT_PROFILE_FAVOURITE}`}>
              Historial de viajes
            </NavLink>
          </Menu.Item>
        </Menu>
      </Container>
    </NavigationArea>
  );
};

const ProfileRoute = (props) => {
  const { match } = props;
  return (
    <Container fluid={true}>
      <Route exact path={`${match.path}`} component={ActiveTripsLists} />
      <Route
        path={`${match.path}${AGENT_PROFILE_FAVOURITE}`}
        component={HistoryTripsList}
      />
    </Container>
  );
};

export default function AgentDetailsViewPage(props) {
  return (
    <AgentDetailsPage>
      <AuthProvider>
        <ProfileNavigation {...props} />
        <ProfileRoute {...props} />
      </AuthProvider>
    </AgentDetailsPage>
  );
}
