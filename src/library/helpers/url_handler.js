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
        case 'experiences':
          urlData[key] = state[key]
          break;
        case 'location':
          if (state[key] && state[key].country) {
            urlData['countries'] = state[key].country;
          }
          if (state[key] && state[key].city) {
            urlData['cities'] = state[key].city;
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
        case 'countries':
          if (urlData['countries']) {
            state['location'] = {};
            state['location']['countries'] = urlData[key];
          } else {
            state['location'] = null;
          }
          break;
        case 'cities':
          if (urlData[key]) {
            state['location']['cities'] = urlData[key];
          }
          break;
        case 'experiences':
          console.log(urlData[key])
          if (urlData[key]) {
            state['experiences']= urlData[key];
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
