import React from 'react';
import {View, Text, Button} from 'native-base';
import PropTypes from 'prop-types';
import FormStyles from "../../Theme/FormStyles";

const QrCodeSuccessView = (props) => {
    const {
        title,
        successFn,
        cancelFn,
        successBtnText,
        cancelBtnText
    } = props;
    return (
        <View style={{flex: 1}}>
            <Text style={{marginBottom: 60, marginTop: 30}}>{title}</Text>
            <View>
                <Button
                    block
                    onPress={successFn}
                    style={[FormStyles.submitButton, {marginBottom: 16}]}>
                    <Text>{successBtnText}</Text>
                </Button>
                <Button
                    block
                    onPress={cancelFn}
                    style={FormStyles.submitButton}>
                    <Text>{cancelBtnText}</Text>
                </Button>
            </View>
        </View>
    );
};

export default QrCodeSuccessView;

QrCodeSuccessView.propTypes = {
    title: PropTypes.string.isRequired,
    successBtnText: PropTypes.string.isRequired,
    successFn: PropTypes.func.isRequired,
    cancelBtnText: PropTypes.string.isRequired,
    cancelFn: PropTypes.func.isRequired
};