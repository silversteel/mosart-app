import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, TouchableNativeFeedback, FlatList, Image } from 'react-native'
import { connect } from 'react-redux'
import { Thumbnail, Container, Header, Button, Icon, Fab  } from 'native-base'

import PostGridItem from '../components/PostGridItem'
import { getToken, removeToken } from '../redux/actions/auth'
import { getUser } from '../redux/actions/user'

class Profile extends Component {

	static navigationOptions = {
		header: null
	}
	
	componentDidMount() {
		this.fetchUser()
	}

	state = {
		active: true
	}

	async fetchUser() {
		try {
			await this.props.dispatch(getToken())
			await this.props.dispatch(getUser(this.props.auth))
		} catch(e) {
			if(e.request.status && !e.request.status == '401'){
				alert(e)
			}
		}
	}

	async handleLogout() {
		try {
			await this.props.dispatch(removeToken())
			this.props.navigation.navigate('Login')
		} catch(e) {
			alert(e)
		}
	}

	render() {
		if(!this.props.user.isLogin) {
			return (
				<View style={{flex:1, flexDirection:'column', backgroundColor:'#272838', padding: 50, paddingTop:150}}>
					<View style={{alignItems:'center'}}>
						<Image style={{width: 300, height:100, resizeMode:'contain'}} source={require('../assets/image/logo_horizontal.png')}/>
					</View>
					<Text style={{color: '#989fce', fontSize:17, textAlign:'center', paddingVertical:20}}>Login to fully enjoy Mosart features</Text>
					<TouchableNativeFeedback
						onPress={() => this.props.navigation.navigate('Login')}
					>
						<View style={{padding:10, backgroundColor:'#7d6b91', borderRadius:100}}>
							<Text style={{textAlign:'center', fontSize: 16, fontWeight:'bold', color:'#fff'}}>LOGIN TO MOSART</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
			)
		} else {
			return (
				<View style={{flex: 1}}>
				<ScrollView style={{flexDirection: 'column', backgroundColor:'#eee'}}>
					<View style={{flexDirection: 'column', paddingHorizontal:0, paddingBottom:30, backgroundColor:'#fff', elevation: 2}}>
						<View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
							<TouchableNativeFeedback
								onPress={() => this.props.navigation.navigate('EditProfile')}
							>
								<View style={{padding:10}}>
									<Text style={{textAlign:'center', fontSize: 17, fontWeight:'bold', color:'#03A9F4'}}>Edit Profile</Text>
								</View>
							</TouchableNativeFeedback>
							<TouchableNativeFeedback
								onPress={() => this.handleLogout()}
							>
								<View style={{padding:10}}>
									<Text style={{textAlign:'center', fontSize: 17, fontWeight:'bold', color:'#EF5350'}}>Logout</Text>
								</View>
							</TouchableNativeFeedback>
						</View>
						<View style={{alignItems:'center'}}>
							<Thumbnail large source={{uri: this.props.user.profile.image_url}}/>
						</View>
						<View style={{paddingVertical: 17}}>
							<Text style={{fontSize: 26, fontWeight:'bold', color:'#2e2e2e', textAlign:'center'}}>{this.props.user.profile.name}</Text>
							<Text style={{fontSize: 17, color: '#8e8e8e', textAlign:'center'}}>{this.props.user.profile.location}</Text>
						</View>
						<View style={{paddingBottom:10}}>
							<Text style={{fontSize: 17, textAlign:'center', color:'#6e6e6e', paddingHorizontal:10}}>{this.props.user.profile.bio}</Text>
						</View>
						<View style={{alignItems:'center'}}>
							<TouchableOpacity>
								<Text style={{color:'#347fc4'}}>{this.props.user.profile.website}</Text>
							</TouchableOpacity>
						</View>
						<View style={{flex: 1, flexDirection:'row', paddingVertical: 20}}>
							<View style={{flex: 0.5, flexDirection:'column', alignItems:'center', borderRightWidth:1, borderColor:'lightgray'}}>
								<View style={{flex: 1, flexDirection:'row', alignItems:'center'}}>
									<Icon style={{color: '#BDBDBD', fontSize: 18}} name="heart" type="AntDesign"/>
									<Text numberOfLines={1} style={{color: '#757575', fontSize: 16 , fontWeight:'bold', paddingHorizontal:10}}>199</Text>
								</View>
								<View style={{flex: 1, flexDirection:'row', alignItems:'center'}}>
									<Icon style={{color: '#BDBDBD', fontSize: 18}} name="folder-multiple-image" type="MaterialCommunityIcons"/>
									<Text numberOfLines={1} style={{color: '#757575', fontSize: 16 , fontWeight:'bold', paddingHorizontal:10}}>199</Text>
								</View>
							</View>
							<View style={{flex: 0.5, flexDirection:'column', alignItems:'center', borderLeftWidth:1, borderColor:'lightgray'}}>
								<View style={{flex: 1, flexDirection:'row', alignItems:'center'}}>
									<Icon style={{color: '#BDBDBD', fontSize: 18}} name="user" type="FontAwesome"/>
									<Text numberOfLines={1} style={{color: '#757575', fontSize: 16 , fontWeight:'bold', paddingHorizontal:10}}>{this.props.user.followers.length}</Text>
								</View>
								<View style={{flex: 1, flexDirection:'row', alignItems:'center'}}>
									<Icon style={{color: '#BDBDBD', fontSize: 18}} name="user-o" type="FontAwesome"/>
									<Text numberOfLines={1} style={{color: '#757575', fontSize: 16 , fontWeight:'bold', paddingHorizontal:10}}>{this.props.user.following.length}</Text>
								</View>
							</View>
						</View>
					</View>
					<View style={{flex: 1}}>
						<FlatList 
							data={this.props.user.posts}
							numColumns={(this.props.user.posts.length < 2) ? 1 : 2}
							horizontal={false}
							keyExtractor={(item, index) => String(index)}
							renderItem={({ item, index }) => (
								<PostGridItem 
									picture={item.image_url}
									onPressPicture={()=>this.props.navigation.navigate('Piece', { post_id: item.id })}
								/>
							)}
							ListEmptyComponent={()=>(<View style={{flex:1, alignItems:'center', paddingVertical:50}}><Text style={{fontSize:20, color:'#9e9e9e'}}>No Pieces</Text></View>)}
						/>
					</View>
				</ScrollView>
        <Fab
          active={true}
          direction="up"
          containerStyle={{ }}
          style={{ backgroundColor: '#fff' }}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('NewPiece')}>
          <Icon style={{color:'#2e2e2e'}} name="plus" type="AntDesign" />
        </Fab>
				</View>
			)
		}
	}
}

const mapStateToProps = ({ posts, user, auth }) => {
	return {
		posts,
		user,
		auth
	}
}

export default connect(mapStateToProps)(Profile)