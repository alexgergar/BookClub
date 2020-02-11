import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';

export default class BadgeListItem extends Component {
  handleGetInitials = fullName => {
    return fullName
      .toUpperCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  };

  render() {
    return (
      <View style={styles.memberAvatartNameItemView}>
        {this.props.avatar ? (
          <Avatar rounded source={{uri: this.props.avatar}} size={20} />
        ) : (
          <Avatar
            rounded
            size={20}
            titleStyle={styles.avatarTitleStyle}
            title={this.handleGetInitials(this.props.displayName)}
            avatarStyle={styles.avatarStyle}
          />
        )}
        <Text style={styles.memberItemText}>{this.props.displayName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  memberAvatartNameItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: '#EBE2CD',
    borderRadius: 30,
    padding: 2,
    paddingRight: 10,
  },
  memberItemText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    paddingLeft: 5,
  },
  avatarTitleStyle: {
    fontFamily: 'Montserrat-Bold',
    // color: 'black',
  },
  avatarStyle: {
    // backgroundColor: 'pink',
  },
});
