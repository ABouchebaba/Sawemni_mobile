import React, { Component } from 'react';
import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, ImageBackground } from 'react-native';
import axios from "axios";
import { Searchbar } from 'react-native-paper';
import BACKEND_URL from "../consts";

export default class nameSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      text: '',
    }
    this.arrayholder = [];
  }

  async componentDidMount() {
    try {
      const response = await fetch(BACKEND_URL + 'products/');
      const responseJson = await response.json();
      let ds = new ListView.DataSource({ rowHasChanged: (r1_1, r2) => r1_1 !== r2 });
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(responseJson),
      }, function () {
        // In this block you can do something with new state.
        this.arrayholder = responseJson;
      });
    }
    catch (error) {
      console.error(error);
    }

  }

  GetListViewItem(id) {

    //alert(`http://6fb8b181.ngrok.io/Sawemni_api/products/${id}`);
    axios.get(BACKEND_URL + `products/${id}`)
      .then(res => {
        //console.log(res.data)
        //this.setState({ spinner: false });
        //console.log(res.data)
        this.props.navigation.navigate('Profile', { data: res.data });
      })
      .catch(err => {
        alert("error")
        console.log(err);
      });
  }

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function (item) {
      const itemData = item.PName.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
      text: text
    })
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "70%",
          backgroundColor: "gray",
        }}
      />
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      
      <ImageBackground 
      source={require('../assets/backgrounds/add_price.png')}
      style={styles.MainContainer}>
      <Searchbar
        style={{marginRight:'10%', marginLeft:'10%'}}
        placeholder="Pain complet"
        onChangeText={(text) => this.SearchFilterFunction(text)}
        value={this.state.text}
      />
        <ListView
          dataSource={this.state.dataSource}
          renderSeparator={this.ListViewItemSeparator}
          renderRow={(rowData) =>
            <Text style={styles.rowViewContainer}
              onPress={this.GetListViewItem.bind(this, rowData.id)} >{rowData.PName} -- {rowData.category}
            </Text>}
          enableEmptySections={true}
          style={{}}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    paddingTop: '10%',
    justifyContent: 'center',
    flex: 1,
  },
  rowViewContainer: {
    fontSize: 17,
    padding: 10
  }
})