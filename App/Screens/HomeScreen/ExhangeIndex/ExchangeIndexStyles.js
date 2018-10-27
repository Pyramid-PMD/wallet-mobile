import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../Theme';
import {Dimensions} from 'react-native';

export default StyleSheet.create({
    container: {
        marginBottom: Metrics.section
    },
    title: {
        fontSize: 16
    },
    list: {
        flex: 1,
        marginLeft: 0,
    },
    listItem: {
        borderBottomWidth: 0,
        position: 'relative',
        marginLeft: 12,
        paddingVertical: 2,
        backgroundColor: Colors.secondaryBackground,
        borderRadius: 5,
        width: (Dimensions.get('window').width - 50) / 2
    },
    comingSoonItem: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    listItemFirstChild: {
        marginLeft: 0,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '60%',
        height: '100%'
    },
    icon: {
        width: 45,
        height: 45,
        marginRight: 20,
        marginLeft: 8
    },
});