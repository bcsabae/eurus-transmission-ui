import React from 'react'

/**
 * FilterByStatusButton: button to show filter
 * props: text (string): text to display
 *        value (string): filtering key
 *        isActive (boolean): whether the filter is active or not
 *        onClick (function): function to call on toggle
 */
 class FilterByStatusButton extends React.Component {
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
                <button className={classes} onClick={this.handleChange} value={this.props.value}>
                    {this.props.text}
                </button>
            </div>
        )
    }
}

export default FilterByStatusButton;