import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import { Form, Item, Label, Input } from 'native-base'
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux'

import { getUser, editProfile } from '../redux/actions/user'

class EditProfile extends Component {

	static navigationOptions = {
		title: 'Edit Profile'
	}

	componentWillMount() {
		this.setState({
			imageSource: { 
				uri: this.props.user.profile.image_url,
				type: 'image/png',
				fileName: 'pict'
			},
			name:  this.props.user.profile.name,
			bio:  this.props.user.profile.bio,
			location:  this.props.user.profile.location,
			website:  this.props.user.profile.website
		})
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

	async handleEdit({ name, bio, location, website, imageSource }){
		try {
			let form = new FormData()
			form.append('picture', {
				name: imageSource.fileName,
				type: imageSource.type,
				uri: imageSource.uri
			})
			await this.props.dispatch(editProfile(this.props.user.user_id, name, bio, location, website, form))
			await this.props.dispatch(getUser(this.props.auth))
			this.props.navigation.goBack()
		} catch(e) {
			alert(e)
		}
	}

	state = {
		imageSource: 'http://',
		name: '',
		bio: '',
		location: '',
		website: ''
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
							<Text style={{ fontWeight:'bold', fontSize:17 }}>Name</Text>
							<TextInput value={this.state.name} onChangeText={(name) => this.setState({name})} style={{borderBottomWidth: 1, borderColor: 'lightgray', padding:10, paddingTop:5}}/>
						</View>
						<View style={{flexDirection: 'column', padding:10}}>
							<Text style={{ fontWeight:'bold', fontSize:17 }}>Bio</Text>
							<TextInput value={this.state.bio} onChangeText={(bio) => this.setState({bio})} style={{borderBottomWidth: 1, borderColor: 'lightgray', padding:10, paddingTop:5}}/>
						</View>
						<View style={{flexDirection: 'column', padding:10}}>
							<Text style={{ fontWeight:'bold', fontSize:17 }}>Location</Text>
							<TextInput value={this.state.location} onChangeText={(location) => this.setState({location})} style={{borderBottomWidth: 1, borderColor: 'lightgray', padding:10, paddingTop:5}}/>
						</View>
						<View style={{flexDirection: 'column', padding:10, paddingBottom:30}}>
							<Text style={{ fontWeight:'bold', fontSize:17 }}>Website</Text>
							<TextInput value={this.state.website} onChangeText={(website) => this.setState({website})} style={{borderBottomWidth: 1, borderColor: 'lightgray', padding:10, paddingTop:5}}/>
						</View>
						<TouchableOpacity
							onPress={() => this.handleEdit(this.state)}
						>
							<View style={{backgroundColor:'#8BC34A', padding:10, borderRadius: 10}}>
								<Text style={{color:'#fff', textAlign:'center', fontWeight:'bold', fontSize: 16}}>SAVE</Text>
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

export default connect(mapStateToProps)(EditProfile)