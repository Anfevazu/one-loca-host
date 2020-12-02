import React, {useState, useEffect} from 'react';
import isEmpty from 'lodash/isEmpty';
import Map from 'components/Map/Map';
import useDataApi from 'library/hooks/useDataApi';
import { FixedMap } from './Listing.style';

const ListingMap = ({houstList}) => {
  console.log(houstList)
  const loading = false
  const data = houstList;

  if (isEmpty(data) || loading) return <div>Loading</div>;

  return (
    <FixedMap>
      <Map location={data} multiple={true} />
    </FixedMap>
  );
};

export default ListingMap;
