import React from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet, Image, Text, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from "axios";
import { Facebook } from 'expo';
import BACKEND_URL from "../consts";
import setAuthToken from "../utils/setAuthToken";
import { GoogleSignIn } from 'expo-google-sign-in';


export default class Search extends React.Component {
  state = {
    mail: '',
    password: '',
    userInfo: null
  };

  handleSignin = () => {
  
    const data = {
      mail: this.state.mail,
      password: this.state.password,
    }
    if (data.mail == '' || data.password == '') {
      Alert.alert("Erreur","veuillez compléter les informations manquantes")
      return
    }
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
        Alert.alert("Erreur", "Adresse mail ou mot de passe incorrecte")
      })
    

  }

  passwordReset = () => {

    let mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    let numRegex = /^[0][0567]{1}[0-9]{8}$/

    if(this.state.mail != ''){
      if(mailRegex.test(this.state.mail) === true) {

        // mail reset logig
      
      }
      else if (numRegex.test(this.state.mail) === true) {
        this.props.navigation.navigate('mobileReset', {
          mobile: this.state.mail
        })
      }
      else {
        Alert.alert("","Adresse mail ou numéro de téléphone n'existe pas")
      }
    }
    else {
      Alert.alert("Mot de passe oublié","veuillez entrer votre Adresse mail ou numéro de téléphone")
    }
  }

  handleSignUpFB = async () => {
    console.log(this.state.userInfo)
    axios.post(BACKEND_URL + `users/signupFB`, this.state.userInfo)
    .then(res => {
      console.log(res.data)
      const { user, token } = res.data;
      console.log(typeof(token));
      AsyncStorage.setItem("user", JSON.stringify(user));
      AsyncStorage.setItem("token", token);
      setAuthToken(token);
      this.props.navigation.push("Search")
    })
    .catch(err => {
      alert(err);
      //console.log(err);
    });
      //alert(await AsyncStorage.getItem('userId'))
      //this.props.navigation.push("Search")
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
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        //Alert.alert('Connecté!', `Salut ${(await response.json()).name}!`);
        const userInfo = await response.json();
        this.setState({ userInfo });
        this.handleSignUpFB()
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  async loginGoogle() {
    try {
      await GoogleSignIn.initAsync({
        clientID: '178623655885-6nhu0bstprmb5ln57nmk65m6eo3gko5v.apps.googleusercontent.com',
      });
      this.handleSignUpGoogle();
    } catch ({ message }) {
        alert('GoogleSignIn.initAsync(): ' + message);
    }
  }

  handleSignUpGoogle = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        const userInfo = await user
        axios.post(BACKEND_URL + `users/signupGoogle`, userInfo)
        .then(res => {
          alert(res.data)
          const { user, token } = res.data;
          console.log(token);
          AsyncStorage.setItem("user", JSON.stringify(user));
          AsyncStorage.setItem("token", JSON.stringify(token));
          setAuthToken(token);
          this.props.navigation.push("Search")
        })
        .catch(err => {
          alert(err);
        });
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };


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
          <TouchableOpacity onPress={() => this.passwordReset()} style={{ marginLeft: '36%' }} >
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
            <TouchableOpacity onPress={() => this.logInFB()} >
              <Image source={require('../assets/ass/fb2.png')} style={{ resizeMode: 'contain', width: wp(25) }} />
            </TouchableOpacity>
            <View style={{ width: wp(5) }} />
            <TouchableOpacity onPress={() => this.loginGoogle()} >
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
