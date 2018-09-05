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
                    <Icon name="bowtie" />
                    <Text>Home</Text>
                </Button>
                <Button
                    vertical
                    active={navigation.state.index === 1}
                    onPress={() => props.navigation.navigate('News')}>
                    <Icon name="briefcase" />
                    <Text>News</Text>
                </Button>
                <Button
                    vertical
                    active={navigation.state.index === 2}
                    onPress={() => navigation.navigate('Profile')}>
                    <Icon name="headset" />
                    <Text>Profile</Text>
                </Button>
            </FooterTab>
        </Footer>
    );
};

export default NavigationTabs;