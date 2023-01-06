import React, { Component } from 'react';
import { Button } from './Button/Button';

export class App extends Component {
  render() {
    return <Button onLoadMore={this.handleLoadMore} />;
  }
}
