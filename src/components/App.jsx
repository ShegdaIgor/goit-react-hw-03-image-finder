import React, { Component } from 'react';
import { Button } from './Button/Button';
import Searchbar from './Searchbar/Searchbar';

export class App extends Component {
  processSubmit = query => {
    this.setState({ query });
  };
  render() {
    return (
      <>
        <Searchbar onSubmit={this.processSubmit} />

        <Button onLoadMore={this.handleLoadMore} />
      </>
    );
  }
}
