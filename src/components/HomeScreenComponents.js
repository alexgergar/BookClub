import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

export const ListOfBooks = props => {
  const bookList = props.list.map(book => (
    <TouchableHighlight
      key={book.rank.toString()}
      onPress={() => props.onPress(book)}>
      <View style={styles.bookListItemContainer}>
        <Image
          style={styles.bookListImage}
          source={{uri: book.book_image}}
          resizeMode={'cover'}
        />
        <View style={styles.bookListItemTitleAuthorView}>
          <Text style={styles.bookItemAuthorText}>{book.author}</Text>
          <Text style={styles.bookItemTitleText}>{book.title}</Text>
        </View>
      </View>
    </TouchableHighlight>
  ));
  return bookList;
};

export const SectionHeader = props => {
  return (
    <View style={styles.discoverHeadlineView}>
      <TouchableHighlight
        key={1}
        onPress={() => props.onSectionHeaderPress('hardcover-fiction')}>
        <Text
          style={[
            styles.bookGenreHeadline,
            props.pickedSection === 'hardcover-fiction'
              ? {color: 'black'}
              : {color: 'grey'},
          ]}>
          Fiction
        </Text>
      </TouchableHighlight>
      <TouchableHighlight
        key={2}
        onPress={() => props.onSectionHeaderPress('hardcover-nonfiction')}>
        <Text
          style={[
            styles.bookGenreHeadline,
            props.pickedSection === 'hardcover-nonfiction'
              ? {color: 'black'}
              : {color: 'grey'},
          ]}>
          Non Fiction
        </Text>
      </TouchableHighlight>
      <TouchableHighlight
        key={3}
        onPress={() => props.onSectionHeaderPress('graphic-books-and-manga')}>
        <Text
          style={[
            styles.bookGenreHeadline,
            props.pickedSection === 'graphic-books-and-manga'
              ? {color: 'black'}
              : {color: 'grey'},
          ]}>
          Graphic Novels
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const bookListItemWidth = windowWidth * 0.8 * 0.3;
const bookListItemHeight = bookListItemWidth * 1.6 + windowHeight * 0.06;
const authorTitleViewHeight = bookListItemHeight - bookListItemWidth * 1.6;

const styles = StyleSheet.create({
  discoverHeadlineView: {
    flexDirection: 'row',
    paddingBottom: windowHeight * 0.02,
    justifyContent: 'space-between',
  },
  bookGenreHeadline: {
    fontSize: 16,
    fontFamily: 'Karla-Bold',
    textTransform: 'uppercase',
  },
  bookListItemContainer: {
    width: bookListItemWidth,
    height: bookListItemHeight,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bookListImage: {
    borderRadius: 5,
    height: bookListItemWidth * 1.6,
  },
  bookListItemTitleAuthorView: {
    paddingTop: 10,
    height: authorTitleViewHeight,
    justifyContent: 'space-between',
  },
  bookItemTitleText: {
    fontSize: 10,
    fontFamily: 'Montserrat-Bold',
  },
  bookItemAuthorText: {
    fontSize: 8,
    color: 'grey',
    fontFamily: 'Montserrat-Regular',
    textTransform: 'uppercase',
  },
});