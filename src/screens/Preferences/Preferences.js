import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';

class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName: 'Preferences'
    };
  }

  componentDidMount() {
    const { screenName } = this.state;
    console.log(`mounted ${screenName} screen`);
  }

  render() {
    const { screenName } = this.state;
    return (
      <View>
        <SafeAreaView>
          <Text>{screenName} SCREEN</Text>
        </SafeAreaView>
      </View>
    );
  }
}

export default Preferences;
