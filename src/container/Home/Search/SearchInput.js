import React , { useState }from 'react';
import { Input } from 'antd';

const SearchInput = (props) => {

  const { inputExperience } = props;
  const [valueInput, setValueInput] = useState("");
  const handleOnChange = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setValueInput(event.target.value);
      inputExperience(valueInput);
  };
  return (
    <div className="map_autocomplete">
        <Input
          type="text"
          defaultValue=""
          placeholder="Experiencia o palabra clave"
          size="large"
          value={valueInput || ''}
          onChange={handleOnChange}
        />
    </div>
  );

}

export default SearchInput;
