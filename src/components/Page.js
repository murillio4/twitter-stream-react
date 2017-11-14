import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet/Tweet'

const mapStateToProps = (state = {}) => {
	return { ...state.tweet };
};


/**
 * Renders main content(Tweets)
 */
class Page extends Component {
	state = {
		timer: null,
		shouldUpdate: true
	}
	
	componentDidMount = () => {
    let timer = setInterval(this.chunkUpdate, 2000)
    this.setState({timer})
	}
	
	componentWillUnmount = () => {
    this.clearInterval(this.state.timer)
	}
	
	chunkUpdate = () => {
    this.setState({
      shouldUpdate: true
    });
	}
	
	shouldComponentUpdate = (nextProps, nextState) => {
		if(nextState.shouldUpdate === true)
			return true
		return false
	}

	componentDidUpdate = (prevProps, prevState) => {
		this.setState({
      shouldUpdate: false
    });
	}

	render() {
		const { new_tweets } = this.props

		return (
			<ol style={{ width: "588px", listStyle: "none", listStylePosition: "inside", margin: "auto" }}>
				{new_tweets.map((tweet, index) =>
					<li key={tweet.id}>
						<Tweet data={tweet} />
					</li>
				)}
			</ol>
		)
	}
}

export default connect(mapStateToProps)(Page)