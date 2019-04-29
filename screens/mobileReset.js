import React, { Component } from 'react';
import { StyleSheet, WebView, AsyncStorage, Alert, View, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import BACKEND_URL from "../consts";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Needed for fix "Setting onMessage on a WebView overrides existing values of window.postMessage, but a previous value was defined." You get the issue for ios
const patchPostMessageFunction = function () {
    var originalPostMessage = window.postMessage;
    var patchedPostMessage = function (message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer);
    };
    patchedPostMessage.toString = function () {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
    };
    window.postMessage = patchedPostMessage;
};

const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';
const getObject= function (str) {
    try {
        return JSON.parse(str)
    } catch (error) {
        false
    } 
}

export default class mobileReset extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            verified: false,
            password: null,
            password2: null
          };
    }
    onMessage(m) {
        var data=getObject(m.nativeEvent.data);
        if (data && data.loggedIn) {
            this.setState({verified: true})
        }
    }
    changePassword() {
        if(this.state.password === this.state.password2){
            if(this.state.password.length >= 8 ) {
                const { navigation } = this.props;
                const mobile = navigation.getParam("mobile", {});
                const data = {
                    mobile: mobile,
                    password: this.state.password
                }
                axios.post(BACKEND_URL + `users/resetPassMobile`, data)
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
                    Alert.alert("Erreur", "Numéro de téléphone n'existe pas");
                    this.props.navigation.navigate('HomeScreen')
                    console.log(err);
                });
            }
            else{
                Alert.alert("erreur","votre mot de passe doit comporter 8 caractères minimum")
            }
        }
        else{
            Alert.alert("erreur","les mots de passe ne correspondent pas")
        }    
    }

    render() {
			if (this.state.verified) {
				return (
					<View style={{flex:1, flexDirection: 'column',}}>
						<View style={{ height: hp(30), justifyContent: 'center', alignItems: 'center' }}>
							<Image source={require('../assets/ass/sawemni2.png')} style={{ resizeMode: 'center', width: wp(40) }} />
						</View>
						<View style={{ height: hp(35), alignItems: 'center', justifyContent: 'space-between' }}>
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
							<TextInput
								secureTextEntry={true}
								mode='outlined'
								selectionColor='orange'
								underlineColor='#fff'
								label='Confirmation mot de passe'
								value={this.state.password2}
								onChangeText={password2 => this.setState({ password2: password2 })}
								style={{ width: wp(80) }}
								theme={{ colors: { primary: 'orange', background: 'white' } }}
								/>
                            <Button mode="contained" onPress={() => this.changePassword() }>Valider</Button>
						</View>
					</View>
            )
        }
        else if (this.state.verified == false){
					return (
						<WebView ref={(wv) => { this.webView = wv; }}
							scalesPageToFit = {true}
							source={{ uri: 'https://sawemli.com/back/AccountKit.php' }}
							injectedJavaScript={patchPostMessageJsCode} 
							onMessage={m => this.onMessage(m)}  
							pointerEvents={"none"}
							style={styles.webView}
						/>
					);
        }
    }
}

const styles = StyleSheet.create({
    webView: {
        marginTop: 50,
        flex: 1,
    },
    view: {
        alignItems: 'center',
        justifyContent: 'center' 
    }
});

