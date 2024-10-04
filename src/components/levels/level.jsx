import { useState } from 'react';
import styles from './level.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { setEpoque } from '../../services/slices/map/map-slice';

export const Level = ({width, color, frame, tabid}) => {

    const dispatch = useDispatch()

    const epoque = useSelector(state => state.map.epoque)
    const descriptionActive = useSelector(state => state.map.description)

    const active = ((epoque[1] >= frame[0]) && (epoque[0] <= frame[1]))
    const clickHandle = (e) => {
        let ep = frame
        if (frame[1]<epoque[0]) {ep[1]=epoque[1]}
        if (frame[0]>epoque[1]) {ep[0] = epoque[0]}
        dispatch(setEpoque(ep))
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