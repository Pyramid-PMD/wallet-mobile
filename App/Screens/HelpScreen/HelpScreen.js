import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Text, Container, Content, List, ListItem, Left, Icon, Right } from 'native-base';
import NavigationService from '../../Navigation/NavigationService';
import HelpScreenStyles from "./HelpScreenStyles";
import ApplicationStyles from "../../Theme/ApplicationStyles";
import {ChangeLanguageSelectors} from '../../Screens/ChangeLanguageScreen/ChangeLanguageRedux';
import help from './help.json';

class HelpScreen extends Component {

    goToHelpDetail(help) {
        NavigationService.navigate('HelpDetail', { help });
    }

    renderHelpItem(help) {
        return (
            <ListItem
                style={HelpScreenStyles.listItem}
                button={true}
                onPress={this.goToHelpDetail.bind(this, help)}>
                <Left>
                    <Text>{help.head}</Text>
                </Left>
                <Right>
                    <Icon
                        style={ApplicationStyles.listChevronIcon}
                        name="chevron-right"
                        type="EvilIcons" />
                </Right>
            </ListItem>
        );
    }
    render() {
        const {currentLanguage} = this.props,
            helpItems = help[currentLanguage.code];
        return(
            <Container>
                <Content>
                    <List dataArray={helpItems}
                          renderRow={this.renderHelpItem.bind(this)}>
                    </List>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    currentLanguage: ChangeLanguageSelectors.selectLanguage(state)
});

export default connect(mapStateToProps)(HelpScreen);