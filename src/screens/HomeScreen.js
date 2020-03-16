import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {ListOfBooks, SectionHeader} from '../components/HomeScreenComponents';
import MenuDrawerButton from '../components/MenuDrawerButton';
import UserContext from '../context/UserContext';
import AvatarImage from '../components/AvatarImage';
import firestore from '@react-native-firebase/firestore';
import EventCardHorizontal from '../components/EventCardHorizontal';
import {FlatList} from 'react-native-gesture-handler';
import axios from 'axios';
import {nyTimesBestSellersList} from '../utils/urlFor';
import LottieView from 'lottie-react-native';
import {windowHeight, elevationShadowStyle} from '../style/baseStyles';

export default class Home extends Component {
  state = {
    user: {},
    events: [],
    nonFictionBooks: [],
    fictionBooks: [],
    graphicNovels: [],
    discoverSection: 'hardcover-fiction',
    eventsFinishedFetching: false,
    discoverFinishedFetching: false,
  };

  componentDidMount() {
    this.getUserInfoFromDB();
    this.getNYTimesList('hardcover-fiction');
  }

  componentWillUnmount() {
    this.getUserInfoFromDB();
  }

  getUserInfoFromDB = () => {
    let user = this.context;
    firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(
        doc => {
          this.setState({
            events: doc.data().events,
            bookClubs: doc.data().bookClubs,
            eventsFinishedFetching: true,
            user: {
              uid: user.uid,
              displayName: doc.data().displayName,
              firstName: doc.data().displayName.split(' ')[0],
              email: doc.data().email,
              phoneNumber: doc.data().phoneNumber,
              avatarURL: doc.data().avatarURL,
            },
          });
        },
        error => {
          console.log(error);
        },
      );
  };

  getNYTimesList = genre => {
    axios
      .get(nyTimesBestSellersList(genre))
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
    this.props.navigation.navigate('MainStack', {
      screen: 'BookView',
      params: {
        selectedBook: bookObject,
      },
    });
  };

  onEventItemPress = eventID => {
    this.props.navigation.navigate('MainEvent', {
      eventID: eventID,
    });
  };

  onSectionHeaderPress = genre => {
    if (
      genre === 'hardcover-nonfiction' &&
      this.state.nonFictionBooks.length === 0
    ) {
      this.getNYTimesList('hardcover-nonfiction');
    }
    if (
      genre === 'graphic-books-and-manga' &&
      this.state.graphicNovels.length === 0
    ) {
      this.getNYTimesList('graphic-books-and-manga');
    }
    this.setState({discoverSection: genre});
  };

  onMenuPress = () => {
    this.props.navigation.toggleDrawer();
  };

  render() {
    const {
      user,
      events,
      discoverSection,
      nonFictionBooks,
      fictionBooks,
      graphicNovels,
      eventsFinishedFetching,
      discoverFinishedFetching,
    } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {eventsFinishedFetching === false ||
          (discoverFinishedFetching == false && (
            <View style={{alignItems: 'center'}}>
              <LottieView
              source={require('../utils/loading-book-blue.json')}
              autoPlay
              loop
            />
            </View>
          ))}
        {eventsFinishedFetching && discoverFinishedFetching && (
          <MenuDrawerButton onPress={this.onMenuPress} />
        )}
        {eventsFinishedFetching && discoverFinishedFetching && (
          <ScrollView
            keyboardShouldPersistTaps={'always'}
            contentContainerStyle={{zIndex: 1}}>
            <View style={styles.welcomeView}>
              <View style={{paddingRight: 10, paddingBottom: 7}}>
                <Text style={styles.homeHeadlineTwoText}>
                  Welcome, {user.firstName}
                </Text>
              </View>
              <AvatarImage
                image={user.avatarURL}
                style={{width: 70, height: 70, justifyContent: 'flex-end'}}
              />
            </View>
            {events && events.length > 0 && (
              <View>
                <View style={styles.headlineView}>
                  <Text style={styles.homeHeadlineOneText}>
                    Upcoming Events
                  </Text>
                </View>
                <View style={styles.topHorizontalCard}>
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
                        eventID={item.eventID}
                        onEventItemPress={this.onEventItemPress}
                      />
                    )}
                  />
                </View>
              </View>
            )}
            <View style={styles.quickActionButtonsView}>
              <TouchableHighlight
                style={styles.touchableHighlightView}
                >
                <View style={styles.quickActionButton}>
                  <Icon name="ios-people" type="ionicon" color="#3A5673" />
                  <Text style={styles.quickActionButtonTextStyle}>
                    BookClubs
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.touchableHighlightView}
                onPress={() =>
                  this.props.navigation.navigate('Create New Event', {
                    screen: 'CreateEvent',
                  })
                }>
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
            <View style={[styles.headlineView, {marginTop: '8%'}]}>
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
    paddingTop: 10,
    paddingRight: 20,
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
