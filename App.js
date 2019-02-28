import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { Icon } from 'native-base'
import { Provider } from 'react-redux'
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'

import store from './src/redux/store'
import HomeScreen from './src/screens/Home' 
import PostScreen from './src/screens/Post' 
import SurfScreen from './src/screens/Surf'
import ProfileScreen from './src/screens/Profile'
import LoginScreen from './src/screens/Login'
import RegisterScreen from './src/screens/Register'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Post: PostScreen
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#272838'
    },
    headerTitleStyle: {
      color: '#989fce',
      fontWeight: 'normal'
    },
    headerTintColor: '#989fce'
  },
  navigationOptions: {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      return (<Icon style={{color: tintColor, fontSize:23}} name="home" type="AntDesign" />)
    }
  }
})

const SurfStack = createStackNavigator({
  Surf: SurfScreen
},{
  initialRouteName: 'Surf',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#272838'
    },
    headerTitleStyle: {
      color: '#989fce',
      fontWeight: 'normal'
    }
  },
  navigationOptions: {
    tabBarLabel: 'Surf',
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      return (<Icon style={{color: tintColor, fontSize:23}} name="bulb1" type="AntDesign" />)
    }
  }
})

const AuthStack = createStackNavigator({
  MyProfile: ProfileScreen,
  Login: LoginScreen,
  Register: RegisterScreen
}, {
  initialRouteName: 'MyProfile',
  defaultNavigationOptions: {
    header: null
  },
  navigationOptions: {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      return (<Icon style={{color: tintColor, fontSize:23}} name="user" type="AntDesign" />)
    }
  }
})

const MainBottom = createBottomTabNavigator({
  HomeStack: HomeStack,
  SurfStack: SurfStack,
  MyProfile: AuthStack
}, {
  lazy: false,
  tabBarOptions: {
    activeTintColor: '#989fce',
    inactiveTintColor: '#5d536b',
    style: {
      height: 55, 
      backgroundColor: '#272838'
    }
  }
})

const AppContainer = createAppContainer(MainBottom)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}