import React from 'react';
import { Input } from 'antd';

const SearchInput = () => {
  return (
    <div className="map_autocomplete">
        <Input
          type="text"
          defaultValue=""
          value=''
          placeholder="Experiencia o palabra clave"
          size="large"
        />
    </div>
  );

}

export default SearchInput;
