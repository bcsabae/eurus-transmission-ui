import React from 'react'

/**
 * AddNewTorrent: button and modal to add a new torrent (i.e. TorrentBox)
 */
 class AddNewTorrent extends React.Component {
    closeNewTorrentModal() {
        document.getElementById("new-torrent-modal").style.display = "none";
    }

    openNewTorrentModal() {
        document.getElementById("new-torrent-modal").style.display = "block";
    }

    render() {
        return (
            <div>
                <div className='add-new-button-container'>
                    <button className='add-new-button' onClick={this.openNewTorrentModal}>+</button>
                </div>
                <div id='new-torrent-modal' className='new-torrent-modal-bg'>
                    <div className='new-torrent-modal-box'>
                        <div className='new-torrent-modal-header'>
                            <div className="new-torrent-close-button">
                                <i className="bi bi-x" onClick={this.closeNewTorrentModal}></i>
                            </div>
                            <p>Add new torrent</p>
                        </div>
                        <form className='form'>
                            <div className='form-row'>
                                <label className='form-label'>Download location:</label>
                                <input className='form-input' type='text' name='download-location' value={this.props.defaultDownloadLocation}/>
                            </div>
                            <div className='form-row'>
                                <label className='form-label'>Torrent file:</label>
                                <input type='file' name='new-torrent-file'/>
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