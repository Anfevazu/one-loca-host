import React from 'react';
import Image from 'components/UI/Image/Image';
import Heading from 'components/UI/Heading/Heading';
import NotFoundWrapper, { ContentWrapper } from '../404/404.style';
import Image404 from 'assets/images/404list.png';

export default ListingNotFound => {
  return (
    <NotFoundWrapper>
      <ContentWrapper>
        <Image src={Image404} alt="404" style={{"width": "200px", "display":"block", "margin": "0 auto"}}/>
        <Heading as="h1" content="Lo siento no encontramos resultados para tu búsqueda" />
        <Heading as="h2" content="Comprueba que todas las palabras esten bien escritas o intenta con otra búsqueda" />
      </ContentWrapper>
    </NotFoundWrapper>
  );
};
