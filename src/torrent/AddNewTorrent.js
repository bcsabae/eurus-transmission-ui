import React from 'react'
import axios from 'axios'

/**
 * AddNewTorrent: button and modal to add a new torrent (i.e. TorrentBox)
 */
 class AddNewTorrent extends React.Component {
    constructor(props) {
        super(props);
        this.handlePathChange = this.handlePathChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInputRef = React.createRef();
        this.downloadPath = this.props.defaultDownloadLocation
    }

    closeNewTorrentModal() {
        document.getElementById("new-torrent-modal").style.display = "none";
    }

    openNewTorrentModal() {
        document.getElementById("new-torrent-modal").style.display = "block";
    }

    handlePathChange(event) {
        console.log('path was changed to '.concat(event.target.value))
        this.downloadPath = event.target.value;
    }

    handleSubmit(event) {
        let dataToSend = {
            path: this.downloadPath,
            file: this.fileInputRef.current.files[0]
        };
        event.preventDefault();
        let data = new FormData();
        data.append('file', dataToSend.file);
        data.append('path', dataToSend.path);
        axios.post('/torrents/new', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            if (response.data.status === 'success') {
                this.props.onApiSuccess(response);
            }
            else {
                this.props.onApiError(response);
            }
        })
        .catch((error) => {
            this.props.onRequestError(error);
        })
        this.closeNewTorrentModal();
    }

    componentDidUpdate(prevState, prevProps) {
        document.getElementById('add-new-torrent-location-input').value = this.props.defaultDownloadLocation;
    }

    render() {
        return (
            <div>
                <div className='add-new-button-container' onClick={this.openNewTorrentModal}>
                    <button className='add-new-button'>+</button>
                </div>
                <div id='new-torrent-modal' className='new-torrent-modal-bg'>
                    <div className='new-torrent-modal-box'>
                        <div className='new-torrent-modal-header'>
                            <div className="new-torrent-close-button">
                                <i className="bi bi-x" onClick={this.closeNewTorrentModal}></i>
                            </div>
                            <p>Add new torrent</p>
                        </div>
                        <form className='form' onSubmit={this.handleSubmit}>
                            <div className='form-row'>
                                <label className='form-label'>Download location:</label>
                                <input className='form-input' type='text' name='download-location' id='add-new-torrent-location-input'
                                       defaultValue={this.props.defaultDownloadLocation}
                                       onChange={this.handlePathChange}/>
                            </div>
                            <div className='form-row'>
                                <label className='form-label'>Torrent file:</label>
                                <input type='file' name='new-torrent-file' ref={this.fileInputRef}/>
                            </div>
                            <div className='form-row'>
                                <div className='align-right'>
                                    <button className='form-button'>Upload</button>
                                </div>  
                            </div>
                        </form>
                    </div>
                </div>
            </div>      
        )
    }
}

export default AddNewTorrent;