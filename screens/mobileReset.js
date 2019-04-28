import React, { Component } from 'react';
import { StyleSheet, WebView, AsyncStorage, Alert } from 'react-native';
import BACKEND_URL from "../consts";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

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
    }
    onMessage(m) {
        var data=getObject(m.nativeEvent.data);
        if (data && data.loggedIn) 
        {
            const { navigation } = this.props;
            const userData = navigation.getParam("userData", {});
            axios.post(BACKEND_URL + `users/signupMobile`, userData)
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
                Alert.alert("Inscription", err);
                this.props.navigation.navigate('Signup')
            });
        }
    }

    render() {
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


const styles = StyleSheet.create({
    webView: {
        marginTop: 50,
        flex: 1,
    }
});

