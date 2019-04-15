import React from 'react';
import { Text, 
    View, 
    ImageBackground, 
    StyleSheet,  
    Image } from 'react-native';
 
export default class priceAdded extends React.Component {
    render() {
      return (
            <ImageBackground source={require('../assets/backgrounds/parfait.png')} style={styles.container} >
              <View style={styles.views}>
                <Text style={{fontWeight: '500', fontSize:33}}>Parfait !</Text>
                <Image source={require('../assets/price/perfect.png')} style={{height:'30%',resizeMode:'contain',margin: '6%'}} />
                <Text style={{fontWeight: '300', fontSize:20}}>Votre prix a été ajouté </Text>
              </View>
            </ImageBackground>
      )
    }
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
  views: {
    flex:1,
    justifyContent:'center',
    alignItems: 'center'
  }
});