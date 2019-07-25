import React from 'react';


import Navigation from './Navigation';

export default function Base(props) {
    return (
      <div>
        <Navigation />
        { props.children }
      </div>
    )
}