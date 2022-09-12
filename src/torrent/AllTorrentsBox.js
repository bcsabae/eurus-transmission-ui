import React from 'react'
import AddNewTorrent from './AddNewTorrent'
import TorrentBox from './TorrentBox';

/**
 * AllTorrentsBox: box containing all torrents and add new torrent form (via a button)
 * props: toggleTorrent (function): function to call when a torrent is resumed/paused
 *        deleteTorrent (function): function to call when a torrent is deleted
 *        torrentsToShow (array): array containing torrents that match current filters and need to be rendered
 *        defaultDownloadLocation (string): default download location
 *        onApiSuccess (function): function to call on a successful API call
 *        onApiError (function): function to call on a failed API call
 *        onRequestError (function): function to call on a failed request to the API server
 */
 class AllTorrentsBox extends React.Component {
    constructor(props) {
        super(props);
        this.toggleTorrent = this.toggleTorrent.bind(this);
        this.deleteTorrent = this.deleteTorrent.bind(this);
    }

    toggleTorrent(torrentId) {
        this.props.toggleTorrent(torrentId);
    }

    deleteTorrent(torrentId) {
        this.props.deleteTorrent(torrentId);
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
                deleteTorrent={this.deleteTorrent}
            />
        )
        return (
            <div className='all-torrents-box'>
                <AddNewTorrent defaultDownloadLocation={this.props.defaultDownloadLocation}
                               onApiSuccess={this.props.onApiSuccess}
                               onApiError={this.props.onApiError}
                               onRequestError={this.props.onRequestError} />
                {listTorrentBoxes}
            </div>
        )
    }
}

export default AllTorrentsBox