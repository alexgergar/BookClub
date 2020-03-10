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
import SearchBar from '../components/SearchBar';
import BookListItem from '../components/BookListItem';
import {goodReadsSearchCall, goodReadsConvert} from '../utils/urlFor';
import {
  windowWidth,
  windowHeight,
  elevationShadowStyle,
} from '../style/baseStyles';

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
    searchingBooks: [],
    showBookListImage: false,
    selectedBook: null,
  };
  
  onGoodReadsSearchBooks = text => {
    this.setState({searchTitle: text});
    let search = encodeURI(text);
    axios
      .get(goodReadsSearchCall(search)) 
      .then(response => {
        const bookData = goodReadsConvert(response);
        this.setState({
          searchingBooks: bookData.search.results.work,
          showcontainer: true,
          showBookListImage: false,
        });
      })
      .catch(error => console.log(error));
  };

  renderGoodReadsBooks = book => {
    let thumbnail = {
      small: '',
      normal: '',
    };
    if (
      book.best_book !== undefined &&
      (book.best_book.image_url.text !== undefined || book.best_book.small_image_url.text !== undefined)
    ) {
      thumbnail.small =
        book.best_book.small_image_url.text !== undefined && book.best_book.small_image_url.text !== `https://s.gr-assets.com/assets/nophoto/book/50x75-a91bf249278a81aabab721ef782c4a74.png`
          ? book.best_book.small_image_url.text
          : null;
      thumbnail.normal =
        book.best_book.image_url.text !== undefined && book.best_book.image_url.text !== `https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png` 
          ? book.best_book.image_url.text
          : null;
    }
    let bookObject = {
      goodreadsBookID: book.best_book.id.text,
      title: book.best_book.title.text,
      author: book.best_book.author.name.text,
      authorID: book.best_book.author.id.text,
      smallThumbnail: thumbnail.small,
      thumbnail: thumbnail.normal,
      averageRating: book.average_rating.text,
      ratingsCount: book.ratings_count.text,
    }
    return (
      <BookListItem 
        onBookSelectionPress={this.onBookSelectionPress}
        book={bookObject}
      />
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

  onBackButtonPress = () => {
    this.setState({
      searchTitle: null,
      showcontainer: false,
      searchingBooks: [],
      showBookListImage: false,
      selectedBook: null,
    });
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {Platform.OS === 'ios' && (
          <View style={styles.iosBackButton}>
            <Icon
              name='chevron-left'
              type='feather'
              
              onPress={this.onBackButtonPress} />
          </View>
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
                    onChangeText={text => this.onGoodReadsSearchBooks(text)}
                    onFocus={this.onTextInputPress}
                  />
                </Animated.View>
                {this.state.showcontainer && (
                  <View style={{height: windowHeight * .80}}>
                    <FlatList
                      data={this.state.searchingBooks}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={book => this.renderGoodReadsBooks(book.item)}
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
    ...elevationShadowStyle(5),
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
    height: '95%',
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
    top: 5,
    width: '60%',
    height: '40%',
    paddingLeft: 20,
  },
  searchButtonContainer: {
    margin: 10,
    width: '50%',
  },
  searchButtonStyle: {
    backgroundColor: '#55707b',
  },
  iosBackButton: {
    zIndex: 50,
    position: 'absolute',
    left: windowHeight * 0.02,
    top: windowHeight * 0.06,
  },
});

