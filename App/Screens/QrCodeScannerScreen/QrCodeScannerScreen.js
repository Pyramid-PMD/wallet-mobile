import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Container, Text } from 'native-base';
import { BarCodeScanner, Permissions } from 'expo';
class QrCodeScannerScreen extends Component {
    state = {
        hasCameraPermission: null,
        lastScannedUrl: null,
    };

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeRead = result => {
        if (result.data !== this.state.lastScannedUrl) {
            LayoutAnimation.spring();
            this.setState({ lastScannedUrl: result.data });
        }
    };

    render() {
        return (
            <Container>
            {this.state.hasCameraPermission === null
                ? <Text>Requesting for camera permission</Text>
                : this.state.hasCameraPermission === false
                ? <Text style={{ color: '#fff' }}>
                    Camera permission is not granted
                </Text>
                : <BarCodeScanner
                    onBarCodeRead={this._handleBarCodeRead}
                    style={{
                        height: Dimensions.get('window').height,
                        width: Dimensions.get('window').width,
                    }}
                />}
            </Container>
         );
    }
}
export default QrCodeScannerScreen;