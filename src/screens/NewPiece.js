import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import { Form, Item, Label, Input, List } from 'native-base'
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux'

import { getUser } from '../redux/actions/user'
import { getTags } from '../redux/actions/tags'
import { createPiece } from '../redux/actions/posts'
import { getPost, removeFavorite, addFavorite, removePiece, fetchPosts } from '../redux/actions/posts'

class NewPiece extends Component {

	static navigationOptions = {
		title: 'New Piece'
	}

	componentDidMount() {
		this.props.dispatch(getTags()).then(() => this.setState({suggestions: this.props.tags.data}))
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

	async handleCreate({ title, description, tags, imageSource }){
		try {
			let form = new FormData()
			form.append('picture', {
				name: imageSource.fileName,
				type: imageSource.type,
				uri: imageSource.uri
			})
			await this.props.dispatch(createPiece(title, description, tags, form))
			await this.props.dispatch(getUser(this.props.auth))
			await this.props.dispatch(fetchPosts())
			this.props.navigation.goBack()
		} catch(e) {
			alert(e)
		}
	}

	state = {
		imageSource: 'http://',
		title:'',
		description:'',
		suggestions: [], 
		tags: [],
		tag: {
			id: 0,
			label: ''
		}
	}

	handleDelete = index => {
	   let tagsSelected = this.state.tags;
	   tagsSelected.splice(index, 1);
	   this.setState({ tags: tagsSelected });
	}

	handleAddTags = () => {
		this.setState({ tags: this.state.tags.concat([this.state.tag]) });
	}

	handleAddition = suggestion => {
	   this.setState({ tags: this.state.tags.concat([suggestion]) });
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
            <View style={{flex:1, flexDirection:'column'}}>
            	<Text style={{ fontWeight:'bold', fontSize:17, paddingBottom:5}}>Tags</Text>
            	<View style={{flex:1, flexDirection:'row', flexWrap:'wrap', paddingBottom:10}}>
            		{this.state.tags.map((item, index) => (
            			<TouchableOpacity
            				key={String(index)}
            				onPress={() => this.handleDelete(index)}
            			>
            				<Text style={{backgroundColor:'#9e9e9e', padding:5, margin:5, borderRadius:5, color:'#fff'}}>{item.label}</Text>
            			</TouchableOpacity>
            			))}
            	</View>
            	<View style={{flex:1, flexDirection:'row'}}>
            		<View style={{flex:1, flexDirection:'column'}}>
		            	<TextInput value={this.state.tag.label} autoFocus={true} onFocus={() => this.setState({isFocus: true})} style={{backgroundColor:'#fafafa', paddingHorizontal: 10, paddingVertical:5}} onChangeText={(text) => {
		            		this.setState({tag: {id: 0, label: text}})
		            		this.setState({suggestions: this.props.tags.data.filter((item) => RegExp(text.toLowerCase()).test(item.label))})
		            	}}/>
						       <View style={{flex:1, borderWidth:0.3, borderTopWidth:0, borderColor:'lightgray', marginBottom:10}}>
							      	<FlatList 
							      		data={this.state.suggestions}
							      		keyExtractor={(item, index) => String(index)}
							      		renderItem={ ({item}) => (
							      			<TouchableOpacity
							      				onPress={() => this.handleAddition(item)}
							      			>
							      				<View style={{paddingHorizontal:10, paddingVertical:5, backgroundColor:'#fff'}}>
							      					<Text>{item.label}</Text>
							      				</View>
							      			</TouchableOpacity>)
							      		}
							      	/>
						    	</View>
					    	</View>
					    	<View style={{flexDirection:'column', alignItems: 'flex-start'}}>
					    		<TouchableOpacity
					    			onPress={() => this.handleAddTags()}
					    		>
					    			<View style={{padding:10, backgroundColor:'#03A9F4'}}>
					    				<Text style={{textAlign:'center', color:'#fff'}}>Add</Text>
					    			</View>
					    		</TouchableOpacity>
					    	</View>
				    	</View>
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


const mapStateToProps = ({ posts, auth, user, tags }) => {
	return {
		posts,
		auth,
		user,
		tags
	}
}

export default connect(mapStateToProps)(NewPiece)