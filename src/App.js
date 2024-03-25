import { useState, useCallback, useMemo, useRef } from 'react';
import Map, { Layer, Source } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import buildings from '../src/layers/9buildings.geojson'
import { volumeLayer, unsortedLayer, flatLayer, selectPolyLayer, selectLineLayer, selectVolumeLayer, greyLayer } from '../src/utils/index'
import { SliderTab } from './components/slider/slider';
import AppHeader from './components//app-header/app-header'
import {Description} from './components/description/description'
import './App.css';

function App() {
  
  const [epoque, setEpoque] = useState([1781,2024])  
  const [descriptionActive, setDescriptionActive] = useState(true)
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [volumeActive, setVolumeActive] = useState(false)
  const [settings, setSettings] = useState({    
    scrollZoom: false,
    boxZoom: false,
    dragRotate: false,
    dragPan: false,
    keyboard: false,
    doubleClickZoom: false,
    touchZoomRotate: false,
    touchPitch: false,
  })

  const mapRef=useRef()

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
    setVolumeActive(false)
    setSelectedBuilding(null)
    setSettings({
      scrollZoom: false,
      boxZoom: false,
      dragRotate: false,
      dragPan: false,
      keyboard: false,
      doubleClickZoom: false,
      touchZoomRotate: false,
      touchPitch: false,
    })
    mapRef.current?.flyTo({center: [37.63, 55.415], zoom: 11, pitch: 0, bearing: 0, duration: 2000})
  },[])

  const toggle3D = () => {
    setVolumeActive(!volumeActive)
    mapRef.current?.flyTo(!volumeActive? {pitch: 60, duration: 2000}:{pitch: 0, duration: 2000})
  }

  //filters

  const yearFilter = useMemo(
    () => ['all',['>=', ['get','year_built'], epoque[0]],['<=', ['get','year_built'], epoque[1]]], [epoque[0], epoque[1]]
  );

  const selectFilter = useMemo(
    () => ['in','full_id', selectedBuilding && selectedBuilding.feature.properties.full_id || ''], [selectedBuilding]
  )

  return (
    <div className="App">
      <AppHeader />
      {descriptionActive &&
        <div className='descriptionCounter'>
          {epoque[0]}{epoque[0]!=epoque[1] && '—'+epoque[1]}
        </div>
      }
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 37.63,
          latitude: 55.415,
          zoom: 11,
          minZoom: 9
        }}
        style={{width: '100vw', height: 'calc(100vh - 120px)'}}
        mapStyle="https://api.maptiler.com/maps/f40a1280-834e-43de-b7ea-919faa734af4/style.json?key=5UXjcwcX8UyLW6zNAxsl"
        interactiveLayerIds={['2dbuildings','3dbuildings']}
        maxPitch={85}
        onClick={onClick}
        {...settings}
        
      >
        <Source type="geojson" data={buildings}>
          {selectedBuilding && <Layer {...selectLineLayer} filter={selectFilter} />}
          {selectedBuilding && volumeActive && <Layer {...selectVolumeLayer} filter={selectFilter} />}
          {selectedBuilding && !volumeActive && <Layer {...selectPolyLayer} filter={selectFilter} />}

          {volumeActive && <Layer {...volumeLayer} filter={yearFilter}/>}
          {descriptionActive && <Layer {...greyLayer} beforeId={'2dbuildings'}/>}
          {!volumeActive && <Layer {...flatLayer} filter={yearFilter}/>}
          
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
        <Description setDescriptionActive={setDescriptionActive} setEpoque={setEpoque} setSettings={setSettings} mapRef={mapRef}/>
      }
      <SliderTab epoque={epoque} setEpoque={setEpoque} descriptionActive={descriptionActive}/>
      {!descriptionActive && 
        <div className='button volume-button' onClick={toggle3D}>
          {!volumeActive && <h2>2D</h2>}{volumeActive && <h2>3D</h2>}
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
