import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import { Container, Content, Header, Body, Button } from 'native-base';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import ConfirmationDialog from "./ConfirmationDialog";
import {SecureStore} from "expo";

export class CustomDrawerContentComponent extends Component {

    state = {
        dialogVisible: false
    };

    showDialog = () => {
        this.setState({ dialogVisible: true });
    };

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    handleDelete = () => {
        SecureStore.setItemAsync('token', "");
        SecureStore.setItemAsync('refresh_token', "");
        SecureStore.setItemAsync('time', "");
        this.setState({ dialogVisible: false });
        this.props.navigation.navigate('Login');
    };

    render () {
        return (
            <Container>
                <ConfirmationDialog
                    dialogVisible={this.state.dialogVisible}
                    handleCancel={this.handleCancel}
                    handleConfimation={this.handleDelete}
                />
                <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
                    <Header style={{ height: 200, backgroundColor: '#607D8B' }}>
                        <Body
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                style={{ height: 150, width: 150, borderRadius: 75 }}
                                source={ require('../assets/images/icon.png') }
                            />
                        </Body>
                    </Header>

                    <Content>
                        <DrawerItems { ...this.props } />
                    </Content>
                </SafeAreaView>
                <Button block warning onPress={this.showDialog} title='Logout'>
                    <Text>Log Out</Text>
                </Button>
            </Container>
        );
    }
};
