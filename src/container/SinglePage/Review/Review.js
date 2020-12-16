import React, { Fragment, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import Rating from 'components/UI/Rating/Rating';
import { Divider } from 'antd';
import CommentCard from 'components/UI/CommentCard/CommentCard';
import Heading from 'components/UI/Heading/Heading';
import ReviewWrapper, {
  HeaderSection,
  RatingStatus
} from './Review.style';
import { Element } from 'react-scroll';
import { firestore } from '../../../firebaseConfig';


const CommentBox = (props) => {
  const { reviews } = props;
  return reviews && reviews.length !== 0
    ? reviews.map((singleReview, i) => {
        return (
          <Fragment key={i}>
            <Divider />
            <CommentCard singleReview={singleReview} />
          </Fragment>
        );
      })
    : 'No hay calificaciones';
};

const Review = (props) => {
  const {
    statusHeadingStyle,
    houst_id,
    generalReview
  } = props;
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const reviewTmp = []
    let queryRef = firestore.collection("reviews").where("houst_id", "==", houst_id).orderBy("rating", "desc")
    queryRef.get().then(async (snaps) => {
      snaps.docs.forEach(async doc => {
        await reviewTmp.push(doc.data())
      })
      setReviews(reviewTmp)
    })
  }, []);// eslint-disable-line react-hooks/exhaustive-deps


  return (
    <Element name="reviews" className="reviews">
      <ReviewWrapper>
        <HeaderSection>
          <RatingStatus>
            <Heading
              content={`Reviews`}
              {...statusHeadingStyle}
            />
            <Rating rating={generalReview} ratingCount={reviews.length} type="bulk" style={{color: '#ffcf2a !important'}}/>
          </RatingStatus>
        </HeaderSection>
        <CommentBox reviews={reviews} />
      </ReviewWrapper>
    </Element>
  );
};

Review.propTypes = {
  statusHeadingStyle: PropTypes.object,
  filterHeadingStyle: PropTypes.object,
  ratingLabelStyle: PropTypes.object,
  ratingCountStyle: PropTypes.object,
};

Review.defaultProps = {
  statusHeadingStyle: {
    color: '#2C2C2C',
    fontSize: ['17px', '20px', '25px'],
    mr: '10px',
  },
  filterHeadingStyle: {
    color: '#2C2C2C',
    fontSize: '15px',
    fontWeight: '700',
    lineHeight: '1.2',
    mb: '0.5em',
  },
  ratingLabelStyle: {
    fontSize: '13px',
    fontWeight: '400',
    color: '#2c2c2c',
    flex: '1',
  },
  ratingCountStyle: {
    fontSize: '13px',
    fontWeight: '400',
    color: '#2c2c2c',
    ml: '8px',
  },
};

export default Review;
