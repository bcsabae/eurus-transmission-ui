import React from 'react'

/**
 * TorrentDeleteButton: button to delete torrent
 * props: onDelete (function): function to call when button is clicked 
 */
 class TorrentDeleteButton extends React.Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete() {
        this.props.onDelete()
    }

    render() {
        return (
            <div className='torrent-delete-button' onClick={this.delete}>
                <i className="bi bi-x"></i>
            </div>
        )
    }
}

export default TorrentDeleteButton;