import React from 'react';
import { Card, CardItem, Icon, Text, Right, Button, View } from 'native-base';
import NavigationService from '../../../Navigation/NavigationService';
import ProfileScreenStyles from "../ProfileScreenStyles";
import ApplicationStyles from "../../../Theme/ApplicationStyles";

const Settings = (props) => {
    const {t} = props;
    const navigate = (routeName) => {
        NavigationService.navigate(routeName);
    };
    return (
        <View>
            <Card transparent style={ProfileScreenStyles.card}>
                <CardItem
                    button={true}
                    onPress={navigate.bind(this,'Help')}
                    style={ProfileScreenStyles.cardItem}>
                    <Icon
                        name="comment-question-outline"
                        type="MaterialCommunityIcons"
                        style={ProfileScreenStyles.cardItemIcon} />
                    <View style={[ProfileScreenStyles.cardItemTextContainer, ProfileScreenStyles.cardItemNoBorder]}>
                        <Text>{t('dashboard:profileScreen.settings.help')}</Text>
                        <Right>
                            <Icon
                                name="chevron-right"
                                type="EvilIcons"
                                style={[ProfileScreenStyles.cardItemIcon, ApplicationStyles.listChevronIcon]}/>
                        </Right>
                    </View>
                </CardItem>
            </Card>

            <Card transparent style={ProfileScreenStyles.card}>
                <CardItem button={true} onPress={navigate.bind(this,'ChangeCurrency')} style={ProfileScreenStyles.cardItem}>
                    <Icon
                        name="currency-cny"
                        type="MaterialCommunityIcons"
                        style={ProfileScreenStyles.cardItemIcon} />
                    <View style={ProfileScreenStyles.cardItemTextContainer}>
                        <Text>{t('dashboard:profileScreen.settings.baseCurrency')}</Text>
                        <Right>
                            <Icon
                                name="chevron-right"
                                type="EvilIcons"
                                style={[ProfileScreenStyles.cardItemIcon, ApplicationStyles.listChevronIcon]}/>
                        </Right>
                    </View>
                </CardItem>

                <CardItem button={true} onPress={navigate.bind(this,'ChangeLanguage')} style={ProfileScreenStyles.cardItem}>
                    <Icon
                        name="globe"
                        type="SimpleLineIcons"
                        style={ProfileScreenStyles.cardItemIcon} />
                    <View style={ProfileScreenStyles.cardItemTextContainer}>
                        <Text>{t('dashboard:profileScreen.settings.languages')}</Text>
                        <Right>
                            <Icon
                                name="chevron-right"
                                type="EvilIcons"
                                style={[ProfileScreenStyles.cardItemIcon, ApplicationStyles.listChevronIcon]}/>
                        </Right>
                    </View>
                </CardItem>

                <CardItem button={true} onPress={navigate.bind(this,'ChangePassword')} style={ProfileScreenStyles.cardItem}>
                    <Icon
                        name="lock"
                        type="SimpleLineIcons"
                        style={ProfileScreenStyles.cardItemIcon} />
                    <View style={[ProfileScreenStyles.cardItemTextContainer, ProfileScreenStyles.cardItemNoBorder]}>
                        <Text>{t('dashboard:profileScreen.settings.password')}</Text>
                        <Icon
                            name="chevron-right"
                            type="EvilIcons"
                            style={[ProfileScreenStyles.cardItemIcon, ApplicationStyles.listChevronIcon]}/>
                    </View>

                </CardItem>
            </Card>
        </View>

    );
};

export default Settings;