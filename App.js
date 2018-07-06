import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
  ToastAndroid,
  AsyncStorage
}
  from 'react-native';

import {
  Button,
  Text,
  Icon,
  Toast,
  Root
} from 'native-base'

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
    await AsyncStorage.getItem('items').then((value) => {
      this.setState({ allItems: JSON.parse(value) })
    }).catch(err => { throw err })
  }

  componentDidMount() {
    app.load();
    this.getItems();
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
      Toast.show({
        text: "Text cannot be empty",
        buttonText: "Got It!",
        position: "bottom",
        type: "warning"
      })
    }
  }

  handleValueChange() {

  }

  showList() {

  }

  render() {
    return (
      <Root style={Styles.container}>
        <TextInput
          onChangeText={(text) => this.setState({ item: text })}
          placeholder="Enter Item"
          clearButtonMode="always"
          ref={input => { this.textInput = input }}
        />
        <Button iconLeft full onPress={this.handleClick}>
          <Icon name="add" />
          <Text style={Styles.text} ref={text => {this.text = text}}> Add </Text>
        </Button>
        
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          {this.state.allItems.map((item, index) => {
            return (
              <View key={index + "view"} style={Styles.todoContainer}>
                <Text key={index} style={Styles.itemText}>{item.item}</Text>

                {/* <Switch
                  key={index + "switch"}
                  onValueChange={this.handleValueChange}
                  tintColor='green'
                  style={Styles.switch}
                /> */}
                <Button onPress={this.handleDelete} style={{width: 47}}>
                  <Icon name="md-trash" />
                </Button>
                <Button onPress={this.handleEdit} style={{width: 47}}>
                  <Icon name="md-create" />
                </Button>
              </View>
            )
          })}
        </ScrollView>
      </Root>
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