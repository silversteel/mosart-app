import React, { Component } from 'react'
import { View, Image, TouchableNativeFeedback, Text } from 'react-native'
import { Thumbnail } from 'native-base'

export default class Comment extends Component {

	render() {
		return (
			<View style={{ flex: 1, flexDirection:'row', paddingVertical:8, backgroundColor:'#fafafa'}}>
				<View style={{paddingHorizontal:5}}>
					<Thumbnail style={{width: 50, height: 50}} source={{uri: this.props.profilePicture}}/>
				</View>
				<View style={{ flex:1, flexDirection:'column', paddingHorizontal:10}}>
					<Text style={{color:'#4e4e4e', fontSize: 18, fontWeight:'bold', paddingBottom: 3}}>{this.props.name}</Text>
					<Text style={{fontSize: 16, paddingBottom: 12}}>{this.props.content}</Text>
					<View style={{flexDirection:'row', borderBottomWidth: 0.3, borderColor: '#E0E0E0', justifyContent: 'space-between'}}>
						<Text style={{color:'#BDBDBD', paddingBottom:10}}>{this.props.createdAt}</Text>
					</View>
				</View>
			</View>
		)
	}
}