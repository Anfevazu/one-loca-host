import React from 'react';
import Logo from './UI/Logo/Logo';
import { AvatarImage } from '../container/Layout/Header/Header.style';


export default function HoustPicture(props) {
  const {picture} = props;
  return (
    <div style={{display: 'flex', 'alignItems': 'center' }}>
        <AvatarImage>
          <Logo src={picture} />
        </AvatarImage>
        <div style={{'fontWeight': 'bold'}}>Andres Vasquez</div>
    </div>
  );
}
