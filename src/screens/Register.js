import React, { Component } from 'react'
import { ScrollView, TouchableOpacity, Text, View, Image, TouchableNativeFeedback, TextInput } from 'react-native'

export default class Register extends Component {
	render() {
		return (
			<ScrollView style={{flex: 1, flexDirection:'column', backgroundColor:'#272838'}}>
				<View style={{alignItems:'center', justifyContent:'center', height:200}}>
					<Image style={{width: 300, height: 300, resizeMode: 'center'}} source={require('../assets/image/logo_horizontal.png')}/>
				</View>
				<View style={{flexDirection:'column', paddingHorizontal: 40}}>
					<View style={{paddingBottom: 20}}>
						<TextInput style={{ color:'#7d6b91', fontSize: 18, borderBottomWidth: 0.3, borderColor: '#7d6b91'}} placeholder="Name" placeholderTextColor="#5d536b"/>
					</View>
					<View style={{paddingBottom: 20}}>
						<TextInput style={{ color:'#7d6b91', fontSize: 18, borderBottomWidth: 0.3, borderColor: '#7d6b91'}} placeholder="Email" placeholderTextColor="#5d536b"/>
					</View>
					<View style={{paddingBottom: 20}}>
						<TextInput style={{ color:'#7d6b91', fontSize: 18, borderBottomWidth: 0.3, borderColor: '#7d6b91'}} placeholder="Username" placeholderTextColor="#5d536b"/>
					</View>
					<View style={{paddingBottom: 50}}>
						<TextInput secureTextEntry={true} style={{ color:'#7d6b91', fontSize: 18, borderBottomWidth: 0.3, borderColor: '#7d6b91'}} placeholder="Password" placeholderTextColor="#5d536b"/>
					</View>
					<TouchableNativeFeedback>
						<View style={{padding:10, backgroundColor:'#7d6b91', borderRadius:100}}>
							<Text style={{textAlign:'center', fontSize: 18, fontWeight:'bold', color:'#fff'}}>REGISTER</Text>
						</View>
					</TouchableNativeFeedback>
					<TouchableOpacity						
						onPress={() => this.props.navigation.navigate('Login')}
					>
						<Text style={{textAlign:'center', color:'#5d536b', padding:15, fontSize:16 }}>Have account? Login</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}
}