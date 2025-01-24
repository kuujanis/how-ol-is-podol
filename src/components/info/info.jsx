import styles from './info.module.css'

export const Info = ({selectedBuilding, onCloseClick}) => {
    return(
        <div className={styles.info} onClick={onCloseClick}>
        <h2>Годы постройки: {selectedBuilding.feature.properties.aproxdate ?? selectedBuilding.feature.properties.year_built}</h2>
        {selectedBuilding.feature.properties.year_lost<2030 ? <h2>Год сноса: {selectedBuilding.feature.properties.year_lost}</h2> : ''}
        <h3>
          {selectedBuilding.feature.properties.name ? selectedBuilding.feature.properties.name : selectedBuilding.feature.properties.type}
        </h3>
        {/* <div className={styles.imageDiv}>
          <img className={styles.image} src='https://upload.wikimedia.org/wikipedia/commons/0/0a/%D0%91%D0%B0%D0%BD%D0%BD%D0%B0%D1%8F%2C_12%D0%90_2020.jpg'/>
        </div> */}
        {selectedBuilding.feature.properties.addr_house &&
          <p>
            Адрес: {selectedBuilding.feature.properties.addr_stree}{', дом '}{selectedBuilding.feature.properties.addr_house}
          </p>
        }
        {selectedBuilding.feature.properties.style && 
          <p>Стиль: {selectedBuilding.feature.properties.style}</p>
        }
        {selectedBuilding.feature.properties.architect && 
          <p>Архитектор: {selectedBuilding.feature.properties.architect}</p>
        }
        {selectedBuilding.feature.properties.src && 
          <p>Источник: {selectedBuilding.feature.properties.src}</p>
        }
        </div>
    )
}