import React from 'react';
import Card from 'components/UI/Card/Card';
import RenderReservationForm from './RenderReservationForm';

export default function Reservation({name, last_name, id, country, city, cellphone, country_code}) {
  return (
    <Card
      hoverable
      className=""
      content={<RenderReservationForm
        hostName={`${name} ${last_name}`}
        hostId={id}
        country={country}
        city={city}
        cellphone={cellphone}
        country_code={country_code}
        />}
    />
  );
}


