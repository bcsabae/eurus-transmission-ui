import React from "react";

/**
 * WarningBox: popup box to show warnings and errors
 * props: message (string): message to display
 */
class WarningBox extends React.Component {
    close() {
        let div = document.getElementById("warningBox");
        div.className = "warning-box-hidden";
    }

    render() {
        if (this.props.message) {
            setInterval(this.close, 3000);
        }
        return (
            <div id="warningBox"
                 className={this.props.message ? "warning-box": "warning-box-hidden"} 
                 onClick={this.close}>
                <div className="warning-text">
                    {this.props.message}
                </div>
            </div>
        )
    }
}

export default WarningBox;