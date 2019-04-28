import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View, Text,
  ImageBackground,
  Image,
  AsyncStorage
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import BACKEND_URL from "../consts";


export default class Addprice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: '0',
    };
  }
  IncrementItem = (nb) => {
    if (this.state.price.length < 9) {
      if (this.state.price == '0') {
        if (nb != 0)
          this.setState({ price: '' + nb });
      }
      else this.setState({ price: this.state.price + nb });
    }
  }
  DecreaseItem = () => {
    if (this.state.price.length == 1) {
      this.setState({ price: '0' });
    }
    else {
      this.setState({ price: this.state.price.slice(0, this.state.price.length - 1) });
    }

  }

  submitPrice = async () => {
    user_id = JSON.parse(await AsyncStorage.getItem("user")).id;
    product_id = this.props.navigation.getParam("product_id", null);
    price = this.state.price;

    const data = {
      user_id: user_id,
      product_id: product_id,
      price: price,
    };
    axios.post(BACKEND_URL + "users/addPrice", data)
      .then(res => {
        //console.log(res.data);
        //alert(JSON.stringify(res.data));
        //alert(axios.defaults.headers.common["Authorization"]);
        this.props.navigation.navigate("priceAdded");
      })
      .catch(err => {
        alert(err);
      })
  }

  render() {
    return (
      <ImageBackground source={require('../assets/backgrounds/add_price.png')} style={styles.imgbck}>
        <View style={{ flex: 1 }}>
          <View style={styles.view1}>
            <Ionicons name="ios-arrow-back" size={50} color="white" onPress={() => this.props.navigation.goBack()} />
          </View>
          <View style={{ justifyContent: 'space-between', alignItems: 'stretch', height: hp('25%'), marginLeft: '13%', marginRight: '13%' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 25, color: '#fff' }}>Ajoutez votre prix</Text>
              <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 30, elevation: 4, height: 60, width: '100%' }}>
                <Text style={{ fontSize: 30, color: '#ff9933' }}>{this.state.price}.00 DA</Text>
              </View>
            </View>
          </View>
          <View style={{ height: '55%', marginLeft: '13%', marginRight: '13%', justifyContent: 'space-between', alignItems: 'stretch' }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', zIndex: 1 }}>
              <TouchableOpacity onPress={() => this.IncrementItem(1)}>
                <Image source={require('../assets/price/1.png')} style={styles.number} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.IncrementItem(2)}>
                <Image source={require('../assets/price/2.png')} style={styles.number} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.IncrementItem(3)}>
                <Image source={require('../assets/price/3.png')} style={styles.number} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => this.IncrementItem(4)}>
                <Image source={require('../assets/price/4.png')} style={styles.number} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.IncrementItem(5)}>
                <Image source={require('../assets/price/5.png')} style={styles.number} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.IncrementItem(6)}>
                <Image source={require('../assets/price/6.png')} style={styles.number} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => this.IncrementItem(7)}>
                <Image source={require('../assets/price/7.png')} style={styles.number} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.IncrementItem(8)}>
                <Image source={require('../assets/price/8.png')} style={styles.number} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.IncrementItem(9)}>
                <Image source={require('../assets/price/9.png')} style={styles.number} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => this.DecreaseItem()}
                onLongPress={() => this.setState({ price: '0' })}
              >
                <Image source={require('../assets/price/back.png')} style={styles.number} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.IncrementItem(0)}>
                <Image source={require('../assets/price/0.png')} style={styles.number} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.submitPrice} disabled={this.state.price == 0}>
                <Image source={require('../assets/price/ok.png')} style={styles.number} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  imgbck: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  view1: {
    height: '12%',
    width: '10%',
    marginLeft: '4%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  number: {
    resizeMode: 'cover',
    width: wp(22),
    height: hp(15)
  }
})