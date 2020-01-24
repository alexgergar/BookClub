import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {bookClubEvent} from '../utils/testInfo';
import {Icon, Avatar} from 'react-native-elements';

export default class EventDetails extends Component {
  handleGetInitials = fullName => {
    return fullName
      .split(' ')
      .map(n => n[0])
      .join('');
  };
  render() {
    const listOfAttendees = bookClubEvent.attendees.map((attendee, index) => {
      const initialsOfName = this.handleGetInitials(attendee.guestName);
      return <Avatar key={index} rounded title={initialsOfName} />;
    });
    return (
      <View>
        {/* What I need to bring to event as card with icon or if I need to pick from list - tell what i'm bringing */}
        <View style={styles.whatToBringContainer}>
          <Icon name="add-alert" type="material" />
          <Text style={styles.cardTitleStyle}>
            Bring {bookClubEvent.whatGuestsProvides[0].whatTheyAreBringing}!
          </Text>
        </View>
        <View style={styles.headlineView}>
          <Text style={styles.headlineText}>Who is coming?</Text>
        </View>
        <View style={styles.whoIsComingListContainer}>{listOfAttendees}</View>
        <View style={styles.headlineView}>
          <Text style={styles.headlineText}>Info</Text>
        </View>
        <View style={styles.importantInfoContainer}>
          <Text style={styles.eventDetailsText}>
            {bookClubEvent.host.name} wanted you to know...
          </Text>
          <Text style={styles.eventDetailsQuoteText}>
            {bookClubEvent.detailsForLocation}
          </Text>
        </View>
        <View style={styles.headlineView}>
          <Text style={styles.headlineText}>Just so you know</Text>
        </View>
        <View style={styles.importantInfoContainer}>
          <Text style={styles.eventDetailsText}>
            {bookClubEvent.detailsForEvent}
          </Text>
        </View>

        {/* }
                    <Text>Card list of who is attending - click and it expands into more info - slice the list based on a certain number based on size of avatar then add plus sign</Text>
                    <Text>Details/important info on what to know - how to get to location, allergies, door access codes - bulleted or list formate</Text>
                    <Text>Details for location</Text> {*/}
      </View>
    );
  }
}

// This is to get the window width and height for styling
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  hortizontalLine: {
    padding: 15,
    marginLeft: '20%',
    marginRight: '20%',
    borderBottomWidth: 1,
    borderColor: '#DBDBDB',
  },
  whatToBringContainer: {
    borderRadius: 10,
    backgroundColor: 'rgba(165, 172, 181, 0.2)',
    padding: 15,
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(165, 172, 181, 0.21)',
    borderWidth: 1.5,
  },
  cardTitleStyle: {
    textTransform: 'uppercase',
    paddingLeft: 10,
    fontSize: 18,
  },
  headlineView: {
    left: '5%',
  },
  headlineText: {
    textTransform: 'uppercase',
    color: '#585D61',
    fontSize: 12,
  },
  whoIsComingListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 5,
    marginBottom: 15,
    borderWidth: 0,
  },
  listItemContentWhoIsComing: {
    backgroundColor: 'rgba(165, 172, 181, 0.1)',
  },
  listContainerWhoIsComing: {
    borderRadius: 10,
    borderWidth: 0,
  },
  eventDetailsText: {
    marginLeft: '5%',
    marginRight: '5%',
    color: '#1E3342',
  },
  eventDetailsQuoteText: {
    fontStyle: 'italic',
    marginLeft: '8%',
    marginRight: '8%',
    color: '#1E3342',
  },
  importantInfoContainer: {
    marginBottom: 10,
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
