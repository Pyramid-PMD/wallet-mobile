import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Button, Icon } from 'native-base';
import NavigationService from '../../Navigation/NavigationService';
import Colors from "../../Theme/Colors";

const QrCodeButton = (props) => {
    const scanQrCode = () => {
        NavigationService.navigate('QrCodeScan');
    };

    return (
        <Button style={styles.button} transparent textStyle={{color: '#87838B'}} onPress={scanQrCode}>
            <Icon name="qrcode-scan" type="MaterialCommunityIcons" style={{color: Colors.primaryText}}/>
        </Button>
    );
};

export default QrCodeButton;


const styles = StyleSheet.create({
    button: {
        ...Platform.select({
            android: {
                top: 6
            },
        }),
    }
});