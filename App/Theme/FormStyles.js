import { StyleSheet } from 'react-native';
import Colors from './Colors';
import Metrics from './Metrics';

const formStyles = StyleSheet.create({
    regularInput: {
        borderColor: Colors.inputBorderColor,
        backgroundColor: Colors.inputBackgroundColor,
        borderWidth: 4,
        marginBottom: Metrics.formInput.marginVertical
    },
    regularInputLast: {
        marginBottom: 0
    },
    submitButton: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primaryLight,
        borderWidth: 2,
        borderRadius: 8
    },
    linkButtonText: {
        color: Colors.secondaryText,
    }
});
export default formStyles;