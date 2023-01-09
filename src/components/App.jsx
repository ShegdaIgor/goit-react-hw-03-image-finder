import React, { Component } from 'react';
import { Button } from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import css from '../components/App.module.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { pixabayGetImages } from 'services/api';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    totalHits: null,
    largeImageURL: '',
    isLoading: false,
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({
        isLoading: true,
      });

      try {
        const { hits, totalHits } = await pixabayGetImages(
          this.state.query,
          this.state.page
        );
        this.setState({
          images:
            this.state.page === 1 ? hits : [...this.state.images, ...hits],
          totalHits: totalHits,
        });
      } catch (error) {
        this.setState({
          error: error,
        });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  handleSubmit = query => {
    this.setState({ query, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} />
        {this.state.isLoading && <Loader />}
        {this.state.totalHits > this.state.images.length && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
