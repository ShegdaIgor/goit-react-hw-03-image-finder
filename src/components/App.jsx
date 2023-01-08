import React, { Component } from 'react';
import { Button } from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import { pixabayGetImages } from './pixabayImages/pixabayImages';
// import { ImageGallery } from './ImageGallery/ImageGallery';

const FETCH_STATUS = {
  Idle: 'idle',
  Pending: 'pending',
  Resolved: 'resolved',
  Rejected: 'rejected',
};

export class App extends Component {
  state = {
    images: [],
    status: 'idle',
    page: 1,
    query: '',
    totalHits: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: FETCH_STATUS.Pending });
      try {
        const data = await pixabayGetImages(query, page);
        if (data.hits.length === 0) {
          this.setState({ status: FETCH_STATUS.Rejected });
          return;
        }
        this.setState(prevState => ({
          images: page > 1 ? [...prevState.images, ...data.hits] : data.hits,
          page,
          status: FETCH_STATUS.Resolved,
          totalHits: data.hits.length,
        }));
      } catch (error) {
        this.setState({ status: FETCH_STATUS.Rejected });
      }
    }
  }

  processSubmit = query => {
    this.setState({ query });
  };
  render() {
    // const { images, status, page, query, totalHits } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.processSubmit} />
        <Button onLoadMore={this.handleLoadMore} />
      </>
    );
  }
}
