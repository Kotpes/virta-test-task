import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useSWR from 'swr'
import { request } from 'graphql-request';


import StationItem from './StationItem'
import Layout from './Layout'

import { GRAPHQL_URL } from '../lib/contants'
import { Station } from '../lib/types'
import styles from './Home.module.css'

const query = `
    query GetStations {
      stations {
        station_ID
        name
        available
      }
    }
  `
const fetcher = async (query: string) => {
    try {
        return await request(GRAPHQL_URL, query)
    } catch (error) {
        throw new Error(error)
    }
}

export default function Home() {
    const [totalCount, setTotalCount] = useState(0)
    const [cursor, setCursor] = useState(20)
    const [paginatedStations, setPaginatedStations] = useState<Station[]>([])
    const [stations, setStations] = useState<Station[]>([])
    const loadMore = totalCount > paginatedStations.length

    const { data } = useSWR(query, fetcher)

    useEffect(() => {
        if (data) {
            const { stations } = data
            setPaginatedStations(stations.slice(0, 20))
            setStations(stations)
            setTotalCount(stations.length)
        }
    }, [data])

    const loadMoreStations = () => {
        const count = 20
        const nextCursor = count + cursor
        const nextStations = stations.slice(cursor, count + cursor)
        // Artificial delay for infinite scroll
        setTimeout(() => {
            setPaginatedStations([...paginatedStations, ...nextStations])
            setCursor(nextCursor)
        }, 1000);

    }

    return (
        <Layout>
            <main className={styles.main}>
                <h1 className={styles.title}>Your stations</h1>
                <section className={styles.stations}>
                    {!data &&
                        <p>...Loading</p>
                    }
                    {paginatedStations.length > 0 &&
                        <InfiniteScroll
                            dataLength={paginatedStations.length}
                            next={loadMoreStations}
                            hasMore={loadMore}
                            loader={<h4>Loading...</h4>}
                        >
                            {paginatedStations.length &&
                                paginatedStations.map(station => <StationItem key={station.station_ID} {...station} />)
                            }
                        </InfiniteScroll>
                    }
                </section>
            </main>
        </Layout>
    );
}