import { StyleSheet } from 'react-native';
import { Metrics } from '../../Theme';
export default StyleSheet.create({
    logoContainerStyle: {
        height: 96,
        marginBottom: Metrics.section
    },
    logoContainerHorizontal: {
        height: 40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    logoHorizontal: {
        height: 34,
        width: 34
    },
    logoTextHorizontal: {
        fontSize: 6,
        letterSpacing: 3,
        marginLeft: 2
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