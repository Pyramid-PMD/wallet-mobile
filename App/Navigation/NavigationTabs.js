import React, {Component} from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { translate } from 'react-i18next';

@translate(['common', 'dashboard'], { wait: true })
class NavigationTabs extends Component {
    render() {
        const { navigation, t } = this.props;
        return (
            <Footer>
                <FooterTab>
                    <Button
                        vertical
                        active={navigation.state.index === 0}
                        onPress={() => navigation.navigate('Home')}>
                        <Icon name="home" type="SimpleLineIcons" />
                        <Text>{t('dashboard:navigationTabs.home')}</Text>
                    </Button>
                    <Button
                        vertical
                        active={navigation.state.index === 1}
                        onPress={() => navigation.navigate('News')}>
                        <Icon name="newspaper-o" type="FontAwesome" />
                        <Text>{t('dashboard:navigationTabs.news')}</Text>
                    </Button>
                    <Button
                        vertical
                        active={navigation.state.index === 2}
                        onPress={() => navigation.navigate('Profile')}>
                        <Icon name="user-o" type="FontAwesome" />
                        <Text>{t('dashboard:navigationTabs.profile')}</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}

export default NavigationTabs;