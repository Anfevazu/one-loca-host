import React , { Component } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import Loader from 'components/Loader/Loader';
import Container from 'components/UI/Container/Container';
import Heading from 'components/UI/Heading/Heading';
import TextLink from 'components/UI/TextLink/TextLink';
import SectionTitle from 'components/SectionTitle/SectionTitle';
import ImageCard from 'components/ImageCard/ImageCard';
import GlideCarousel, {
  GlideSlide,
} from 'components/UI/GlideCarousel/GlideCarousel';
import useDataApi from 'library/hooks/useDataApi';
import { LISTING_POSTS_PAGE } from 'settings/constant';
import LocationWrapper, { CarouselSection } from './Location.style';
import {firestore} from '../../../firebaseConfig';

const carouselOptions = {
  type: 'carousel',
  perView: 5,
  gap: 30,
  hoverpause: true,
  breakpoints: {
    1440: {
      perView: 5,
      gap: 20,
    },
    1200: {
      perView: 4,
    },
    991: {
      perView: 3,
      gap: 15,
    },
    667: {
      perView: 2,
      gap: 20,
    },
    480: {
      perView: 1,
      gap: 0,
    },
  },
};
export class LocationGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {cityList: []}
     this.data = []
  }

  componentDidMount = () => {
    var listCountry = []
    firestore.collection("countries").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.data().cities.forEach((data) => {
            listCountry.push(data)
          });
        });
        this.setState({cityList: listCountry})
    }).catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  }
  render(){
    return (
      <LocationWrapper>
        <Container fluid={true}>
          <SectionTitle
            title={<Heading content="Destinos destacados" />}
            link={<TextLink link={LISTING_POSTS_PAGE} content="Ver todos" />}
          />
          <CarouselSection>
            {this.state.cityList.length !== 0 ? (
              <GlideCarousel
                carouselSelector="explore_carousel"
                prevButton={<IoIosArrowBack />}
                nextButton={<IoIosArrowForward />}
                options={carouselOptions}
              >
                <>
                  {this.state.cityList.map((city, index) => (
                    <GlideSlide key={index}>
                      <ImageCard
                        link={`listing?city=${city.name}`}
                        imageSrc={city.banner}
                        title={city.name}
                        meta={`10 Houst`}
                      />
                    </GlideSlide>
                  ))}
                </>
              </GlideCarousel>
            ) : (
              <Loader />
            )}
          </CarouselSection>
        </Container>
      </LocationWrapper>
    );
  }
}

export default LocationGrid;
