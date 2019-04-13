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
import barcodeScanner from '../screens/barcodeScanner'

const AppStack = createStackNavigator(
    { 
        Search: Search, 
        barcodeScanner: barcodeScanner,
        Profile: Profile,
        Addprice: Addprice
    },
    {
        initialRouteName : 'Addprice',
        headerMode: 'none'
    }
    );

const AuthStack = createStackNavigator(
    { 
        Signup: Signup,
        HomeScreen: HomeScreen
    },
    {
        initialRouteName : 'HomeScreen',
        headerMode: 'none'
    }
    );

export default createAppContainer(createSwitchNavigator(
    {
        App: AppStack,
        Auth: AuthStack
    }))
