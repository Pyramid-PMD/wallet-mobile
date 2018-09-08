import React, {Component} from 'react';
import { Text, Container, Content, ListItem, CheckBox, Body, Thumbnail, View } from 'native-base';
import Images from "../../Theme/Images";
import ApplicationStyles from "../../Theme/ApplicationStyles";

class ChangeLanguageScreen extends Component {
    state = {
        languages: [
            {
                name: 'Chinese',
                checked: true,
            },
            {
                name: 'English',
                checked: false
            }
        ]
    };


    onLanguageSelect(selectedLanguage) {
        this.handleCheckedState(selectedLanguage);
        this.changeLanguage();
    }

    handleCheckedState(selectedLanguage) {
        const languages = this.state.languages;
        const index = languages.indexOf(selectedLanguage);
        languages.map(language => language.checked = false);
        languages[index].checked = !languages[index].checked;
        this.setState({ languages });
    }

    changeLanguage() {
        console.log('dispatch change language action');
    }

    renderLanguages() {
        return this.state.languages.map(language => {
            return (
                <ListItem thumbnail style={ApplicationStyles.checkboxList.listItem} key={language.name}>
                    <Body style={ApplicationStyles.checkboxList.listItemBody}>
                        <View style={ApplicationStyles.checkboxList.listTextContainer}>
                            <Text>{language.name}</Text>
                            <CheckBox style={ApplicationStyles.checkboxList.checkbox} checked={language.checked} onPress={this.onLanguageSelect.bind(this, language)}/>
                        </View>
                    </Body>
                </ListItem>
            );
        });
    }
    render() {
        return(
            <Container>
                <Content>
                    {this.renderLanguages()}
                </Content>
            </Container>
        )
    }
}

export default ChangeLanguageScreen;