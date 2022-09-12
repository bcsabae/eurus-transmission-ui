import React from 'react'

/**
 * TorrentName: text displaying torrent's name
 * props: name (string): name of the torrent
 */
 class TorrentName extends React.Component {
    render() {
        return (
            <div className='torrent-name'>
                {this.props.name}
            </div>
        )
    }
}

export default TorrentName;