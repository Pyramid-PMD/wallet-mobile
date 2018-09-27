import { StyleSheet } from 'react-native';
import Colors from './Colors';
import Metrics from './Metrics';

const formStyles = StyleSheet.create({
    regularInput: {
        borderColor: Colors.inputBorderColor,
        backgroundColor: Colors.inputBackgroundColor,
        borderWidth: 4,
        // marginBottom: Metrics.formInput.marginVertical
    },
    regularInputLast: {
        backgroundColor: 'red',
        marginBottom: 0
    },
    submitButton: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primaryLight,
        borderWidth: 2,
        borderRadius: 8,
        shadowColor: 'transparent'
    },
    linkButtonText: {
        color: Colors.secondaryText,
    },
    error: {
        color: Colors.danger,
        marginBottom: 6,
        marginTop: 3
    }
});
export default formStyles;