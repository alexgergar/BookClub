import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { bookClubEvent } from '../utils/testInfo';
import { Icon, Avatar } from 'react-native-elements';
import BookcoverImage from './BookcoverImage';
import ViewMoreText from 'react-native-view-more-text';

export default class BookDetails extends Component {
  renderViewMore = onPress => {
    return <Text style={styles.viewMore} onPress={onPress}>View more</Text>;
  }

  renderViewLess = onPress => {
    return (
      <Text style={styles.viewMore} onPress={onPress}>
        View less
      </Text>
    );
  }

  render() {
    return (
      <View>
        <View style={styles.headlineView}>
          <Text style={styles.bookTitleTextHeadline}>
            {bookClubEvent.bookForEvent.name}
          </Text>
        </View>
        <View style={styles.headlineView}>
          <Text style={styles.bookAuthorTextHeadline}>
            {bookClubEvent.bookForEvent.author}
          </Text>
        </View>
        <View style={styles.bookHeadlineView}>
          <Text style={styles.headlineText}>Description</Text>
          <ViewMoreText
            numberOfLines={3}
            renderViewMore={this.renderViewMore}
            renderViewLess={this.renderViewLess}
            textStyle={styles.bookDescriptionText}>
            <Text>{bookClubEvent.bookForEvent.bookDescription}</Text>
          </ViewMoreText>
        </View>
        <View style={styles.bookHeadlineView}>
          <Text style={styles.headlineText}>
            About {bookClubEvent.bookForEvent.author}
          </Text>
          <ViewMoreText
            numberOfLines={3}
            renderViewMore={this.renderViewMore}
            renderViewLess={this.renderViewLess}
            textStyle={styles.bookDescriptionText}>
            <Text>{bookClubEvent.bookForEvent.bookDescription}</Text>
          </ViewMoreText>
        </View>

        <View style={styles.bookHeadlineView}>
          <Text style={styles.headlineText}>
            Other Books by {bookClubEvent.bookForEvent.author}
          </Text>
          <FlatList
            horizontal={true}
            data={[
              require('../utils/gal.jpg'),
              require('../utils/songofach.jpg'),
              require('../utils/herculesbow.jpg'),
            ]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <BookcoverImage source={item} style={styles.bookCoverList} />
            )}
          />
        </View>
      </View>
    );
  }
}

// This is to get the window width and height for styling
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const bookCoverListImageWidth = windowWidth * 0.15;
const bookCoverListImageHeight = bookCoverListImageWidth * 1.6;;

const styles = StyleSheet.create({
  hortizontalLine: {
    padding: 15,
    marginLeft: '20%',
    marginRight: '20%',
    borderBottomWidth: 1,
    borderColor: '#DBDBDB',
  },
  bookTitleTextHeadline: {
    textTransform: 'uppercase',
    // color: '#585D61',
    fontSize: 16,
  },
  bookAuthorTextHeadline: {
    textTransform: 'uppercase',
    color: '#585D61',
    fontSize: 12,
  },
  headlineView: {
    left: '5%',
  },
  headlineText: {
    textTransform: 'uppercase',
    color: '#585D61',
    fontSize: 12,
  },
  bookHeadlineView: {
    left: '5%',
    paddingTop: 10,
  },
  bookDescriptionText: {
    left: '2%',
    paddingRight: '12%',
  },
  viewMore: {
    color: '#3A5673',
    textTransform: 'uppercase',
    fontSize: 10,
    textAlign: 'right',
    paddingRight: '12%',
    paddingTop: 3,
  },
  bookCoverList: {
    width: bookCoverListImageWidth,
    height: bookCoverListImageHeight,
    borderRadius: 10,
    alignSelf: 'center',
    margin: 10,
  },
});

/* Color Theme Swatches in Hex
.Book-cover-options-1-hex { color: #3A5673; } medium blue
.Book-cover-options-2-hex { color: #EBE2CD; } light tan
.Book-cover-options-3-hex { color: #1E3342; } dark blue
.Book-cover-options-4-hex { color: #A5ADB5; } grey blue
color: #585D61 = darker grey blue for headline text
.Book-cover-options-5-hex { color: #F8B787; } peach

/* Color Theme Swatches in RGBA
.Book-cover-options-1-rgba { color: rgba(58, 86, 114, 1); }
.Book-cover-options-2-rgba { color: rgba(235, 226, 205, 1); }
.Book-cover-options-3-rgba { color: rgba(29, 51, 66, 1); }
.Book-cover-options-4-rgba { color: rgba(165, 172, 181, 1); }
.Book-cover-options-5-rgba { color: rgba(247, 182, 135, 1); }

/* Color Theme Swatches in HSLA *
.Book-cover-options-1-hsla { color: hsla(210, 32, 33, 1); }
.Book-cover-options-2-hsla { color: hsla(42, 42, 86, 1); }
.Book-cover-options-3-hsla { color: hsla(205, 37, 18, 1); }
.Book-cover-options-4-hsla { color: hsla(210, 9, 67, 1); }
.Book-cover-options-5-hsla { color: hsla(25, 88, 75, 1); }
*/