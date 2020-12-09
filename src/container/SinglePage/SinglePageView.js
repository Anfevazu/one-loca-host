import React, { Fragment, useState, useEffect } from 'react';
import { useLocation } from 'library/hooks/useLocation';
import Sticky from 'react-stickynode';
import { Row, Col, Modal, Button } from 'antd';
import Container from 'components/UI/Container/Container';
import Loader from 'components/Loader/Loader';
import useWindowSize from 'library/hooks/useWindowSize';
import Description from './Description/Description';
import Amenities from './Amenities/Amenities';
import Location from './Location/Location';
import Review from './Review/Review';
import Reservation from './Reservation/Reservation';
import BottomReservation from './Reservation/BottomReservation';
import TopBar from './TopBar/TopBar';
import SinglePageWrapper, { PostImage } from './SinglePageView.style';
import PostImageGallery from './ImageGallery/ImageGallery';
import isEmpty from 'lodash/isEmpty';
import Image from 'components/UI/Image/Image';
import { ProfileImage } from '../Agent/AccountDetails/AgentDetails.style';
import { firestore } from '../../firebaseConfig';
import singlePostBgImg from '../../assets/images/single-post-bg.jpg';
import {FALLBACK_IMG} from '../../settings/constant'

const SinglePage = ({ match }) => {
  const { href } = useLocation();
  const [isModalShowing, setIsModalShowing] = useState(false);
  const { width } = useWindowSize();
  const [loading, setLoading] = useState(true);
  const [uuid] = useState(match.params.slug);
  const [data, setdata] = useState({});

  useEffect(() => {
    let queryRef = firestore.collection("houst").doc(uuid)
    queryRef.get().then(async (snap) => {
      if (!snap.exists) setLoading(true);
      await setdata(snap.data())
      setLoading(false)
    })
  });

  if (isEmpty(data) || loading) return <Loader />;
  const {
    id,
    name,
    last_name,
    country,
    city,
    reviews,
    rating,
    ratingCount,
    price,
    title,
    gallery,
    location,
    content,
    experiences,
    author,
    profile,
    picture
  } = data;

  const background = gallery.length > 0 ? gallery[0].url : singlePostBgImg
  return (
   <SinglePageWrapper>
      <PostImage style={{backgroundImage: `url(${background})`}}>
        <Button
          type="primary"
          onClick={() => setIsModalShowing(true)}
          className="image_gallery_button">
          Ver Fotos
        </Button>
        <Modal
          visible={isModalShowing}
          onCancel={() => setIsModalShowing(false)}
          footer={null}
          width="100%"
          maskStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
          }}
          wrapClassName="image_gallery_modal"
          closable={false}
        >
          <Fragment>
            <PostImageGallery images={gallery}/>
            <Button
              onClick={() => setIsModalShowing(false)}
              className="image_gallery_close"
            >
              <svg width="16.004" height="16" viewBox="0 0 16.004 16">
                <path
                  id="_ionicons_svg_ios-close_2_"
                  d="M170.4,168.55l5.716-5.716a1.339,1.339,0,1,0-1.894-1.894l-5.716,5.716-5.716-5.716a1.339,1.339,0,1,0-1.894,1.894l5.716,5.716-5.716,5.716a1.339,1.339,0,0,0,1.894,1.894l5.716-5.716,5.716,5.716a1.339,1.339,0,0,0,1.894-1.894Z"
                  transform="translate(-160.5 -160.55)"
                  fill="#909090"
                />
              </svg>
            </Button>
          </Fragment>
        </Modal>
      </PostImage>
      <TopBar title={title} shareURL={href} author={author} media={gallery} />
      <Container>
        <Row gutter={30} id="reviewSection" style={{ marginTop: 30 }}>
          <Col xl={16}>
           <ProfileImage style={{marginLeft: 'auto', marginRight: 'auto'}}>
              <Image src={picture} alt="Profile Pic" fallback={FALLBACK_IMG}/>
            </ProfileImage>
            <Description
              name={name}
              last_name={last_name}
              content={content}
              title={title}
              location={location}
              rating={rating}
              ratingCount={ratingCount}
              country={country}
              city={city}
              profile={profile}
            />
            <Amenities experiences={experiences} />
            <Location location={data} />
          </Col>
          <Col xl={8}>
            {width > 1200 ? (
              <Sticky
                innerZ={999}
                activeClass="isSticky"
                top={202}
                bottomBoundary="#reviewSection"
              >
                <Reservation name={name} last_name={last_name} id={id} country={country} city={city}/>
              </Sticky>
            ) : (
              <BottomReservation
                title={title}
                price={price}
                rating={rating}
                ratingCount={ratingCount}
              />
            )}

          </Col>
        </Row>
        <Row gutter={30}>
          <Col xl={16}>
            <Review
              generalReview={rating}
              houst_id={id}
              reviews={reviews}
              ratingCount={ratingCount}
              rating={rating}
            />
          </Col>
          <Col xl={8} />
        </Row>
      </Container>
    </SinglePageWrapper>

  )
};

export default SinglePage;
