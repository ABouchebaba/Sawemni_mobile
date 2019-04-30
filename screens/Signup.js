import React from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet, Alert, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Facebook } from 'expo';
import BACKEND_URL from "../consts";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";


export default class Search extends React.Component {
  state = {
    fullName: '',
    mail: '',
    password: '',

  };

  render() {
    return (
      <View style={styles.global}>
        <View style={{ height: hp(30), justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/ass/sawemni2.png')} style={{ resizeMode: 'center', width: wp(40) }} />
        </View>
        <View style={{ height: hp(35), alignItems: 'center', justifyContent: 'space-between' }}>
          <TextInput
            mode='outlined'
            selectionColor='orange'
            underlineColor='#fff'
            label='Nom complet'
            value={this.state.fullName}
            onChangeText={text => this.setState({ fullName: text })}
            style={{ width: wp(80) }}
            theme={{ colors: { primary: 'orange', background: 'white' } }}
          />
          <TextInput
            mode='outlined'
            selectionColor='orange'
            underlineColor='#fff'
            label='Adresse mail ou téléphone'
            value={this.state.mail}
            onChangeText={text => this.setState({ mail: text })}
            style={{ width: wp(80) }}
            theme={{ colors: { primary: 'orange', background: 'white' } }}
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInput
            secureTextEntry={true}
            mode='outlined'
            selectionColor='orange'
            underlineColor='#fff'
            label='Choisir un mot de passe'
            value={this.state.password}
            onChangeText={password => this.setState({ password: password })}
            style={{ width: wp(80) }}
            theme={{ colors: { primary: 'orange', background: 'white' } }}
          />

          <TouchableOpacity onPress={() => alert('mdp')} style={{ marginLeft: '36%' }} >
            <Text style={{ fontSize: 18, color: '#999999' }} >Mot de pass oublié?</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: hp(3) }} />

        <View style={{ height: hp(10), marginLeft: '15%', marginRight: '15%', alignItems: 'center', justifyContent: 'center', }}>
          <TouchableOpacity onPress={this.handleSignUp}>
            <Image source={require('../assets/ass/insc.png')} style={{ height: hp(12), width: wp(75) }} />
          </TouchableOpacity>
        </View>

        <View style={{ height: hp(2) }} />

        <View style={{ height: hp(18), marginLeft: '20%', marginRight: '20%' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }} >
            <Text style={{ fontSize: 18, color: '#999999' }} > ــــ ou ــــ</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.logInFB()} >
              <Image source={require('../assets/ass/fb2.png')} style={{ resizeMode: 'contain', width: wp(25) }} />
            </TouchableOpacity>
            <View style={{ width: wp(5) }} />
            <TouchableOpacity onPress={() => this.logInFB()} >
              <Image source={require('../assets/ass/ggl2.png')} style={{ resizeMode: 'contain', width: wp(25) }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  handleSignUp = async () => {
    //const { fullName, mail, password, passconfirmation } = this.state

    //verify password confirmation

    const data = {
      fullName: this.state.fullName,
      mail: this.state.mail,
      password: this.state.password,
    }

    axios.post(BACKEND_URL + `users/signup`, data)
      .then(res => {
        //alert(res.data)
        const { user, token } = res.data;
        //alert(token);

        AsyncStorage.setItem("user", JSON.stringify(user));
        AsyncStorage.setItem("token", token);

        setAuthToken(token);

        this.props.navigation.push("Search")
      })
      .catch(err => {
        Alert.alert("Inscription", err + "Ce mail existe déja ");
        //console.log(err);
      });


  }

  async logInFB() {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('1082525895266770', {
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);

        const id = ((await response.json()).id);
        await AsyncStorage.setItem('loginType', 'facebook');
        await AsyncStorage.setItem('userId', id);

        //alert(await AsyncStorage.getItem('userId'))
        this.props.navigation.push("Search")
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
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
