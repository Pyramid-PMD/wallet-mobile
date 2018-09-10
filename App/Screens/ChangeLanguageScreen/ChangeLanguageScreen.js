import React, {Component} from 'react';
import { Text, Container, Content, ListItem, CheckBox, Body, Thumbnail, View } from 'native-base';
import { translate } from 'react-i18next';
import { languages } from '../../Config/AppConfig';
import ApplicationStyles from "../../Theme/ApplicationStyles";

@translate(['common'], { wait: true })
class ChangeLanguageScreen extends Component {
    state = {
        languages
    };


    onLanguageSelect(selectedLanguage) {
        this.handleCheckedState(selectedLanguage);
        this.changeLanguage(selectedLanguage);
    }

    handleCheckedState(selectedLanguage) {
        const languages = this.state.languages;
        const index = languages.indexOf(selectedLanguage);
        languages.map(language => language.checked = false);
        languages[index].checked = !languages[index].checked;
        this.setState({ languages });
    }

    changeLanguage(selectedLanguage) {
        const { i18n } = this.props;
        // TODO: dispatch action instead
        i18n.changeLanguage(selectedLanguage.code);
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
        const { t } = this.props;

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