import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Theme';
export default StyleSheet.create({
    viewContainer: {
        borderTopWidth: 1,
        borderColor: Colors.listBorderColor,
        paddingTop: 12
    },
    listItemHeader: {
        paddingTop: 4,
        borderBottomWidth: 0,
        paddingLeft: 0
    },
    listItem: {
        marginLeft: 0,
        borderBottomWidth: 0,
        backgroundColor: Colors.secondaryBackground
    },
    listItemBody: {
        borderBottomWidth: 0,
        marginLeft: 0,
        marginRight: 10
    }
})