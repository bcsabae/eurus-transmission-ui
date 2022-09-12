import React from 'react'
import TorrentPlayPauseButton from './TorrentPlayPauseButton'
import TorrentName from './TorrentName'
import TorrentLocation from './TorrentLocation'
import TorrentProgressBar from './TorrentProgressBar'
import TorrentSpeed from './TorrentSpeed'
import TorrentSize from './TorrentSize'
import TorrentDeleteButton from './TorrentDeleteButton'

/**
 * TorrentBox: containing box of a torrent
 * props: toggleTorrent (function): function to call when a torrent is resumed/paused
 *        deleteTorrent (function): function to call when a torrent is deleted
 *        status (int): status of the torrent (see RPC specification)
 *        name (string): name of the torrent
 *        downloadDir (string): path where the torrent is downloading
 *        id (int): ID of the torrent on the remote server
 *        percentDone (float): how much of the data is downloaded (0..1)
 *        rateDownload (int): downloading rate in bytes/second
 *        sizeWhenDone (int): total size in bytes
 */
 class TorrentBox extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.delete = this.delete.bind(this);
    }

    toggle() {
        this.props.toggleTorrent(this.props.id);
    }

    delete() {
        this.props.deleteTorrent(this.props.id);
    }

    render() {
        let nameToShow;

        // see RPC spec.
        switch (this.props.status) {
            case 1:
            case 2:
                nameToShow = this.props.name.concat(" - verifying local data");
                break;
            default:
                nameToShow = this.props.name
                break;
        }

        return (
            <div className='torrent-box'>
                <div className='torrent-box-left'>
                    <TorrentPlayPauseButton torrentStatus={this.props.status} toggle={this.toggle}/>
                </div>
                <div className='torrent-box-right'>
                    <div className='torrent-box-top'>
                        <TorrentName name={nameToShow}/>
                        <div className='torrent-box-top-right'>
                            <TorrentLocation location={this.props.downloadDir}/>
                            <TorrentDeleteButton torrentId={this.props.id} onDelete={this.delete}/>
                        </div>
                    </div>
                    <div className='torrent-box-middle'>
                        <TorrentProgressBar progress={this.props.percentDone}/>
                    </div>
                    <div className='torrent-box-bottom'>               
                        <TorrentSpeed speed={this.props.rateDownload}/>
                        <TorrentSize downloadedSize={this.props.sizeWhenDone*this.props.percentDone/100} totalSize={this.props.sizeWhenDone}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default TorrentBox;