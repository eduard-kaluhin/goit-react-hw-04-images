import { Modal } from '../Modal/Modal';
import { useState } from 'react';
import { Li, Img } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const GalleryItem = ({ hit }) => {
  const [showModal, setShowModal] = useState(false);
  const { largeImageURL, webformatURL, tags } = hit;

  return (
    <>
      <Li onClick={() => setShowModal(showModal => !showModal)}>
        <Img src={webformatURL} alt={tags} loading="lazy" />
      </Li>
      {showModal && (
        <Modal
          onClose={() => setShowModal(showModal => !showModal)}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
    </>
  );
};

GalleryItem.propTypes = {
  hit: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
