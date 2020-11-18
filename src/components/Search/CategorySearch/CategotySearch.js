import React, { useState } from 'react';
import moment from 'moment';
import { Button, Slider, Checkbox, Tooltip } from 'antd';
import { ClearOutlined  } from '@ant-design/icons';
import ViewWithPopup from 'components/UI/ViewWithPopup/ViewWithPopup';
import InputIncDec from 'components/UI/InputIncDec/InputIncDec';
import DateRangePickerBox from 'components/UI/DatePicker/ReactDates';
import { setStateToUrl, getStateFromUrl } from '../url_handler';
import {
  priceInit,
  calenderItem,
  getAmenities,
  getPropertyType,
} from '../SearchParams';
import CategroySearchWrapper, {
  RoomGuestWrapper,
  ItemWrapper,
  ActionWrapper,
} from './CategorySearch.style';

const CategotySearch = ({ history, location }) => {
  const searchParams = getStateFromUrl(location);
  const state = {
    amenities: searchParams.amenities || [],
    property: searchParams.property || [],
    date_range: searchParams.date_range || {
      setStartDate: null,
      setEndDate: null,
    },
    price: searchParams.price || {
      min: 0,
      max: 100,
      defaultMin: 0,
      defaultMax: 100,
    },
    location: searchParams.location || {
      lat: null,
      lng: null,
    },
    room: parseInt(searchParams.room) || 0,
    guest: parseInt(searchParams.guest) || 0,
  };
  const { amenities, property, date_range, price, room, guest } = state;
  const [countRoom, setRoom] = useState(room);
  const [countGuest, setGuest] = useState(guest);

  const onChange = (value, type) => {
    const query = {
      ...state,
      [type]: value,
    };
    const search = setStateToUrl(query);
    history.push({
      pathname: '/listing',
      search: search,
    });
  };

  const handleRoomGuestApply = () => {
    const query = {
      ...state,
      room: countRoom,
      guest: countGuest,
    };
    const search = setStateToUrl(query);
    history.push({
      pathname: '/listing',
      search: search,
    });
  };

  const handleRoomGuestCancel = () => {
    setRoom(0);
    setGuest(0);
    const query = {
      ...state,
      room: 0,
      guest: 0,
    };
    const search = setStateToUrl(query);
    history.push({
      pathname: '/listing',
      search: search,
    });
  };

  const onSearchReset = () => {
    setRoom(0);
    setGuest(0);
    const search = setStateToUrl({ reset: '' });
    history.push({
      pathname: '/listing',
      search: search,
    });
  };

  return (
    <CategroySearchWrapper>
      <ViewWithPopup
        className={amenities.length ? 'activated' : ''}
        key={getAmenities.id}
        noView={true}
        view={
          <Button type="default">
            {getAmenities.name}
            {amenities.length > 0 && `: ${amenities.length}`}
          </Button>
        }
        popup={
          <Checkbox.Group
            options={getAmenities.options}
            defaultValue={amenities}
            onChange={(value) => onChange(value, 'amenities')}
          />
        }
      />

      <ViewWithPopup
        className={property.length ? 'activated' : ''}
        key={getPropertyType.id}
        noView={true}
        view={
          <Button type="default">
            {getPropertyType.name}
            {property.length > 0 && `: ${property.length}`}
          </Button>
        }
        popup={
          <Checkbox.Group
            options={getPropertyType.options}
            defaultValue={property}
            onChange={(value) => onChange(value, 'property')}
          />
        }
      />

      <ViewWithPopup
        className={
          Object.keys('date_range').length !== null &&
          date_range.setStartDate !== null
            ? 'activated'
            : ''
        }
        key={400}
        noView={true}
        view={<Button type="default">Elegir Fecha</Button>}
        popup={
          <DateRangePickerBox
            startDateId="startDate-id-category"
            endDateId="endDate-id-category"
            startDate={
              date_range.setStartDate ? moment(date_range.setStartDate) : null
            }
            endDate={
              date_range.setEndDate ? moment(date_range.setEndDate) : null
            }
            numberOfMonths={1}
            small={true}
            item={calenderItem}
            updateSearchData={(value) => onChange(value, 'date_range')}
          />
        }
      />

      <ViewWithPopup
        className={property.length ? 'activated' : ''}
        key={getPropertyType.id}
        noView={true}
        view={
          <Button type="default">
            Habilidades
          </Button>
        }
        popup={
          <Checkbox.Group
            options={getPropertyType.options}
            defaultValue={property}
            onChange={(value) => onChange(value, 'property')}
          />
        }
      />

    <ViewWithPopup
        className={property.length ? 'activated' : ''}
        key={getPropertyType.id}
        noView={true}
        view={
          <Button type="default">
            Experiencias
          </Button>
        }
        popup={
          <Checkbox.Group
            options={getPropertyType.options}
            defaultValue={property}
            onChange={(value) => onChange(value, 'property')}
          />
        }
      />
      <div className="view_with__popup">
        <div className="popup_handler">
            <Button shape="circle" icon={<ClearOutlined />} onClick={onSearchReset}/>
        </div>
      </div>
    </CategroySearchWrapper>
  );
};

export default CategotySearch;
