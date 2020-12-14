export function createUrl(urlData) {
  const keys = Object.keys(urlData);
  let search = '?';
  keys.forEach(key => {
    if (urlData[key] !== null && urlData[key] !== '') {
      search += `${key}=${urlData[key]}&`;
    }
  });
  return search.substring(0, search.length - 1);
}

export function getUrl(location) {
  // const location = location;
  const data =
    process.browser && location.search
      ? location.search.slice(location.search.indexOf('?') + 1).split('&')
      : [];
  const urlData = {};
  data.forEach(data => {
    try {
      data = data.split('=');
      const dataVal = decodeURIComponent(data[1]);
      urlData[data[0]] = dataVal;
    } catch (e) {}
  });
  return urlData;
}
export function setStateToUrl(state) {
  let urlData = {};
  for (const key in state) {
    if (state.hasOwnProperty(key)) {
      switch (key) {
        case 'languages':
          urlData[key] =
            state[key] && state[key].length ? state[key].join() : null;
          break;
        // case 'houst_type':
        //   urlData[key] =
        //     state[key] && state[key].length ? state[key].join() : null;
        //   break;
        case 'experiences':
          urlData[key] =
            state[key] && state[key].length ? state[key].join() : null;
          break;
        case 'countries':
          urlData[key] =
            state[key] && state[key].length ? state[key].join() : null;
          break;
        case 'cities':
          urlData[key] =
            state[key] && state[key].length ? state[key].join() : null;
          break;
        case 'location':
          if (state[key] && state[key].lat) {
            urlData[`${key}_lat`] = state[key].lat;
          }
          if (state[key] && state[key].lng) {
            urlData[`${key}_lng`] = state[key].lng;
          }
          break;
        case 'reset':
          urlData = state[key];
          break;

        default:
          urlData[key] = state[key];
          break;
      }
    }
  }
  return createUrl(urlData);
}

export function getStateFromUrl(location) {
  const urlData = getUrl(location);
  const state = {};
  for (const key in urlData) {
    if (urlData.hasOwnProperty(key)) {
      switch (key) {
        case 'languages':
          state[key] =
            urlData[key] && urlData[key] !== 'null'
              ? urlData[key].split(',')
              : [];
          break;
        case 'experiences':
          state[key] =
            urlData[key] && urlData[key] !== 'null'
              ? urlData[key].split(',')
              : [];
          break;
        case 'countries':
          state[key] =
            urlData[key] && urlData[key] !== 'null'
              ? urlData[key].split(',')
              : [];
          break;
        case 'cities':
          state[key] =
            urlData[key] && urlData[key] !== 'null'
              ? urlData[key].split(',')
              : [];
          break;
        // case 'houst_type':
        //   state[key] =
        //     urlData[key] && urlData[key] !== 'null'
        //       ? urlData[key].split(',')
        //       : [];
        //   break;
        case 'location_lat':
          if (urlData['location_lat']) {
            state['location'] = {};
            state['location']['lat'] = Number(urlData[key]);
          } else {
            state['location'] = null;
          }
          break;

        case 'location_lng':
          if (urlData[key]) {
            state['location']['lng'] = Number(urlData[key]);
          }
          break;

        case 'page':
          if (urlData[key]) {
            state['page'] = Number(urlData[key]);
          }
          break;

        case 'limit':
          if (urlData[key]) {
            state['limit'] = Number(urlData[key]);
          }
          break;

        default:
          state[key] = urlData[key];
          break;
      }
    }
  }
  return state;
}
