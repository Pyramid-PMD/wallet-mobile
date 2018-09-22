import { StyleSheet } from 'react-native';
import { Metrics } from '../../Theme';
export default StyleSheet.create({
    card: {
        flex: -1,
        borderRadius: 6,
        overflow: 'hidden',
        paddingHorizontal: 0,
    },
    cardSection: {
        marginBottom: Metrics.section
    },
    backgroundImage: {
        minHeight: '100%',
        width: '100%',
        padding: 16
    }
});