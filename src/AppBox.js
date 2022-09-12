import React from 'react'
import UIHeader from './header/UIHeader'
import AllTorrentsBox from './torrent/AllTorrentsBox';
import WarningBox from './WarningBox';
import StatusBox from './StatusBox';
import axios from 'axios'


/**
 * AppBox: main component to hold all others
 * callbacks:
 *   fitlering:
 *     changeFilterKey
 *     changeSortKey
 *   torrents:
 *     toggleTorrent
 *     deleteTorrent
 *     getTorrents
 *   configuration:
 *     changeServerAddress
 *     changeDefaultDownloadLocation
 *     fetchConfig
 *     setConfigServerAddress
 *     setConfigDefaultDownloadDir
 *   updating:
 *     refresh
 *     periodicUpdate
 *     periodicHealthCheck
 *   API connection:
 *     onApiSuccess
 *     onApiError
 *     onRequestError
 * 
 * state:
 *   filtering:
 *     filterKey
 *     sortKey
 *     sortIsAscending
 *   torrents:
 *     allTorrents
 *     torrentsToShow
 *   configuration:
 *     serverAddress
 *     defaultDownloadLocation
 *   updating:
 *     connected
 *   API connection:
 *     errorMessage
 * 
 * other properties:
 *   serverAddressUpdateTimer
 *   defaultDownloadDirUpdateTimer
 */
class AppBox extends React.Component {
    constructor(props) {
        super(props);

        // filtering
        this.changeFilterKey = this.changeFilterKey.bind(this);
        this.changeSortKey = this.changeSortKey.bind(this);

        // torrents
        this.toggleTorrent = this.toggleTorrent.bind(this);
        this.deleteTorrent = this.deleteTorrent.bind(this);
        this.getTorrents = this.getTorrents.bind(this);

        // configuration
        this.changeServerAddress = this.changeServerAddress.bind(this);
        this.changeDefaultDownloadLocation = this.changeDefaultDownloadLocation.bind(this);
        this.fetchConfig = this.fetchConfig.bind(this);
        this.setConfigServerAddress = this.setConfigServerAddress.bind(this);
        this.setConfigDefaultDownloadDir = this.setConfigDefaultDownloadDir.bind(this);

        // updating
        this.refresh = this.refresh.bind(this);
        this.periodicUpdate = this.periodicUpdate.bind(this);
        this.periodicHealthCheck = this.periodicHealthCheck.bind(this);

        // API connection
        this.onApiSuccess = this.onApiSuccess.bind(this);
        this.onApiError = this.onApiError.bind(this);
        this.onRequestError = this.onRequestError.bind(this);

        this.state = {
            filterKey: 'all',
            sortKey: 'date',
            sortIsAscending: true,
            allTorrents: [],
            torrentsToShow: [],
            serverAddress: 'http://127.0.0.1:3001/',
            defaultDownloadLocation: '/opt/transmission/download',
            connected: true,
            errorMessage: ""
        };

        // timers to handle input debounce
        this.serverAddressUpdateTimer = null;
        this.defaultDownloadDirUpdateTimer = null;
    }



    /* Filtering and sorting functions */

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
                    t.status === 6
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



    /* Torrents related functions */

    toggleTorrent(torrentId) {
        let torrent = [];
        let torrent_idx = 0
        for (torrent_idx = 0; torrent_idx < this.state.allTorrents.length; torrent_idx++) {
            torrent = this.state.allTorrents[torrent_idx];
            if (torrent.id === torrentId) {
                break;
            }
        }
        let toggle_function = ''
        if (torrent.status === 0) toggle_function = "start"
        else toggle_function = "stop"

        axios.get('/torrents/'.concat(torrentId.toString()).concat('/').concat(toggle_function))
        .then((response) => {
            if (response.data.status !== "success") this.onApiError(response.data);
            else {
                this.onApiSuccess(response);
                let updated_torrent = response.data.data;
                this.setState(function(state, props) {
                    let allTorrents = state.allTorrents;
                    allTorrents[torrent_idx] = updated_torrent;
                    return {
                        allTorrents: allTorrents
                    };
                });
            }
        })
        .catch((error) => {
            this.onRequestError(error);
        });
    }


    deleteTorrent(torrentId) {
        axios.get('/torrents/'.concat(torrentId.toString()).concat('/').concat('delete'))
        .then((response) => {
            if (response.data.status !== "success") this.onApiError(response.data);
            else {
                this.onApiSuccess(response);
                let torrent = this.state.allTorrents.find((torrent) => {
                    return (torrent.id === torrentId);
                });
                let torrent_idx = this.state.allTorrents.indexOf(torrent);
                if (torrent_idx >= 0) {
                    this.setState((state, props) => {
                        let oldTorrents = state.allTorrents;
                        return {
                            allTorrents: oldTorrents.splice(torrent_idx, 1)
                        }
                    })
                }
            }
        })
        .catch((error) => {
            this.onRequestError(error);
        });
    }


    getTorrents() {
        axios.get('/torrents'
        ).then((response => {
            if (response.data["status"] !== "success") {
                this.onApiError(response.data);
            }
            this.onApiSuccess(response);
            let torrents = response.data.data
            this.setState({allTorrents: torrents});
            this.setState(this.filterTorrents);
            this.setState(this.sortTorrents);
        })).catch((error) => {
                this.onRequestError(error);
            }
        );
    }



    /* App configuration related functions */

    changeServerAddress(address) {
        this.setState({serverAddress: address});
        if (this.serverAddressUpdateTimer !== null) {
            clearTimeout(this.serverAddressUpdateTimer);
        }
        this.serverAddressUpdateTimer = setTimeout(this.setConfigServerAddress, 1000);
    }


    changeDefaultDownloadLocation(location) {
        this.setState({defaultDownloadLocation: location});
        if (this.defaultDownloadDirUpdateTimer !== null) {
            clearTimeout(this.defaultDownloadDirUpdateTimer);
        }
        this.defaultDownloadDirUpdateTimer = setTimeout(this.setConfigDefaultDownloadDir, 1000);
    }


    fetchConfig() {
        axios.get('/config')
        .then((response) => {
            if (response.data.status !== "success") this.onApiError(response.data);
            else {
                this.onApiSuccess(response);
                this.setState({
                    serverAddress: response.data.data.server_address,
                    defaultDownloadLocation: response.data.data.default_download_dir
                });
            }
        })
        .catch((error) => {
            this.onRequestError(error);
        });
    }


    setConfigServerAddress() {
        clearTimeout(this.serverAddressUpdateTimer);
        this.serverAddressUpdateTimer = null;

        let postData = {
            server_address : this.state.serverAddress
        }

        axios.post('/config', postData)
        .then((response) => {
            if (response.data.status !== "success") this.onApiError(response.data);
            else {
                this.onApiSuccess(response);
                this.setState({serverAddress: response.data.data.server_address});
            }
        })
        .catch((error) => {
            this.onRequestError(error);
        });
    }


    setConfigDefaultDownloadDir() {
        clearTimeout(this.serverAddressUpdateTimer);
        this.serverAddressUpdateTimer = null;

        let postData = {
            default_download_dir : this.state.defaultDownloadLocation
        }

        axios.post('/config', postData)
        .then((response) => {
            if (response.data.status !== "success") this.onApiError(response.data);
            else {
                this.onApiSuccess(response);
                this.setState({defaultDownloadLocation: response.data.data.default_download_dir});
            }
        })
        .catch((error) => {
            this.onRequestError(error);
        });
    }



    /* Updating and maintaining application state */

    refresh() {
        if (this.state.connected) {
            this.getTorrents();
        }
    }

    periodicUpdate() {
        if (this.state.connected) {
            this.getTorrents();
        }
    }

    periodicHealthCheck() {
        if (this.state.connected) {
            return;
        }
        axios.get('/status')
        .then((response) => {
            if (response.data.status === "success") {
                this.onApiSuccess(response);
                this.setState({connected: true})
            }
        }).catch((error) => {
            this.setState({connected: false})
        })
    }

    

    /* API connection success and error handling */

    onApiError(resp) {
        let detailed = "";

        switch (resp.status) {
            case "not connected":
                detailed = "API cannot connect to torrent server"
                break;
            default:
                detailed = "ERROR: ".concat(resp.data.status);
        }

        this.setState({errorMessage: detailed})
    }

    onApiSuccess(resp) {
        this.setState({connected: true});
    }

    onRequestError(error) {
        this.setState({connected: false});
    }



    /* Lifecycle methods */

    componentDidMount() {
        axios.defaults.baseURL = this.state.serverAddress;
        axios.defaults.headers.common["access-control-allow-origin"] = this.state.serverAddress;
        
        setInterval(this.periodicUpdate, 100000);
        setInterval(this.periodicHealthCheck, 500000);
        this.refresh();

        setTimeout(this.fetchConfig, 1000);
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
                                deleteTorrent={this.deleteTorrent}
                                defaultDownloadLocation={this.state.defaultDownloadLocation}
                                onApiSuccess={this.onApiSuccess}
                                onApiError={this.onApiError}
                                onRequestError={this.onRequestError}
                                />
                <WarningBox message={this.state.errorMessage} />
                <StatusBox connected={this.state.connected}
                           onRefresh={this.refresh} 
                           />
            </div>
        )
    }
}

export default AppBox;