import { Level } from './level'
import styles from './level.module.css'

export const LevelTab = () => {

    return(
        <div  className={styles.legend}>
            <div className={styles.levelTab}>
                <Level width='7%' frame={[1781, 1781]} color='#e51728' tabid={'merchant'}/>
                <Level width='30%' frame={[1782, 1871]} color='#e57316' tabid={'merchant'}/>
                <Level width='21%' frame={[1872, 1922]} color='#e5a717' tabid={'zinger'}/>
                <Level width='7%' frame={[1923, 1940]} color='#e6caa0' tabid={'lenin'}/>
                <Level width='7%' frame={[1941, 1958]} color='#f3f3f3' tabid={'stalin'}/>
                <Level width='7%' frame={[1959, 1974]} color='#a1e6db' tabid={'hrushev'}/>
                <Level width='7%' frame={[1975, 1991]} color='#17afe6' tabid={'stagnation'}/>
                <Level width='7%' frame={[1992, 2007]} color='#1616ff' tabid={'zeroes'}/>
                <Level width='7%' frame={[2008, 2024]} color='#ab17e6' tabid={'today'}/>
            </div>

        </div>
    )
}