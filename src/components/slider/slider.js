import ReactSlider from 'react-slider';
import './slider.css'
// import "react-range-slider-input/dist/style.css";
// import ReactSlider from 'react-range-slider-input'

export const SliderTab = (props) => {
    return (
        <div className='slider-div'>
        <div className='slider-counter'>
          <span>{!props.descriptionActive && props.epoque[0] || 1781}</span>
        </div>
        <ReactSlider
            className="horizontal-slider"
            thumbClassName="slider-thumb"
            trackClassName="slider-track"
            defaultValue={props.epoque}
            min={1781}
            max={2024}
            step={1}
            // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            // renderMark={(props, state) => <div {...props}>{}</div>}
            onAfterChange={(value, index) => {props.setEpoque(value)}}
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
            <span>{!props.descriptionActive && props.epoque[1] || 2024}</span>
        </div>

      </div>
    )
}