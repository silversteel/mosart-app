import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Icon, Thumbnail } from 'native-base'
import PostGridItem from '../components/PostGridItem'

import { getOtherUser } from '../redux/actions/user'

class OtherProfile extends Component {

	static navigationOptions = {
		title: 'Profile'
	}

	componentDidMount() {
		const { id } = this.props.navigation.state.params
		this.fetchUser(id)
	}

	async fetchUser(id) {
		try {
			await this.props.dispatch(getOtherUser(id))
		} catch(e) {
			alert(e)
		}
	}

	render() {
		if (this.props.isLoading) {
			return (
				<View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			)
		} else {
			return (
				<ScrollView style={{flex:1, flexDirection: 'column', backgroundColor:'#eee'}}>
					<View style={{flexDirection: 'column', padding:50, paddingBottom:30, backgroundColor:'#fff', elevation: 2}}>
						<View style={{alignItems:'center'}}>
							<Thumbnail large source={{uri: this.props.other.profile.image_url}}/>
						</View>
						<View style={{paddingVertical: 17}}>
							<Text style={{fontSize: 26, fontWeight:'bold', color:'#2e2e2e', textAlign:'center'}}>{this.props.other.profile.name}</Text>
							<Text style={{fontSize: 17, color: '#8e8e8e', textAlign:'center'}}>{this.props.other.profile.location}</Text>
						</View>
						<View style={{paddingBottom:10}}>
							<Text style={{fontSize: 17, textAlign:'center', color:'#6e6e6e'}}>{this.props.other.profile.bio}</Text>
						</View>
						<View style={{alignItems:'center'}}>
							<TouchableOpacity>
								<Text style={{color:'#347fc4'}}>{this.props.other.profile.website}</Text>
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
									<Text numberOfLines={1} style={{color: '#757575', fontSize: 16 , fontWeight:'bold', paddingHorizontal:10}}>199</Text>
								</View>
								<View style={{flex: 1, flexDirection:'row', alignItems:'center'}}>
									<Icon style={{color: '#BDBDBD', fontSize: 18}} name="user-o" type="FontAwesome"/>
									<Text numberOfLines={1} style={{color: '#757575', fontSize: 16 , fontWeight:'bold', paddingHorizontal:10}}>199</Text>
								</View>
							</View>
						</View>
					</View>
					<FlatList 
						data={this.props.other.posts}
						numColumns={2}
						horizontal={false}
						keyExtractor={(item, index) => String(index)}
						renderItem={({ item, index }) => (
							<PostGridItem 
								picture={item.image_url}
								onPressPicture={()=>this.props.navigation.navigate('Post', { post_id: item.id })}
							/>
						)}
						ListEmptyComponent={()=>(<View style={{flex:1, alignItems:'center', paddingVertical:50}}><Text style={{fontSize:20, color:'#9e9e9e'}}>No Pieces</Text></View>)}
					/>
				</ScrollView>
			)
		}
	}
}

const mapStateToProps = ({ user }) => {
	return {
		other: user.otherProfile,
		isLoading: user.isOtherLoading
	}
}

export default connect(mapStateToProps)(OtherProfile)