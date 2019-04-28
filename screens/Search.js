import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native';
import axios from "axios";
import setAuthToken from '../utils/setAuthToken';

export default class Search extends React.Component {

  componentDidMount = async () => {
    
    let token = await AsyncStorage.getItem("token");
    setAuthToken(token)
    alert("axios = " + axios.defaults.headers.common["authorization"] + " fin");
    //alert(user.username);
  }
  render() {
    return (
      <ImageBackground source={require('../assets/Ui.png')} style={styles.container} >
        <View style={styles.views}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('barcodeScanner')}>
            <View style={styles.views}>
              <Image source={require('../assets/ass/barcode.png')}
                style={{ aspectRatio: 0.7, resizeMode: 'contain' }}
              />
              <Text style={{ fontSize: 25 }}>Scanner le code-barres</Text>
            </View>
          </TouchableOpacity>
          <Text style={{backgroundColor:'red'}} onPress={() => this.logout()}>
            logout
          </Text>
        </View>

        <View style={styles.views}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('nameSearch')}>
            <View style={styles.views}>
              <Text style={{ fontSize: 25, color: '#fff' }}>Rechercher par nom</Text>
              <Image source={require('../assets/ass/searchbar.png')}
                style={{ aspectRatio: 2, resizeMode: 'contain' }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
  logout = async () => {
    await AsyncStorage.clear()
    setAuthToken()
    this.props.navigation.push("HomeScreen")
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  views: {
    // backgroundColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
  }
});