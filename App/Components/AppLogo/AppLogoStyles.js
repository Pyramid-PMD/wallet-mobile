import { StyleSheet } from 'react-native';
import { Metrics } from '../../Theme';
export default StyleSheet.create({
    logoContainerStyle: {
        height: 96,
        marginBottom: Metrics.section
    },
    logoImageStyle: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    logoTextStyle: {
        textAlign: 'center',
        letterSpacing: 3,
        marginLeft: 2
    }
});