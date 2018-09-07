import React from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';

const NavigationTabs = (props) => {
    const { navigation } = props;
    return (
        <Footer>
            <FooterTab>
                <Button
                    vertical
                    active={navigation.state.index === 0}
                    onPress={() => navigation.navigate('Home')}>
                    <Icon name="home" type="SimpleLineIcons" />
                    <Text>Home</Text>
                </Button>
                <Button
                    vertical
                    active={navigation.state.index === 1}
                    onPress={() => props.navigation.navigate('News')}>
                    <Icon name="newspaper-o" type="FontAwesome" />
                    <Text>News</Text>
                </Button>
                <Button
                    vertical
                    active={navigation.state.index === 2}
                    onPress={() => navigation.navigate('Profile')}>
                    <Icon name="user-o" type="FontAwesome" />
                    <Text>Profile</Text>
                </Button>
            </FooterTab>
        </Footer>
    );
};

export default NavigationTabs;