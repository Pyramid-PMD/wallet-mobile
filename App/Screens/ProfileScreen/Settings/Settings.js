import React from 'react';
import { Card, CardItem, Icon, Text, Right, Button, View } from 'native-base';
import NavigationService from '../../../Navigation/NavigationService';
import ProfileScreenStyles from "../ProfileScreenStyles";
import ApplicationStyles from "../../../Theme/ApplicationStyles";

const Settings = () => {
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
                        <Text>Help</Text>
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
                        <Text>Base currency</Text>
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
                        <Text>Languages</Text>
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
                        <Text>Password</Text>
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