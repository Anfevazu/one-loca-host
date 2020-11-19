import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';
import { REGISTRATION_PAGE } from 'settings/constant';
import SocialLogin from '../SocialLogin';
import Wrapper, {
  Title,
  TitleInfo,
  Text,
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
        <Title style={{'font-size': '30px', 'text-align': 'center'}}>Bienvenido a One Local Host</Title>
        <TitleInfo style={{'font-size': '18px', 'text-align': 'center'}}>Por favor ingresa a tu cuenta</TitleInfo>
        <Divider></Divider>
        <SocialLogin />
        <Text>
        ¿No tienes una cuenta?
          <Link to={REGISTRATION_PAGE}> Regístrate</Link>
        </Text>
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
