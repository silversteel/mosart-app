import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Icon, Thumbnail } from 'native-base'

class Profile extends Component {

	static navigationOptions = {
		tabBarLabel: 'Profile',
		tabBarIcon: ({ focused, horizontal, tintColor }) => {
			return (<Icon style={{color: tintColor, fontSize:23}} name="user" type="AntDesign" />)
		}
	}

	render() {
		return (
			<ScrollView style={{flex:1, flexDirection: 'column', backgroundColor:'#eee'}}>
				<View style={{flexDirection: 'column', padding:50, paddingBottom:30, backgroundColor:'#fff', elevation: 2}}>
					<View style={{alignItems:'center'}}>
						<Thumbnail large source={{uri: 'https://cdn.dribbble.com/users/14268/avatars/small/764193ea1bc7f0edf846eeda47048538.jpg?1549567039'}}/>
					</View>
					<View style={{paddingVertical: 17}}>
						<Text style={{fontSize: 26, fontWeight:'bold', color:'#2e2e2e', textAlign:'center'}}>John Doe</Text>
						<Text style={{fontSize: 17, color: '#8e8e8e', textAlign:'center'}}>Paris, France</Text>
					</View>
					<View style={{paddingBottom:10}}>
						<Text style={{fontSize: 17, textAlign:'center', color:'#6e6e6e'}}>Senior UI/UX Designer</Text>
					</View>
					<View style={{alignItems:'center'}}>
						<TouchableOpacity>
							<Text style={{color:'#347fc4'}}>My Website</Text>
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
					data={[]}
					numColumns={2}
					horizontal={false}
					keyExtractor={(item, index) => String(index)}
					renderItem={({ item, index }) => (<View></View>)}
					ListEmptyComponent={()=>(<View style={{flex:1, alignItems:'center', paddingVertical:50}}><Text style={{fontSize:20, color:'#9e9e9e'}}>No Content</Text></View>)}
				/>
			</ScrollView>
		)
	}
}

const mapStateToProps = ({ posts }) => {
	return {
		posts
	}
}

export default connect(mapStateToProps)(Profile)