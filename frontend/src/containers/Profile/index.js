import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {
    Container, View
} from 'native-base'
import {Text, Image} from 'react-native-elements';
import {connect} from "react-redux";

import PTRView from 'react-native-pull-to-refresh';

import CustomHeader from '../../components/CustomHeader'
import {getProfile} from '../../redux/actions/profileActions'
import styles from "../Profile/styles";
import {ActivityIndicator} from "react-native";

class Profile extends Component {

    componentDidMount() {
        this.props.getProfile()
    }

    _refresh = () => {
        this.props.getProfile()
    }

    render() {
        let {profileLoading, profileError, profileSuccess} = this.props;
        // console.log(profileSuccess);
        return (
            <Container>
                <CustomHeader
                    navigation={this.props.navigation}
                    title="Profile"
                />
                {profileLoading &&
                <View style={styles.loading}>
                    <ActivityIndicator size='large'/>
                </View>
                }
                {profileSuccess &&
                <PTRView onRefresh={this._refresh}>
                    <View style={styles.container}>
                        <View style={styles.header}></View>
                        <Image style={styles.avatar}
                               source={{uri: profileSuccess.icon_img}}/>
                        <View style={styles.body}>
                            <View style={styles.bodyContent}>
                                <Text style={styles.name}>{profileSuccess.subreddit.display_name_prefixed}</Text>
                                <Text style={styles.info}>Karma</Text>
                                <Text style={styles.info}>Comment {profileSuccess.comment_karma}  Post {profileSuccess.comment_karma}</Text>
                                <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui
                                    ne
                                    assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>

                                <TouchableOpacity style={styles.buttonContainer}>
                                    <Text>Opcion 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonContainer}>
                                    <Text>Opcion 2</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </PTRView>
                }
            </Container>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        profileLoading: state.profile.profileLoading,
        profileError: state.profile.profileError,
        profileSuccess: state.profile.profileSuccess
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => {
            dispatch(getProfile())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);