import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import axios from 'axios';
import {bookClubEvent} from '../utils/testInfo';
import {Button, Icon, ListItem} from 'react-native-elements';

// export default class ListAvatarOnLeft extends Component {
//   keyExtractor = (item, index) => index.toString();

//   renderItem = ({item}) => (
//     <ListItem
//       title={item.guestName}
//       subtitle={item.whatTheyAreBringing}
//       // leftAvatar={<}
//       bottomDivider
//     />
//   );

//   render() {
//     return (
//       {}

//       <FlatList
//         keyExtractor={this.keyExtractor}
//         data={this.props.data}
//         renderItem={this.renderItem}
//       />
//     );
//   }
// }
