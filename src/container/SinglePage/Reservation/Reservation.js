import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Card from 'components/UI/Card/Card';
import Heading from 'components/UI/Heading/Heading';
import Text from 'components/UI/Text/Text';
import TextLink from 'components/UI/TextLink/TextLink';
import RenderReservationForm from './RenderReservationForm';

export default function Reservation({name, last_name, id, country, city}) {
  return (
    <Card
      hoverable
      className=""
      content={<RenderReservationForm hostName={`${name} ${last_name}`} hostId={id} country={country} city={city}/>}
    />
  );
}


