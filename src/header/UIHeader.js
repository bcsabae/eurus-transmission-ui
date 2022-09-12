import React from 'react'
import FilterByStatusBox from './FilterByStatusBox'
import SortByPropertyBox from './SortByPropertyBox'
import Settings from './Settings';

/**
 * UI Header: header holding interactive UI elements for sorting and filtering, as well as the settings window
 * props: sortKey (string): active key for sorting
 *        filterKey (string): active key for filtering
 *        changeSortKey (function): function to call on a changed sort key
 *        changeFilterKey (function): function to call on a changed filter key
 *        changeServerAddress (function): function to call on a changed server address
 *        changeDefaultDownloadLocation (function): function to call on a changed default download location
 *        serverAddress (string): current server address
 *        defaultDownloadLocation (string): current default download location
 */
 class UIHeader extends React.Component {
    constructor(props) {
        super(props);
        this.changeSortKey = this.changeSortKey.bind(this);
        this.changeFilterKey = this.changeFilterKey.bind(this);
        this.changeServerAddress = this.changeServerAddress.bind(this);
        this.changeDefaultDownloadLocation = this.changeDefaultDownloadLocation.bind(this);
    }

    changeFilterKey(key) {
        this.props.changeFilterKey(key);
    }

    changeSortKey(key) {
        this.props.changeSortKey(key)
    }

    changeServerAddress(address) {
        this.props.changeServerAddress(address);
    }

    changeDefaultDownloadLocation(location) {
        this.props.changeDefaultDownloadLocation(location);
    }

    render() {
        return (
            <div className='ui-header'>
                <div className='ui-header-left'>
                    <FilterByStatusBox filterKey={this.props.filterKey} changeKey={this.changeFilterKey}/>
                </div>
                <div className='ui-header-right'>
                    <SortByPropertyBox sortKey={this.props.sortKey} changeKey={this.changeSortKey}/>
                    <Settings changeServerAddress={this.changeServerAddress} 
                              serverAddress={this.props.serverAddress}
                              changeDefaultDownloadLocation={this.changeDefaultDownloadLocation}
                              defaultDownloadLocation={this.props.defaultDownloadLocation} />
                </div>
            </div> 
        )
    }
}

export default UIHeader;