import { StyleSheet } from 'react-native';
import Colors from "../../Theme/Colors";

export default StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    card: {
        flex: 0.8,
        paddingTop: 40
    },
    pinCodeInputContainer: {
        borderColor: '#ffb257',
        marginLeft: 0
    },
    pinCodeInput: {
        color: '#858391',
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 0
    },
    closeButtonIcon: {
        color: '#858391',
        fontSize: 30
    },
    submitButton: {
        borderColor: '#ffb257',
        backgroundColor: '#4f3617'
    }
});