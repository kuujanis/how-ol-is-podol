import { useState, useCallback, useMemo, useRef } from 'react';
import Map, { Layer, Source, ScaleControl, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import buildings from '../src/layers/13buildings.geojson'
import raions from '../src/layers/raions.geojson'
import { volumeLayer, unsortedLayer, flatLayer, selectPolyLayer, selectLineLayer, selectVolumeLayer, greyLayer, searchLayer, raionLayer, histogram } from '../src/utils/index'
import { SliderTab } from './components/slider/slider';
import AppHeader from './components//app-header/app-header'
import {Description} from './components/description/description'
import './App.css';
import { Scale } from './components/scale/scale';
import { Info } from './components/info/info';
import { LevelTab } from './components/levels/level-tab';
// import { ScaleControl } from 'react-map-gl';


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
  const [address, setAddress] = useState('')
  const [zoom, setZoom] = useState(11)

  const mapRef=useRef()

  //handles

  const onClick = useCallback(e => {
    //Достаем features из интерактивного слоя
    const {features} = e
    //выбираем feature
    const selectedFeature = features && features[0]
    // console.log(selectedFeature)
    //передаем feature в состояние
    setSelectedBuilding(selectedFeature && {feature: selectedFeature})
    console.log({feature: selectedFeature})
  }, [])

  const onWheel = () => {
    setZoom(mapRef.current?.getZoom())
  }

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
    setEpoque(1781,2024)
    mapRef.current?.flyTo({center: [37.63, 55.415], zoom: 11, pitch: 0, bearing: 0, duration: 2000})
  },[])

  const toggle3D = () => {
    setSettings({...settings, dragRotate: !settings.dragRotate})
    setVolumeActive(!volumeActive)
    mapRef.current?.flyTo(!volumeActive? {pitch: 60, duration: 2000}:{pitch: 0, bearing: 0, duration: 2000})
  }
  const onChange = e => {
    setAddress(e.target.value)
    mapRef.current.flyTo({center: [37.55, 55.43], zoom: 10.8,  pitch: 0, bearing: 0})
  }

  

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
      setSelectedBuilding({feature: house})
    }
    console.log(house)
    // console.log(address.trim().replace('улица', '').replace('.','').trim())
  }

  // const features = mapRef.current.querySourceFeatures('123',{layers:['2dbuildings'], filter: ['>',['get','year_built'],0]})

  // const nice_address = address.toLowerCase()
  // const address_arr = nice_address.split(' ')
  // const house_num = address_arr[address_arr.length-1]
  // console.log(house_num)
  // const street_name = nice_address.replace(house_num, '').trim()
  // console.log(street_name)
  // const street = features.filter(feature => feature.properties.addr_stree?.toLowerCase().includes('космо'))
  // console.log(street)
  // const house = street.find(crib => crib.properties.addr_house.toLowerCase() === house_num) 
  // // const y = features[288].properties.addr_stree.includes('лип')
  // // console.log(features[288].properties.addr_stree)
  // if (house) {mapRef.current.flyTo({center: [house.properties.xc, house.properties.yc], zoom: 16, duration: 2000})
  // setSelectedBuilding({feature: house})}
  // console.log(house)

  //filters

  const yearFilter = useMemo(
    () => ['all',['>=', ['get','year_built'], epoque[0]],['<=', ['get','year_built'], epoque[1]], ['>',['get','year_lost'],epoque[1]]], [epoque]
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
        interactiveLayerIds={['2dbuildings','3dbuildings']}
        maxPitch={85}
        onClick={onClick}
        onWheel={onWheel}
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
        <Source id='123' type="geojson" data={buildings}>
          {descriptionActive && <Layer {...greyLayer} filter={backFilter}/>}
          {volumeActive && <Layer {...volumeLayer} filter={yearFilter}/>}
          {!volumeActive && <Layer {...flatLayer} filter={yearFilter}/>}
          
          {!descriptionActive && <Layer {...searchLayer}/>}
          {!descriptionActive && <Layer {...unsortedLayer} />}

          {selectedBuilding && <Layer {...selectLineLayer} filter={selectFilter} />}
          {selectedBuilding && volumeActive && <Layer {...selectVolumeLayer} filter={selectFilter} />}
          {selectedBuilding && !volumeActive && <Layer {...selectPolyLayer} filter={selectFilter} />}
        </Source>
        {/* <Source  id='321' type="geojson" data={raions}>
          {descriptionActive && <Layer {...raionLayer}/>}
        </Source> */}


      <ScaleControl/>
      {/* <NavigationControl/> */}
      </Map>

      {descriptionActive && 
        <Description 
          setDescriptionActive={setDescriptionActive} setEpoque={setEpoque} setZoom={setZoom} setSettings={setSettings} mapRef={mapRef}
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
          {!volumeActive && <h2>2D</h2>}{volumeActive && <h2>3D</h2>}
        </div>
      }
      {!descriptionActive &&
        <div className='button description-button' onClick={onDescriptionClick}>
          <h2>1</h2>
        </div>
      }
      {/* {!volumeActive && <Scale zoom={zoom}/>} */}
      
      <SliderTab epoque={epoque} setEpoque={setEpoque} descriptionActive={descriptionActive}/>
    </div>
  );
}

export default App;
