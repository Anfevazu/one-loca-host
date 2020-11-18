// default data for filter elements
export const priceInit = {
  0: '$0',
  100: '$100',
};

export const calenderItem = {
  separator: '-',
  format: 'MM-DD-YYYY',
  locale: 'en',
};

export const getAmenities = {
  id: 1,
  name: 'Idiomas',
  identifier: 'amenities',
  options: [
    { label: 'Ingles', value: 'free-wifi' },
    { label: 'Espanol', value: 'free-parking' },
    { label: 'Aleman', value: 'breakfast' },
    { label: 'Frances', value: 'pool' },
    { label: 'Portugues', value: 'air-condition' },
    { label: 'Mandarin', value: 'hot-shower' },
    { label: 'Italiano', value: 'cable-tv' },
  ],
};

export const getPropertyType = {
  id: 2,
  name: 'Tipo de Host',
  identifier: 'property-type',
  options: [
    { label: 'Villa', value: 'villa' },
    { label: 'Hotel', value: 'hotel' },
    { label: 'Resort', value: 'resort' },
    { label: 'Cottage', value: 'cottage' },
    { label: 'Duplex', value: 'duplex' },
    { label: 'Landscape', value: 'landscape' },
  ],
};
