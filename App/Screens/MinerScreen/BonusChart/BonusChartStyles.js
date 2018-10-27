import { StyleSheet } from 'react-native';
import Colors from "../../../Theme/Colors";
export default StyleSheet.create({
    chartContainer: {
    },
    chartButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    chartButton: {
        width: '25%',
        maxWidth: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    chartButtonText: {
        color: Colors.secondaryText,
    },
    chartButtonActiveText: {
        color: Colors.primaryText,
    },
    chart: {
        flex: 1
    }
});