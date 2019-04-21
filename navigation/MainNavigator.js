import {
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';

import Addprice from '../screens/Addprice'
import HomeScreen from '../screens/HomeScreen'
import Profile from '../screens/Profile'
import Search from '../screens/Search'
import Signup from '../screens/Signup'
import Signin from '../screens/Signin'
import barcodeScanner from '../screens/barcodeScanner'
import priceAdded from '../screens/priceAdded'
import nameSearch from '../screens/nameSearch'

const AppStack = createStackNavigator(
    {
        Search: Search,
        barcodeScanner: barcodeScanner,
        nameSearch: nameSearch,
        Profile: Profile,
        Addprice: Addprice,
        priceAdded: priceAdded
    },
    {
        initialRouteName: 'Search',
        headerMode: 'none'
    }
);

const AuthStack = createStackNavigator(
    { 
        HomeScreen: HomeScreen,
        Signin: Signin,
        Signup: Signup
    },
    {
        initialRouteName: 'HomeScreen',
        headerMode: 'none'
    }
);

export default createAppContainer(createSwitchNavigator(
    {
        Auth: AuthStack,
        App: AppStack,
    }))
