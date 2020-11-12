import React from 'react';
import Footers from 'components/Footer/Footer';
import LogoImage from 'assets/images/logo.png';
import FooterMenu from './FooterMenu';

const LogoIcon = () => (
  <img src={LogoImage} alt="One Local Host" style={{width: "240px"}}/>
);

const Footer = () => {
  return (
    <Footers
      logo={<LogoIcon />}
      menu={<FooterMenu />}
      copyright={`Copyright @ ${new Date().getFullYear()} One Local Host.`}
    />
  );
};

export default Footer;
