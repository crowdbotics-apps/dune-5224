import React, {Component} from 'react';
import {
    WebView,
    Dimensions,
    Text
} from 'react-native';
import {
    Container,
    Spinner
} from 'native-base';
import url from 'url';
import styles from './styles';
import {SecureStore} from "expo/build/Expo";
import {getToken} from "../../services/Authentication";
import { SplashScreen } from 'expo';

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class Login extends Component {
    state = {
        key: 1,
        scope: "identity, mysubreddits, vote, read",
        loading: false
    };

    async componentWillMount() {
        SplashScreen.preventAutoHide();
        await SecureStore.getItemAsync('token')
            .then((response) => {
                if (response)
                    this.props.navigation.navigate('Home')
            })
    }

    resetWebViewToInitialUrl = () => {
        this.setState({
            key: this.state.key + 1
        });
    };

    _onError = (error) => {
        return (
            this.setState({
                loading: true
            })
        )
    }

    _onNavigationStateChange = (state) => {
        if (state.url.includes('http://127.0.0.1:8000/?state')) {
            let token = state.url.split('code=')[1];
            if (token !== undefined) {
                SecureStore.setItemAsync("token", token);
                getToken(token)
                    .then((response) => {
                        return response.json();
                    })
                    .then(async (response) => {
                        await SecureStore.setItemAsync('time', Date.now().toString());
                        await SecureStore.setItemAsync('token', response.access_token);
                        await SecureStore.setItemAsync('refresh_token', response.refresh_token);
                        this.props.navigation.navigate('Home');
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                alert('Please login to continue.');
                this.resetWebViewToInitialUrl()
            }
        }
    }

    render() {
        SplashScreen.hide();
        return (
            <Container style={styles.container}>
                {!this.state.loading &&
                <WebView
                    key={ this.state.key }
                    source={{uri: `https://www.reddit.com/api/v1/authorize?client_id=xMReNoE2VWlRsA&response_type=code&redirect_uri=http://127.0.0.1:8000&duration=permanent&scope=${this.state.scope}&state=asdfasdf`}}
                    onNavigationStateChange={this._onNavigationStateChange}
                    onError={this._onError}
                    style={{
                        marginTop: 20,
                        width: ScreenWidth,
                        height: ScreenHeight,
                    }}
                />
                }
                {this.state.loading &&
                <Spinner color='blue' />
                }
            </Container>
        );
    }
}


export default Login;
