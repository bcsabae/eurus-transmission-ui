import React from 'react'

/**
 * SortByPropertyButton: button to sort torrents by name
 * props: text (string)
 *        value (string)
 *        isActive (boolean)
 *        onClick (function)
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