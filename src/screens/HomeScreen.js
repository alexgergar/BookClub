import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import {Icon} from 'react-native-elements';
import UserContext from '../context/UserContext';
import firestore from '@react-native-firebase/firestore';
import EventCardHorizontal from '../components/EventCardHorizontal';
import {FlatList} from 'react-native-gesture-handler';
import axios from 'axios';
import {NYTIMES_KEY} from 'react-native-dotenv';

const ListOfBooks = props => {
  const bookList = props.list.map(book => 
    <TouchableHighlight key={book.rank.toString()} onPress={() => props.onPress(book)}>
      <View style={styles.bookListItemContainer} >
        <Image
          style={styles.bookListImage}
          source={{ uri: book.book_image }}
          resizeMode={'cover'}
        />
        <View style={styles.bookListItemTitleAuthorView}>
          <Text style={styles.bookItemAuthorText}>{book.author}</Text>
          <Text style={styles.bookItemTitleText}>{book.title}</Text>
        </View>
      </View>
    </TouchableHighlight>
    
  );
  return bookList;
}

const SectionHeader = props => {
  return (
    <View style={styles.discoverHeadlineView}>
      <TouchableHighlight
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
}

export default class Home extends Component {
  state = {
    events: [],
    nonFictionBooks: [],
    fictionBooks: [],
    graphicNovels: [],
    discoverSection: 'hardcover-fiction',
  };

  componentDidMount() {
    this.getNYTimesList('hardcover-fiction');
    this.getUserEventsFromUID();
  }

  getUserEventsFromUID = () => {
    let user = this.context;
    firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        this.setState({events: doc.data().events});
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  };

  getNYTimesList = genre => {
    axios
      .get(
        `https://api.nytimes.com/svc/books/v3/lists/current/${genre}.json?api-key=${NYTIMES_KEY}`, // this gets info about author from goodreads
      )
      .then(response => {
        if (genre === 'hardcover-fiction') {
          this.setState({
            fictionBooks: response.data.results.books,
            discoverSection: 'hardcover-fiction',
          });
        } else if (genre === 'graphic-books-and-manga') {
          this.setState({
            graphicNovels: response.data.results.books,
            discoverSection: 'graphic-books-and-manga',
          });
        } else {
          this.setState({
            nonFictionBooks: response.data.results.books,
            discoverSection: 'hardcover-nonfiction',
          });
        }
      })
      .catch(error => console.log(error));
  }

  onDiscoverListItemPress = book => {
    const bookObject = {
      currentNYTRank: book.rank,
      weeksOnNTTimes: book.weeks_on_list,
      description: book.description,
      author: book.author,
      title: book.title,
      isbn: book.isbns[0].isbn13,
      thumbnail: book.book_image,
    }
    this.props.navigation.navigate('BookView', {
      selectedBook: bookObject,
    });
  }

  onEventItemPress = event => {
    console.log(event);
    this.props.navigation.navigate('MainEvent', {
      eventID: event.eventID,
    });
  }

  onSectionHeaderPress = genre => {
    if (genre === 'hardcover-nonfiction' && this.state.nonFictionBooks.length == 0) {
      this.getNYTimesList(`hardcover-nonfiction`);
    } 
    if (genre === 'graphic-books-and-manga' && this.state.graphicNovels.length == 0) {
      this.getNYTimesList(`graphic-books-and-manga`);
    }
    this.setState({discoverSection: genre});
  }

  render() {
    const {events, discoverSection, nonFictionBooks, fictionBooks, graphicNovels} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView keyboardShouldPersistTaps={'always'}>
          <View style={[styles.upcomingContainer, styles.headlineView]}>
            <Text style={styles.homeHeadlineOneText}>Upcoming Events</Text>
          </View>
          <View style={styles.topHorizontalCard}>
            {events.length !== 0 && (
              <FlatList
                horizontal
                data={events}
                keyExtractor={item => item.eventID.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{flex: 1}}
                    onPress={() => this.onEventItemPress(item)}>
                    <EventCardHorizontal
                      date={item.date}
                      time={item.time}
                      bookTitle={item.bookTitle}
                      bookCover={item.bookCover}
                    />
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
          <View style={styles.quickActionButtonsView}>
            <TouchableHighlight
              style={styles.touchableHighlightView}
              onPress={() =>
                console.log('this will take your to the list of user bookclubs')
              }>
              <View style={styles.quickActionButton}>
                <Icon name="ios-people" type="ionicon" color="#3A5673" />
                <Text style={styles.quickActionButtonTextStyle}>BookClubs</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight 
              style={styles.touchableHighlightView}
              >
              <View style={styles.quickActionButton}>
                <Icon name="plus-circle" type="feather" color="#3A5673" />
                <Text style={styles.quickActionButtonTextStyle}>New Event</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.touchableHighlightView}>
              <View style={styles.quickActionButton}>
                <Icon name="ios-chatbubbles" type="ionicon" color="#3A5673" />
                <Text style={styles.quickActionButtonTextStyle}>Messages</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={[styles.discoverTitleContainer, styles.headlineView]}>
            <Text style={styles.homeHeadlineOneText}>Discover</Text>
          </View>
          <View style={styles.discoverContainerView}>
            <SectionHeader
              onSectionHeaderPress={this.onSectionHeaderPress}
              pickedSection={discoverSection}
            />
            <View style={styles.listFromDiscoverView}>
              {discoverSection == 'hardcover-fiction' && (
                <ListOfBooks
                  list={fictionBooks}
                  onPress={this.onDiscoverListItemPress}
                />
              )}
              {discoverSection === 'hardcover-nonfiction' && (
                <ListOfBooks
                  list={nonFictionBooks}
                  onPress={this.onDiscoverListItemPress}
                />
              )}
              {discoverSection === 'graphic-books-and-manga' && (
                <ListOfBooks
                  list={graphicNovels}
                  onPress={this.onDiscoverListItemPress}
                />
              )}
              {(fictionBooks.length === 0 ||
                nonFictionBooks.length === 0 ||
                graphicNovels.length == 0) && (
                <View style={{height: windowHeight * 0.29}} />
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
function elevationShadowStyle(elevation) {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation
  };
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const bookListItemWidth = windowWidth * .8 * .3;
const bookListItemHeight = bookListItemWidth * 1.6 + windowHeight * .06;
const authorTitleViewHeight = (bookListItemHeight - (bookListItemWidth * 1.6));

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E3E4E6',
    flex: 1,
  },
  headlineView: {
    marginHorizontal: windowHeight * 0.03,
    marginTop: windowHeight * 0.03,
  },
  topHorizontalCard: {
    marginTop: '2%',
    marginLeft: windowHeight * 0.03,
  },
  homeHeadlineOneText: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
  quickActionButtonsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: '5%',
    top: '5%',
  },
  touchableHighlightView: {
    width: '30%',
  },
  quickActionButton: {
    aspectRatio: 1 / 0.6,
    ...elevationShadowStyle(5),
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionButtonTextStyle: {
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
    textTransform: 'uppercase',
    color: '#3A5673',
    marginTop: '10%',
  },
  discoverTitleContainer: {
    paddingTop: '5%',
  },
  discoverContainerView: {
    ...elevationShadowStyle(8),
    marginTop: '5%',
    padding: '5%',
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
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
  listFromDiscoverView: {
    backgroundColor: 'white',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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

Home.contextType = UserContext;
