import React, { Component } from 'react';
import { Button } from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
//
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

  // async componentDidUpdate(_, prevState) {
  //   const { query, page } = this.state;
  //   if (prevState.query !== query || prevState.page !== page) {
  //     try {
  //       this.setState({ isLoading: true });
  //       const { hits, totalHits } = await pixabayGetImages(query, page);
  //       this.setState(prevState => ({
  //         images: [...prevState.images, ...hits],
  //         totalHits:
  //           page === 1
  //             ? totalHits - hits.length
  //             : totalHits - [...prevState.images, ...hits].length,
  //       }));
  //     } catch (error) {
  //       return error;
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }
  // }

  handleSubmit = query => {
    this.setState({ query, page: 1 });
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      // console.log('query string has changed');
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

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} />
        <Button onLoadMore={this.handleLoadMore} />
        {this.state.isLoading && <Loader />}
      </>
    );
  }
}
