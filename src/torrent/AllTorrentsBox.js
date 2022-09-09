import React from 'react'
import AddNewTorrent from './AddNewTorrent'
import TorrentBox from './TorrentBox';

/**
 * AllTorrentsBox: box containing all torrents
 */
 class AllTorrentsBox extends React.Component {
    constructor(props) {
        super(props);
        this.toggleTorrent = this.toggleTorrent.bind(this);
    }

    toggleTorrent(torrentId) {
        this.props.toggleTorrent(torrentId);
    }

    render() {
        const torrents = this.props.torrentsToShow;
        const listTorrentBoxes = torrents.map((torrent) =>
            <TorrentBox
                key={torrent.id.toString()}
                name={torrent.name}
                downloadDir={torrent.downloadDir}
                isFinished={torrent.isFinished}
                percentDone={torrent.percentDone}
                id={torrent.id}
                rateDownload={torrent.rateDownload}
                sizeWhenDone={torrent.sizeWhenDone}
                status={torrent.status}
                toggleTorrent={this.toggleTorrent}
            />
        )
        return (
            <div className='all-torrents-box'>
                <AddNewTorrent defaultDownloadLocation={this.props.defaultDownloadLocation}/>
                {listTorrentBoxes}
            </div>
        )
    }
}

export default AllTorrentsBox