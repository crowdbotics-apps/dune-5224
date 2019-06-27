import {createDrawerNavigator, DrawerItems} from 'react-navigation';

import Home from '../containers/Home';
import Profile from '../containers/Profile';
import {CustomDrawerContentComponent} from "../components/CustomDrawer"


const HomeNavigator = createDrawerNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                drawerLabel: "Home "
            },
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                drawerLabel: "Profile "
            },
        },
    },
    {
        initialRouteName: 'Home',
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
        drawerPosition: 'left',
        contentComponent: CustomDrawerContentComponent
    }
);

export default HomeNavigator;
