import React from 'react';
import { withRouter } from 'react-router-dom';
import { NavbarSearchWrapper } from './Header.style';
import tripFinder from 'assets/images/logo.png';
import Heading from 'components/UI/Heading/Heading';
import useWindowSize from 'library/hooks/useWindowSize';

const NavbarSearch = ({location}) => {
  const { width } = useWindowSize();

  return (
    <>
    { location.pathname !== '/' ?
      (<NavbarSearchWrapper className="navbar_search">
      { width > 991 ?
      (<LogoIcon />) : ""}
      <Heading as="h3" content="¡Encuentra tu anfitrión local a la medida de tus necesidades!" style={{textAlign: 'center'}}/>
    </NavbarSearchWrapper>) : ""
    }
  </>
  );
};

const LogoIcon = () => (
  <img src={tripFinder} alt="One Local Host" style={{width: "140px"}}/>
);
export default withRouter(NavbarSearch);
