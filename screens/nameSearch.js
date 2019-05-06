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
    axios.get(BACKEND_URL + 'userProducts/')
      .then(res => {
        let responseJson = res.data
        console.log(responseJson)
        let ds = new ListView.DataSource({ rowHasChanged: (r1_1, r2) => r1_1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function () {
          // In this block you can do something with new state.
          this.arrayholder = responseJson;
        });
      })
      .catch(err => {
        alert("error")
        console.log(err);
      });
  }

  GetListViewItem(id) {
    axios.get(BACKEND_URL + `products/${id}`)
      .then(res => {
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
          width: "80%",
          backgroundColor: "black",
          alignSelf: 'center',
          justifyContent: 'center',
          alignContent: 'center'
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
          style={{ marginRight: '10%', marginLeft: '10%' }}
          placeholder="Pain complet"
          onChangeText={(text) => this.SearchFilterFunction(text)}
          value={this.state.text}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderSeparator={this.ListViewItemSeparator}
          renderRow={(rowData) =>
            <Text style={styles.rowViewContainer}
              onPress={this.GetListViewItem.bind(this, rowData.id)} >
              {rowData.PName}
              {/* ــ {rowData.category} */}
            </Text>}
          enableEmptySections={true}
          style={styles.list}
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
    color: 'gray',
    fontSize: 17,
    padding: 10
  },
  list: {
    backgroundColor: 'white',
    marginTop: '5%',
    borderRadius: 5,
    marginLeft: '10%',
    marginRight: '10%',
    elevation: 8,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  }
})