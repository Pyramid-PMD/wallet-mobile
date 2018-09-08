import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Theme';
export default StyleSheet.create({
    card: {
        borderRadius: 6,
        overflow: 'hidden',
        paddingHorizontal: 0,
    },
    cardSection: {
      marginBottom: Metrics.section
    },
    cardItem: {
        padding: 16,
        borderRadius: 0,
        borderWidth: 0,
        flex: 1,
        alignItems: 'center',
        paddingBottom: 0
    },
    cardItemFirstChild: {
      marginBottom: 30
    },
    cardItemIcon: {
        color: Colors.primaryText,
        marginRight: 16,
        top: -3
    },
    cardItemText: {
        color: Colors.secondaryText
    },
    cardItemTextContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: Colors.listBorderColor,
        paddingBottom: 10
    },
    cardItemNoBorder: {
        borderBottomWidth: 0,
    },
    backgroundImage: {
        height: '100%',
        width: '100%',
        padding: 16
    },
    otherIncoming: {
        borderLeftWidth: 1,
        borderLeftColor: 'rgba(255,255,255,.1)',
        paddingLeft: 30
    },
    withdrawButton: {
        backgroundColor: '#303f17',
        borderColor: '#a0c85f',
        shadowColor: 'transparent'
    },
    signOutButton: {
        backgroundColor: Colors.secondaryBackground,
        borderWidth: 0,
        margin: 2,
        marginTop: 10
    },
    signOutButtonText: {
        color: Colors.danger
    }

});