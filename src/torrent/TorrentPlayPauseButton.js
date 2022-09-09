import React from 'react'

/**
 * TorrentPlayPauseButton: button to play or pause torrent
 * props: torrentStatus (int)
 *        inProgress (boolean)
 *        toggle (function)
 */
 class TorrentPlayPauseButton extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    toggle(e) {
        this.props.toggle();
    }

    render() {
        let torrentStatus = this.props.torrentStatus;
        let inProgress = false
        if (torrentStatus === 0) {
            // 0: stopped, 
            inProgress = false;
        }
        if (torrentStatus === 1 || torrentStatus === 2 || torrentStatus === 3 ||
            torrentStatus === 4 || torrentStatus === 5 || torrentStatus === 6) {
            // 1: queued to verify local data, 2: verifying local data, 3: queued to download
            // 4: downloading, 5: queued to seed, 6: seeding
            inProgress = true;
        }

        return (
            <div>
                <button className='torrent-play-pause-button' onClick={this.toggle}>
                    {inProgress ? 
                    <i className="bi bi-pause"></i> :
                    <i className="bi bi-play"></i>}
                </button>
            </div>
        )
    }
}

export default TorrentPlayPauseButton;