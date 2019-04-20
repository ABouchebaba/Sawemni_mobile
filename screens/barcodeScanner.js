import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import axios from "axios";
import Spinner from 'react-native-loading-spinner-overlay';
import BACKEND_URL from "../consts";


export default class barcodeScanner extends React.Component {

  state = {
    hasCameraPermission: null,
    spinner: false
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }


  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <Text>a</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={{ flex: 1 }}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Recherche...'}
        />
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {

    this.setState({ spinner: true });
    //scan.off;
    axios.get(BACKEND_URL + `products/barcode/${data}`)
      .then(res => {
        //console.log(res.data)
        this.setState({ spinner: false });
        console.log(res.data.product.imgURL)
        this.props.navigation.navigate('Profile', { type: type, data: res.data });
      })
      .catch(err => {
        alert("error")
        console.log(err);
      });

  }


}
