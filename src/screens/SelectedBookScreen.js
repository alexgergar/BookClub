import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-elements';
import ViewMoreText from 'react-native-view-more-text';
import axios from 'axios';
import convert from 'xml-js';
import {GOODREAD_API_KEY} from 'react-native-dotenv';

export default class SelectedBook extends Component {
  state = {
    updatedSelectedBook: null,
    hideContinueButton: true,
  }

  componentDidMount() {
    const {selectedBook} = this.props.navigation.state.params;
    const additionalBookInfo = {
      ...selectedBook,
      authorID: null,
      authorBio: null,
      authorImage: null,
      otherBooksByAuthor: null,
    };
     axios
      .get(
        `https://www.goodreads.com/search/index.xml?key=${GOODREAD_API_KEY}&q=${selectedBook.isbn}` // this gets info about author from goodreads
      )
      .then(response => {
        const bookDataJSON = convert.xml2js(response.data, {compact: true, spaces: 4, textKey: 'text', cdataKey: 'cdata', attributesKey: 'attributes'}); // changes xml to json
        const authorID = bookDataJSON.GoodreadsResponse.search.results.work.best_book.author.id.text; // this gets the author ID
        additionalBookInfo.authorID = authorID; 
        return axios.get(`https://www.goodreads.com/author/show/176372?format=xml&key=${GOODREAD_API_KEY}`) // immediately returning a new get request to get info on author
        }
      )
      .then(response => {
        const bookDataJSON = convert.xml2js(response.data, {compact: true, spaces: 4, textKey: 'text', cdataKey: 'cdata', attributesKey: 'attributes'});
        const authorBio = bookDataJSON.GoodreadsResponse.author.about.cdata; // this is the author bio
        const authorImage = bookDataJSON.GoodreadsResponse.author.large_image_url.cdata || bookDataJSON.GoodreadsResponse.author.image_url.cdata; // author image
        const authorsOtherBooksAllData = bookDataJSON.GoodreadsResponse.author.books.book; // other books by author and the below is to map through just for the info we want
        const otherBooks = authorsOtherBooksAllData.map(book => ({
          title: book.title.text,
          coverArt: book.image_url.text,
          isbn: book.isbn13.text,
          avgRating: book.average_rating.text,
          description: book.description.text,
        })); 
        additionalBookInfo.authorBio = authorBio;
        additionalBookInfo.authorImage = authorImage;
        additionalBookInfo.otherBooksByAuthor = otherBooks;
        this.setState({
          updatedSelectedBook: additionalBookInfo,
          hideContinueButton: false,
        }, () => console.log(this.state.updatedSelectedBook));
      })
      .catch(error => console.log(error));
  }

  renderViewMore = onPress => {
    return (
      <Text style={styles.viewMore} onPress={onPress}>
        + View more
      </Text>
    );
  };

  renderViewLess = onPress => {
    return (
      <Text style={styles.viewMore} onPress={onPress}>
        - View less
      </Text>
    );
  };

  handlePickButtonPress = () => {
    const {
      onUpdate,
      streetAddress,
      city,
      state,
      zipcode,
      detailsForLocation,
      membersForBookClub,
      bookClubID,
      bookClubName,
      selectedBook,
      newClub,
      date,
    } = this.props.navigation.state.params;
    onUpdate
      ? this.props.navigation.navigate('CreateEventVerifyInfo', {
          selectedBook: this.state.updatedSelectedBook,
          streetAddress: streetAddress,
          city: city,
          state: state,
          zipcode: zipcode,
          detailsForLocation: detailsForLocation,
          bookClubMembers: membersForBookClub,
          bookClubID: bookClubID,
          bookClubName: bookClubName,
          newClub: newClub,
          date: date,
        })
      : this.props.navigation.navigate('CreateEventPickDate', {
          selectedBook: this.state.updatedSelectedBook,
        });
  };

  render() {
    const {selectedBook, onUpdate} = this.props.navigation.state.params;
    const test = 'this is a test';
    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          {selectedBook === null ? (
            <Image
              style={styles.bookImageView}
              source={require('../utils/bookPlaceholder.png')}
              resizeMode={'cover'}
            />
          ) : (
            <Image
              style={styles.bookImageView}
              source={{
                uri: selectedBook.thumbnail,
              }}
              resizeMode={'cover'}
            />
          )}
          <View style={styles.backgroundContentContainer}>
            <View style={styles.informationContentContainer}>
              <View style={styles.titleAuthorView}>
                <Text style={styles.bookTitleText}>{selectedBook.title}</Text>
                <Text style={styles.bookAuthorsText}>
                  {selectedBook.authors}
                </Text>
              </View>
              <View style={styles.hortizontalLine} />
              <View style={styles.greyInfoBoxView}>
                <View style={styles.individualInGreyBoxView}>
                  <Text style={styles.greyBoxTitle}>rating</Text>
                  <Text style={styles.greyBoxSubTitle}>
                    {selectedBook.averageRating}
                  </Text>
                </View>
                <View
                  style={[
                    styles.individualInGreyBoxView,
                    styles.middleInGreyBoxView,
                  ]}>
                  <Text style={styles.greyBoxTitle}>page count</Text>
                  <Text style={styles.greyBoxSubTitle}>
                    {selectedBook.pageCount}
                  </Text>
                </View>
                <View style={styles.individualInGreyBoxView}>
                  <Text style={styles.greyBoxTitle}>lang</Text>
                  <Text style={styles.greyBoxSubTitle}>
                    {selectedBook.language}
                  </Text>
                </View>
              </View>
              <View style={styles.descriptionView}>
                <Text style={styles.descriptionTitle}>Description</Text>
                <ViewMoreText
                  numberOfLines={4}
                  renderViewMore={this.renderViewMore}
                  renderViewLess={this.renderViewLess}
                  textStyle={styles.descriptionBodyText}>
                  <Text>{selectedBook.description}</Text>
                </ViewMoreText>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomContainerForContinueButton}>
          <View style={styles.bottonWhiteContainerView}>
            <Button
              title="Pick This Book"
              disabled={this.state.hideContinueButton}
              containerStyle={styles.continueButtonContainerStyle}
              buttonStyle={styles.continueButtonStyle}
              titleStyle={styles.continueTitleButtonStyle}
              onPress={this.handlePickButtonPress}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

// This is to get the window width and height for styling
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const bookPlaceholderImageWidth = windowWidth * 0.3;
const bookPlaceholderImageHeight = bookPlaceholderImageWidth * 1.6;
const starterHeightPositionForInformationTextUnderBookImage =
  bookPlaceholderImageHeight + 40 - windowHeight * 0.2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E3E4E6',
    alignItems: 'center',
    paddingBottom: windowHeight * 0.22,
  },
  backgroundContentContainer: {
    backgroundColor: 'white',
    marginTop: windowHeight * 0.2,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: '90%',
    height: '100%',
  },
  informationContentContainer: {
    padding: windowHeight * 0.02,
    position: 'relative',
    paddingBottom: windowHeight * 0.07,
    top: starterHeightPositionForInformationTextUnderBookImage,
  },
  bookImageView: {
    zIndex: 10,
    width: bookPlaceholderImageWidth,
    height: bookPlaceholderImageHeight,
    borderRadius: 10,
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
  },
  hortizontalLine: {
    marginLeft: '20%',
    marginRight: '20%',
    borderBottomWidth: 1,
    borderColor: '#DBDBDB',
    marginVertical: windowHeight * 0.05,
  },
  titleAuthorView: {
    alignItems: 'center',
    paddingTop: 10,
  },
  bookTitleText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
  },
  bookAuthorsText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  greyInfoBoxView: {
    backgroundColor: '#EBEBEB',
    borderRadius: 15,
    marginHorizontal: windowWidth * 0.05,
    height: windowHeight * 0.08,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  individualInGreyBoxView: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleInGreyBoxView: {
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
  },
  greyBoxTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 10,
    color: '#A3A3A3',
  },
  greyBoxSubTitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  descriptionView: {
    padding: windowWidth * 0.05,
  },
  descriptionTitle: {
    fontFamily: 'Karla-Bold',
    fontSize: 14,
    color: '#A3A3A3',
  },
  descriptionBodyText: {
    fontFamily: 'Karla-Regular',
    fontSize: 13,
  },
  bottomContainerForContinueButton: {
    zIndex: 20,
    width: windowWidth,
    height: windowHeight * 0.1,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3E4E6',
  },
  bottonWhiteContainerView: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '100%',
  },
  continueButtonContainerStyle: {
    width: '82%',
  },
  continueButtonStyle: {
    backgroundColor: '#1E3342',
    borderRadius: 5,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  continueTitleButtonStyle: {
    fontFamily: 'Montserrat-SemiBold',
  },
  viewMore: {
    color: '#3A5673',
    textTransform: 'uppercase',
    fontSize: 10,
    textAlign: 'right',
    paddingTop: 3,
  },
});

/* Color Theme Swatches in Hex
.Book-cover-options-1-hex { color: #3A5673; } medium blue
.Book-cover-options-2-hex { color: #EBE2CD; } light tan
.Book-cover-options-3-hex { color: #1E3342; } dark blue
.Book-cover-options-4-hex { color: #A5ADB5; } grey blue
.Book-cover-options-5-hex { color: #F8B787; } peach
*/
