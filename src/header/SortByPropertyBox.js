import React from 'react'
import SortByPropertyButton from './SortByPropertyButton'

/**
 * SortByPropertyBox: box to hold buttons for sorting torrents
 * props: sortKey (string): current active sorting key
 *        changeKey (function): function to call on selection of a filter
 */
class SortByPropertyBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectFilter = this.handleSelectFilter.bind(this);
    }

    handleSelectFilter(which) {
        this.props.changeKey(which);
    }

    render() {
        return (
            <div className='sort-by-property-box'>
                sort by:
                <SortByPropertyButton text='Name' value='name' isActive={this.props.sortKey === 'name'} onClick={this.handleSelectFilter}/>
                <SortByPropertyButton text='Size' value='size' isActive={this.props.sortKey === 'size'} onClick={this.handleSelectFilter}/>
                <SortByPropertyButton text='Date added' value='date' isActive={this.props.sortKey === 'date'} onClick={this.handleSelectFilter}/>
            </div>
        )
    }
}

export default SortByPropertyBox;