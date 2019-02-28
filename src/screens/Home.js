import React, { Component } from 'react'
import { Image, View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Icon } from 'native-base'
import moment from 'moment'

import PostItem from '../components/PostItem'
import { fetchPosts } from '../redux/actions/posts'

class LogoTitle extends Component {
  render() {
    return (
    	<View style={{paddingHorizontal:20}}>
      	<Image source={require('../assets/image/header.png')} style={{width: 80, height: 80, resizeMode: 'contain'}} />
    	</View>
    )
  }
}

class Home extends Component {

	static navigationOptions = {
		headerTitle: <LogoTitle />
	}

	componentDidMount() {
		this.getPosts()
	}

	async getPosts() {
		try {
			await this.props.dispatch(fetchPosts())
		} catch(e) {
			alert(e.toString())
		}
	}

	render() {
		return (
			<Container style={{backgroundColor: '#eee'}}>
				<Content>
					<View style={{ paddingBottom: 15 }}>
					</View>
					<FlatList 
						data={this.props.posts.data}
						refreshing={this.props.posts.isLoading}
						onRefresh={() => this.getPosts()}
						keyExtractor={(item, index) => String(index)}
						renderItem={({ item, index }) => (
							<PostItem 
								profilePict={item.profile_image}
								name={item.name}
								title={item.title}
								picture={item.image_uri}
								favsCount='29'
								commentsCount='29'
								viewsCount={item.views}
								uploadTime={moment(item.created_at, 'YYYY-MM-DD hh:mm:ss').fromNow()}
								onPressItem={()=>this.props.navigation.navigate('Post', { post_id: item.id })}
							/>
						)}
					/>
				</Content>
			</Container>
		)
	}
}

const mapStateToProps = ({ posts }) => {
	return {
		posts
	}
}

export default connect(mapStateToProps)(Home)