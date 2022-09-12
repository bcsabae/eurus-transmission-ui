import React from "react";

/**
 * StatusBox: box to show status and refresh button
 * props: onRefresh (function): function to call when refresh button is pressed
 *        connected (bool): if the connection to the API server is active 
 */
class StatusBox extends React.Component {
    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
    }

    refresh() {
        this.props.onRefresh();
    }

    render () {
        return (
            <div className="status-box">
                <div className="status-box-status">
                    <div className={this.props.connected ? "status-box-online" : "status-box-offline"}>
                        {this.props.connected ? "connected" : "disconnected"}
                    </div>
                </div>
                <div className="status-box-refresh" onClick={this.refresh}>
                    <i class="bi bi-arrow-clockwise"></i>
                </div>
            </div>
        )
    }
}

export default StatusBox;