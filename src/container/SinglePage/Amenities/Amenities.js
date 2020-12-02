import React from 'react';
import PropTypes from 'prop-types';
import Heading from 'components/UI/Heading/Heading';
import AmenitiesWrapper, { AmenitiesArea } from './Amenities.style';
import { Element } from 'react-scroll';
import { Image,Card, Tag } from 'antd';
import {FALLBACK_IMG} from '../../../settings/constant'
import { capitalize } from "lodash";

const { Meta } = Card;

const Amenities = ({experiences, titleStyle, linkStyle }) => {
  return (
    <Element name="amenities" className="Amenities">
      <AmenitiesWrapper>
        <Heading as="h2" content="Experiencias" {...titleStyle} />
        <AmenitiesArea>
        <CardExperiences experiences={experiences}/>
        </AmenitiesArea>
        {/* <TextButton>
          <TextLink link="#1" content="Show all amenities" {...linkStyle} />
        </TextButton> */}
      </AmenitiesWrapper>
    </Element>
  );
};

const CardExperiences = ({experiences}) => {
  return experiences.map((exp, index) => {
    return (
    <Card
      key={index}
      style={{ width: 250 }}
      cover={
        <Image
        src={exp.banner}
        alt="Profile Pic"
        fallback={FALLBACK_IMG}/>
      }>
      <Meta
        title={capitalize(exp.title)}
        description={capitalize(exp.description)}
      />
      <p style={{marginTop: "5px"}}>
       <TagsExperiences tags={exp.tags}/>
      </p>
    </Card>)
  })
}

const TagsExperiences = ({tags}) => {
  return tags.map((tag, index) => {
      return <Tag key={index} color="#FFCF2A">{tag}</Tag>
  })
}

Amenities.propTypes = {
  titleStyle: PropTypes.object,
  linkStyle: PropTypes.object,
};

Amenities.defaultProps = {
  titleStyle: {
    color: '#2C2C2C',
    fontSize: ['17px', '20px', '25px'],
    lineHeight: ['1.15', '1.2', '1.36'],
    mb: ['14px', '20px', '30px'],
  },
  linkStyle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#008489',
  },
};

export default Amenities;
