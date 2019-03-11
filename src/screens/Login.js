import React, { Component } from 'react'
import { ScrollView, TouchableOpacity, Text, View, Image, TouchableNativeFeedback, TextInput } from 'react-native'
import { connect } from 'react-redux'

import { login } from '../redux/actions/auth'

class Login extends Component {

	static navigationOptions = {
		header: null
	}

	state = {
		username: '',
		password: ''
	}

	async handleLogin(user) {
		try {
			await this.props.dispatch(login(user))
			this.props.navigation.navigate('MyProfile')
		} catch(e) {
			alert(e)
		}
	}

	render() {
		return (
			<ScrollView style={{flex: 1, flexDirection:'column', backgroundColor:'#272838'}}>
				<View style={{alignItems:'center'}}>
					<Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={require('../assets/image/logo_horizontal.png')}/>
				</View>
				<View style={{flexDirection:'column', paddingHorizontal: 40}}>
					<View style={{paddingBottom: 20}}>
						<TextInput value={this.state.username} onChangeText={(username) => this.setState({username})}style={{ color:'#7d6b91', fontSize: 18, borderBottomWidth: 0.3, borderColor: '#7d6b91'}} placeholder="Username" placeholderTextColor="#5d536b"/>
					</View>
					<View style={{paddingBottom: 50}}>
						<TextInput value={this.state.password} onChangeText={(password) => this.setState({password})}secureTextEntry={true} style={{ color:'#7d6b91', fontSize: 18, borderBottomWidth: 0.3, borderColor: '#7d6b91'}} placeholder="Password" placeholderTextColor="#5d536b"/>
					</View>
					<TouchableNativeFeedback
						onPress={() => this.handleLogin(this.state)}
					>
						<View style={{padding:10, backgroundColor:'#7d6b91', borderRadius:100}}>
							<Text style={{textAlign:'center', fontSize: 18, fontWeight:'bold', color:'#fff'}}>LOGIN</Text>
						</View>
					</TouchableNativeFeedback>
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate('Register')}
					>
						<Text style={{textAlign:'center', color:'#5d536b', padding:15, fontSize:16 }}>Dont have account? Register</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}
}

const mapStateToProps = ({ auth, user }) => {
	return {
		auth,
		user
	}
}

export default connect(mapStateToProps)(Login)