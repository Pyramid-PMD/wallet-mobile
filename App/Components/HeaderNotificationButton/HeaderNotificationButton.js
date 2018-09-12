import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, Badge, Text } from 'native-base';
import NavigatorService from '../../Navigation/NavigationService';
import Colors from "../../Theme/Colors";

const HeaderNotificationButton = (props) => {
    const onNotificationButtonClicked = () => {
        NavigatorService.navigate('Notification');
    }
      return(
          <Button
              badge
              vertical
              onPress={onNotificationButtonClicked}
              transparent>
              <Badge style={styles.badge}><Text style={{fontSize: 12, bottom: 4}}>2</Text></Badge>
              <Icon type="MaterialCommunityIcons" name="message-outline" style={styles.icon}/>
          </Button>
      )
};

export default HeaderNotificationButton;

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        right: 12,
        top: 0,
        zIndex: 2
    },
    icon: {
        color: Colors.primaryText
    }
});