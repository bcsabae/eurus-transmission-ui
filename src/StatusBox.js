import React from "react";

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