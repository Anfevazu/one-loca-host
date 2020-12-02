import React, { useState } from 'react';
import { Marker } from 'react-google-maps';
import HotelInfoWindow from './MapInfoWindow';
import MakerImage from './point1.png';

const HotelMapMarkerCluster = ({ location }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [markerIndex, setMarkerIndex] = useState(0);
  let hotelData = [];

  const infoWindowToggle = (index) => {
    setIsOpen(!isOpen);
    setMarkerIndex(index);
  };

  location &&
    location.forEach((item) => {
      hotelData.push({
        id: item.id,
        lat: parseFloat(item.location.lat),
        lng: parseFloat(item.location.lng),
        name: item.name,
        last_name: item.last_name,
        picture: item.picture,
        thumbUrl: item.gallery.length > 0 ? item.gallery[0].url : null,
        formattedAddress: `${item.country}, ${item.city}`,
        profile: item.profile,
        rating: item.rating,
        ratingCount: item.ratingCount,
      });
    });

  return hotelData.map((singlePostLoaction, index) => {
    return (
      <Marker
        key={index}
        icon={MakerImage}
        position={singlePostLoaction}
        onClick={() => infoWindowToggle(singlePostLoaction.id)}
      >
        {isOpen && markerIndex === singlePostLoaction.id ? (
          <HotelInfoWindow
            data={singlePostLoaction}
            onCloseClick={() => infoWindowToggle(singlePostLoaction.id)}
          />
        ) : (
          ''
        )}
      </Marker>
    );
  });
};

export default HotelMapMarkerCluster;
