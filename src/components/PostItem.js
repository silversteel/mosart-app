import React, { Component } from 'react'
import { Image, View, TouchableNativeFeedback } from 'react-native'
import { Card, CardItem, Button, Thumbnail, Text, Left, Body, Right, Icon } from 'native-base'

export default class PostItem extends Component {

	render() {
		return (
			<TouchableNativeFeedback
				useForeground={true}
				onPress={this.props.onPressItem}
			>
			<Card transparent style={{ marginBottom: 7, elevation: 1 }}>
				<CardItem>
					<Left>
						<Thumbnail source={{ uri: this.props.profilePict }} />
						<Body>
							<Text>{this.props.title}</Text>
							<Text note>by {this.props.name}, {this.props.uploadTime}</Text>
						</Body>
					</Left>
				</CardItem>
				<CardItem cardBody>
					<Image source={{ uri: this.props.picture }} style={{height: 250, width: null, flex:1}}/>
				</CardItem>
				<CardItem style={{height: 70}}>
         <Left>
            <Button transparent>
              <Icon style={{fontSize: 18}} name="heart" type="AntDesign"/>
              <Text style={{fontSize: 16}}>{this.props.favsCount}</Text>
            </Button>
            <Button transparent>
              <Icon style={{fontSize: 18}} name="comment" type="MaterialCommunityIcons"/>
              <Text style={{fontSize: 16}}>{this.props.commentsCount}</Text>
            </Button>
          </Left>
				</CardItem>
			</Card>
			</TouchableNativeFeedback>
		)
	}
}