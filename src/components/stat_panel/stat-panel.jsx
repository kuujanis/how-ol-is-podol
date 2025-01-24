import { PieChart } from '@mui/x-charts'
import styles from './stat-panel.module.css'
import React, {useEffect, useState} from 'react'
import { Slider } from '@mui/material'
import { sort } from './sort'

export const StatPanel = ({selectedArray, radius, setRadius}) => {

    const [chartData, setChartData] = useState([
        { id: 1, value: 0, label: 'До 1871' },
        { id: 2, value: 0, label: '1872-1922' },
        { id: 3, value: 0, label: '1923-1940' },
        { id: 4, value: 0, label: '1941-1958' },
        { id: 5, value: 0, label: '1959-1974' },
        { id: 6, value: 0, label: '1975-1991' },
        { id: 7, value: 0, label: '1992-2007' },
        { id: 8, value: 0, label: '2007-2024' },
    ])

    useEffect(() => {

        if (selectedArray && selectedArray.length > 0) {
            // console.log('arraylength:',selectedArray.length)
            setChartData(sort(selectedArray))
        }

    },[selectedArray])

    const onRadiusChange = (e, newValue) => {
        setRadius(newValue)
    }

    return (
        <section className={styles.descolumn}>
            <Slider
                defaultValue={0.4}
                step={0.02}
                value={radius}
                onChange={onRadiusChange}
                min={0.4}
                max={0.8}
            />
            <div className={styles.scrolldiv}>

                {selectedArray && selectedArray.length > 0 && <PieChart
                    series={[
                        {
                            data: chartData,
                            innerRadius: 30,
                            outerRadius: 100,
                            cx: 175,
                            cy: 150,
                        },
                    ]}
                      width={300}
                      height={300}
                />}

            </div>
        </section>
    )
}