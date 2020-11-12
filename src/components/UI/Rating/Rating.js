import React from 'react';
import PropTypes from 'prop-types';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import logoWs from '../../../assets/images/icon-whatsapp.png';
import { NavLink } from 'react-router-dom';

const Rating = props => {
  const { rating, ratingCount, type, ratingFieldName } = props;
  let i, floorValue;
  let ratingView = [];
  if (rating && rating !== 0) {
    floorValue = Math.floor(rating);
    for (i = 0; i < 5; i++) {
      if (i < floorValue) {
        ratingView.push(<IoIosStar key={i} />);
      } else {
        ratingView.push(<IoIosStarOutline key={i} />);
      }
    }
  }
  let listingCondition;
  if (rating && rating === 5) {
    listingCondition = 'Increible';
  } else if (4 <= rating && rating < 5) {
    listingCondition = 'Bueno';
  } else if (3 <= rating && rating < 4) {
    listingCondition = 'Promedio';
  } else if (2 <= rating && rating < 3) {
    listingCondition = 'Malo';
  } else if (rating >= 1) {
    listingCondition = 'Terrible';
  } else {
    listingCondition = '';
  }

  let showRatingCount;
  if (ratingCount) {
    showRatingCount = `(` + ratingCount + `)`;
  } else {
    showRatingCount = '';
  }

  return (
    <div style={{'display': 'flex', width: '100%'}}>
    <>
      {type && type === 'bulk' ? (
        <>
          <span>{ratingView}</span>
          <strong>
            {` ${listingCondition}`} {`${showRatingCount}`}
          </strong>
        </>
      ) : (
        <>
          <span>{ratingFieldName}</span> {ratingView}
        </>
      )}
      <div style={{'margin-left': 'auto'}}>
      <NavLink to="/">
          <img src={logoWs} alt="Whatsapp-icon" />
      </NavLink>

      </div>
    </>
    </div>
  );
};

Rating.propTypes = {
  type: PropTypes.string.isRequired,
  ratingCount: PropTypes.number,
  rating: PropTypes.number,
  ratingFieldName: PropTypes.string,
};

export default Rating;
