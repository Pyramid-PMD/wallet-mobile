import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Theme';
export default StyleSheet.create({
    card: {
        borderRadius: 6,
        overflow: 'hidden',
        backgroundColor: Colors.secondaryBackground,
        paddingHorizontal: 16
    },
    cardItem: {
        borderRadius: 0,
        height: 64,
        padding: 0,
        borderBottomColor: Colors.cardBorderColor,
        borderBottomWidth: 1,
        justifyContent: 'space-between'
    },
    cardItemLastChild: {
        borderBottomWidth: 0,
    },
    cardItemIcon: {
        color: Colors.secondaryText,
        top: 2,
        marginRight: 6
    },
    cardItemText: {
        color: Colors.secondaryText
    }
});