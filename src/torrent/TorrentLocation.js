import React from 'react'

/**
 * TorrentLocation: download location of torrent
 * props: location (string)
 */
 class TorrentLocation extends React.Component {
    render() {
        return (
            <div className='torrent-location'>
                {this.props.location}
            </div>
        )
    }
}

export default TorrentLocation;