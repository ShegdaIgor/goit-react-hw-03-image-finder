import React, { Component } from 'react';
import propTypes from 'prop-types';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

export class Modal extends Component {
  handleBackdrop = e => {
    if (e.target === e.currentTarget) this.props.onClose();
  };

  handleKeyDown = e => {
    if (e.key === 'Escape') this.props.onClose();
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackdrop}>
        <div className={css.Modal}>
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>,
      document.querySelector('#portal')
    );
  }
}

Modal.propTypes = {
  largeImageURL: propTypes.string.isRequired,
};
