import React from 'react';
import { 
  Button, 
  View, 
  Text, 
  ImageBackground,
  Image,
  StyleSheet } from 'react-native';
  import { Ionicons } from '@expo/vector-icons';

export default class Profile extends React.Component {
  
  render() {
    const { navigation } = this.props;
    const type = navigation.getParam('type', 'walou');
    const data = navigation.getParam('data', 'walou2');
    return (
      <ImageBackground source={require('../assets/backgrounds/profile.png')} style={styles.imgbck}>
      <View style={{flex:1}} >
        <View style={{height: '12%', width:'10%', marginLeft:'5%',backgroundColor: 'powderblue', alignItems: 'center', 
          justifyContent:'flex-end'}} >
          <Ionicons name="ios-arrow-back" size={50} color="white" onPress={() => this.props.navigation.goBack()}/>
        </View>
        <View style={{height: '25%', backgroundColor: 'skyblue', 
        alignItems: 'center', justifyContent:'center'}} >
            <Image source={require('../assets/ass/kitkat.jpg')} style={styles.image} />
        </View>
        <View style={{height: '10%', paddingLeft: 10, backgroundColor: 'red', alignItems: 'flex-start', justifyContent:'center'}} >
          <Text style={{fontSize: 30, color: 'white'}} > Kit Kat (4 barres)</Text>
        </View>
        <View style={{height: '20%', backgroundColor: 'steelblue', flexDirection: 'row'}} >
          <View style={{width: '50%', backgroundColor: 'green',paddingLeft: '5%', alignItems: 'flex-start', justifyContent:'space-around'}} >
            <Text style={styles.text2} >Chocolat</Text>
            <Text style={styles.text2} >Nestlé</Text>
            <Text style={styles.text2} >Description</Text>
          </View>
          <View style={{width: '50%', backgroundColor: 'purple',}} >
            <Button title="Prix moins chère" />
            <Button title="Prix référence" />
          </View>
        </View>
    </View>
      </ImageBackground>
    )}
    /* <Text>TYPE  : {type} </Text>
       <Text>Code  : {data} </Text>
       0669681206 */
}
const styles = StyleSheet.create({
  imgbck: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  view1:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    fontSize: 20, 
    color: 'white'
  },
  text2: {
    fontSize: 20, 
    color: 'white'
  },
  image: {
    resizeMode: 'center', 
    aspectRatio: 1/2,
    borderRadius: 20,
    
  }
});
