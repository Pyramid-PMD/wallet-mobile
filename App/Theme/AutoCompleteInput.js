import { StyleSheet } from 'react-native';
import Colors from "./Colors";

export default StyleSheet.create({
    container: {
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        borderWidth: 0,
        zIndex: 1,
        height: 100
    },
    autoCompleteContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        borderColor: 'red',
    },
    inputContainer: {
        borderColor: 'transparent'
    },
    inputStyle: {
        color: '#9c9fa1',
        paddingLeft: 16,
        borderColor: Colors.secondary,
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: Colors.autoCompleteBackground,
    },
    listContainerStyle: {
        top: -6,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden',
        zIndex: -1
    },
    listStyle: {
        borderColor: Colors.autoCompleteBackground,
        backgroundColor: Colors.autoCompleteBackground,

    },
    listItemStyle: {
        padding: 14,
        borderBottomWidth: 1,
        borderColor: '#4a5157'
    },
    textStyle: {
        color: Colors.primaryText
    }
})