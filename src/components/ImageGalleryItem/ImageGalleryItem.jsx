import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL }) => {
  return (
    <li className={css.imageGalleryItem}>
      <img className={css.imageGalleryItemImage} src={webformatURL} alt="" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
};
