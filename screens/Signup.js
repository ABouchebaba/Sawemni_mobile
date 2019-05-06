import React from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet, Alert, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Facebook } from 'expo';
import BACKEND_URL from "../consts";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { GoogleSignIn } from 'expo-google-sign-in';

export default class Search extends React.Component {
  state = {
    fullName: '',
    mail: '',
    password: '',
    userInfo: null,
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
            <TouchableOpacity onPress={() => this.loginGoogle()} >
              <Image source={require('../assets/ass/ggl2.png')} style={{ resizeMode: 'contain', width: wp(25) }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  handleSignUp = async () => {
    let mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
    let numRegex = /^[0][0567]{1}[0-9]{8}$/;

    const data = {
      fullName: this.state.fullName,
      mail: this.state.mail,
      password: this.state.password,
    }

    if (data.fullName == '' || data.mail == '' || data.password == '') {
      return alert("Veuillez renseigner tout les champs");
    }

    if (data.password.length < 8) {
      return Alert.alert("Inscription", "Le mot de passe doit comporter au moins 8 caractéres");
    }

    let isMail = mailRegex.test(data.mail);
    let isNum = numRegex.test(data.mail);

    if (!isMail && !isNum) {
      return alert("Veuillez entrer une adresse mail où un numéro de téléphone valide");
    }

    // traitement du mail
    if (isMail) {

      axios.post(BACKEND_URL + `users/signup`, data)
        .then(res => {

          if (res.data.error !== undefined) {
            Alert.alert("Inscription", res.data.error);
            return;
          }

          Alert.alert("Inscription", "Un Email a été envoyé à l'adresse spécifiée, Veuillez le consulter pour pouvoir vérifier vos coordonnées.");
          this.props.navigation.push("Signin");
        })
        .catch(err => {
          Alert.alert("Erreur", "Veuillez vérifier que vous étes bien connecté(e) à internet");
          //console.log(err);tgyhujiedstgyhuj
        });

      return;
    }

    // traitement du num de tel
    if (isNum) {
      this.props.navigation.navigate('accountKitWebView', {
        userData: data
      })
      //return;
    }

    /*if (data.fullName != '' && data.password != '') {

      if (mailRegex.test(data.mail) === true) {
        axios.post(BACKEND_URL + `users/signup`, data)
          .then(res => {

            if (res.data.message != undefined) {
              Alert.alert("Erreur", res.data.message);
              return;
            }
            //alert(res.data)
            //const { user, token } = res.data;
            //alert(token);
            //AsyncStorage.setItem("user", JSON.stringify(user));
            //AsyncStorage.setItem("token", token);
            //setAuthToken(token);
            Alert.alert("Vérification", "Un Email a été envoyé à l'adresse spécifiée, Veuillez le consulter pour pouvoir vérifier vos coordonnées.");
            this.props.navigation.push("Signin");
          })
          .catch(err => {
            Alert.alert("Erreur", "Veuillez vérifier que vous étes bien connecté(e) à internet");
            //console.log(err);
          });
      }
      else if (numRegex.test(data.mail) === true) {
        this.props.navigation.navigate('accountKitWebView', {
          userData: data
        })
      }
      else {
        Alert.alert("Inscription", "Adresse mail ou téléphone erroné")
      }
    }
    else {
      Alert.alert("Inscription", "veuillez remplir les champs vides")
    }*/
  }

  handleSignUpFB = async () => {
    axios.post(BACKEND_URL + `users/signupFB`, this.state.userInfo)
      .then(res => {
        console.log(res.data)
        const { user, token } = res.data;
        console.log(token);
        AsyncStorage.setItem("user", JSON.stringify(user));
        AsyncStorage.setItem("token", JSON.stringify(token));
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
        alert("erreur")
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
