import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalDiv } from './Modal.styled';

export default function Modal({ tags, largeImageURL, backdropClick }) {
  useEffect(() => {
    const escapeClick = event => {
      if (event.code === 'Escape') {
        backdropClick();
      }
    };
    window.addEventListener('keydown', escapeClick);
    return () => {
      window.removeEventListener('keydown', escapeClick);
    };
  }, [backdropClick]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) backdropClick();
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalDiv>
        <img src={largeImageURL} alt={tags} />
      </ModalDiv>
    </Overlay>
  );
}

Modal.propTypes = {
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  backdropClick: PropTypes.func.isRequired,
};
