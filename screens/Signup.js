import React from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet, Alert, Image,Text, TouchableOpacity, AsyncStorage} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Facebook } from 'expo';

export default class Search extends React.Component {
  state = {
    mail: '',
    password:'',
    passconfirmation:'',
  };

  render(){
    return (
      <View style={styles.global}>
        <View style={{height: hp(30), justifyContent :'center', alignItems:'center'}}>
        <Image source={require('../assets/ass/sawemni2.png')} style={{resizeMode: 'center', width: wp(40) }} />
        </View>
        <View style={{height: hp(35), alignItems:'center', justifyContent:'space-between'}}>
          <TextInput
            mode='outlined'
            selectionColor='orange'
            underlineColor= '#fff'
            label='Adresse mail ou téléphone'
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
            style={{width: wp(80)}}
            theme={{colors: {primary:'orange', background:'white'}}}
          />
          <TextInput
            secureTextEntry={true}
            mode='outlined'
            selectionColor='orange'
            underlineColor= '#fff'
            label='Choisir un mot de passe'
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            style={{width: wp(80)}}
            theme={{colors: {primary:'orange', background:'white'}}}
          />
          <TextInput
            secureTextEntry={true}
            mode='outlined'
            selectionColor='orange'
            underlineColor= '#fff'
            label='confirmation mot de passe'
            value={this.state.passconfirmation}
            onChangeText={passconfirmation => this.setState({ passconfirmation })}
            style={{width: wp(80)}}
            theme={{colors: {primary:'orange', background:'white'}}}
          />
          <TouchableOpacity onPress={()=> alert('mdp')} style={{marginLeft:'36%'}} >
          <Text style={{fontSize:18, color:'#999999'}} >Mot de pass oublié?</Text>
          </TouchableOpacity> 
        </View>

        <View style={{height:hp(3)}} />
        
        <View style={{height: hp(10), marginLeft:'15%', marginRight:'15%', alignItems:'center', justifyContent :'center',}}>
          <TouchableOpacity onPress={()=> this.props.navigation.push("Search")}> 
          <Image source={require('../assets/ass/insc.png')} style={{height: hp(12),width: wp(75) }} />
          </TouchableOpacity>
        </View>

        <View style={{height:hp(2)}} />
        
        <View style={{height: hp(18),marginLeft:'20%', marginRight:'20%'}}> 
          <View style={{justifyContent:'center', alignItems:'center'}} >
            <Text style={{fontSize:18, color:'#999999'}} > ــــ ou ــــ</Text>
          </View>
          <View style={{flex: 1,flexDirection: 'row',justifyContent: 'center', alignItems:'center'}}>
            <TouchableOpacity onPress={() => this.logInFB()} >
            <Image source={require('../assets/ass/fb2.png')} style={{resizeMode:'contain',width: wp(25) }}/>
            </TouchableOpacity>
            <View style={{width:wp(5)}} />
            <TouchableOpacity onPress={() => this.logInFB} >
              <Image source={require('../assets/ass/ggl2.png')} style={{resizeMode:'contain',width: wp(25) }}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>  
    );
  }

  signUp = async () => {
    const { mail, password,passconfirmation } = this.state
    try {
      axios.post(`http://192.168.137.189/Sawemni/Sawemni_api/products/`)
        .then(res => {
          alert(res.data)
        })
        .catch(err => {
          console.log(err);
        });
      console.log('user successfully signed up!: ', success)
    } catch (err) {
      console.log('error signing up: ', err)
    }
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
        permissions: ['public_profile','email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);

        const id = ((await response.json()).id);
        await AsyncStorage.setItem('loginType', 'facebook' );
        await AsyncStorage.setItem('userId', id );
        
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
    flex:1,
    flexDirection: 'column',
  },
  number: {
    resizeMode: 'cover',
    width: wp(22), 
    height: hp(15)
  }
})
