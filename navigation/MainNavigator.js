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

const AppStack = createStackNavigator(
    { 
        Search: Search, 
        barcodeScanner: barcodeScanner,
        Profile: Profile,
        Addprice: Addprice,
        priceAdded: priceAdded
    },
    {
        initialRouteName : 'priceAdded',
        headerMode: 'none'
    }
    );

const AuthStack = createStackNavigator(
    { 
        Signin: Signin,
        Signup: Signup,
        HomeScreen: HomeScreen
    },
    {
        initialRouteName : 'Signup',
        headerMode: 'none'
    }
    );

export default createAppContainer(createSwitchNavigator(
    {
        Auth: AuthStack,
        App: AppStack
    }))
