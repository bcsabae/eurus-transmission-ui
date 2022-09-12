import React from 'react'
import FilterByStatusButton from './FilterByStatusButton'

/**
 * FilterByStatusBox: box containing filters to show all, downloading or finished torrents
 * props: filterKey (string): current active filtering key
 *        handleSelectFilter (function): function to call on selection of a filter
 */
 class FilterByStatusBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectFilter = this.handleSelectFilter.bind(this);
    }

    handleSelectFilter(which) {
        this.props.changeKey(which);
    }

    render() {
        return (
            <div className='sort-by-status-box'>
                show:
                <FilterByStatusButton text='All' value='all' isActive={this.props.filterKey === 'all'} onClick={this.handleSelectFilter}/>
                <FilterByStatusButton text='Downloading' value='downloading' isActive={this.props.filterKey === 'downloading'} onClick={this.handleSelectFilter}/>
                <FilterByStatusButton text='Finished' value='finished' isActive={this.props.filterKey === 'finished'} onClick={this.handleSelectFilter}/>
            </div>
        )
    }
}

export default FilterByStatusBox;