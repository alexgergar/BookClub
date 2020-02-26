import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import AvatarForLists from './AvatarForList';
import { Avatar, Badge } from 'react-native-elements';

export default class AvatarSpread extends Component {
  render() {
    const excludeAfterIndex = this.props.numberShown;
    const listOfAttendees = this.props.users.reduce(
      (shownedAttendees, attendee, index) => {
        if (index < excludeAfterIndex) {
          shownedAttendees.push(
            <View key={index} style={styles.avatarContainer}>
              <AvatarForLists
                displayName={attendee.displayName}
                avatar={attendee.avatar}
                avatarSize={30}
              />
            </View>
          );
        }
        return shownedAttendees;
      },
      [],
    );

    return (
    <View style={styles.container}>
      {listOfAttendees}
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    margin: '2%',
  },
});
