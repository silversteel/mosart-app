import React, { Component } from 'react'
import { View, Image, TouchableNativeFeedback,Text } from 'react-native'
import { Icon } from 'native-base'

export default class PostGridItem extends Component {

	render() {
		return (
			<TouchableNativeFeedback
				onPress={this.props.onPressPicture}
				useForeground={true}
			>
			<View style={{ width: '50%', backgroundColor:'#fff', elevation: 1}}>
					<Image source={{ uri: this.props.picture }} style={{height: 150, width: null, resizeMode:'cover', flex:1}}/>
			</View>
			</TouchableNativeFeedback>
		)
	}
}