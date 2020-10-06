import React from 'react'

import styles from './Home.module.css'

export default function Layout({
    children,
}: { children: React.ReactNode }) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}