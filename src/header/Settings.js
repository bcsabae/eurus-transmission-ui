import React from "react";

/**
 * Settings: settings window - this can set server address and default download directory. The settings are states that are passed up and
 * handled by the root component.
 * props: changeServerAddress (function): function to call when changing server address
 *        changeDefaultDownloadLocation (function): function to call on changing download location
 *        serverAddress (string): current server address
 *        defaultDownloadLocation (string): current default download directory
 */
class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.handleServerAddressInput = this.handleServerAddressInput.bind(this);
        this.handleDefaultDownloadLocationInput = this.handleDefaultDownloadLocationInput.bind(this);
    }

    handleServerAddressInput(e) {
        this.props.changeServerAddress(e.target.value);
    }

    handleDefaultDownloadLocationInput(e) {
        this.props.changeDefaultDownloadLocation(e.target.value);
    }

    openSettings() {
        document.getElementById("settings").style.width = "40vw";
        document.getElementById("settings").style.left = "60vw";
    }

    closeSettings() {
        document.getElementById("settings").style.width = "0";
        document.getElementById("settings").style.left = "100vw";
    }

    render() {
        return (
            <div>
                <div className="settings-button">
                    <i className="bi bi-sliders2" onClick={this.openSettings}></i>
                </div>
                <div id="settings" className="settings">
                    <div className="settings-close-button">
                        <i className="bi bi-x" onClick={this.closeSettings}></i>
                    </div>
                    <form className="form">
                        <div className="form-row">
                            <label className="form-label">Server address: </label>
                            <input className='form-input' 
                                type='text' 
                                name='serverAddress' 
                                onChange={this.handleServerAddressInput}
                                value={this.props.serverAddress} />
                        </div>
                        <div className="form-row">
                            <label className="form-label">Default download location: </label>
                            <input className='form-input' 
                                type='text' 
                                name='defaultDownloadLocation' 
                                onChange={this.handleDefaultDownloadLocationInput}
                                value={this.props.defaultDownloadLocation} />
                    </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Settings;