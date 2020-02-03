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
  Keyboard,
} from 'react-native';
import axios from 'axios';
import {Button} from 'react-native-elements';
import {GOOGLE_BOOKS_API_KEY} from 'react-native-dotenv';
import MainEventScreen from './MainEventScreen';
import urlFor from '../utils/urlFor';
import UserContext from '../context/UserContext';


export default class CreateEvent extends Component {
  static contextType = UserContext
  
  state = {
    searchTitle: null,
    showcontainer: false,
    googleBooks: [],
    backgroundHeightAnimation: new Animated.Value(0),
    bookImageOpacity: new Animated.Value(0),
    showBookListImage: false,
    bookListImageOpacity: new Animated.Value(0),
  };

  componentDidMount() {
    const user = this.context;
    console.log(user);
  }

  onSearchBooks = text => {
    Keyboard.dismiss();
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
    let bookObject = {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      isbn: book.volumeInfo.industryIdentifiers,
      raw: book,
      smallThumbnail: thumbnail.small,
      thumbnail: thumbnail.normal,
    };
    return (
      <TouchableHighlight
        underlayColor="white"
        onPress={() => this.onBookSelectionPress(bookObject)}>
        <View style={styles.flatListRowContainer}>
          <Image
            style={styles.bookListImage}
            source={{uri: bookObject.thumbnail}}
            resizeMode={'cover'}
          />
          <View style={styles.titleAuthorTextContainer}>
            <Text style={styles.titleText}>{bookObject.title}</Text>
            <Text style={styles.authorText}>{bookObject.authors}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  onBookSelectionPress = book => {
    
    // there needs to be a  way to bring up module or review screen to add this book... need navigation added with main title, authors, description.
    // then either you like it or you go back --- so the navigation has to be a stack and it needs to go in order
    // then add additional details... location, book club attendees, and additional details
  };

  onTextInputPress = () => {
    this.setState({showBookListImage: true});
    Animated.parallel([
      Animated.timing(this.state.backgroundHeightAnimation, {
        toValue: 1,
        duration: 300,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      Animated.timing(this.state.bookImageOpacity, {
        toValue: 1,
        duration: 100,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      Animated.timing(this.state.bookListImageOpacity, {
        toValue: 1,
        durration: 100,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    ]).start();
  };

  render() {
    const heightForWhiteBackground = this.state.backgroundHeightAnimation.interpolate(
      {
        inputRange: [0, 1],
        outputRange: ['30%', '90%'],
      },
    );
    const opacticyForBackgroundImage = this.state.bookImageOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
    const opacticyForBookListImage = this.state.bookListImageOpacity.interpolate(
      {
        inputRange: [0, 1],
        outputRange: [0, 1],
      },
    );
    return (
      <SafeAreaView style={styles.container}>
        <Animated.Image
          style={[
            styles.backgroundStarterImage,
            {opacity: opacticyForBackgroundImage},
          ]}
          source={require('../utils/createEventBookBackground.png')}
          resizeMode={'contain'}
        />
        <Animated.View
          style={[
            styles.backgroundContentContainer,
            {height: heightForWhiteBackground},
          ]}>
          <View style={styles.informationContentContainer}>
            <View style={styles.searchAndListContainer}>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Type a Book Title"
                onChangeText={text => this.setState({searchTitle: text})}
                value={this.state.searchTitle}
                onFocus={this.onTextInputPress}
              />

              {this.state.showcontainer ? (
                <View>
                  <FlatList
                    data={this.state.googleBooks}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={book => this.renderGoogleBooks(book.item)}
                  />
                </View>
              ) : (
                <View />
              )}

              <Button
                title="Search For Book"
                titleStyle={{ fontFamily: 'Montserrat-SemiBold'}}
                containerStyle={styles.searchButtonContainer}
                buttonStyle={styles.searchButtonStyle}
                onPress={() => this.onSearchBooks(this.state.searchTitle)}
              />
              {this.state.showBookListImage && (
                <Animated.Image
                  style={[
                    styles.listBackgroundBookImage,
                    {opacity: opacticyForBookListImage},
                  ]}
                  source={require('../utils/createEventBookListImage.png')}
                  resizeMode={'contain'}
                />
              )}
            </View>
          </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.backgroundTextView,
            {opacity: opacticyForBackgroundImage},
          ]}>
          <Text style={styles.backgroundTextH1}>Hello</Text>
          <Text style={styles.backgroundTextH2}>
            Ready to host your next BookClub?
          </Text>
        </Animated.View>
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
    flexGrow: 1,
    backgroundColor: '#E3E4E6',
    alignItems: 'center',
    flexDirection: 'column-reverse',
  },
  backgroundContentContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 0,
    width: '90%',
    height: '30%',
    zIndex: 10,
  },
  backgroundStarterImage: {
    zIndex: 5,
    top: 50,
    height: '100%',
    position: 'absolute',
  },
  backgroundTextView: {
    zIndex: 10,
    marginBottom: 5,
    width: '88%',
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
    zIndex: 5,
    top: 40,
    height: '50%',
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
    fontWeight: 'bold',
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
