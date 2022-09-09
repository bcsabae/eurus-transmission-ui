import React from 'react'

/**
 * TorrentSpeed: downloading speed of a torrent
 * props: speed (int) [Bytes/sec]
 */
 class TorrentSpeed extends React.Component {
    render() {
        return (
            <div className='torrent-speed'>
                {(this.props.speed / 1024 / 1024).toPrecision(2)} MBps
            </div>
        )
    }
}

export default TorrentSpeed;