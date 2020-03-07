import React, {Component} from 'react';
import {Image} from 'react-native-elements'; 


const AvatarImage = props => (
  <Image 
    source={{uri: props.image}}
    style={props.style} />
);

export default AvatarImage;