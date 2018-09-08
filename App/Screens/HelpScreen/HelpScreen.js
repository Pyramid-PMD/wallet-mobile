import React, {Component} from 'react';
import { Text, Container, Content, List, ListItem, Left, Icon, Right } from 'native-base';
import NavigationService from '../../Navigation/NavigationService';
import HelpScreenStyles from "./HelpScreenStyles";
import ApplicationStyles from "../../Theme/ApplicationStyles";

class HelpScreen extends Component {
    helpItems = [
        {
            id: 1,
            title: 'How pyramid brings you success',
            body: 'What is account password and PIN code What is account password and PIN code'
        },
        {
            id: 2,
            title: 'What is account password and PIN code',
            body: 'What is account password and PIN code What is account password and PIN code'
        },
        {
            id: 3,
            title: 'What is account password and PIN code What is account password and PIN code',
            body: 'What is account password and PIN code What is account password and PIN code'
        }
    ];

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
                    <Text>{help.title}</Text>
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
        return(
            <Container>
                <Content>
                    <List dataArray={this.helpItems}
                          renderRow={this.renderHelpItem.bind(this)}>
                    </List>
                </Content>
            </Container>
        )
    }
}

export default HelpScreen;