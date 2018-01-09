import React from 'react';
import {Title} from '../src/index';

class Root extends React.Component {
  render() {
    return (
      <div>
        <Title size="xl">h1</Title>
        <Title size="lg">h2</Title>
        <Title size="md">h3</Title>
        <Title size="sm">h4</Title>
        <Title size="xs">h5</Title>
      </div>
    );
  }
}

export default Root;
