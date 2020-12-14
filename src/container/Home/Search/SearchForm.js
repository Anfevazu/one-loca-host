import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { FaMapMarkerAlt, FaUserCircle } from 'react-icons/fa';
import { Button, message } from 'antd';
import MapAutoComplete from 'components/Map/MapAutoComplete';
import { mapDataHelper } from 'components/Map/mapDataHelper';
import { setStateToUrl } from 'library/helpers/url_handler';
import { LISTING_POSTS_PAGE } from 'settings/constant';
import SearchPointer from './SearchPointer';
import SearchInput from './SearchInput';

import {

  FormWrapper,
  ComponentWrapper,
} from './Search.style';

const SearchForm = ({ history }) => {
  const [mapValue, setMapValue] = useState([]);
  const [experiences, setExperienceValue] =  useState("");

  const updatevalueFunc = (event) => {
    const { searchedPlaceAPIData } = event;
    if (!isEmpty(searchedPlaceAPIData)) {
      setMapValue(searchedPlaceAPIData);
    }
  };
  const updateExperienceValue = (value) => {
    setExperienceValue(value)
  }
  const goToSearchPage = () => {
    let tempLocation = [];
    const mapData = mapValue ? mapDataHelper(mapValue) : [];
    if (mapData.length <= 0){
      message.error('Debes selecionar un destino para continuar !');
      return 0;
    }
    mapData &&
      mapData.map((singleMapData, i) => {
        return tempLocation.push({
          city: singleMapData.city,
          country: singleMapData.country_long,
          country_short: singleMapData.country_short,
          formattedAddress: singleMapData ? singleMapData.formattedAddress : '',
          lat: singleMapData ? singleMapData.lat.toFixed(3) : null,
          lng: singleMapData ? singleMapData.lng.toFixed(3) : null,
        });
      });
    const location = tempLocation ? tempLocation[0] : {};
    const query = {
      location,
      experiences
    };
    const search = setStateToUrl(query);
    history.push({
      pathname: LISTING_POSTS_PAGE,
      search: search,
    });
  };

  return (
    <FormWrapper>
      <ComponentWrapper>
        <FaMapMarkerAlt className="map-marker" />
        <MapAutoComplete updatevalue={(value) => updatevalueFunc(value)} />
        <SearchPointer/>
      </ComponentWrapper>
      <ComponentWrapper>
        <FaUserCircle className="user-friends" />
        <SearchInput inputExperience={(value) => updateExperienceValue(value)}/>
      </ComponentWrapper>

      <Button
        type="primary"
        htmlType="submit"
        size="large"
        onClick={goToSearchPage}>
        <span style={{color: "#2a537e"}}>Buscar Anfitrión</span>
      </Button>
    </FormWrapper>
  );
};

export default withRouter(SearchForm);
