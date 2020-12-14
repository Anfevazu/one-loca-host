import React from 'react';
import PropTypes from 'prop-types';
import FooterWrapper, {
  MenuWrapper,
  CopyrightArea,
  SecondaryFooter,
} from './Footer.style';
import {
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoInstagram,
} from 'react-icons/io';
import { Popover } from 'antd';
import {SocialAccount} from '../../container/Agent/AccountDetails/AgentDetails.style';

const Footer = ({ logo, menu, bgSrc, copyright, className, path }) => {
  return (
    <>
      <FooterWrapper id="footer" className={className} bg-img={bgSrc}>
        {logo && logo}
        {menu && <MenuWrapper>{menu}</MenuWrapper>}
        {copyright && <CopyrightArea>{copyright}</CopyrightArea>}
        <br/>
        <SocialAccount>
              <Popover content="Twitter">
                <a
                  href="https://twitter.com/onelocalhost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoTwitter className="twitter" />
                </a>
              </Popover>
              <Popover content="Facebook">
                <a
                  href="https://www.facebook.com/One-Local-Host-104898808076788"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoFacebook className="facebook" />
                </a>
              </Popover>
              <Popover content="Instagram">
                <a
                  href="https://www.instagram.com/onelocalhost/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoInstagram className="instagram" />
                </a>
              </Popover>
            </SocialAccount>
      </FooterWrapper>
      {!!path && <SecondaryFooter />}
    </>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
  logo: PropTypes.element,
  menu: PropTypes.element,
  bgSrc: PropTypes.string,
  copyright: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default Footer;
