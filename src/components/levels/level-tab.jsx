import { Level } from './level'
import styles from './level.module.css'

export const LevelTab = ({epoque, setEpoque, descriptionActive}) => {

    return(
        <div  className={styles.legend}>
            <div className={styles.levelTab}>
                <Level width='7%' epoque={epoque} frame={[1781, 1781]} color='#e51728' descriptionActive={descriptionActive} setEpoque={setEpoque} tabid={'merchant'}/>
                <Level width='30%' epoque={epoque} frame={[1782, 1871]} color='#e57316' descriptionActive={descriptionActive} setEpoque={setEpoque} tabid={'merchant'}/>
                <Level width='21%' epoque={epoque} frame={[1872, 1922]} color='#e5a717' descriptionActive={descriptionActive} setEpoque={setEpoque} tabid={'zinger'}/>
                <Level width='7%' epoque={epoque} frame={[1923, 1940]} color='#e6caa0' descriptionActive={descriptionActive} setEpoque={setEpoque} tabid={'lenin'}/>
                <Level width='7%' epoque={epoque} frame={[1941, 1958]} color='#f3f3f3' descriptionActive={descriptionActive} setEpoque={setEpoque} tabid={'stalin'}/>
                <Level width='7%' epoque={epoque} frame={[1959, 1974]} color='#a1e6db' descriptionActive={descriptionActive} setEpoque={setEpoque} tabid={'hrushev'}/>
                <Level width='7%' epoque={epoque} frame={[1975, 1991]} color='#17afe6' descriptionActive={descriptionActive} setEpoque={setEpoque} tabid={'stagnation'}/>
                <Level width='7%' epoque={epoque} frame={[1992, 2007]} color='#1616ff' descriptionActive={descriptionActive} setEpoque={setEpoque} tabid={'zeroes'}/>
                <Level width='7%' epoque={epoque} frame={[2008, 2024]} color='#ab17e6' descriptionActive={descriptionActive} setEpoque={setEpoque} tabid={'today'}/>
            </div>

        </div>
    )
}