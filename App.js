import './App/Config/ReactotronConfig';
import React from 'react';
import RootContainer from "./App/Containers/RootContainer";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({ loading: false });

    }

  render() {
      if (this.state.loading) {
          return <Expo.AppLoading />;
      }
    return (
      <RootContainer/>
    );
  }
}

