import React from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet, Image, Text, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from "axios";
import BACKEND_URL from "../consts";
import setAuthToken from "../utils/setAuthToken";


export default class Search extends React.Component {
  state = {
    mail: '',
    password: ''
  };

  handleSignin = () => {

    const data = {
      mail: this.state.mail,
      password: this.state.password,
    }
    console.log("enter");

    axios.post(BACKEND_URL + "users/login", data)
      .then(res => {
        //Alert.alert(JSON.stringify(res.data))
        console.log(res.data);

        const { user, token } = res.data;

        AsyncStorage.setItem("user", JSON.stringify(user));
        AsyncStorage.setItem("token", token);

        setAuthToken(token);
        //sdsdfgdfgdfgf

        this.props.navigation.push("Search")

      })
      .catch(err => {
        Alert.alert("Erreur", err + " Adresse mail ou mot de passe incorrecte")
      })


  }

  render() {
    return (
      <View style={styles.global}>
        <View style={{ height: hp(30), justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/ass/sawemni2.png')} style={{ resizeMode: 'center', width: wp(40) }} />
        </View>
        <View style={{ height: hp(28), alignItems: 'center', justifyContent: 'space-between' }}>
          <TextInput
            mode='outlined'
            selectionColor='orange'
            underlineColor='#fff'
            label='Adresse mail ou téléphone'
            value={this.state.mail}
            onChangeText={text => this.setState({ mail: text })}
            style={{ width: wp(80) }}
            theme={{ colors: { primary: 'orange', background: 'white' } }}
          />
          <TextInput
            secureTextEntry={true}
            mode='outlined'
            selectionColor='orange'
            underlineColor='#fff'
            label='Mot de passe'
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            style={{ width: wp(80) }}
            theme={{ colors: { primary: 'orange', background: 'white' } }}
          />
          <TouchableOpacity onPress={() => alert('mdp')} style={{ marginLeft: '36%' }} >
            <Text style={{ fontSize: 18, color: '#999999' }} >Mot de pass oublié?</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: hp(3) }} />

        <View style={{ height: hp(10), marginLeft: '15%', marginRight: '15%', alignItems: 'center', justifyContent: 'center', }}>
          <TouchableOpacity onPress={this.handleSignin}>
            <Image source={require('../assets/ass/connect2.png')} style={{ height: hp(12), width: wp(75) }} />
          </TouchableOpacity>
        </View>
        <View style={{ height: hp(2) }} />
        <View style={{ height: hp(18), marginLeft: '20%', marginRight: '20%' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }} >
            <Text style={{ fontSize: 18, color: '#999999' }} > ــــ ou ــــ</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => alert('FB')} >
              <Image source={require('../assets/ass/fb2.png')} style={{ resizeMode: 'contain', width: wp(25) }} />
            </TouchableOpacity>
            <View style={{ width: wp(5) }} />
            <TouchableOpacity onPress={() => alert('ggl')} >
              <Image source={require('../assets/ass/ggl2.png')} style={{ resizeMode: 'contain', width: wp(25) }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  global: {
    flex: 1,
    flexDirection: 'column',
  },
  number: {
    resizeMode: 'cover',
    width: wp(22),
    height: hp(15)
  }
})
