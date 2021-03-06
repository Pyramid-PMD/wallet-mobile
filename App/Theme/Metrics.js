import {Dimensions, Platform} from 'react-native';
const { width, height } = Dimensions.get('window');

const metrics = {
    marginHorizontal: 10,
    marginVertical: 10,
    section: 30,
    formInput: {
        marginVertical: 0,
    },
    cardBorderRadius: 8,
    baseMargin: 10,
    doubleBaseMargin: 20,
    smallMargin: 5,
    doubleSection: 50,
    horizontalLineHeight: 1,
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,
    navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
    buttonRadius: 4,
    images: {
        small: 20,
        medium: 40,
        large: 60,
        logo: 200
    }
}

export default metrics;