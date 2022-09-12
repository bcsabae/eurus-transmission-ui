import React from 'react'

/**
 * TorrentProgressBar: progress bar for downloading or verifying a torrent
 * props: progress (float): current progress
 */
 class TorrentProgressBar extends React.Component {
    render() {
        let inlineStyle = {
            width : (this.props.progress).toString().concat("%")
        };

        return (
            <div className='torrent-progress-container'>
                <div className='torrent-progress-percentage'>
                    {this.props.progress}%
                </div>
                <div className='torrent-progress-bar' style={inlineStyle}>
                    .
                </div>
            </div>
        )
    }
}

export default TorrentProgressBar;