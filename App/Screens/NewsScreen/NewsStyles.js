import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Theme';
export default StyleSheet.create({
    list: {
        marginLeft: 0,
    },
    listItem: {
        marginLeft: 0,
        borderBottomWidth: 1,
        borderBottomColor: Colors.listBorderColor,
        paddingVertical: 5,
       flexDirection: 'row-reverse'
    },
    listItemBody: {
        borderBottomWidth: 0,
        marginLeft: 0,
        marginRight: 10
    }
});