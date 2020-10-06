import React from 'react'
import { useHistory } from 'react-router-dom';

import { Station } from '../lib/types'

import iconAvailable from '../icons/icon_available.svg'
import iconOffline from '../icons/icon_offline.svg'
import styles from './StationItem.module.css'

const StationItem = (props: Station) => {
    const { name, station_ID, available } = props
    const history = useHistory()

    const availability = available ? 'Avaliable' : 'Offline'
    const icon = available ? iconAvailable : iconOffline

    // SKipping stations with an empty name
    if (!name) {
        return null
    }

    const handleClick = () => {
        history.push(`/stations/${station_ID}`)
    }

    return (
        <div key={station_ID} className={styles.station} onClick={handleClick}>
            <div className={styles.stationName}>{name}</div>
            <div className={styles.availability}>
                <img src={icon} alt={`${availability} icon`} />{availability}
            </div>
        </div>
    )
}

export default StationItem