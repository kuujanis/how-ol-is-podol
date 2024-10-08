import ReactSlider from 'react-slider';
import './slider.css'
import { useDispatch, useSelector } from 'react-redux';
import { setEpoque } from '../../services/slices/map/map-slice';
// import "react-range-slider-input/dist/style.css";
// import ReactSlider from 'react-range-slider-input'

export const SliderTab = () => {

  const dispatch = useDispatch()

  const descriptionActive = useSelector(state => state.map.description)
  const epoque = useSelector(state => state.map.epoque)

    return (
        <div className='slider-div'>
        <div className='slider-counter'>
          <span>{!descriptionActive && epoque[0] || 1781}</span>
        </div>
        {/* <div>
          <div>
            <span></span>
          </div>
        </div> */}
        <ReactSlider
            className="horizontal-slider"
            thumbClassName="slider-thumb"
            trackClassName="slider-track"
            markClassName='slider-mark'
            defaultValue={epoque}
            min={1781}
            max={2024}
            step={1}
            // marks={[1871,1922,1940,1958,1975,1992,2006, 2024]}
            // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            // renderMark={(props) => <span {...props} />}
            onAfterChange={(value, index) => {dispatch(setEpoque(value))}}
            minDistance={0}
        />

        {/* <ReactSlider 
          id='range-slider-yellow'
          value={epoque}
          onInput={setEpoque}
          defaultValue={[epoque[0], epoque[1]]}
          min={1781}
          max={2024}
          step={1}
        /> */}

        <div className='slider-counter'>
            <span>{!descriptionActive && epoque[1] || 2024}</span>
        </div>

      </div>
    )
}