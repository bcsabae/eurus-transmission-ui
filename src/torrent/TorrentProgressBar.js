import React from 'react'

/**
 * TorrentProgressBar: progress bar for a downloading torrent
 * props: progress (float)
 */
 class TorrentProgressBar extends React.Component {
    render() {
        let inlineStyle = {
            width : (this.props.progress*100).toString().concat("%")
        };

        return (
            <div className='torrent-progress-container'>
                <div className='torrent-progress-percentage'>
                    {this.props.progress}%
                </div>
                <div className='torrent-progress-bar' style={inlineStyle}>
                    itt
                </div>
            </div>
        )
    }
}

export default TorrentProgressBar;