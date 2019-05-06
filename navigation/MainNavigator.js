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
import accountKitWebView from '../screens/accountKitWebView'
import mobileReset from '../screens/mobileReset'

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
        Signup: Signup,
        accountKitWebView: accountKitWebView,
        Signin: Signin,
        mobileReset: mobileReset
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
