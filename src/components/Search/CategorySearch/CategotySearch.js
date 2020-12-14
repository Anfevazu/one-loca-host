import React from 'react';
import { Button, Checkbox } from 'antd';
import { ClearOutlined  } from '@ant-design/icons';
import ViewWithPopup from 'components/UI/ViewWithPopup/ViewWithPopup';
import { setStateToUrl, getStateFromUrl } from '../url_handler';
import {
  getExperiences,
  getLanguages,
  getCountries,
  getCities
} from '../SearchParams';
import CategroySearchWrapper from './CategorySearch.style';

const CategotySearch = ({ history, location }) => {
  const searchParams = getStateFromUrl(location);

  const state = {
    languages: searchParams.languages || [],
    // houst_type: searchParams.houst_type || [],
    experiences: searchParams.experiences || [],
    countries: searchParams.countries || [],
    cities: searchParams.cities || [],
  };
  const { languages, experiences, countries, cities } = state;
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

  const onSearchReset = () => {
    const search = setStateToUrl({ reset: '' });
    history.push({
      pathname: '/listing',
      search: search,
    });
    };

  return (
    <CategroySearchWrapper>
      <ViewWithPopup
        className={languages.length ? 'activated' : ''}
        key={getLanguages.id}
        noView={true}
        view={
          <Button type="default">
            {getLanguages.name}
            {languages.length > 0 && `: ${languages.length}`}
          </Button>
        }
        popup={
          <Checkbox.Group
            options={getLanguages.options}
            defaultValue={languages}
            onChange={(value) => onChange(value, 'languages')}
          />
        }
      />

      {/* <ViewWithPopup
        className={houst_type.length ? 'activated' : ''}
        key={getHousType.id}
        noView={true}
        view={
          <Button type="default">
            {getHousType.name}
            {houst_type.length > 0 && `: ${houst_type.length}`}
          </Button>
        }
        popup={
          <Checkbox.Group
            options={getHousType.options}
            defaultValue={houst_type}
            onChange={(value) => onChange(value, 'houst_type')}
          />
        }
      /> */}

      <ViewWithPopup
        className={experiences.length ? 'activated' : ''}
        key={getExperiences.id}
        noView={true}
        view={
          <Button type="default">
            {getExperiences.name}
            {experiences.length > 0 && `: ${experiences.length}`}
          </Button>
        }
        popup={
          <Checkbox.Group
            options={getExperiences.options}
            defaultValue={experiences}
            onChange={(value) => onChange(value, 'experiences')}
          />
        }
      />

      <ViewWithPopup
        className={countries.length ? 'activated' : ''}
        key={getCountries.id}
        noView={true}
        view={
          <Button type="default">
            {getCountries.name}
            {countries.length > 0 && `: ${countries.length}`}
          </Button>
        }
        popup={
          <Checkbox.Group
            options={getCountries.options}
            defaultValue={countries}
            onChange={(value) => onChange(value, 'countries')}
          />
        }
      />

      {countries.length > 0 ?
        (<ViewWithPopup
        className={cities.length ? 'activated' : ''}
        key={getCities(countries).id}
        noView={true}
        view={
          <Button type="default">
            {getCities(countries).name}
            {cities.length > 0 && `: ${cities.length}`}
          </Button>
        }
        popup={
          <Checkbox.Group
            options={getCities(countries).options}
            defaultValue={cities}
            onChange={(value) => onChange(value, 'cities')}
          />
        }
      />) : ("")}

      <div className="view_with__popup">
        <div className="popup_handler">
            <Button shape="circle" icon={<ClearOutlined />} onClick={onSearchReset}/>
        </div>
      </div>
    </CategroySearchWrapper>
  );
};

export default CategotySearch;
