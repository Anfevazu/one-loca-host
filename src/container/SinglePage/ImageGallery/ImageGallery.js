import React, {useState, useEffect}from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGalleryWrapper from './ImageGallery.style';

const PostImageGallery = ({images}) => {
  const [imgs] = useState([])
  useEffect(() => {
    images.forEach(img => {
      imgs.push({original: img.url, thumbnail: img.url})
    });
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <ImageGalleryWrapper>
      <ImageGallery
        items={imgs}
        showPlayButton={false}
        showFullscreenButton={false}
        showIndex={true}
        lazyLoad={true}
        slideDuration={550}
      />
    </ImageGalleryWrapper>
  );
};

export default PostImageGallery;
