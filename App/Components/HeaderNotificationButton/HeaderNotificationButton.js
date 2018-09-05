import React from 'react';
import { Button, Icon } from 'native-base';
import NavigatorService from '../../Navigation/NavigationService';

const HeaderNotificationButton = (props) => {
    const onNotificationButtonClicked = () => {
        NavigatorService.navigate('Notification');
    }
      return(
          <Button
              onPress={onNotificationButtonClicked}
              transparent>
              <Icon type="Entypo" name='notification' />
          </Button>
      )
};

export default HeaderNotificationButton;