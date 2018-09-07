import { StyleSheet } from 'react-native';
import Colors from './Colors';
import Metrics from './Metrics';

export default StyleSheet.create({
    card: {
        borderColor: Colors.inputBorderColor,
        backgroundColor: Colors.inputBackgroundColor,
        borderWidth: 4,
        marginBottom: Metrics.formInput.marginVertical
    },
    cardItem: {
        marginBottom: 0
    }
});
