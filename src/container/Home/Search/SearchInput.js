import React , { useState, useEffect }from 'react';
import { Select } from 'antd';
import { firestore } from '../../../firebaseConfig';
const { Option } = Select;

const SearchInput = (props) => {
  const { inputExperience } = props;
  const [valueInput, setValueInput] = useState("Que quieres de tu viaje");
  const [children, setChildren] = useState([]);

  useEffect(() => {
    let queryRef = firestore.collection("experiences")
    const tmpExperience = []
    queryRef.get().then(async (snaps) => {
      snaps.docs.forEach(async (doc, index) =>{
        await tmpExperience.push(<Option key={index} value={doc.data().name}>{doc.data().name}</Option>);
      })
      setChildren(tmpExperience)
    })
  })
  const handleOnChange = (value) => {
      setValueInput(value);
      inputExperience(value);
  };
  return (
    <div className="map_autocomplete">
      <Select
      size="large"
      defaultValue={valueInput}
      bordered={false}
      style={{ width: "100%", backgroundColor: "#f7f7f7 !important", borderColor: "#f7f7f7 !important",     marginLeft: "2rem" }}
      onChange={handleOnChange}>
        {children}
      </Select>
    </div>
  );

}

export default SearchInput;
