import React from 'react'

/**
 * TorrentSize: text displaying downloaded and total size of a torrent
 * props: downloadedSize (int) [Bytes]
 *        totalSize (int) [Bytes]
 */
 class TorrentSize extends React.Component {
    render() {
        return (
            <div className='torrent-size'>
                {(this.props.downloadedSize / 1024 / 1024).toPrecision(2)} / {(this.props.totalSize / 1024 / 1024).toPrecision(2)} MB
            </div>
        )
    }
}

export default TorrentSize;