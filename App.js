import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Provider } from 'react-redux'
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'

import HomeScreen from './src/screens/Home' 

const BottomTab = createBottomTabNavigator({
  Home: HomeScreen
})
const AppContainer = createAppContainer(BottomTab)

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    )
  }
}
