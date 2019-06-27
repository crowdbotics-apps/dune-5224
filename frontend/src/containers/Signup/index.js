import React, { Component } from 'react';
import {
    Text
} from 'react-native';
import {
  Button,
  Container,
  Content,
} from 'native-base';

import styles from './styles';


class Signup extends Component {

  _login = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <Button onPress={this._login} style={styles.button} title='Login'>
            <Text style={styles.loginText}>Login/Signup</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Signup;
