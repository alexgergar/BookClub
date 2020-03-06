import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {ListOfBooks, SectionHeader} from '../components/HomeScreenComponents';
import MenuDrawerButton from '../components/MenuDrawerButton';
import UserContext from '../context/UserContext';
import AvatarForListSquare from '../components/AvatarForListSquare';
import firestore from '@react-native-firebase/firestore';
import EventCardHorizontal from '../components/EventCardHorizontal';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import {NYTIMES_KEY} from 'react-native-dotenv';


export default class Home extends Component {
  state = {
    events: [],
    nonFictionBooks: [],
    fictionBooks: [],
    graphicNovels: [],
    discoverSection: 'hardcover-fiction',
    eventsFinishedFetching: false,
    discoverFinishedFetching: false,
  };

  componentDidMount() {
    let user = this.context;
    console.log(user.phone)
    this.getUserEventsFromUID();
    this.getNYTimesList('hardcover-fiction');
  }

  getUserEventsFromUID = () => {
    let user = this.context;
    firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        this.setState({
          events: doc.data().events,
          eventsFinishedFetching: true,
        });
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
        this.setState({discoverFinishedFetching: true});
      })
      .catch(error => console.log(error));
  };

  onDiscoverListItemPress = book => {
    const bookObject = {
      currentNYTRank: book.rank,
      weeksOnNTTimes: book.weeks_on_list,
      description: book.description,
      author: book.author,
      title: book.title,
      isbn: book.isbns[0].isbn13,
      thumbnail: book.book_image,
    };
    this.props.navigation.navigate('BookView', {
      selectedBook: bookObject,
    });
  };

  onEventItemPress = event => {
    this.props.navigation.navigate('MainEvent', {
      eventID: event.eventID,
    });
  };

  onSectionHeaderPress = genre => {
    if (
      genre === 'hardcover-nonfiction' &&
      this.state.nonFictionBooks.length == 0
    ) {
      this.getNYTimesList(`hardcover-nonfiction`);
    }
    if (
      genre === 'graphic-books-and-manga' &&
      this.state.graphicNovels.length == 0
    ) {
      this.getNYTimesList(`graphic-books-and-manga`);
    }
    this.setState({discoverSection: genre});
  };

  onMenuPress = () => {
    this.props.navigation.toggleDrawer()
  }
 
  render() {
    let user = this.context;
    const {
      events,
      discoverSection,
      nonFictionBooks,
      fictionBooks,
      graphicNovels,
      eventsFinishedFetching,
      discoverFinishedFetching,
    } = this.state;
    const firstName = user.displayName.split(' ')[0];
    return (
      <SafeAreaView style={styles.container}>
        {eventsFinishedFetching && discoverFinishedFetching && <MenuDrawerButton onPress={this.onMenuPress}/>}
        {eventsFinishedFetching && discoverFinishedFetching && (
          <ScrollView keyboardShouldPersistTaps={'always'} contentContainerStyle={{zIndex: 1}}>
            <View style={styles.welcomeView}>
              <View style={{paddingRight: 10}}>
                <Text style={styles.homeHeadlineTwoText}>Welcome, {firstName}</Text>
              </View>
              <AvatarForListSquare avatar={user.avatar} avatarSize={40} displayName={user.displayName} />
            </View>
            <View style={styles.headlineView}>
              <Text style={styles.homeHeadlineOneText}>Upcoming Events</Text>
            </View>
            <View style={styles.topHorizontalCard}>
              {events.length !== 0 && (
                <FlatList
                  horizontal
                  data={events}
                  keyExtractor={item => item.eventID.toString()}
                  renderItem={({item}) => (
                    <EventCardHorizontal
                      date={item.date}
                      time={item.time}
                      bookTitle={item.bookTitle}
                      bookCover={item.bookCover}
                    />
                  )}
                />
              )}
            </View>
            <View style={styles.quickActionButtonsView}>
              <TouchableHighlight
                style={styles.touchableHighlightView}
                onPress={() =>
                  console.log(
                    'this will take your to the list of user bookclubs',
                  )
                }>
                <View style={styles.quickActionButton}>
                  <Icon name="ios-people" type="ionicon" color="#3A5673" />
                  <Text style={styles.quickActionButtonTextStyle}>
                    BookClubs
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={styles.touchableHighlightView}>
                <View style={styles.quickActionButton}>
                  <Icon name="plus-circle" type="feather" color="#3A5673" />
                  <Text style={styles.quickActionButtonTextStyle}>
                    New Event
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={styles.touchableHighlightView}>
                <View style={styles.quickActionButton}>
                  <Icon name="ios-chatbubbles" type="ionicon" color="#3A5673" />
                  <Text style={styles.quickActionButtonTextStyle}>
                    Messages
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={[styles.headlineView, {marginTop: "8%"}]}>
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
        )}
      </SafeAreaView>
    );
  }
}
function elevationShadowStyle(elevation) {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0.5 * elevation},
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation,
  };
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const bookListItemWidth = windowWidth * 0.8 * 0.3;
const bookListItemHeight = bookListItemWidth * 1.6 + windowHeight * 0.06;
const authorTitleViewHeight = bookListItemHeight - bookListItemWidth * 1.6;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E3E4E6',
    flex: 1,
    zIndex: 1,
  },
  welcomeView: {
    width: '87%',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
    paddingRight: 10,
    flexDirection: 'row',
  },
  headlineView: {
    marginHorizontal: windowHeight * 0.03,
    paddingTop: 10,
  },
  topHorizontalCard: {
    top: windowHeight * 0.01,
    marginLeft: windowHeight * 0.03,
  },
  homeHeadlineOneText: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  homeHeadlineTwoText: {
    fontSize: 16,
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
  listFromDiscoverView: {
    backgroundColor: 'white',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

Home.contextType = UserContext;
