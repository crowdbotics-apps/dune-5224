import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";

export default class DialogTester extends Component {

    render() {
        return (
            <View>
                <Dialog.Container visible={this.props.dialogVisible}>
                    <Dialog.Title>Account delete</Dialog.Title>
                    <Dialog.Description>
                        Do you want to delete this account? You cannot undo this action.
                    </Dialog.Description>
                    <Dialog.Button label="Cancel    " onPress={this.props.handleCancel} />
                    <Dialog.Button label="Log Out   " onPress={this.props.handleConfimation} />
                </Dialog.Container>
            </View>
        );
    }
}