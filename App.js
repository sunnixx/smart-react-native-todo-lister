import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  ToastAndroid,
  AsyncStorage
}
  from 'react-native';

import app from './API';

export default class extends Component {

  constructor(props) {
    super(props);

    this.state = { item: '', allItems: [] }

    this.handleClick = this.handleClick.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.showList = this.showList.bind(this);
  }

  async getItems() {
    try {
      const items = await AsyncStorage.getItem('@Items:key');
      this.setState({ allItems: items });
    } catch (err) {
      throw err;
    }
  }

  componentDidMount() {
    app.load();
    
    AsyncStorage.getItem('items').then((value) => {
      this.setState({allItems:JSON.parse(value)})
    }).catch(err => {throw err});
  
  }

  handleClick() {

    if (this.state.item !== '') {
      this.state.allItems.push({
        item: this.state.item
      })

      this.setState({ item: '' }) //Empty Item
      this.textInput.clear(); //Clears out TextInput field

      app.store(this.state.allItems);

    } else {
      ToastAndroid.show('Items field cannot be empty', ToastAndroid.SHORT);
    }
  }

  handleValueChange() {

  }

  showList() {

  }

  render() {
    return (
      <View style={Styles.container}>
        <TextInput
          onChangeText={(text) => this.setState({ item: text })}
          placeholder="Enter Item"
          clearButtonMode="always"
          ref={input => { this.textInput = input }}
        />
        <TouchableOpacity
          onPress={this.handleClick}
          style={Styles.button}
        >
          <Text style={Styles.text} ref={text => { this.text = text }}>Add</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          {this.state.allItems.map((item, index) => {
            return (
              <View key={index + "view"} style={Styles.todoContainer}>
                <Text key={index} style={Styles.itemText}>{item.item}</Text>

                <Switch
                  key={index + "switch"}
                  onValueChange={this.handleValueChange}
                  tintColor='green'
                  style={Styles.switch}
                />
              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#e3e3e3'
  },
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#34495e'
  },
  text: {
    fontSize: 20,
    color: '#fafafa'
  },
  todoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10
  },
  switch: {
  },
  itemText: {
    fontSize: 20,
    color: '#222222'
  }
})