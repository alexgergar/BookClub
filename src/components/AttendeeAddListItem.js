import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {Button, Icon, ListItem} from 'react-native-elements';
import AvatarForList from './AvatarForList';

RenderMember = props => {
  <ListItem
    title={props.member.displayName}
    subtitle={props.member.email}
    leftAvatar={<AvatarForList avatar={props.member.avatar} avatarSize={18} />}
    onLongPress={() => props.onLongPress}
    onPress={() => props.onPress}
  />
}

const RenderSpacer = () => (
  <View style={styles.spacer} />
)

const AttendeeAddListItem = props => (
  <FlatList
    data={props.data}
    keyExtractor={item => item.uid.toString()}
    renderItem={<RenderMember props={props} />}
    ItemSeparatorComponent={<RenderSpacer />}
  />
)

const styles = StyleSheet.create({
  spacer: {
      paddingVertical: 5,
    },
});

export default AttendeeAddListItem;