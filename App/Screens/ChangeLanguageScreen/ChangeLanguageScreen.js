import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Text, Container, Content, ListItem, CheckBox, Body, Thumbnail, View } from 'native-base';
import { translate } from 'react-i18next';
import { languages } from '../../Config/AppConfig';
import ApplicationStyles from "../../Theme/ApplicationStyles";
import ChangeLanguageActions, {ChangeLanguageSelectors} from './ChangeLanguageRedux';
import ListRadioButton from "../../Components/ListRadioButton/ListRadioButton";

@translate(['common'], { wait: true })
class ChangeLanguageScreen extends Component {
    state = {
        languages
    };

    componentDidMount() {
        const {currentLanguage} = this.props;
        this.handleCheckedState(currentLanguage);
    }

    onLanguageSelect(selectedLanguage) {
        this.handleCheckedState(selectedLanguage);
        this.changeLanguage(selectedLanguage);
    }

    handleCheckedState(selectedLanguage) {
        let languages = this.state.languages;
        const index = languages.findIndex(language => language.code === selectedLanguage.code);
        if (index > -1) {
            languages.map(language => language.checked = false);
            languages[index].checked = !languages[index].checked;
            this.setState({ languages });
        }
    }

    changeLanguage(selectedLanguage) {
        const { changeLanguage } = this.props;
        changeLanguage(selectedLanguage);
    }

    renderLanguages() {
        return this.state.languages.map(language => {
            return (
                <ListRadioButton
                    key={language.name}
                    title={language.name}
                    selectedItem={language}
                    checked={language.checked}
                    onPress={this.onLanguageSelect.bind(this)}
                />
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

const mapStateToProps = (state) => ({
    currentLanguage: ChangeLanguageSelectors.selectLanguage(state)
});

const mapDispatchToProps = (dispatch) => ({
    changeLanguage: (language) => dispatch(ChangeLanguageActions.changeLanguage(language))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeLanguageScreen);
