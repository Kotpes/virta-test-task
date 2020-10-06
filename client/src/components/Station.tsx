import React from 'react'
import { request } from 'graphql-request';
import { useParams, useHistory } from 'react-router-dom'
import useSWR from 'swr'

import Layout from './Layout'
import Property from './Property'
import { GRAPHQL_URL } from '../lib/contants'
import IconArrow from '../icons/icon_arrow--left.svg'
import styles from './Station.module.css'


const query = `
    query GetStations($id: String) {
      stations(id: $id) {
        station_ID
            location_ID
            seller_ID
            name
            connected
            position
            available
            lastconnect
            roaming_identifier_cpo
            sockets
            reservable
        }
    }
  `

interface Params {
    id: string
}

const fetcher = async (url: string, id: string) => {
    try {
        const { stations } = await request(url, query, { id })
        return stations[0]
    } catch (error) {
        throw new Error(error)
    }

}

export default function Station() {
    const { id } = useParams<Params>()
    const history = useHistory()
    const { data: station, error } = useSWR([GRAPHQL_URL, id], (url, id) => fetcher(url, id))

    const handleClick = () => {
        history.goBack()
    }


    if (error) {
        return (
            <Layout>
                <h1 className={styles.stationName}>
                    <img src={IconArrow} className={styles.arrowBack} alt="Go back icon" onClick={handleClick} />
                    Station not found
                </h1>
            </Layout>
        )
    }
    if (!station) {
        return (
            <Layout>
                <h1 className={`${styles.stationName} ${styles.loading}`}>
                    <img src={IconArrow} className={styles.arrowBack} alt="Go back icon" onClick={handleClick} />
                    Loading station info
                </h1>
            </Layout>
        )
    }


    return (
        <Layout>
            <h1 className={styles.stationName}>
                <img src={IconArrow} className={styles.arrowBack} alt="Go back icon" onClick={handleClick} />
                {station.name}
            </h1>
            <section className={styles.stationInformation}>
                {Object.keys(station).map((key) => {
                    const property = {
                        label: key,
                        rawValue: station[key]
                    }
                    return (
                        <Property key={property.label} property={property} />
                    )
                })}
            </section>
        </Layout>
    )
}