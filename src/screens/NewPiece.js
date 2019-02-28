import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import { Form, Item, Label, Input } from 'native-base'
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux'

import { getUser } from '../redux/actions/user'
import { createPiece } from '../redux/actions/posts'

class NewPiece extends Component {

	static navigationOptions = {
		title: 'New Piece'
	}

	handlePickImage() {
		const options = {
		  title: 'Select Avatar',
		  storageOptions: {
		    skipBackup: true,
		    path: 'images',
		  },
		};

		ImagePicker.launchImageLibrary(options, (response) => {
  		console.log('Response = ', response);
		  if (response.didCancel) {
		    console.log('User cancelled image picker');
		  } else if (response.error) {
		    console.log('ImagePicker Error: ', response.error);
		  } else if (response.customButton) {
		    console.log('User tapped custom button: ', response.customButton);
		  } else {
		    const source = response
		    this.setState({
		      imageSource: source,
		    });
		   }
		});
	}

	async handleCreate({ title, description, imageSource }){
		try {
			let form = new FormData()
			form.append('picture', {
				name: imageSource.fileName,
				type: imageSource.type,
				uri: imageSource.uri
			})
			await this.props.dispatch(createPiece(title, description, form))
			await this.props.dispatch(getUser(this.props.auth))
			this.props.navigation.goBack()
		} catch(e) {
			alert(e)
		}
	}

	state = {
		imageSource: 'http://',
		title:'',
		description:''
	}

	render() {
		return (
			<ScrollView style={{flex:1}}>
				<Image style={{width:'100%', height:300, resizeMode:'contain', backgroundColor:'#2e2e2e'}} source={{ uri: this.state.imageSource.uri }}/>
				<View style={{padding:20}}>
					<TouchableOpacity
						onPress={() => this.handlePickImage()}
					>
						<View style={{backgroundColor:'#347fc4', padding:10, borderRadius: 10}}>
							<Text style={{color:'#fff', textAlign:'center', fontWeight:'bold', fontSize: 16}}>Choose Image</Text>
						</View>
					</TouchableOpacity>
					<View style={{paddingVertical:10}}>
						<View style={{flexDirection: 'column', padding:10}}>
							<Text style={{ fontWeight:'bold', fontSize:17 }}>Title</Text>
							<TextInput value={this.state.title} onChangeText={(title) => this.setState({title})} style={{borderBottomWidth: 1, borderColor: 'lightgray', padding:10, paddingTop:5}}/>
						</View>
						<View style={{flexDirection: 'column', padding:10, paddingBottom:30}}>
							<Text style={{ fontWeight:'bold', fontSize:17 }}>Description</Text>
							<TextInput value={this.state.description} onChangeText={(description) => this.setState({description})} style={{borderBottomWidth: 1, borderColor: 'lightgray', padding:10, paddingTop:5}}/>
						</View>
						<TouchableOpacity
							onPress={() => this.handleCreate(this.state)}
						>
							<View style={{backgroundColor:'#8BC34A', padding:10, borderRadius: 10}}>
								<Text style={{color:'#fff', textAlign:'center', fontWeight:'bold', fontSize: 16}}>CREATE</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		)
	}
}


const mapStateToProps = ({ posts, auth, user }) => {
	return {
		posts,
		auth,
		user
	}
}

export default connect(mapStateToProps)(NewPiece)