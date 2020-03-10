import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Image,
} from 'react-native';

const BookListItem = props => (
  <TouchableHighlight
    underlayColor="rgba(58, 86, 114, 0.3)"
    onPress={() => props.onBookSelectionPress(props.book)}>
    <View style={styles.flatListRowContainer}>
      {props.book.thumbnail === null || props.book.thumbnail === '' ? (
        <Image
          style={styles.bookListImage}
          source={require('../utils/bookPlaceholder.png')}
          resizeMode={'cover'}
        />
      ) : (
        <Image
          style={styles.bookListImage}
          source={{uri: props.book.thumbnail}}
          resizeMode={'cover'}
        />
      )}
      <View style={styles.titleAuthorTextContainer}>
        <Text style={styles.titleText}>{props.book.title}</Text>
        <Text style={styles.authorText}>{props.book.author}</Text>
      </View>
    </View>
  </TouchableHighlight>
)

const flatListRowHeight = Dimensions.get('window').height * 0.15;
const flatListBookImageHeight = flatListRowHeight - 20;
const flatListBookImageWidth = flatListBookImageHeight / 1.6;
const styles = StyleSheet.create({
  flatListRowContainer: {
    padding: 10,
    height: flatListRowHeight,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  bookListImage: {
    width: flatListBookImageWidth,
    height: flatListBookImageHeight,
    borderRadius: 5,
  },
  titleAuthorTextContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  authorText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
});
export default BookListItem;