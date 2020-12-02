import React from 'react';
import { InfoWindow } from 'react-google-maps';
import Rating from 'components/UI/Rating/Rating';
import GridCard from '../GridCard/GridCard';

const MapInfoWindow = ({ data, onCloseClick }) => {
  return (
    <InfoWindow id={data?.id} onCloseClick={onCloseClick}>
      <GridCard
        className="info_window_card"
        location={data?.formattedAddress}
        name={data?.name}
        last_name={data?.last_name}
        profile={data?.profile}
        picture={data?.picture}
        rating={
          <Rating
            rating={data?.rating}
            ratingCount={data?.ratingCount}
            type="bulk"
          />
        }
      >
        {data?.thumbUrl ? (<img src={data?.thumbUrl} alt="img" />) : ''}
      </GridCard>
    </InfoWindow>
  );
};

export default MapInfoWindow;
