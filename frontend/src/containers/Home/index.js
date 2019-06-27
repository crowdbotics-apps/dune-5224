import React, {PureComponent} from 'react';
import {ActivityIndicator, FlatList, Text, TouchableOpacity, ScrollView} from 'react-native'
import {
    Container,
    Content,
    View,
    Fab,
    Button
} from 'native-base';

import {Icon} from 'react-native-elements';

import styles from './styles';
import CustomHeader from '../../components/CustomHeader'
import {connect} from "react-redux";
import {getPosts} from "../../redux/actions/homeActions";
import PostCard from "../../components/PostCard";
import PTRView from "react-native-pull-to-refresh";
import {getSubredditsAPI} from "../../services/Profile";
import {SecureStore} from "expo/build/Expo";
import SegmentedControlTab from 'react-native-segmented-control-tab'

class Home extends PureComponent {

    state = {
        subreddits: null,
        currentSub: '',
        currentFilter: 'hot',
        header: 'Home',
        selectedIndex: 1,
        active: false,
        headerColor: "#FEA844",
    }

    componentDidMount() {
        // this.getSubreddits();
        this.props.getPosts(this.state.currentSub, this.state.currentFilter)
    }

    _handleSubbredditChange = (name) => {
        this.setState({
            currentSub: name,
        })
        this.props.getPosts(name, this.state.currentFilter)
    }

    handleIndexChange = (index) => {
        let header, current_sub;
        switch (index) {
            case 0:
                header = 'Popular'
                current_sub = 'popular'
                break;
            case 1:
                header = 'Home'
                current_sub = ''
                break;
            case 2:
                header = 'All'
                current_sub = 'all'
                break;
            default:
                console.log(index)
        }
        this.setState({
            ...this.state,
            selectedIndex: index,
            currentSub: current_sub,
            header: header
        });
        this.props.getPosts(current_sub, this.state.currentFilter)
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

    _refresh = () => {
        this.props.getPosts(this.state.currentSub, this.state.currentFilter)
    }

    _handleSorting = (filter, color) => {
        this.setState({
            currentFilter: filter,
            headerColor: color,
            active: false
        })
        this.props.getPosts(this.state.currentSub, filter)
    }

    render() {
        let {homeLoading, homeSuccess, homeError} = this.props;
        if (this.props.homeSuccess) {
            console.log(this.props.homeSuccess.data)
        }
        return (
            <Container style={styles.container}>
                <CustomHeader
                    navigation={this.props.navigation}
                    title={this.state.header}
                    backgroundColor={this.state.headerColor}
                />
                <SegmentedControlTab
                    values={['Popular', 'Home', 'All']}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.handleIndexChange}
                    borderRadius={0}
                    tabStyle={{borderColor: this.state.headerColor}}
                    tabTextStyle={{color: this.state.headerColor}}
                    activeTabStyle={{backgroundColor: this.state.headerColor, borderColor: this.state.headerColor}}
                />
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
                <Fab
                    active={this.state.active}
                    direction="left"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}>
                    <Icon
                        name="filter"
                        type="antdesign"
                    />
                    <Button
                        onPress={() => this._handleSorting('hot', '#FEA844')}
                        title="hot"
                        style={{ backgroundColor: '#FEA844' }}
                    >
                        <Icon
                            name="rest"
                            type="antdesign"
                        />
                    </Button>
                    <Button
                        style={{ backgroundColor: '#3B5998' }}
                        onPress={() => this._handleSorting('new', '#3B5998')}
                        title="new"
                    >
                        <Icon
                            name="clockcircle"
                            type="antdesign"
                        />
                    </Button>
                    <Button
                        style={{ backgroundColor: '#DD5144' }}
                        onPress={() => this._handleSorting('rising', '#DD5144')}
                        title="trending"
                    >
                        <Icon
                            name="linechart"
                            type="antdesign"
                        />
                    </Button>
                    <Button
                        style={{ backgroundColor: '#8BC34A' }}
                        onPress={() => this._handleSorting('best', '#8BC34A')}
                        title="best"
                    >
                        <Icon
                            name="Trophy"
                            type="antdesign"
                        />
                    </Button>
                    <Button
                        style={{ backgroundColor: '#0FBCD4' }}
                        onPress={() => this._handleSorting('top', '#0FBCD4')}
                        title="top"
                    >
                        <Icon
                            name="totop"
                            type="antdesign"
                        />
                    </Button>
                    <Button
                        style={{ backgroundColor: '#FFC344' }}
                        onPress={() => this._handleSorting('controversial', '#FFC344')}
                        title="controversial"
                    >
                        <Icon
                            name="frowno"
                            type="antdesign"
                        />
                    </Button>
                </Fab>
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
