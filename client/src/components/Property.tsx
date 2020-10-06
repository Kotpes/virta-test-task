import React from 'react'
import styles from './Station.module.css'

//@ts-ignore
const getValue = (rawValue) => {
    if (typeof rawValue === 'string') {
        return rawValue
    }
    if (typeof rawValue === 'boolean') {
        return rawValue ? 'No' : 'Yes'
    }
    if (!rawValue) {
        return 'Not available'
    }

    return rawValue
}

type Property = {
    label: string,
    rawValue: string | number | boolean
}

const Property = ({ property }: { property: Property }) => {
    const { label, rawValue } = property
    const value = getValue(rawValue)

    return (

        <div>
            <label className={styles.propertyLabel}>{label}</label>
            <p className={styles.propertyValue}>{value}</p>
        </div>
    )
}

export default Property
