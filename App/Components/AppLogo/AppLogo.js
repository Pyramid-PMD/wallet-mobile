import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { translate } from 'react-i18next';
import { View, Image } from 'react-native';
import { Text } from 'native-base';
import { Images } from '../../Theme';
import AppLogoStyles from './AppLogoStyles';
import ApplicationStyles from "../../Theme/ApplicationStyles";
import {ChangeLanguageSelectors} from "../../Screens/ChangeLanguageScreen/ChangeLanguageRedux";

const AppLogo = (props) => {
    const {orientation, t, currentLanguage} = props;

    const renderSlogan = () => {
        if (currentLanguage && currentLanguage.code === 'en') {
            return (
                <View style={{maxWidth: 140, marginLeft: 6}}>
                    <Text style={[AppLogoStyles.logoTextStyle, {textAlign: 'left', fontSize: 12}]}>{ t('common:brand.name').toUpperCase() }</Text>
                    <Text
                        numberOfLines={2}
                        style={[ApplicationStyles.logoTextHorizontal,
                            ApplicationStyles.typography.smallText, {marginLeft: 3, fontSize: 8, flexWrap: 'wrap'}]}>{ t('common:brand.slogan').toUpperCase() }</Text>
                </View>
            );
        }
        return (
            <View style={{maxWidth: 150, marginLeft: 6}}>
                <Text style={[AppLogoStyles.logoTextStyle, {textAlign: 'left'}]}>{ t('common:brand.name').toUpperCase() }</Text>
                <Text
                    numberOfLines={1}
                    style={[ApplicationStyles.logoTextHorizontal,
                        ApplicationStyles.typography.smallText, {marginLeft: 3}]}>{ t('common:brand.slogan').toUpperCase() }</Text>
            </View>
        );

    };

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
                {renderSlogan()}

            </View>
        );

    };

    return renderLogo();
};

const mapStateToProps = (state) => ({
    currentLanguage: ChangeLanguageSelectors.selectLanguage(state)
});

export default translate('common')(connect(mapStateToProps)(AppLogo));

AppLogo.propTypes = {
   orientation: PropTypes.string
};

AppLogo.defaultProps = {
    orientation: 'vertical'
};
