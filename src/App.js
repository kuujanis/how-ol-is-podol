import { useState, useCallback, useMemo } from 'react';
import Map, { Layer, Source } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import buildings from '../src/layers/8buildings.geojson'
import { volumeLayer, unsortedLayer, flatLayer, selectPolyLayer, selectLineLayer, selectVolumeLayer, greyLayer } from '../src/utils/index'
import ReactSlider from 'react-slider';
import AppHeader from './components//app-header/app-header'
import {Description} from './components/description/description'
import './App.css';

function App() {
  const [cursor, setCursor] = useState('')
  const [minYear, setMinYear] = useState(1698)  
  const [maxYear, setMaxYear] = useState(2024)
  const [descriptionActive, setDescriptionActive] = useState(true)
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [volumeActive, setVolumeActive] = useState(false)
  const [flatActive, setFlatActive] = useState(true)
  
  //handles

  const onClick = useCallback(e => {
    //Достаем features из интерактивного слоя
    const {features} = e
    //выбираем feature
    const selectedFeature = features && features[0]
    console.log(selectedFeature)
    //передаем feature в состояние
    setSelectedBuilding(selectedFeature && {feature: selectedFeature})
  }, [])

  const onCloseClick = useCallback(e => {
    setSelectedBuilding(null)
  },[])

  const onDescriptionClick = useCallback(e => {
    setDescriptionActive(true)
    setFlatActive(true)
    setVolumeActive(false)
    setSelectedBuilding(null)
  },[])

  const toggle3D = () => {
    setFlatActive(!flatActive);
    setVolumeActive(!volumeActive)
  }

  //filters

  const yearFilter = useMemo(
    () => ['all',['>=', ['get','year_built'], minYear],['<=', ['get','year_built'], maxYear]], [minYear, maxYear]
  );

  const selectFilter = useMemo(
    () => ['in','full_id', selectedBuilding && selectedBuilding.feature.properties.full_id || ''], [selectedBuilding]
  )

  // const point = useCallback(() => setCursor('pointer'), []);
  // const grabbing = useCallback(() => setCursor('grabbing'), []);
  // const grab = useCallback(() => setCursor('grab'), []);

  return (
    <div className="App">
      <AppHeader />
      {descriptionActive &&
        <div className='descriptionCounter'>
          {minYear}{'—'}{maxYear}
        </div>
      }
      <Map
        initialViewState={{
          longitude: 37.67,
          latitude: 55.415,
          zoom: 11,
          minZoom: 9
        }}
        style={{width: '100vw', height: 'calc(100vh - 120px)'}}
        mapStyle="https://api.maptiler.com/maps/f40a1280-834e-43de-b7ea-919faa734af4/style.json?key=5UXjcwcX8UyLW6zNAxsl"
        interactiveLayerIds={['2dbuildings','3dbuildings']}
        // onMouseEnter={point}
        // onMouseLeave={grab}
        // onDrag={grabbing}
        // onDragEnd={grab}
        // cursor={cursor}
        onClick={onClick}
      >
        <Source type="geojson" data={buildings}>
          {selectedBuilding && <Layer {...selectLineLayer} filter={selectFilter} />}
          {selectedBuilding && volumeActive && <Layer {...selectVolumeLayer} filter={selectFilter} />}
          {selectedBuilding && !volumeActive && <Layer {...selectPolyLayer} filter={selectFilter} />}

          {volumeActive && <Layer {...volumeLayer} filter={yearFilter}/>}
          {descriptionActive && flatActive && <Layer {...greyLayer} beforeId={'2dbuildings'}/>}
          {flatActive && <Layer {...flatLayer} filter={yearFilter}/>}
          
          {!descriptionActive && <Layer {...unsortedLayer} />}
        </Source>
        {!descriptionActive && selectedBuilding && 
        <div className='counter' onClick={onCloseClick}>
          <h2>{selectedBuilding.feature.properties.aproxdate ?? selectedBuilding.feature.properties.year_built}</h2>
          <p>
            {selectedBuilding.feature.properties.old_name}
          </p>
          {selectedBuilding.feature.properties.style && 
            <p>{selectedBuilding.feature.properties.style}
          </p>
          }
          {selectedBuilding.feature.properties.addr_house &&
            <p>
              {selectedBuilding.feature.properties.addr_stree}{', дом '}{selectedBuilding.feature.properties.addr_house}
            </p>
          }
        </div>}
      </Map>
      {descriptionActive && 
        <Description setDescriptionActive={setDescriptionActive} setMaxYear={setMaxYear} setMinYear={setMinYear}/>
      }
      <div className='slider-div'>
        <div className='slider-counter'>
          <span>{!descriptionActive && minYear || 1698}</span>
        </div>
        <ReactSlider
            className="horizontal-slider"
            thumbClassName="slider-thumb"
            trackClassName="slider-track"
            defaultValue={[minYear, maxYear]}
            min={1698}
            max={2024}
            step={1}
            renderThumb={(props, state) => <div {...props}></div>}
            onAfterChange={(value, index) => {setMinYear(value[0]); setMaxYear(value[1])}}
            minDistance={0}
        />
        <div className='slider-counter'>
          <span>{!descriptionActive && maxYear || 2024}</span>
        </div>

      </div>
      {!descriptionActive && 
        <div className='button volume-button' onClick={toggle3D}>
          {flatActive && <h2>2D</h2>}{volumeActive && <h2>3D</h2>}
        </div>
      }
      {!descriptionActive &&
        <div className='button description-button' onClick={onDescriptionClick}>
          <h2>1</h2>
        </div>
      }

    </div>
  );
}

export default App;
