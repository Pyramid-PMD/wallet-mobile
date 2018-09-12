import { StyleSheet } from 'react-native';
import Colors from "./Colors";
export default StyleSheet.create({
    container: {
        borderBottomWidth: 2,
            borderBottomColor: Colors.secondary,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'stretch'
    },
    buttonText: {
        color: Colors.secondary,
        fontSize: 16
    },
    input: {
        color: Colors.secondary,
    }

});