import React from 'react';
import {
  Image,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import setAuthToken from "../utils/setAuthToken";

export default class HomeScreen extends React.Component {

  componentWillMount() {
    AsyncStorage.clear()
    this.checkUserSignedIn()
  }
  async checkUserSignedIn() {
    try {
      let user = await AsyncStorage.getItem("user");
      let token = await AsyncStorage.getItem("token");
      /*console.log("user\n")
      console.log(user)
      console.log("token\n")
      console.log(token)*/
      if (user != null && token != null) {
        setAuthToken(token);
        this.props.navigation.push('Search')
      }
    } catch (error) {
      alert(error)
    }
  }
  render() {
    return (
      <ImageBackground source={require('../assets/backgrounds/Auth.png')} style={styles.container} >
        <View style={{ height: '50%' }} />
        <View style={{ height: '50%', justifyContent: 'flex-start', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Signin")}>
            <Image source={require('../assets/ass/signin.png')} style={{ height: hp('15%'), resizeMode: 'contain' }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Signup")}>
            <Image source={require('../assets/ass/signup.png')} style={{ height: hp('15%'), resizeMode: 'contain' }} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderTopWidth: 0,
    elevation: 8,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderColor: "transparent",
    overflow: "hidden",
    paddingBottom: "5%",
    paddingBottom: "5%"
    //overflow: 'visible'
  }
});