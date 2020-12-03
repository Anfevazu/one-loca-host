import React from 'react';
import { Divider } from 'antd';
import SocialLogin from '../SocialLogin';
import Wrapper, {
  Title,
  TitleInfo,
  FormWrapper,
  BannerWrapper,
} from '../Auth.style';
// demo image
import signInImage from 'assets/images/cover.png';
import LogoImage from 'assets/images/logo.png';
import { NavLink } from 'react-router-dom';
import {HOME_PAGE} from 'settings/constant';

const LogoIcon = () => (
    <div style={{display:'flex', width:'100%', 'alignItems': 'center', 'justifyContent':'center'}}>
      <NavLink to={`${HOME_PAGE}`}>
        <img src={LogoImage} alt="One Local Host" style={{width: "240px"}}/>
      </NavLink>
    </div>
);
const SignIn = () => {
  return (
    <Wrapper>
      <FormWrapper>
        <LogoIcon />
        <Title style={{fontSize: '30px', textAlign: 'center'}}>Bienvenido a One Local Host</Title>
        <TitleInfo style={{fontSize: '18px', textAlign: 'center'}}>Por favor ingresa a tu cuenta</TitleInfo>
        <Divider></Divider>
        <SocialLogin />
        {/* <Text>
        ¿No tienes una cuenta?
          <Link to={REGISTRATION_PAGE}> Regístrate</Link>
        </Text> */}
      </FormWrapper>
      <BannerWrapper>
        <div
          style={{
            backgroundImage: `url(${signInImage})`,
            backgroundPosition: 'center center',
            height: '100vh',
            backgroundSize: 'cover',
          }}
        />
      </BannerWrapper>
    </Wrapper>
  );
};

export default SignIn;
