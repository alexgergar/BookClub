import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  Dimensions,
  FlatList,
  TouchableHighlight,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import axios from 'axios';
import {Icon} from 'react-native-elements';
import {GOOGLE_BOOKS_API_KEY} from 'react-native-dotenv';
import SearchBar from '../components/SearchBar';
import urlFor from '../utils/urlFor';

export default class CreateEvent extends Component {
  constructor(props) {
    super(props);

    (this.backgroundHeightAnimation = new Animated.Value(0)),
      (this.bookImageOpacity = new Animated.Value(0)),
      (this.bookListImageOpacity = new Animated.Value(0)),
      (this.heightForWhiteBackground = this.backgroundHeightAnimation.interpolate(
        {
          inputRange: [0, 1],
          outputRange: ['22%', '95%'],
        },
      ));
    this.opacticyForBackgroundImage = this.bookImageOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
    this.opacticyForBookListImage = this.bookListImageOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
  }
  state = {
    searchTitle: null,
    showcontainer: false,
    googleBooks: [],
    showBookListImage: false,
    selectedBook: null,
  };

  onSearchBooks = text => {
    this.setState({searchTitle: text});
    let search = encodeURI(text);
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=10&orderBy=relevance&key=${GOOGLE_BOOKS_API_KEY}`,
      )
      .then(response =>
        this.setState({
          googleBooks: response.data.items,
          showcontainer: true,
          showBookListImage: false,
        }),
      )
      .then(() => this.flatListRef.scrollToIndex({animated: true, index: 0}))
      .catch(error => console.log(error));
  };

  renderGoogleBooks = book => {
    let thumbnail = {
      small: '',
      normal: '',
    };
    if (
      book.volumeInfo !== undefined &&
      book.volumeInfo.imageLinks !== undefined
    ) {
      thumbnail.small =
        book.volumeInfo.imageLinks.smallThumbnail !== undefined
          ? book.volumeInfo.imageLinks.smallThumbnail
          : null;
      thumbnail.normal =
        book.volumeInfo.imageLinks.thumbnail !== undefined
          ? book.volumeInfo.imageLinks.thumbnail
          : null;
    }
    let isbn = null;
    let identifiers = book.volumeInfo.industryIdentifiers;
    if (identifiers !== undefined) {
      let idResult13 = identifiers.find(({type}) => type === 'ISBN_13');
      let idResult10 = identifiers.find(({type}) => type === 'ISBN_10');
      if (idResult13 !== undefined) {
        isbn = idResult13.identifier;
      } else if (idResult10 !== undefined) {
        isbn = idResult10.identifier;
      }
    }
    let bookObject = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      isbn: isbn,
      smallThumbnail: thumbnail.small,
      thumbnail: thumbnail.normal,
      pageCount: book.volumeInfo.pageCount,
      language: book.volumeInfo.language,
      description: book.volumeInfo.description,
    };
    return (
      <TouchableHighlight
        underlayColor="rgba(58, 86, 114, 0.3)"
        onPress={() => this.onBookSelectionPress(bookObject)}>
        <View style={styles.flatListRowContainer}>
          {bookObject.thumbnail === null || bookObject.thumbnail === '' ? (
            <Image
              style={styles.bookListImage}
              source={require('../utils/bookPlaceholder.png')}
              resizeMode={'cover'}
            />
          ) : (
            <Image
              style={styles.bookListImage}
              source={{uri: bookObject.thumbnail}}
              resizeMode={'cover'}
            />
          )}
          <View style={styles.titleAuthorTextContainer}>
            <Text style={styles.titleText}>{bookObject.title}</Text>
            <Text style={styles.authorText}>{bookObject.authors}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  onBookSelectionPress = selectedBook => {
    if (this.props.route.params) {
      const {
        onUpdate,
        streetAddress,
        city,
        state,
        zipcode,
        detailsForLocation,
        membersForBookClub,
        newClub,
        date,
      } = this.props.route.params;
      this.props.navigation.navigate('SelectedBook', {
        onUpdate: onUpdate,
        selectedBook: selectedBook,
        streetAddress: streetAddress,
        city: city,
        state: state,
        zipcode: zipcode,
        detailsForLocation: detailsForLocation,
        membersForBookClub: membersForBookClub,
        newClub: newClub,
        date: date,
      });
    } else {
      this.props.navigation.navigate('SelectedBook', {
        selectedBook: selectedBook,
      });
    }
  };

  onTextInputPress = () => {
    this.setState({showBookListImage: true});
    Animated.parallel([
      Animated.timing(this.backgroundHeightAnimation, {
        toValue: 1,
        duration: 100,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      Animated.timing(this.bookImageOpacity, {
        toValue: 1,
        duration: 100,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      Animated.timing(this.bookListImageOpacity, {
        toValue: 1,
        durration: 100,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    ]).start();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {Platform.OS === 'ios' && (
          <View
            style={styles.iosBackButton}
          >
            <Icon
              name='chevron-left'
              type='feather'
              
              onPress={() => this.props.navigation.navigate('Home')} /></View>
        )}
        <View style={styles.innerContainer}>
          <Animated.Image
            style={[
              styles.backgroundStarterImage,
              {opacity: this.opacticyForBackgroundImage},
            ]}
            source={require('../utils/createEventBookBackground.png')}
            resizeMode={'contain'}
          />

          <Animated.View
            style={[
              styles.backgroundTextView,
              {opacity: this.opacticyForBackgroundImage},
            ]}>
            <Text style={styles.backgroundTextH1}>Hey there,</Text>
            <Text style={styles.backgroundTextH2}>
              Ready to host your next BookClub?
            </Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.backgroundContentContainer,
              {height: this.heightForWhiteBackground},
            ]}>
            <View style={styles.informationContentContainer}>
              <View style={styles.searchAndListContainer}>
                <Animated.View style={{width: '100%'}}>
                  <SearchBar
                    placeholder="Find a Book by Title"
                    onChangeText={text => this.onSearchBooks(text)}
                    onFocus={this.onTextInputPress}
                  />
                </Animated.View>
                {this.state.showcontainer && (
                  <View>
                    <FlatList
                      data={this.state.googleBooks}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={book => this.renderGoogleBooks(book.item)}
                      keyboardShouldPersistTaps={'always'}
                      ref={ref => {
                        this.flatListRef = ref;
                      }}
                    />
                  </View>
                )}
                {this.state.showBookListImage && (
                  <Animated.Image
                    style={[
                      styles.listBackgroundBookImage,
                      {opacity: this.opacticyForBookListImage},
                    ]}
                    source={require('../utils/createEventBookListImage.png')}
                    resizeMode={'contain'}
                  />
                )}
              </View>
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }
}

// This is to get the window width and height for styling
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const flatListRowHeight = windowHeight * 0.15;
const flatListBookImageHeight = flatListRowHeight - 20;
const flatListBookImageWidth = flatListBookImageHeight / 1.6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3E4E6',
    alignItems: 'center',
  },
  innerContainer: {
    width: '90%',
    height: windowHeight,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backgroundContentContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 0,
    width: '100%',
    zIndex: 10,
  },
  backgroundStarterImage: {
    width: '90%',
    height: '50%',
    top: windowHeight * 0.1,
    position: 'absolute',
  },
  backgroundTextView: {
    zIndex: 10,
    marginBottom: 5,
  },
  backgroundTextH1: {
    fontSize: 48,
    fontFamily: 'Karla-Bold',
  },
  backgroundTextH2: {
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
  },
  informationContentContainer: {
    padding: 10,
    paddingTop: 20,
    zIndex: 10,
  },
  searchAndListContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 8,
    paddingLeft: 10,
    borderRadius: 10,
  },
  listBackgroundBookImage: {
    justifyContent: 'flex-start',
    zIndex: 5,
    top: 40,
    width: '60%',
    height: '70%',
    paddingLeft: 20,
  },
  searchButtonContainer: {
    margin: 10,
    width: '50%',
  },
  searchButtonStyle: {
    backgroundColor: '#55707b',
  },
  flatListRowContainer: {
    padding: 10,
    height: flatListRowHeight,
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
  bookListImage: {
    width: flatListBookImageWidth,
    height: flatListBookImageHeight,
    borderRadius: 5,
  },
  iosBackButton: {
    zIndex: 50,
    position: 'absolute', left: windowHeight * .02, top: windowHeight * .06,
  }
});

/* Color Theme Swatches in Hex
.Book-cover-options-1-hex { color: #3A5673; } medium blue
.Book-cover-options-2-hex { color: #EBE2CD; } light tan
.Book-cover-options-3-hex { color: #1E3342; } dark blue
.Book-cover-options-4-hex { color: #A5ADB5; } grey blue
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
