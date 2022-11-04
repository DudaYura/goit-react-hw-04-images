import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    window.addEventListener('keydown', escapeClick);
    return () => {
      window.removeEventListener('keydown', escapeClick);
    };
  });

  const escapeClick = event => {
    if (showModal) {
      if (event.code === 'Escape') {
        toggleModal();
      }
    }
  };

  const backdropClick = event => {
    if (showModal) {
      if (event.currentTarget === event.target) {
        toggleModal();
      }
    }
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
          backdropClick={backdropClick}
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
