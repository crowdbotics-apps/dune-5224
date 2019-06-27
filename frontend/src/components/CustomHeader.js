import React from "react";
import { Header } from "react-native-elements";

import HamburgerMenu from "./HamburgerMenu";

const MyHeader = props => {
    return (
        <Header
            leftComponent={<HamburgerMenu navigation={props.navigation} />}
            centerComponent={{
                text: props.title,
                style: { color: "#fff", fontWeight: "bold"}
            }}
            backgroundColor={props.backgroundColor}
            containerStyle={{borderColor: props.backgroundColor, borderBottomWidth:0}}
        />
    );
};

export default MyHeader;