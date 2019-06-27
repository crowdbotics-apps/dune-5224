import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Text} from 'react-native'
import {
    Container,
    Content,
    View,
    Button
} from 'native-base';

import styles from './styles';
import CustomHeader from '../../components/CustomHeader'
import {connect} from "react-redux";
import {getPosts} from "../../redux/actions/homeActions";
import PostCard from "../../components/PostCard";
import PTRView from "react-native-pull-to-refresh";
import {getSubredditsAPI} from "../../services/Profile";
import {SecureStore} from "expo/build/Expo";

class Home extends Component {

    state = {
        subreddits: null,
        currentSub: 'all',
    }

    componentDidMount() {
        this.getSubreddits();
        this.props.getPosts(this.state.currentSub, 'hot')
    }

    _handleSubbredditChange = (name) => {
        this.setState({
            currentSub: name,
        })
        this.props.getPosts(name, 'hot')
    }

    getSubreddits = async () => {
        let token;
        await SecureStore.getItemAsync('token')
            .then((response) => {
                token = response
                getSubredditsAPI(token)
                    .then((response) => {
                            this.setState({
                                subreddits: response
                            })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
    }

    renderItem = (data) => {
        return <PostCard item={data.item.data}/>
    }

    _renderSubredditNames = (data) => {
        return (
            <Button
                onPress={() => this._handleSubbredditChange(data.item.data.display_name)}
                title={data.item.data.display_name}
                transparent
                style={{padding: 5}}
            >
                <Text>{data.item.data.display_name}</Text>
            </Button>
        )

    }

    _refresh = () => {
        this.props.getPosts(this.state.currentSub, 'hot')
    }

    render() {
        let {homeLoading, homeSuccess, subredditSuccess} = this.props;
        // if (this.props.homeSuccess) {
        //     console.log(this.props.homeSuccess.data)
        // }
        return (
            <Container style={styles.container}>
                <CustomHeader
                    navigation={this.props.navigation}
                    title={this.state.currentSub}
                />
                {this.state.subreddits &&
                <FlatList
                    data={this.state.subreddits.data.children}
                    renderItem={this._renderSubredditNames}
                    horizontal={true}
                />
                }
                {homeLoading &&
                <View style={styles.loading}>
                    <ActivityIndicator size='large'/>
                </View>
                }
                <PTRView onRefresh={this._refresh}>
                <Content contentContainerStyle={styles.content}>
                    {homeSuccess &&
                    <FlatList
                        data={this.props.homeSuccess.data.children}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.data.id.toString()}
                        style={styles.list}
                    />
                    }
                </Content>
                </PTRView>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        homeError: state.home.homeError,
        homeLoading: state.home.homeLoading,
        homeSuccess: state.home.homeSuccess
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: (sub, filter) => {
            dispatch(getPosts(sub, filter))
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
