// default data for filter elements
import { firestore } from '../../firebaseConfig';

const languagesList = () => {
  let langTmp = []
  let optTmp = []
  let queryRef = firestore.collection("languages").doc("lang");
  queryRef.get()
  .then((doc) => {
     langTmp = doc.data().language
     langTmp.forEach(opt => {
      optTmp.push({label: opt, value: opt})
    })
  })
  return  optTmp;
}

const houstTypeList = () => {
  let housTmp = []
  let queryRef = firestore.collection("type_houst");
  queryRef.get()
  .then((doc) => {
    doc.forEach(opt => {
        housTmp.push({label: opt.data().name, value:opt.data().name})
    })
  })
  return housTmp;
}

const experienceList = () => {
  let expTmp = []
  let queryRef = firestore.collection("experiences");
  queryRef.get()
  .then((docs) => {
    docs.forEach(opt => {
      expTmp.push({label: opt.data().name, value:opt.data().name})
    })
  })
  return expTmp;
}

const CountryList = () => {
  let countryTmp = []
  let queryRef = firestore.collection("countries");
  queryRef.get()
  .then((docs) => {
    docs.forEach(opt => {
      countryTmp.push({label: opt.data().name, value:opt.data().name})
    })
  })
  return countryTmp;
}
const CityList = (countries) => {
  let cityTmp = []
  if(countries){
    let queryRef = firestore.collection("countries").where("name", "in", countries);
    queryRef.get()
    .then((docs) => {
      docs.forEach(opt => {
        opt.data().cities.forEach(city => {
          cityTmp.push({label: city.name, value: city.name})
        })
      })
    })
  }
  return cityTmp;
}

export const priceInit = {
  0: '$0',
  100: '$100',
};

export const calenderItem = {
  separator: '-',
  format: 'MM-DD-YYYY',
  locale: 'en',
};

export const getLanguages =  {
  id: 1,
  name: 'Idiomas',
  identifier: 'lenguages',
  options: languagesList()
};

export const getHousType = {
  id: 2,
  name: 'Tipo de Host',
  identifier: 'houst_type',
  options: houstTypeList(),
};

export const getExperiences = {
  id: 3,
  name: 'Experiencias',
  identifier: 'experiences',
  options: experienceList(),
};

export const getCountries = {
  id: 4,
  name: 'Países',
  identifier: 'countries',
  options: CountryList(),
};

export const getCities = (countries) =>  {
  return {
  id: 5,
  name: 'Ciudades',
  identifier: 'citys',
  options: CityList(countries)}
};
