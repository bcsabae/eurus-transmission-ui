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
        return (
            <div className='torrent-box'>
                <div className='torrent-box-left'>
                    <TorrentPlayPauseButton torrentStatus={this.props.status} toggle={this.toggle}/>
                </div>
                <div className='torrent-box-right'>
                    <div className='torrent-box-top'>
                        <TorrentName name={this.props.name}/>
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