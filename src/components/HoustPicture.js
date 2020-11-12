import React from 'react';
import Logo from './UI/Logo/Logo';
import HeaderWrapper, { AvatarImage } from '../container/Layout/Header/Header.style';


export default function HoustPicture() {
  const avatarImg = `http://s3.amazonaws.com/redqteam.com/isomorphic-reloaded-image/profilepic.png`;
  return (
    <div style={{display: 'flex', 'align-items': 'center' }}>
        <AvatarImage>
          <Logo src={avatarImg} />
        </AvatarImage>
        <div style={{'font-weight': 'bold'}}>Andres Vasquez</div>
    </div>
  );
}
