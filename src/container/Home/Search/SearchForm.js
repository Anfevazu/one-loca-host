import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { FaMapMarkerAlt, FaCalendarDay, FaUserCircle } from 'react-icons/fa';
import { Button } from 'antd';
import DateRangePickerBox from 'components/UI/DatePicker/ReactDates';
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

const calendarItem = {
  separator: '-',
  format: 'DD-MM-YYYY',
  locale: 'es',
};

const SearchForm = ({ history }) => {
  const [searchDate, setSearchDate] = useState({
    setStartDate: null,
    setEndDate: null,
  });
  const [mapValue, setMapValue] = useState([]);
  const [experience, setExperienceValue] =  useState("");

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
    console.log(experience)
    let tempLocation = [];
    const mapData = mapValue ? mapDataHelper(mapValue) : [];
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
      date_range: searchDate,
      location,
      experience
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
        <FaCalendarDay className="calendar" />
        <DateRangePickerBox
          item={calendarItem}
          startDatePlaceholderText="Fecha inicio"
          startDateId="startDateId-id-home"
          endDateId="endDateId-id-home"
          endDatePlaceholderText="Fecha Final"
          updateSearchData={(setDateValue) => setSearchDate(setDateValue)}
          showClearDates={true}
          small={true}
          numberOfMonths={2}
        />
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
        <span style={{color: "#2a537e"}}>Buscar host</span>
      </Button>
    </FormWrapper>
  );
};

export default withRouter(SearchForm);
