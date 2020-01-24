import React from 'react';
import {Image} from 'react-native';

const BookcoverImage = props => (
  <Image
    source={props.source}
    style={props.style}
    resizeMode={'contain'}
  />
);

export default BookcoverImage;
