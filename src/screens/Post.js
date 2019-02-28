import React, { Component } from 'react'
import { ScrollView, FlatList, View, Image, Text, ActivityIndicator, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { connect } from 'react-redux'
import { Icon, Thumbnail } from 'native-base'
import moment from 'moment'

import { getPost, removeFavorite, addFavorite } from '../redux/actions/posts'
import Comment from '../components/Comment'

class Post extends Component {

	static navigationOptions = {
		title: 'Post'
	}

	componentWillMount() {
		const { post_id } = this.props.navigation.state.params
		this.fetchData(post_id, (this.props.user.user_id ? this.props.user.user_id : 0))
	}

	async fetchData(post_id, user_id) {
		try {
			await this.props.dispatch(getPost(post_id, user_id))
		} catch(e) {
			alert(e)
		}
	}

	async handleFavoriteButton(){
		try {
			if(!this.props.user.isLogin){
				throw { type: 'unauthorized' }
			}

			const user = this.props.user
			const post = this.props.posts.post

			if(this.props.posts.post.isFavorite == '1'){
				await this.props.dispatch(removeFavorite(post.id, user.user_id))
			} else {
				await this.props.dispatch(addFavorite(post.id, user.user_id))
			}

			await this.fetchData(post.id, user.user_id)

		} catch(e) {
			if(e.type && e.type == 'unauthorized'){
				this.props.navigation.navigate('MyProfile')
			}
			alert(e)
		}
	}

	render() {
		if (this.props.posts.isLoading) {
			return (
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
					<ActivityIndicator size="large" color="#347fc4" />
				</View>
			)
		} else {
			let tags
			if(this.props.posts.post.tags.length > 0){
				tags =	this.props.posts.post.tags.map((item, index) => {
									return (
										<TouchableOpacity key={String(index)} >
											<Text style={{margin:5, fontSize: 16, padding:8, backgroundColor:'#fafafa', color:'#9e9e9e', borderRadius: 5, fontWeight:'bold'}}>{item.label}</Text>
										</TouchableOpacity>
									)
								})
			} else{
				tags = (
					<Text style={{fontSize: 16, color: '#8e8e8e'}}>(No Tags)</Text>
				)
			}

			let heartColor

			if(this.props.posts.post.isFavorite == '1'){
				heartColor = "red"
			} else {
				heartColor = "#8e8e8e"
			}

			return (
				<ScrollView style={{flex: 1, flexDirection: 'column'}}>
					<View style={{flex: 1, backgroundColor:'#fff', elevation:2}}>
						<View style={{flexDirection:'row', padding: 15, alignItems:'center'}}>
							<Thumbnail source={{uri:this.props.posts.post.author.profile_image}}/>
							<View style={{flexDirection:'column', paddingHorizontal:10, flex:1}}>
								<Text style={{fontSize: 20, fontWeight: 'bold', color: '#2e2e2e'}}>{this.props.posts.post.title}</Text>
								<View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
									<Text style={{fontSize: 16, color: '#347FC4', fontWeight: 'bold'}}>{this.props.posts.post.author.name}</Text>
									<Text style={{color: '#8e8e8e'}}> {moment(this.props.posts.post.created_at, 'YYYY-MM-DD hh:mm:ss').fromNow()}</Text>
								</View>
							</View>
						</View>
							<Image style={{width: '100%', height: 300, resizeMode:'cover'}} source={{uri:this.props.posts.post.image_uri}}/>
						<View style={{flex:1, margin:20, paddingBottom: 15, flexDirection:'row', alignItems:'center', borderBottomWidth: 1, borderColor: '#eee'}}>
							<TouchableNativeFeedback
								onPress={()=> this.handleFavoriteButton()}
							>
								<View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:60, paddingHorizontal:10, paddingVertical:5}}>
									<Icon style={{fontSize: 18, color: heartColor }} name="heart" type="AntDesign"/>
									<Text style={{fontSize: 18, color: heartColor , fontWeight:'bold'}}>{this.props.posts.post.favorites}</Text>
								</View>
							</TouchableNativeFeedback>
							<Icon style={{fontSize: 18, color:'#8e8e8e', paddingLeft:10 }} name="comment" type="MaterialCommunityIcons"/>
							<Text style={{fontSize: 18, color:'#8e8e8e' , fontWeight:'bold', paddingHorizontal:10, paddingRight:18}}>{this.props.posts.post.comments.length}</Text>
							<Icon style={{fontSize: 18, color:'#8e8e8e' }} name="eye" type="AntDesign"/>
							<Text style={{fontSize: 18, color:'#8e8e8e' , fontWeight:'bold', paddingHorizontal:10, paddingRight:18}}>{this.props.posts.post.views}</Text>
						</View>
						<View style={{flex:1, marginHorizontal: 20, marginBottom:20, borderBottomWidth: 1, borderColor:'#eee', paddingBottom:20}}>
							<Text style={{fontSize:16}}>{this.props.posts.post.description ? this.props.posts.post.description : '(No Description)'}</Text>
						</View>
						<View style={{paddingHorizontal:20, paddingBottom:30}}>
							<Text style={{fontSize: 20, fontWeight:'bold', color:'#5e5e5e', paddingBottom:5}}>Tags</Text>
							<View style={{flex:1, flexDirection:'row'}}>
								{tags}
							</View>
						</View>
					</View>
					<View style={{backgroundColor:'#fafafa', padding:15, paddingVertical:20}}>
						<FlatList 
							data={this.props.posts.post.comments}
							keyExtractor={(item, index) => String(index)}
							renderItem={({item, index}) => (
								<Comment 
									name={item.name}
									profilePicture={item.profile_image}
									content={item.content}
									createdAt={moment(item.created_at, 'YYYY-MM-DD hh:mm:ss').fromNow()}
								/>
							)}
							ListEmptyComponent={() => (
								<View style={{flex: 1, alignItems: 'center', paddingVertical:20}}>
									<Text style={{fontSize:17, color:'#9e9e9e'}}>No Comment.</Text>
								</View>
							)}
						/>
					</View>
				</ScrollView>
			)
		}
	}
}

const mapStateToProps = ({ posts, user }) => {
	return {
		posts,
		user
	}
}

export default connect(mapStateToProps)(Post)