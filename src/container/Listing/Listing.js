import React, { useState, Fragment, useEffect } from 'react';
import Sticky from 'react-stickynode';
import Toolbar from 'components/UI/Toolbar/Toolbar';
import { Checkbox } from 'antd';
import CategotySearch from 'components/Search/CategorySearch/CategotySearch';
import { PostPlaceholder } from 'components/UI/ContentLoader/ContentLoader';
import SectionGrid from 'components/SectionGrid/SectionGrid';
import ListingMap from './ListingMap';
import FilterDrawer from 'components/Search/MobileSearchView';
import useWindowSize from 'library/hooks/useWindowSize';
import { SINGLE_POST_PAGE } from 'settings/constant';
import ListingWrapper, { PostsWrapper, ShowMapCheckbox } from './Listing.style';
import ListingNotFound from './ListingNotFound';
import { firestore } from '../../firebaseConfig';


 const Listing = ({ location, history }) =>  {
  const loadMoreData = () => {}
  const total = 0
  const limit = 0
  const urlParams = new  URLSearchParams(location.search);
  // Params querie
  const params = {
    country: urlParams.get('countries'),
    city: urlParams.get('cities'),
    experience : urlParams.get('experiences'),
    languages: urlParams.get('languages')
  }

  const { width } = useWindowSize();
  const [showMap, setShowMap] = useState(false);
  const [data, setData ]  = useState([]);
  const [loading, setLoading ]  = useState(true);

  let columnWidth = [1 / 1, 1 / 2, 1 / 3, 1 / 4, 1 / 5];

  const removeDuplicates = (array, key) => {
    return array.reduce((arr, item) => {
      const removed = arr.filter(i => i[key] !== item[key]);
      return [...removed, item];
    }, []);
  };
  const getData = (queryRef) => {
    const houstTmp = []
    queryRef.get().then(async (snaps) => {
      snaps.docs.forEach(async doc => {
        await houstTmp.push(doc.data())
      })
      setData((st) => {
        let tmp = st.concat(houstTmp)
        let disTmp = removeDuplicates(tmp, 'id')
        return disTmp
      })
    })
  }
  useEffect(() => {
    let queryRef;
    if(location.search === ""){
      setData([])
    }

    if(params.city){
      queryRef = firestore.collection("houst").where("city", "in", params.city.split(","))
      getData(queryRef)
    }
    if(params.country){
      queryRef = firestore.collection("houst").where("country", "in", params.country.split(","))
      getData(queryRef)
    }
    if(params.experience){
      queryRef = firestore.collection("houst").where("category", "in", params.experience.split(","))
      getData(queryRef)
    }
    if(params.languages){
      queryRef = firestore.collection("houst").where("languages", "array-contains-any", params.languages.split(","))
      getData(queryRef)
    }
    if(!params.city && !params.country && !params.experience && !params.houst_type && !params.languages){
      queryRef = firestore.collection("houst").where("rating", ">=", 3).orderBy("rating", "desc")
      setData([])
      getData(queryRef)
    }
    setLoading(false)
  }, [location.search]);

  if (showMap) {
    columnWidth = [1 / 1, 1 / 2, 1 / 2, 1 / 2, 1 / 3];
  }
  const handleMapToggle = () => {
    setShowMap((showMap) => !showMap);
  };
  return (
    <ListingWrapper>
      <Sticky top={82} innerZ={999} activeClass="isHeaderSticky">
        <Toolbar
          left={
            width > 991 ? (
              <CategotySearch history={history} location={location} />
            ) : (
              <FilterDrawer history={history} location={location} />
            )
          }
          right={
            <ShowMapCheckbox>
              <Checkbox defaultChecked={false} onChange={handleMapToggle}>
                Ver Mapa
              </Checkbox>
            </ShowMapCheckbox>
          }
        />
      </Sticky>
      <Fragment>
        <PostsWrapper className={width > 767 && showMap ? 'col-12' : 'col-24'}>
          {data.length > 0  ?
            (
            <SectionGrid
            link={SINGLE_POST_PAGE}
            columnWidth={columnWidth}
            data={data}
            totalItem={total.length}
            loading={loading}
            limit={limit}
            handleLoadMore={loadMoreData}
            placeholder={<PostPlaceholder />}
          />) : <ListingNotFound/>}
        </PostsWrapper>
        {showMap && <ListingMap houstList={data}/>}
      </Fragment>
    </ListingWrapper>
  );
}

export default Listing;
