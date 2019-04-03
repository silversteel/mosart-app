import React, { Component } from 'react'
import { View, Text, FlatList, ScrollView, Picker, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { List, Icon } from 'native-base'
import _ from 'lodash'
import { searchPieces } from '../redux/actions/posts'
import Modal from "react-native-modal";

import { getTags } from '../redux/actions/tags'
import PostGridItem from '../components/PostGridItem'

class Surf extends Component {

	constructor(props) {
		super(props)
		this.onChangeText = _.debounce(() => this.props.dispatch(searchPieces(this.state)), 300)
	}

	static navigationOptions = {
		title: 'Surf'
	}

	componentDidMount() {
		this.fetchPieces()
	}

	async fetchPieces() {
		try {
			await this.props.dispatch(searchPieces(this.state))
			await this.props.dispatch(getTags())
			this.setState({
				suggestions: this.props.tags.data
			})
		} catch(e) {
			alert(e)
		}
	}

	state = {
		title: '',
		suggestions: [],
		tags: [],
		query:'hh',
		isFocus: false,
		isModalVisible: false
	}

	searchByTitle = (title) => {
		this.setState({title}, this.onChangeText)
	}

	_toggleModal = () => {
		this.setState({isModalVisible: !this.state.isModalVisible})
	}

	handleDelete = index => {
	   let tagsSelected = this.state.tags;
	   tagsSelected.splice(index, 1);
	   this.setState({ tags: tagsSelected });
	}

	handleAddition = suggestion => {
	   this.setState({ tags: this.state.tags.concat([suggestion]) });
	}

	handleFilter = async () => {
		try {
			await this.props.dispatch(searchPieces(this.state))
		} catch(e) {
			alert(e)
		}
	}

	render() {
		let suggestionComponent
		if(this.state.isFocus){
			suggestionComponent = (
				<View style={{flex:0.8, borderWidth:0.3, borderTopWidth:0, borderColor:'lightgray', marginBottom:10}}>
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
	    )
		}

		return (
			<ScrollView style={{flex: 1, backgroundColor:'#eee'}}>
        <Modal deviceHeight={800} isVisible={this.state.isModalVisible}>
          <View style={{ height:'70%', padding:10 , backgroundColor:'#fff'}}>
            <Text style={{fontSize:20, fontWeight:'bold', color:'#2e2e2e', paddingBottom:10}}>By Tags</Text>
            <View style={{flex:1, flexDirection:'column'}}>
            	<View style={{flex:1, flexDirection:'row', flexWrap:'wrap'}}>
            		{this.state.tags.map((item, index) => (
            			<TouchableOpacity
            				key={String(index)}
            				onPress={() => this.handleDelete(index)}
            			>
            				<Text style={{backgroundColor:'#9e9e9e', padding:5, margin:5, color:'#fff'}}>{item.label}</Text>
            			</TouchableOpacity>
            			))}
            	</View>
	            <View style={{flex:2, flexDirection:'column'}}>
	            	<TextInput autoFocus={true} onFocus={() => this.setState({isFocus: true})} style={{backgroundColor:'#fafafa', paddingHorizontal: 10, paddingVertical:5}} onChangeText={(text) => {
	            		this.setState({suggestions: this.props.tags.data.filter((item) => RegExp(text).test(item.label))})
	            	}}/>
	            	{suggestionComponent}
	            </View>
            </View>
            <View style={{flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}}>
	            <TouchableOpacity onPress={() => {
	            	this.handleFilter()
	            	this._toggleModal()
	            }}>
	            	<View style={{width:100, padding:10, backgroundColor:'#7d6b91'}}>
	              	<Text style={{fontWeight:'bold', textAlign:'center', color:'#fff'}}>OK</Text>
	              </View>
	            </TouchableOpacity>
            </View>
          </View>
        </Modal>
				<View style={{backgroundColor:'#fff', padding:10, flex:1, flexDirection:'row', justifyContent:'space-between'}}>
					<TextInput value={this.state.title} onChangeText={this.searchByTitle} style={{backgroundColor:'#eee', borderRadius: 5, padding: 10, width:'85%'}} placeholder="Search"/>
					<TouchableOpacity
						onPress={this._toggleModal}
					>
						<View style={{borderRadius:5, padding:15, backgroundColor:'#7d6b91'}}>
							<Icon style={{fontSize:15, color:'#fff'}} name="filter" type="FontAwesome5"/>
						</View>
					</TouchableOpacity>
				</View>
				<List>
					<FlatList 
						data={this.props.surf}
						numColumns={2}
						horizontal={false}
						refreshing={this.props.isLoading}
						onRefresh={() => this.fetchPieces()}
						keyExtractor={(item, index) => String(index)}
						renderItem={({ item, index }) => (
							<PostGridItem 
								picture={item.image_url}
								onPressPicture={()=>this.props.navigation.navigate('Post', { post_id: item.id })}
								favsCount={9}
								commentsCount={9}
							/>
						)}
					/>
				</List>
			</ScrollView>
		)
	}
}

const mapStateToProps = ({ posts, tags }) => {
	return {
		surf: posts.surf,
		isLoading: posts.surfLoading,
		tags
	}
}

export default connect(mapStateToProps)(Surf)