import styles from './scale.module.css'
export const Scale = (props) => {
    return(
        <div className={styles.scale}>
        <div className={styles.scalebar}></div>
        <b>{Math.round(3913574.2/Math.pow(2,props.zoom))}{' м'}</b>
      </div>
    )
}