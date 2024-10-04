import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import Map, { Layer, Source, ScaleControl, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import raions from '../src/layers/raions.geojson'
import { 
  build2d, build3d, lost2d, lost3d, unsortedLayer, flatLayer, selectPolyLayer, selectVolumeLayer, greyLayer, searchLayer, 
  histogram, 
  buildGray,
  lostGray,
  selectLostVolume,
  selectLost} from '../src/utils/index'
import { SliderTab } from './components/slider/slider';
import AppHeader from './components//app-header/app-header'
import {Description} from './components/description/description'
import './App.css';
import { Scale } from './components/scale/scale';
import { Info } from './components/info/info';
import { LevelTab } from './components/levels/level-tab';
import { useDispatch, useSelector } from 'react-redux';
import { setEpoque, setVolume, showDescription } from './services/slices/map/map-slice';
// import { ScaleControl } from 'react-map-gl';


function App() {

  const disabledSettings = {    
    scrollZoom: false,
    boxZoom: false,
    dragRotate: false,
    dragPan: false,
    keyboard: false,
    doubleClickZoom: false,
    touchZoomRotate: false,
    touchPitch: false,
  }

  const dispatch = useDispatch()

  const descriptionActive = useSelector(state => state.map.description)
  const epoque = useSelector(state => state.map.epoque)
  const volume = useSelector(state => state.map.volume)

  const [selectedBuilding, selectBuilding] = useState(null)
  const [settings, setSettings] = useState(disabledSettings)
  const [address, setAddress] = useState('')
  const [zoom, setZoom] = useState(11)

  const [lost, setLost] = useState(true)
  const [unsort, setUnsort] = useState(false)

  const mapRef=useRef()

  //handles

  const onClick = useCallback(e => {
    //Достаем features из интерактивного слоя
    const {features} = e
    //выбираем feature
    const selectedFeature = features && features[0]
    // console.log(selectedFeature)
    //передаем feature в состояние
    selectBuilding(selectedFeature && {feature: selectedFeature})
    console.log({feature: selectedFeature})
  }, [])

  // const onWheel = () => {
  //   setZoom(mapRef.current?.getZoom())
  // }

  const onCloseClick = useCallback(e => {
    selectBuilding(null)
  },[])

  const onDescriptionClick = useCallback(e => {
    dispatch(showDescription(true))
    dispatch(setVolume(false))
    dispatch(setEpoque([1781,2024]))
    selectBuilding(null)
    setSettings(disabledSettings)
    mapRef.current?.flyTo({center: [37.63, 55.415], zoom: 11, pitch: 0, bearing: 0, duration: 2000})
  },[])

  //layer toggle

  const toggleLost = e => {
    setLost(!lost)
    console.log(lost)
  }

  const toggleUnsorted = e => {
    setUnsort(!unsort)
    console.log(unsort)
  }

  const toggle3D = () => {
    setSettings({...settings, dragRotate: !settings.dragRotate})
    dispatch(setVolume(!volume))
    mapRef.current?.flyTo(!volume? {pitch: 60, duration: 2000}:{pitch: 0, bearing: 0, duration: 2000})
  }

  const onChange = e => {
    setAddress(e.target.value)
    mapRef.current.flyTo({center: [37.55, 55.43], zoom: 10.8,  pitch: 0, bearing: 0})
  }

  // useEffect(() => {
  //   setFeatures(mapRef.current.querySourceFeatures('123',{layers:['search'], filter: ['>',['get','year_built'],0]}))
  // }, [])

  const onSearch = () => {
    const features = mapRef.current.querySourceFeatures('123',{layers:['search'], filter: ['>',['get','year_built'],0]})
    let nice_address = address.toLowerCase()
    let address_arr = nice_address.split(' ')
    let house_num = address_arr[address_arr.length-1]
    console.log('num: '+house_num)
    let street_name = nice_address.replace(house_num, '').trim()
    console.log('street name: '+street_name)
    let street = features.filter(feature => feature.properties.addr_stree?.toLowerCase().includes(street_name))
    let house = street.find(crib => crib.properties.addr_house?.toLowerCase() === house_num) 
    // const y = features[288].properties.addr_stree.includes('лип')
    // console.log(features[288].properties.addr_stree)
    if (house) {
      mapRef.current.flyTo({center: [house.properties.xc, house.properties.yc], zoom: 16, duration: 2000})
      selectBuilding({feature: house})
    }
    console.log(house)
    // console.log(address.trim().replace('улица', '').replace('.','').trim())
  }

  //filters

  const yearFilter = useMemo(
    () => ['all',['>=', ['get','year_built'], epoque[0]],['<=', ['get','year_built'], epoque[1]], ['>',['get','year_lost'],epoque[1]] ], [epoque]
  );
  const backFilter = useMemo(
    () => ['all',['>', ['get','year_built'], 0],['<', ['get','year_built'], epoque[0]], ['>',['get','year_lost'],epoque[1]]], [epoque]
  );
  const selectFilter = useMemo(
    () => ['in','full_id', selectedBuilding && selectedBuilding.feature.properties.full_id || ''], [selectedBuilding]
  )


  return (
    <div className="App">
      <AppHeader />
      <LevelTab epoque={epoque} setEpoque={setEpoque}  descriptionActive={descriptionActive}/>

      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 37.63,
          latitude: 55.415,
          zoom: 11,
          minZoom: 9
        }}
        style={{width: '100vw', height: 'calc(100vh - 137px)'}}
        mapStyle="https://api.maptiler.com/maps/f40a1280-834e-43de-b7ea-919faa734af4/style.json?key=5UXjcwcX8UyLW6zNAxsl"
        interactiveLayerIds={['build2d','build3d','lost2d','lost3d','unsorted']}
        maxPitch={85}
        onClick={onClick}
        // onWheel={onWheel}
        {...settings}
        
      > 
        <div  className='dateTab'>
          <span></span>
          <span>1781</span>
          <span>1871</span>
          <span>1922</span>
          <span>1941</span>
          <span>1959</span>
          <span>1975</span>
          <span>1991</span>
          <span>2007</span>
        </div>
        {descriptionActive &&
          <div className='descriptionCounter'>
            {epoque[0]}{epoque[0]!==epoque[1] && '—'+epoque[1]}
          </div>
        }
        {!descriptionActive && 
          <div className='searchbar'>
            <input type='text' value={address} placeholder='улица Февральская 52' onChange={onChange}></input>
            <div className='searchButton' onClick={onSearch}><h2>S</h2></div>
          </div>
        }
        {!descriptionActive && selectedBuilding && <Info selectedBuilding={selectedBuilding} onCloseClick={onCloseClick}/>}
        <Source id='123' type="geojson" data={require('../src/layers/build1.geojson')}>
          {descriptionActive && <Layer {...buildGray} filter={backFilter}/>}
          {volume && <Layer { ...build3d} filter={yearFilter}/>}
          {!volume && <Layer {...build2d} filter={yearFilter}/>}
          
          {!descriptionActive && <Layer {...searchLayer}/>}
          {unsort && !descriptionActive && <Layer {...unsortedLayer} />}


          {selectedBuilding && volume && <Layer {...selectVolumeLayer} filter={selectFilter} />}
          {selectedBuilding && !volume && <Layer {...selectPolyLayer} filter={selectFilter} />}
        </Source>
        <Source  id='321' type="geojson" data={require('../src/layers/lost1.geojson')}>
          {lost && volume && <Layer {...lost3d} filter={yearFilter}/>}
          {lost && !volume && <Layer {...lost2d} filter={yearFilter}/>}
          {descriptionActive && <Layer {...lostGray} filter={backFilter}/>}
          {selectedBuilding && volume && <Layer {...selectLostVolume} filter={selectFilter} />}
          {selectedBuilding && !volume && <Layer {...selectLost} filter={selectFilter} />}
        </Source>


      <ScaleControl/>
      {/* <NavigationControl/> */}
      </Map>

      {descriptionActive && 
        <Description 
          setEpoque={setEpoque} setZoom={setZoom} setSettings={setSettings} mapRef={mapRef}
        />
      }

      {!descriptionActive && 
        <div className='button zoom-button'>
          <div onClick={()=>{mapRef.current?.flyTo({zoom: Math.round(zoom)+1, duration: 1000}); setZoom(Math.round(zoom)+1)}}>
            <b>+</b>
          </div>
          <div>{Math.round(zoom)}</div>
          <div onClick={()=>{mapRef.current?.flyTo({zoom: Math.round(zoom)-1, duration: 1000}); setZoom(Math.round(zoom)-1)}}>
            <b>-</b>
          </div>
        </div>
      }
      {!descriptionActive && 
        <div className='button volume-button' onClick={toggle3D}>
          {!volume && <h2>2D</h2>}{volume && <h2>3D</h2>}
        </div>
      }
      {!descriptionActive &&
        <div className='button description-button' onClick={onDescriptionClick}>
          <h2>X</h2>
        </div>
      }
      {!descriptionActive &&
        <div className='button lost-button' onClick={toggleLost}>
          <h2>L</h2>
        </div>
      }
      {!descriptionActive &&
        <div className='button unsorted-button' onClick={toggleUnsorted}>
          <h2>?</h2>
        </div>
      }
      {/* {!volumeActive && <Scale zoom={zoom}/>} */}
      
      <SliderTab />
    </div>
  );
}

export default App;
