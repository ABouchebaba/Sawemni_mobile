import React from "react";
import { Button, StyleSheet, View, Text, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
//import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Addprice extends React.Component {
  constructor(props) {
    super(props);
    this.state = { price: 0 };
  }
  IncrementItem = nb => {
    this.setState({ price: this.state.price + 1 });
  };
  DecreaseItem = () => {
    this.setState({ price: this.state.price - 1 });
  };
  render() {
    return (
      <ImageBackground
        source={require("../assets/backgrounds/add_price.png")}
        style={styles.imgbck}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.view1}>
            <Ionicons
              name="ios-arrow-back"
              size={50}
              color="white"
              onPress={() => alert("back")}
            />
          </View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "stretch",
              height: "25%",
              backgroundColor: "skyblue",
              marginLeft: "13%",
              marginRight: "13%"
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "red"
              }}
            >
              <Text style={{ fontSize: 25, color: "#fff" }}>
                Ajoutez votre prix
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: 30,
                  elevation: 4,
                  height: 60,
                  width: "100%"
                }}
              >
                <Text style={{ fontSize: 30, color: "#ff9933" }}>
                  {this.state.price}.00 DA
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "green",
              height: "55%",
              marginLeft: "13%",
              marginRight: "13%",
              justifyContent: "space-between",
              alignItems: "stretch"
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View
                style={{
                  width: "25%",
                  height: "80%",
                  borderRadius: 200,
                  backgroundColor: "powderblue"
                }}
              />
              <View
                style={{
                  width: "25%",
                  height: "80%",
                  borderRadius: 200,
                  backgroundColor: "skyblue"
                }}
              />
              <View
                style={{
                  width: "25%",
                  height: "80%",
                  borderRadius: 200,
                  backgroundColor: "steelblue"
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View
                style={{
                  width: "25%",
                  height: "80%",
                  borderRadius: 200,
                  backgroundColor: "powderblue"
                }}
              />
              <View
                style={{
                  width: "25%",
                  height: "80%",
                  borderRadius: 200,
                  backgroundColor: "skyblue"
                }}
              />
              <View
                style={{
                  width: "25%",
                  height: "80%",
                  borderRadius: 200,
                  backgroundColor: "steelblue"
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View
                style={{
                  width: "25%",
                  height: "80%",
                  borderRadius: 200,
                  backgroundColor: "powderblue"
                }}
              />
              <View
                style={{
                  width: "25%",
                  height: "80%",
                  borderRadius: 200,
                  backgroundColor: "skyblue"
                }}
              />
              <View
                style={{
                  width: "25%",
                  height: "80%",
                  borderRadius: 200,
                  backgroundColor: "steelblue"
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View
                style={{
                  width: "25%",
                  height: "80%",
                  borderRadius: 200,
                  backgroundColor: "powderblue"
                }}
              />
              <View
                style={{
                  width: "25%",
                  height: "80%",
                  borderRadius: 200,
                  backgroundColor: "skyblue"
                }}
              />
              <View
                style={{
                  width: "25%",
                  height: "80%",
                  borderRadius: 200,
                  backgroundColor: "steelblue"
                }}
              />
            </View>
          </View>

          {/* <Button title='++' onPress={this.IncrementItem} />
            <Button title='--' onPress={this.DecreaseItem} /> */}
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  imgbck: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
  view1: {
    height: "12%",
    width: "10%",
    marginLeft: "4%",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "purple"
  }
});
