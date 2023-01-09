import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  onToggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  render() {
    return (
      <li className={css.imageGalleryItem} onClick={this.onToggleModal}>
        <img
          className={css.imageGalleryItemImage}
          src={this.props.webformatURL}
          alt=""
        />
        {this.state.isModalOpen && (
          <Modal
            largeImageURL={this.props.largeImageURL}
            onClose={this.onToggleModal}
          />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
