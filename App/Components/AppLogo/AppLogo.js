import React from 'react';
import { View, Image } from 'react-native';
import { Text } from 'native-base';
import { Images } from '../../Theme';
import AppConfig from '../../Config/AppConfig';
import AppLogoStyles from './AppLogoStyles';
const AppLogo = () => {
  return (
      <View style={AppLogoStyles.logoContainerStyle}>
          <Image source={Images.logo} style={AppLogoStyles.logoImageStyle} resizeMode="contain"/>
          <Text style={AppLogoStyles.logoTextStyle}>{ AppConfig.appName.toUpperCase() }</Text>
      </View>
  );
};

export default AppLogo;