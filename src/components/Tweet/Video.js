import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles'
import ReactPlayer from 'react-player'

class Video extends React.Component {
  render () {
    let {media, gif} = this.props, videoSrc = ''

    media[0].video_info.variants.forEach( v => {
      if (v.url.indexOf('.mp4') > -1) {
        videoSrc = v.url
      }
    })
    
    styles.video.display = "inline"

    let VideoComponent = (
        <ReactPlayer url={videoSrc} controls={!gif} autoPlay={gif} loop={gif} style={styles.video}>
          {'Your browser does not support the '}<code>{'video '}</code>{'element.'}
        </ReactPlayer>
      )

    return (
      <div className="AdaptiveMedia" style={styles.AdaptiveMedia}>
        {VideoComponent}
        {gif ?
          <div className="AdaptiveMedia-badge" style={styles.AdaptiveMediaBadge}>
            GIF
          </div> : null}
      </div>
    )
  }
}

Video.propTypes = {
  'media': PropTypes.array,
  'gif': PropTypes.bool
}

Video.defaultProps = {
  'media': [],
  'gif': false
}

Video.displayName = 'Video'

export default Video
