import React, {Component} from 'react';
import { Text, View } from 'native-base';

class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Login',
    };

    render() {
        return(
            <View>
                <Text>Login screen</Text>
            </View>
        )
    }
}

export default LoginScreen;