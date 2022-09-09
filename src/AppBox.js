import React from 'react'
import UIHeader from './header/UIHeader'
import AllTorrentsBox from './torrent/AllTorrentsBox';

// testing request responses
const torrents = [
    {
        'downloadDir': '/opt/transmission-daemon/torrents/download',
        'isFinished': false,
        'name': 'A Torrent in progress',
        'percentDone': 0.4,
        'id': 123456,
        'rateDownload': 3000000,
        'sizeWhenDone': 1024000000,
        'status': 5 // downloading 
    },
    {
        'downloadDir': '/opt/transmission-daemon/torrents/download',
        'isFinished': true,
        'name': 'B Torrent that is finished and seeding',
        'percentDone': 1,
        'id': 54321,
        'rateDownload': 1000000,
        'sizeWhenDone': 4100000,
        'status': 6 // seeding 
    },
    {
        'downloadDir': '/opt/transmission-daemon/torrents/download',
        'isFinished': false,
        'name': 'C Torrent that is stopped',
        'percentDone': 0.9,
        'id': 184728,
        'rateDownload': 1000000,
        'sizeWhenDone': 5200000,
        'status': 0 // stopped 
    },
    {
        'downloadDir': '/opt/transmission-daemon/torrents/download',
        'isFinished': true,
        'name': 'D Another finished torrent',
        'percentDone': 1,
        'id': 592759,
        'rateDownload': 1000000,
        'sizeWhenDone': 6300000,
        'status': 6 // seeding 
    }
];



/**
 * AppBox: main component to hold all others
 */
class AppBox extends React.Component {
    constructor(props) {
        super(props);
        this.changeFilterKey = this.changeFilterKey.bind(this);
        this.changeSortKey = this.changeSortKey.bind(this);
        this.changeServerAddress = this.changeServerAddress.bind(this);
        this.changeDefaultDownloadLocation = this.changeDefaultDownloadLocation.bind(this);
        this.toggleTorrent = this.toggleTorrent.bind(this);
        this.state = {
            filterKey: 'all',
            sortKey: 'date',
            sortIsAscending: true,
            allTorrents: torrents,
            torrentsToShow: torrents,
            serverAddress: '127.0.0.1:8080',
            defaultDownloadLocation: '/opt/transmission/download'
        };
    }

    filterTorrents(state, props) {
        let newTorrentsToShow;

        switch (state.filterKey) {
            case 'all':
                newTorrentsToShow = state.allTorrents;
                break;
            case 'downloading':
                newTorrentsToShow = state.allTorrents.filter( t => 
                        t.status !== 0 &&
                        t.status !== 6
                    );
                break;
            case 'finished':
                newTorrentsToShow = state.allTorrents.filter( t => 
                    t.isFinished === true
                );
                break;
            default:
                newTorrentsToShow = state.allTorrents;
        }

        return {torrentsToShow: newTorrentsToShow};
    }

    sortTorrents(state, props) {
        let torrentsInNewOrder;

        switch (state.sortKey) {
            case 'name':
                torrentsInNewOrder = state.torrentsToShow.sort((a, b) => {
                    return state.sortIsAscending ? 
                    (a.name > b.name ? 1 : -1) :
                    (a.name > b.name ? -1 : 1)
                });
                break;
            case 'size':
                torrentsInNewOrder = state.torrentsToShow.sort((a, b) => {
                    return state.sortIsAscending ?
                    (a.sizeWhenDone - b.sizeWhenDone) :
                    (b.sizeWhenDone - a.sizeWhenDone)
                });
                break;
            default:
                torrentsInNewOrder = state.torrentsToShow;
        }

        return {torrentsToShow: torrentsInNewOrder};
    }

    changeFilterKey(newKey) {
        this.setState({filterKey: newKey})
        this.setState(this.filterTorrents);
        this.setState(this.sortTorrents)
    }

    changeSortKey(newKey) {
        if (this.state.sortKey === newKey) {
            this.setState((state, props) => {
                state.sortIsAscending = !state.sortIsAscending;
            });
        }
        else {
            this.setState({
                sortIsAscending: true,
                sortKey: newKey
            });
        }
        this.setState(this.sortTorrents);
    }

    changeServerAddress(address) {
        this.setState({serverAddress: address});
    }

    changeDefaultDownloadLocation(location) {
        this.setState({defaultDownloadLocation: location});
    }

    toggleTorrent(torrentId) {
        for(let i = 0; i < this.state.allTorrents.length; i++) {
            if (this.state.allTorrents[i].id == torrentId) {
                // offline simulation
                let allTorrents = torrents;
                let torrent = allTorrents[i];
                switch (torrent.status) {
                    case 0:
                        torrent.status = 5;
                        break;
                    default:
                        torrent.status = 0;
                }
                allTorrents[i] = torrent;
                this.setState({allTorrents: allTorrents});
                this.setState(this.filterTorrents);
                break;
            }
        }
    }

    render() {
        return (
            <div className='app-box'>
                <UIHeader sortKey={this.state.sortKey} 
                          changeSortKey={this.changeSortKey} 
                          filterKey={this.state.filterKey} 
                          changeFilterKey={this.changeFilterKey}
                          changeServerAddress={this.changeServerAddress} 
                          serverAddress={this.state.serverAddress}
                          defaultDownloadLocation={this.state.defaultDownloadLocation}
                          changeDefaultDownloadLocation={this.changeDefaultDownloadLocation}
                          />
                <AllTorrentsBox torrentsToShow={this.state.torrentsToShow}
                                toggleTorrent={this.toggleTorrent}
                                defaultDownloadLocation={this.state.defaultDownloadLocation}
                                />
            </div>
        )
    }
}

export default AppBox;