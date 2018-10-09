import React from 'react';
import {
    Text,
    ListItem,
    CheckBox,
    Body,
    Thumbnail,
    View
} from 'native-base';
import PropTypes from 'prop-types';
import {TouchableWithoutFeedback} from 'react-native';
import ApplicationStyles from "../../Theme/ApplicationStyles";

const ListRadioButton = (props) => {
    const {thumbnail, title, onPress, selectedItem, checked} = props;
    return (
        <TouchableWithoutFeedback onPress={() => onPress(selectedItem)}>
            <ListItem thumbnail style={ApplicationStyles.checkboxList.listItem}>
                {thumbnail ? <Thumbnail small source={thumbnail}/> : null}
                <Body style={ApplicationStyles.checkboxList.listItemBody}>
                    <View style={ApplicationStyles.checkboxList.listTextContainer}>
                        <Text>{title}</Text>
                        <CheckBox
                            style={ApplicationStyles.checkboxList.checkbox}
                            onPress={() => onPress(selectedItem)}
                            checked={checked}/>
                    </View>
                </Body>
            </ListItem>
        </TouchableWithoutFeedback>
    );
};

export default ListRadioButton;

ListRadioButton.propTypes = {
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.number,
    onPress: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    selectedItem: PropTypes.object.isRequired
};