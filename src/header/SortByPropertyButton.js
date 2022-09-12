import React from 'react'

/**
 * SortByPropertyButton: button to sort torrents by name
 * props: text (string): text to display
 *        value (string): filtering key
 *        isActive (boolean): whether the filter is active or not
 *        onClick (function): function to call on toggle
 */
 class SortByPropertyButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onClick(e.target.value);
    }

    render() {
        let classes = (this.props.isActive ? 'filter-button-active' : 'filter-button-inactive');

        return (
            <div>
                <button className={classes} value={this.props.value} onClick={this.handleChange}>
                    {this.props.text}
                </button>
            </div>
        )
    }
}

export default SortByPropertyButton;