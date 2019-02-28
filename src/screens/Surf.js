import React, { Component } from 'react'
import { View, Text, FlatList, ScrollView, Picker, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'native-base'

import PostGridItem from '../components/PostGridItem'

class Surf extends Component {

	static navigationOptions = {
		title: 'Surf'
	}

	state = {
		language: '',
		posts: [
			{
				title: 'Mockup Design',
				profile_image: 'https://cdn.dribbble.com/users/1311712/avatars/small/1e0d66598cd70d53179eca14749e0691.png?1543369035',
				image_uri: 'https://cdn.dribbble.com/users/1311712/screenshots/6083660/_1_2x.png',
				name: 'erics',
				location: 'Paris'
			},
			{
				title: 'Sample',
				profile_image: 'https://cdn.dribbble.com/users/902546/avatars/small/4e21424f17e7de90cf3548b07dde46e0.jpg?1530822387',
				image_uri: 'https://cdn.dribbble.com/users/902546/screenshots/6081671/getkisi_main_2x_2x.png',
				name: 'Igorr Gedz',
				location: 'America'
			},
			{
				title: 'Home',
				profile_image: 'https://cdn.dribbble.com/users/1786276/avatars/small/91edcca55a7842d2c63644cb7deca646.jpg?1547460655',
				image_uri: 'https://cdn.dribbble.com/users/1786276/screenshots/6084477/__a-1200.png',
				name: 'Mina FZ',
				location: 'Italy'
			},
			{
				title: 'Mockup Design',
				profile_image: 'https://cdn.dribbble.com/users/1311712/avatars/small/1e0d66598cd70d53179eca14749e0691.png?1543369035',
				image_uri: 'https://cdn.dribbble.com/users/1311712/screenshots/6083660/_1_2x.png',
				name: 'erics',
				location: 'Paris'
			},
			{
				title: 'Sample',
				profile_image: 'https://cdn.dribbble.com/users/902546/avatars/small/4e21424f17e7de90cf3548b07dde46e0.jpg?1530822387',
				image_uri: 'https://cdn.dribbble.com/users/902546/screenshots/6081671/getkisi_main_2x_2x.png',
				name: 'Igorr Gedz',
				location: 'America'
			},
			{
				title: 'Home',
				profile_image: 'https://cdn.dribbble.com/users/1786276/avatars/small/91edcca55a7842d2c63644cb7deca646.jpg?1547460655',
				image_uri: 'https://cdn.dribbble.com/users/1786276/screenshots/6084477/__a-1200.png',
				name: 'Mina FZ',
				location: 'Italy'
			},
			{
				title: 'Home',
				profile_image: 'https://cdn.dribbble.com/users/1786276/avatars/small/91edcca55a7842d2c63644cb7deca646.jpg?1547460655',
				image_uri: 'https://cdn.dribbble.com/users/1786276/screenshots/6084477/__a-1200.png',
				name: 'Mina FZ',
				location: 'Italy'
			},
			{
				title: 'Mockup Design',
				profile_image: 'https://cdn.dribbble.com/users/1311712/avatars/small/1e0d66598cd70d53179eca14749e0691.png?1543369035',
				image_uri: 'https://cdn.dribbble.com/users/1311712/screenshots/6083660/_1_2x.png',
				name: 'erics',
				location: 'Paris'
			},
			{
				title: 'Sample',
				profile_image: 'https://cdn.dribbble.com/users/902546/avatars/small/4e21424f17e7de90cf3548b07dde46e0.jpg?1530822387',
				image_uri: 'https://cdn.dribbble.com/users/902546/screenshots/6081671/getkisi_main_2x_2x.png',
				name: 'Igorr Gedz',
				location: 'America'
			},
			{
				title: 'Home',
				profile_image: 'https://cdn.dribbble.com/users/1786276/avatars/small/91edcca55a7842d2c63644cb7deca646.jpg?1547460655',
				image_uri: 'https://cdn.dribbble.com/users/1786276/screenshots/6084477/__a-1200.png',
				name: 'Mina FZ',
				location: 'Italy'
			}
		]
	}

	render() {
		return (
			<ScrollView style={{flex: 1, backgroundColor:'#eee'}}>
				<View style={{backgroundColor:'#fff', padding:10, flex:1, flexDirection:'row', justifyContent:'space-between'}}>
					<TextInput style={{backgroundColor:'#eee', borderRadius: 5, padding: 10, width:'60%'}} placeholder="Search"/>
					<Picker
					  selectedValue={this.state.language}
					  style={{height: 50, width: '40%'}}
					  onValueChange={(itemValue, itemIndex) =>
					    this.setState({language: itemValue})
					  }>
					  <Picker.Item label="Java" value="java" />
					  <Picker.Item label="JavaScript" value="js" />
					</Picker>
				</View>
				<FlatList 
					data={this.state.posts}
					numColumns={2}
					horizontal={false}
					keyExtractor={(item, index) => String(index)}
					renderItem={({ item, index }) => (
						<PostGridItem 
							picture={item.image_uri}
							favsCount={9}
							commentsCount={9}
						/>
					)}
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

export default connect(mapStateToProps)(Surf)