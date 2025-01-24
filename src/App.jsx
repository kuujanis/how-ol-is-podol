import { useState, useCallback, useMemo, useRef, useEffect, useReducer } from 'react';
import Map, { Layer, Source, ScaleControl, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { 
  build2d, build3d, lost2d, lost3d, unsortedLayer, selectPolyLayer, selectVolumeLayer, searchLayer, 
  circleLayer, circleBorderLayer,
  buildGray,
  lostGray,
  selectLostVolume,
  selectLost,
  disabledSettings,
  enabledSettings,
  centroidLayer,
  lensePointLayer,
  lenseLineLayer} from './utils/index'
import { SliderTab } from './components/slider/slider';
import AppHeader from './components/app-header/app-header'
import {Description} from './components/description/description'
import './App.css';
import { Info } from './components/info/info';
import { LevelTab } from './components/levels/level-tab';
import { useDispatch, useSelector } from 'react-redux';
import { setEpoque, setVolume, showDescription } from './services/slices/map/map-slice';
import * as turf from "@turf/turf";

import KDBush from 'kdbush';
import * as geokdbush from 'geokdbush';
import { StatPanel } from './components/stat_panel/stat-panel';

// import { ScaleControl } from 'react-map-gl';


function App() {
  const dispatch = useDispatch()

  const BUILD_DATA = require('../src/layers/build1.geojson')
  const LOST_DATA = require('../src/layers/lost1.geojson')

  const descriptionActive = useSelector(state => state.map.description)
  const epoque = useSelector(state => state.map.epoque)
  const volume = useSelector(state => state.map.volume)

  const [selectedBuilding, selectBuilding] = useState(null)
  const [settings, setSettings] = useState(disabledSettings)
  // const [address, setAddress] = useState('')
  const [zoom, setZoom] = useState(11)

  //circle
  const [center, setCenter] = useState([37.55, 55.43])
  const [renderedFeatures, setRenderedFeatures] = useState([])
  const [selectedArray, setSelectedArray] = useState([])
  const [lense, setLense] = useReducer((state) => !state, false)
  const [move, setMove] = useReducer((state) => !state, true)
  const [radius, setRadius] = useState(0.4)

  const [lost, setLost] = useState(true)
  const [unsort, setUnsort] = useState(false)
  

  const mapRef=useRef()

  const dot = useMemo(() => turf.point(center),[center])
  const circle = useMemo(() => turf.circle(center,radius,{ steps: 360, units: "kilometers"}),[center, radius]) 
  // const line = useMemo(() => turf.lineString([center, turf.getCoord(turf.destination(center, radius, 90, {units:'kilometers'}))]),[center,radius])

  useEffect(() => {
    console.log('move')
    const rend_centr = mapRef.current?.querySourceFeatures('123',{sourceLayer: ['build2d']})
    setRenderedFeatures(rend_centr)
  },[move])

  useEffect(() => {
    if (renderedFeatures) {
      console.log('change')
      const index = new KDBush(renderedFeatures.length);
      renderedFeatures.map((feature) => index.add(feature.properties.xc,feature.properties.yc))
      index.finish();

      const bufferIds = geokdbush.around(index, center[0], center[1], 10000, 2);
      const nearestIds = geokdbush.around(index, center[0], center[1],10000, radius);

      const filteredBufferIds = bufferIds.filter(n => !nearestIds.includes(n))

      const buffer_centr = filteredBufferIds.map(i => renderedFeatures[i].id)

      const nearest_centr = nearestIds.map(i => renderedFeatures[i]);

      setSelectedArray(nearest_centr)
      
      buffer_centr.map((id) => mapRef.current?.setFeatureState({source: '123', id: id}, {hover: false}))
      nearest_centr.map((feature) => mapRef.current?.setFeatureState({source: '123', id: feature.id}, {hover: true}))
    }
  }, [center, radius, renderedFeatures])

  useEffect(() => {
    const onMove = (e) => {
      const coord = e.lngLat
      setCenter([coord.lng,coord.lat])
    }
    const onUp =(e) => {
      mapRef.current.off('mousemove',onMove)
    }
  })

  //info on click

  const onClick = useCallback(e => {
    //Достаем features из интерактивного слоя
    const {features} = e
    //выбираем feature
    const selectedFeature = features && features[0]
    // console.log(selectedFeature)
    //передаем feature в состояние
    selectBuilding(selectedFeature && {feature: selectedFeature})
    console.log({feature: selectedFeature})   
    // const source_centr = mapRef.current?.querySourceFeatures('777')
    // console.log(source_centr) 

  }, [])

  const onCloseClick = useCallback(e => {
    selectBuilding(null)
  },[])

  //desc handle

  const onDescriptionClick = useCallback(e => {
    dispatch(showDescription(true))
    dispatch(setVolume(false))
    dispatch(setEpoque([1781,2024]))
    selectBuilding(null)
    setSettings(disabledSettings)
    mapRef.current?.flyTo({center: [37.63, 55.415], zoom: 11, pitch: 0, bearing: 0, duration: 2000})
  },[dispatch])

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

  // const onChange = e => {
  //   setAddress(e.target.value)
  //   mapRef.current.flyTo({center: [37.55, 55.43], zoom: 10.8,  pitch: 0, bearing: 0})
  // }

  //lense

  // const onMouseMove = useCallback(e => {
  //   setCenter([e.lngLat.lng,e.lngLat.lat])
  // },[])

  // const onMouseUp = useCallback(e => {
  //   console.log('up')
  //   setSettings(enabledSettings)
  //   mapRef.current?.off('mousemove', onMouseMove)
  //   mapRef.current?.off('mouseup', onMouseUp)
  // },[onMouseMove])

  // const onMouseDown = useCallback(e => {
  //   mapRef.current?.off('mousedown','circle', onMouseDown)
  //   setSettings(disabledSettings)

  //   mapRef.current?.on('mousemove', onMouseMove)
  //   mapRef.current?.on('mouseup', onMouseUp)
  // },[onMouseUp, onMouseMove])


  // mapRef.current?.on('mousedown','circle', onMouseDown)
  

  // useEffect(() => {
  //   setFeatures(mapRef.current.querySourceFeatures('123',{layers:['search'], filter: ['>',['get','year_built'],0]}))
  // }, [])

  // const onSearch = () => {
  //   const features = mapRef.current.querySourceFeatures('123',{layers:['search'], filter: ['>',['get','year_built'],0]})
  //   let nice_address = address.toLowerCase()
  //   let address_arr = nice_address.split(' ')
  //   let house_num = address_arr[address_arr.length-1]
  //   console.log('num: '+house_num)
  //   let street_name = nice_address.replace(house_num, '').trim()
  //   console.log('street name: '+street_name)
  //   let street = features.filter(feature => feature.properties.addr_stree?.toLowerCase().includes(street_name))
  //   let house = street.find(crib => crib.properties.addr_house?.toLowerCase() === house_num) 
  //   // const y = features[288].properties.addr_stree.includes('лип')
  //   // console.log(features[288].properties.addr_stree)
  //   if (house) {
  //     mapRef.current.flyTo({center: [house.properties.xc, house.properties.yc], zoom: 16, duration: 2000})
  //     selectBuilding({feature: house})
  //   }
  //   console.log(house)
  //   // console.log(address.trim().replace('улица', '').replace('.','').trim())
  // }

  //filters

  const yearFilter = useMemo(
    () => ['all',['>=', ['get','year_built'], epoque[0]],['<=', ['get','year_built'], epoque[1]], ['>',['get','year_lost'],epoque[1]] ], [epoque]
  );
  const backFilter = useMemo(
    () => ['all',['>', ['get','year_built'], 0],['<', ['get','year_built'], epoque[0]], ['>',['get','year_lost'],epoque[1]]], [epoque]
  );
  const selectFilter = useMemo(
    () => ['in','full_id', (selectedBuilding && selectedBuilding.feature.properties.full_id) || ''], [selectedBuilding]
  )

  return (
    <div className="App">
      <AppHeader />
      <LevelTab />

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
        interactiveLayerIds={['build2d','build3d','lost2d','lost3d','unsorted', 'circle', 'centroid-layer']}
        maxPitch={85}
        onClick={onClick}
        onMoveEnd={setMove}
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
        {/* {!descriptionActive && 
          <div className='searchbar'>
            <input type='text' value={address} placeholder='улица Февральская 52' onChange={onChange}></input>
            <div className='searchButton' onClick={onSearch}><h2>S</h2></div>
          </div>
        } */}
        {!descriptionActive && selectedBuilding && <Info selectedBuilding={selectedBuilding} onCloseClick={onCloseClick}/>}
        <Source id='123' type="geojson" data={BUILD_DATA} generateId={true}>
          {descriptionActive && <Layer {...buildGray} filter={backFilter}/>}
          {volume && <Layer { ...build3d} filter={yearFilter}/>}
          {!volume && <Layer {...build2d} filter={yearFilter}/>}
          
          {!descriptionActive && <Layer {...searchLayer}/>}
          {unsort && !descriptionActive && <Layer {...unsortedLayer} />}


          {selectedBuilding && volume && <Layer {...selectVolumeLayer} filter={selectFilter} />}
          {selectedBuilding && !volume && <Layer {...selectPolyLayer} filter={selectFilter} />}
        </Source>
        <Source  id='321' type="geojson" data={LOST_DATA}>
          {lost && volume && <Layer {...lost3d} filter={yearFilter}/>}
          {lost && !volume && <Layer {...lost2d} filter={yearFilter}/>}
          {descriptionActive && <Layer {...lostGray} filter={backFilter}/>}
          {selectedBuilding && volume && <Layer {...selectLostVolume} filter={selectFilter} />}
          {selectedBuilding && !volume && <Layer {...selectLost} filter={selectFilter} />}
        </Source>
        <Source id='6666' type='geojson' data={circle}>
          {lense && <Layer {...circleBorderLayer}/>}
          {lense && <Layer {...circleLayer} onDrag={() => console.log('drag')} draggable />}
        </Source>
        <Source id='lense-point' type='geojson' data={dot}>
          {lense && <Layer {...lensePointLayer}/>}
        </Source>
        {/* <Source id='lense-line' type='geojson' data={line}>
          {lense && <Layer {...lenseLineLayer}/>}
        </Source> */}

      <ScaleControl/>
      <NavigationControl/>
      </Map>

      {descriptionActive && 
        <Description 
          setEpoque={setEpoque} setZoom={setZoom} setSettings={setSettings} mapRef={mapRef}
        />
      }
      {!descriptionActive && lense && selectedArray &&
        <StatPanel radius={radius} setRadius={setRadius} selectedArray={selectedArray}/>
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
        <div>
          <div className='button volume-button' onClick={toggle3D}>
            {!volume && <h2>2D</h2>}{volume && <h2>3D</h2>}
          </div>
          <div className='button description-button' onClick={onDescriptionClick}>
            <h2>X</h2>
          </div>
          <div className='button lost-button' onClick={toggleLost}>
            <h2>L</h2>
          </div>
          <div className='button unsorted-button' onClick={toggleUnsorted}>
            <h2>?</h2>
          </div>
          <div className='button lense-button' onClick={setLense}>
            <h2>O</h2>
          </div>
        </div>
      }
      {/* {!volumeActive && <Scale zoom={zoom}/>} */}
      
      <SliderTab />
    </div>
  );
}

export default App;
