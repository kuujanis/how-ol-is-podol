import { useState } from 'react';
import styles from './level.module.css'

export const Level = ({width, color, frame, epoque, setEpoque, tabid, descriptionActive}) => {
    const active = ((epoque[1] >= frame[0]) && (epoque[0] <= frame[1]))
    const clickHandle = (e) => {
        let ep = frame
        if (frame[1]<epoque[0]) {ep[1]=epoque[1]}
        if (frame[0]>epoque[1]) {ep[0] = epoque[0]}
        setEpoque(ep)
    }
    const descriptionClickHandle = (e) => {

        const el = document.getElementById(tabid);
        el?.scrollIntoView({ behavior: "smooth" });
    }
    // const activeClickHandle = (e) => {
    //     if (epoque[1]>=frame[0] && epoque[1]<=frame[1] && epoque[0]<frame[0]) {ep[1]=frame[0];setEpoque(ep)}
    //     if (epoque[0]>=frame[0] && epoque[0]<=frame[1] && epoque[1]>frame[1]) {ep[0]=frame[1];setEpoque(ep)}
    //     console.log(ep)
        
    // }

    return active ? <div className={styles.level} onClick={descriptionActive? descriptionClickHandle:clickHandle} style={{width: width, backgroundColor: color}}/> 
    : <div onClick={descriptionActive? descriptionClickHandle:clickHandle} className={styles.level} style={{width: width, backgroundColor: color, opacity: '33%'}}/>

}