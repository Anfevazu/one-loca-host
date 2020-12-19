import React from 'react';
import { Route,  Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Layout from './container/Layout/Layout';
import {
  LOGIN_PAGE,
  REGISTRATION_PAGE,
  FORGET_PASSWORD_PAGE,
  HOME_PAGE,
  LISTING_POSTS_PAGE,
  SINGLE_POST_PAGE,
  MY_TRIPS,
  PRIVACY_PAGE,
  PRICING_PLAN_PAGE,
  CONTACT_US,
  CHECKOUT
} from './settings/constant';

/**
 *
 * Public Routes
 *
 */
const Loading = () => null;

const routes = [
  {
    path: HOME_PAGE,
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "Home" */ './container/Home/Home'),
      loading: Loading,
      modules: ['Home'],
    }),
    exact: true,
  },
  {
    path: LOGIN_PAGE,
    component: Loadable({
      loader: () =>
        import(
          /* webpackChunkName: "SignIn" */ './container/Auth/SignIn/SignIn'
        ),
      loading: Loading,
      modules: ['SignIn'],
    }),
  },
  {
    path: REGISTRATION_PAGE,
    component: Loadable({
      loader: () =>
        import(
          /* webpackChunkName: "SignUp" */ './container/Auth/SignUp/SignUp'
        ),
      loading: Loading,
      modules: ['SignUp'],
    }),
  },
  {
    path: FORGET_PASSWORD_PAGE,
    component: Loadable({
      loader: () =>
        import(
          /* webpackChunkName: "ForgetPassword" */ './container/Auth/ForgetPassword'
        ),
      loading: Loading,
      modules: ['ForgetPassword'],
    }),
  },
  {
    path: `${SINGLE_POST_PAGE}/:slug`,
    component: Loadable({
      loader: () =>
        import(
          /* webpackChunkName: "SinglePageView" */ './container/SinglePage/SinglePageView'
        ),
      loading: Loading,
      modules: ['SinglePageView'],
    }),
  },
  {
    path: LISTING_POSTS_PAGE,
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "Listing" */ './container/Listing/Listing'),
      loading: Loading,
      modules: ['Listing'],
    }),
  },
  {
    path: MY_TRIPS,
    component: Loadable({
      loader: () =>
        import(
          /* webpackChunkName: "AgentDetailsViewPage" */ './container/Profile/TripsDetail/HistoryTripsDetails'
        ),
      loading: Loading,
      modules: ['AgentDetailsViewPage'],
    }),
  },
  {
    path: PRIVACY_PAGE,
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "privacy" */ './container/Privacy/Privacy'),
      loading: Loading,
      modules: ['Privacy'],
    }),
  },
  {
    path: CONTACT_US,
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "privacy" */ './container/ContactUs/ContactUs'),
      loading: Loading,
      modules: ['ContactUs'],
    }),
  },
  {
    path: PRICING_PLAN_PAGE,
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "Pricing" */ './container/Pricing/Pricing'),
      loading: Loading,
      modules: ['Pricing'],
    }),
  },
  {
    path: CHECKOUT,
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "Pricing" */ './container/Checkout/Checkout'),
      loading: Loading,
      modules: ['Checkout'],
    }),
  },
  {
    path: '/success',
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "Success" */ './container/Payments/Success'),
      loading: Loading,
      modules: ['Success'],
    }),
  },
  {
    path: '/failure',
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "Failure" */ './container/Payments/Failure'),
      loading: Loading,
      modules: ['Failure'],
    }),
  },
  {
    path: '/account-settings',
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "AgentAccountSettingsPage" */ './container/Profile/AccountSettings/AgentAccountSettingsPage'),
      loading: Loading,
      modules: ['AgentAccountSettingsPage'],
    }),
  },
];

/**
 *
 * Not Found Route Component
 *
 */

const NotFound = Loadable({
  path: "404",
  loader: () =>
    import(/* webpackChunkName: "NotFound" */ './container/404/404'),
  loading: Loading,
  modules: ['NotFound'],
});

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const { loggedIn } = useContext(AuthContext);
//   return (
//     <Route
//       render={(props) =>
//         loggedIn ? <Component {...props} /> : <Redirect to={LOGIN_PAGE} />
//       }
//       {...rest}
//     />
//   );
// };

/**
 *
 * Overall Router Component
 *
 */
const Routes = () => {
  return (
    <Layout>
      <Switch>
        {routes.map(({ path, component, exact = false }) => (
          <Route key={path} path={path} exact={exact} component={component} />
        ))}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default Routes;
