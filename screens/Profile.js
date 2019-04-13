import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo";

export default class Profile extends React.Component {
  render() {
    const { navigation } = this.props;
    const type = navigation.getParam("type", "walou");
    const data = navigation.getParam("data", "walou2");
    return (
      <ImageBackground
        source={require("../assets/backgrounds/profile.png")}
        style={styles.imgbck}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.view1}>
            <Ionicons
              name="ios-arrow-back"
              size={50}
              color="white"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          <View
            style={{
              height: "30%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              source={require("../assets/ass/kitkat.jpg")}
              style={styles.image}
            />
          </View>
          <View
            style={{
              height: "10%",
              paddingLeft: 10,
              alignItems: "flex-start",
              justifyContent: "center"
            }}
          >
            <Text style={{ fontSize: 30, color: "white" }}>
              {" "}
              Kit Kat (4 barres)
            </Text>
          </View>
          <View
            style={{
              height: "18%",
              flexDirection: "row",
              paddingLeft: "5%",
              paddingRight: "5%"
            }}
          >
            <View
              style={{
                width: "40%",
                alignItems: "flex-start",
                justifyContent: "space-around"
              }}
            >
              <Text style={styles.text2}>Chocolat</Text>
              <Text style={styles.text2}>Nestlé</Text>
              <Text style={styles.text2}>Code-Barres</Text>
            </View>
            <View
              style={{
                width: "60%",
                alignItems: "stretch",
                justifyContent: "space-between"
              }}
            >
              <LinearGradient
                colors={["#ff4c3d", "#ff882c"]}
                start={[1, 0]}
                end={[0, 1]}
                style={styles.button1}
              >
                <Text style={{ fontSize: 15, color: "white" }}>
                  Prix moins chère
                </Text>
                <Text style={{ fontSize: 23, color: "white" }}>125.00 DA</Text>
              </LinearGradient>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "20%",
                  backgroundColor: "white",
                  borderRadius: 30,
                  elevation: 4
                }}
              >
                <Text style={{ fontSize: 14, color: "#ff9933" }}>
                  Prix conseillé
                </Text>
                <Text style={{ fontSize: 20, color: "#ff4c3d" }}>
                  135.00 DA
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              height: "30%",
              paddingLeft: "5%",
              paddingRight: "5%",
              paddingTop: "2%",
              alignItems: "stretch",
              justifyContent: "flex-start"
            }}
          >
            <View style={{ height: "50%" }}>
              <Text style={{ fontSize: 13, color: "#fff", opacity: 0.4 }}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam
              </Text>
            </View>
            <View
              style={{
                alignItems: "stretch",
                justifyContent: "center",
                paddingLeft: "5%",
                paddingRight: "5%"
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Addprice")}
              >
                <LinearGradient
                  colors={["#ff4c3d", "#ff882c"]}
                  start={[1, 0]}
                  end={[0, 1]}
                  style={styles.addButton}
                >
                  <Text style={{ fontSize: 25, color: "white" }}>
                    Ajoutez votre prix
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
  /* <Text>TYPE  : {type} </Text>
       <Text>Code  : {data} </Text>
       0669681206 */
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
    justifyContent: "flex-end"
  },
  text1: {
    fontSize: 20,
    color: "white"
  },
  text2: {
    fontSize: 20,
    color: "white"
  },
  image: {
    resizeMode: "center",
    aspectRatio: 1 / 2,
    borderRadius: 20
  },
  button1: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderTopWidth: 0,
    elevation: 8,
    borderColor: "transparent",
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    overflow: "visible"
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderTopWidth: 0,
    elevation: 8,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderColor: "transparent",
    overflow: "hidden",
    paddingBottom: "5%",
    paddingBottom: "5%"
    //overflow: 'visible'
  }
});
