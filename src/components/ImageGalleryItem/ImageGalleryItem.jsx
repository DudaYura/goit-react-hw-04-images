import { useState } from 'react';
import PropTypes from 'prop-types';
import  Modal  from 'components/Modal/Modal';
import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export function ImageGalleryItem({ webformatURL, tags, largeImageURL}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <ImageGalleryItemLi>
      <ImageGalleryItemImage
        src={webformatURL}
        alt={tags}
        onClick={toggleModal}
      />
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          backdropClick={toggleModal}
        />
      )}
    </ImageGalleryItemLi>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
