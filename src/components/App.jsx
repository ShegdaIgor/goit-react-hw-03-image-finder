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

        if (hits.length === 0) {
          this.setState({ error: 'error', images: [] });
          return;
        }

        this.setState(prevState => ({
          images: this.state.page === 1 ? hits : [...prevState.images, ...hits],
          totalHits: totalHits,
          error: null,
        }));
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
    this.setState({ query, page: 1, error: null });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    // console.log(this.state.images);
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.error === 'error' && (
          <p
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 20,
              color: '#010101',
            }}
          >
            There is nothing here.
          </p>
        )}
        {this.state.error === null && (
          <ImageGallery images={this.state.images} />
        )}

        {this.state.isLoading && <Loader />}
        {this.state.totalHits > this.state.images.length &&
          this.state.error === null && (
            <Button onLoadMore={this.handleLoadMore} />
          )}
      </div>
    );
  }
}
