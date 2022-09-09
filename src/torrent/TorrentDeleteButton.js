import React from 'react'

/**
 * TorrentDeleteButton: button to delete torrent
 * props: torrentId
 */
 class TorrentDeleteButton extends React.Component {
    render() {
        return (
            <div className='torrent-delete-button'>
                <i className="bi bi-x"></i>
            </div>
        )
    }
}

export default TorrentDeleteButton;