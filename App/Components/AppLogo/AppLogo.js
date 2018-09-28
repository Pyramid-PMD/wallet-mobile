import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { View, Image } from 'react-native';
import { Text } from 'native-base';
import { Images } from '../../Theme';
import AppConfig from '../../Config/AppConfig';
import AppLogoStyles from './AppLogoStyles';
import ApplicationStyles from "../../Theme/ApplicationStyles";

const AppLogo = (props) => {
    const {orientation, t} = props;

    const renderLogo = () => {
        if (orientation === 'vertical') {
            return (
                <View style={AppLogoStyles.logoContainerStyle}>
                    <Image source={Images.logo} style={AppLogoStyles.logoImageStyle} resizeMode="contain"/>
                    <Text style={AppLogoStyles.logoTextStyle}>{ t('common:brand.name').toUpperCase() }</Text>
                </View>
            );
        }
        return (
            <View style={AppLogoStyles.logoContainerHorizontal}>
                <Image source={Images.logo} style={AppLogoStyles.logoHorizontal} resizeMode="contain"/>
                <View style={{maxWidth: 140, marginLeft: 6}}>
                    <Text style={[AppLogoStyles.logoTextStyle, {textAlign: 'left'}]}>{ t('common:brand.name').toUpperCase() }</Text>
                    <Text
                        numberOfLines={1}
                        style={[ApplicationStyles.logoTextHorizontal,
                            ApplicationStyles.typography.smallText, {marginLeft: 3}]}>{ t('common:brand.slogan').toUpperCase() }</Text>
                </View>
            </View>
        );

    };

    return renderLogo();
};

export default translate('common')(AppLogo);

AppLogo.propTypes = {
   orientation: PropTypes.string
};

AppLogo.defaultProps = {
    orientation: 'vertical'
};