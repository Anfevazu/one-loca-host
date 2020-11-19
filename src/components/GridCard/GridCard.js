import React from 'react';
import PropTypes from 'prop-types';
import GridCardWrapper, {
  ImageWrapper,
  FavoriteIcon,
  ContentWrapper,
  LocationArea,
  PriceArea,
  RatingArea,
  MetaWrapper,
} from './GridCard.style';

import HoustPicture from '../HoustPicture';

const GridCard = ({
  className,
  favorite,
  location,
  title,
  price,
  rating,
  editBtn,
  viewDetailsBtn,
  picture,
  profile,
  children,
}) => {
  return (
    <GridCardWrapper className={`grid_card`}>
      <ImageWrapper className="media_wrapper">{children}</ImageWrapper>
      <ContentWrapper className="content_wrapper">
      <HoustPicture picture={picture}/>
        {location && <LocationArea>{location}</LocationArea>}
        <MetaWrapper className="meta_wrapper">
        {profile && <PriceArea className="price">{profile}</PriceArea>}
          {rating && <RatingArea className="rating">{rating}</RatingArea>}
        </MetaWrapper>
      </ContentWrapper>

      {favorite && <FavoriteIcon>{favorite}</FavoriteIcon>}
    </GridCardWrapper>
  );
};

GridCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  price: PropTypes.string,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  location: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  editBtn: PropTypes.element,
  viewDetailsBtn: PropTypes.element,
};

export default GridCard;
