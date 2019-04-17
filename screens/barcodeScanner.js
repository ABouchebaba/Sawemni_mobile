import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class barcodeScanner extends React.Component {

    state = {
        hasCameraPermission: null,
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
              <BarCodeScanner
                onBarCodeScanned={this.handleBarCodeScanned}
                style={StyleSheet.absoluteFill}
              />
            </View>
          );
        }
      handleBarCodeScanned = async ({ type, data }) => {
        axios.get("http://192.168.43.19:19000/Sawemni_api/products/")
          .then(res => {
            alert(res.data);
          })
          .catch(err => {
            console.log(err);
          });
        /*this.props.navigation.navigate('Profile', {
          type: type,
          data: data
        });*/
        //alert(Bar code with type ${type} and data ${data} has been scanned!);
      }
    }
  