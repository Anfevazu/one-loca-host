import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';
import { LOGIN_PAGE } from 'settings/constant';
import SocialLogin from '../SocialLogin';
import signInImage from 'assets/images/cover.png';
import LogoImage from 'assets/images/logo.png';
import { NavLink } from 'react-router-dom';
import {HOME_PAGE} from 'settings/constant';
import Wrapper, {
  Title,
  TitleInfo,
  Text,
  FormWrapper,
  BannerWrapper,
} from '../Auth.style';

const LogoIcon = () => (
  <div style={{display:'flex', width:'100%', 'align-items': 'center', 'justify-content':'center'}}>
    <NavLink to={`${HOME_PAGE}`}>
      <img src={LogoImage} alt="One Local Host" style={{width: "240px"}}/>
    </NavLink>
  </div>
);

const SignUp = () => {
  return (
    <Wrapper>
      <FormWrapper>
        <LogoIcon />
        <Title style={{'font-size': '30px', 'text-align': 'center'}}>Bienvenido a One Local Host</Title>
        <TitleInfo style={{'font-size': '18px', 'text-align': 'center'}}>Regístrate para que encuentres el mejor host para tu viaje</TitleInfo>
        <Divider></Divider>
        <SocialLogin />
        <Text>
        ¡Ya tienes una cuenta! &nbsp;
          <Link to={LOGIN_PAGE}>Iniciar sesión</Link>
        </Text>
      </FormWrapper>
      <BannerWrapper>
        <div
          style={{
            backgroundImage: `url(${signInImage})` ,
            backgroundPosition: 'center center',
            height: '100vh',
            backgroundSize: 'cover',
          }}
        />
      </BannerWrapper>
    </Wrapper>
  );
};

export default SignUp;
