import React from 'react';
import Logo from './UI/Logo/Logo';
import { capitalize } from "lodash";
import { AvatarImage } from '../container/Layout/Header/Header.style';


export default function HoustPicture(props) {
  const {picture, name, last_name} = props;
  return (
    <div style={{display: 'flex', 'alignItems': 'center' }}>
        <AvatarImage>
          <Logo src={picture} />
        </AvatarImage>
    <div style={{'fontWeight': 'bold'}}>
      {capitalize(name)+' '+capitalize(last_name)}
    </div>
    </div>
  );
}
