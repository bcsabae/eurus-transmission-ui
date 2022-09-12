import React from 'react'

/**
 * TorrentSize: text displaying downloaded and total size of a torrent
 * props: downloadedSize (int): downloaded size in bytes
 *        totalSize (int): total size in bytes
 */
 class TorrentSize extends React.Component {
    render() {
        let dl_size = this.props.downloadedSize;
        let dl_size_str = 0;
        let total_size = this.props.totalSize;
        let total_size_str = 0;

        let sizes = [
            "bytes",
            "KB",
            "MB",
            "GB",
            "TB"
        ];

        while (dl_size > 1024 && dl_size_str < sizes.length - 1) {
            dl_size /= 1024;
            dl_size_str += 1;
        }

        while (total_size > 1024 && total_size_str < sizes.length - 1) {
            total_size /= 1024;
            total_size_str += 1;
        }

        return (
            <div className='torrent-size'>
                {parseFloat(dl_size.toPrecision(2))} {sizes[dl_size_str]} / {parseFloat(total_size.toPrecision(2))} {sizes[total_size_str]}
            </div>
        )
    }
}

export default TorrentSize;