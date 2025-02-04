
const EPOQUES = [
    [1, 'gray'],
    [1781, '#e51728'],
    [1782, '#e57316'],
    [1872, '#e5a717'],
    [1923, '#e6caa0'],
    [1941, '#f3f3f3'],
    [1959, '#a1e6db'],
    [1975, '#17afe6'],
    [1992, '#1616ff'],
    [2008, '#ab17e6'],
];

export const histogram = [
  {color: '#e57316', share: 0.01, vw: '37%', number: 32, epoque:[1781, 1870]},
  {color: '#e5a717', share: 0.03, vw: '21%', number: 110, epoque:[1871, 1922]},
  {color: '#e6caa0', share: 0.06, vw: '7%', number: 168, epoque:[1923, 1940]},
  {color: '#f3f3f3', share: 0.07, vw: '7%', number: 338, epoque:[1941, 1958]},
  {color: '#a1e6db', share: 0.27, vw: '7%', number: 879, epoque:[1959, 1974]},
  {color: '#17afe6', share: 0.13, vw: '7%', number: 366, epoque:[1975, 1991]},
  {color: '#1616ff', share: 0.14, vw: '7%', number: 270, epoque:[1992, 2007]},
  {color: '#ab17e6', share: 0.30, vw: '7%', number: 584, epoque:[2008, 2024]}
]

const line = ['rgba', 100, 100, 100, 1]

export const selectPolyLayer = {
  id: 'selected-poly',
  type: 'fill',
  layout: {},
  paint: {
      'fill-color': line,
      "fill-outline-color": line,
      'fill-opacity': 0.5
  }  
}
export const selectVolumeLayer = {
  id: 'selected-volume',
  type: 'fill-extrusion',
  layout: {},
  'paint': {
    'fill-extrusion-color': line,
    'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['zoom'],
        9, 0,
        10, ['*',['get', 'lvl'],5]
    ],
    'fill-extrusion-opacity': 0.5,
},
}

export const selectLostVolume = {
  id: 'select-lost',
  type: 'fill-extrusion',
  layout: {},
  'paint': {
    'fill-extrusion-color': line,
    'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['zoom'],
        9, 0,
        10, ['*',['get', 'lvl'],5]
    ],
    'fill-extrusion-opacity': 0.5,
},
}
export const selectLost = {
  id: 'select-lost',
  type: 'fill',
  layout: {},
  paint: {
      'fill-color': line,
      "fill-outline-color": line,
      'fill-opacity': 0.5
  }  
}

export const build2d = {
  id: 'build2d',
  type: 'fill',
  layout: {},
  paint: {
      'fill-color': {
        property: 'year_built',
        type: 'interval',
        stops: EPOQUES
      },
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        1,
        0.0001
      ]
  }  
}
export const build3d = {
    id: 'build3d',
    'type': 'fill-extrusion',
    'minzoom': 9,
    'paint': {
        'fill-extrusion-color': {
          property: 'year_built',
          type: 'interval',
          stops: EPOQUES
        },
        'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            9, 0,
            10, ['*',['get', 'lvl'],5]
        ]
    },
    filter: ['>',['get','year_built'],0]
}
export const buildGray = {
  id: 'buildGray',
  type: 'fill',
  layout: {},
  paint: {
      'fill-color': {
        property: 'year_built',
        type: 'interval',
        stops: EPOQUES,
      },
      'fill-opacity': 0.3
  },
  filter: ['>',['get','year_built'],0]   
}
export const lost2d = {
  ...build2d,
  id: 'lost2d'
}
export const lost3d = {
  ...build3d,
  id: 'lost3d'
}
export const lostGray = {
  ...buildGray,
  id: 'lostGray'
}


export const searchLayer = {
  id: 'search',
  type: 'fill',
  layout: {},
  paint: {
      'fill-color': {
        property: 'year_built',
        type: 'interval',
        stops: EPOQUES,
      },
      'fill-opacity': 0
  },
  filter: ['>',['get','year_built'],0] 
}
export const unsortedLayer = {
  id: 'unsorted',
  type: 'fill',
  paint: {
    'fill-color': 'transparent',
    'fill-outline-color': '#ffffff',
    'fill-opacity': 0.3
  },
  filter: ['<',['get','year_built'],1]
}

export const circleLayer = {
  id: 'circle',
  type: 'fill',
  layout: {},
  paint: {
    'fill-color': 'rgba(150, 150, 150, 0.4)',
    'fill-opacity': 0.3,
  }
}
export const circleBorderLayer = {
  id: 'circle-border',
  type: 'line',
  paint: {
    'line-color': 'rgb(255, 255, 255)',
    'line-width': 3
  }
}

export const lensePointLayer = {
  id: 'lense-point',
  type: 'circle',
  paint: {
    'circle-color': 'white'
  }
}

export const lenseLineLayer = {
  id: 'lense-line',
  type: 'line',
  paint: {
    'line-color': 'rgb(255, 255, 255)',
    'line-width': 1
  }
}

// export const raionLayer = {
//   id: 'raions',
//   type: 'symbol',
//   maxzoom: 15,
//   minzoom: 11,
//   layout: {
//     'text-field': ['get','name'],
//     'text-size': 11
//   },
//   paint: {
//     'text-color': white,
//     'text-halo-width': 8,
//     'text-halo-blur': 80,
//     'text-halo-color': grey
//   }
// }
// export const selectLineLayer = {
//   id: 'slected-line',
//   type: 'line',
//   layout: {},
//   paint: {
//       "line-color": line,
//       'line-width': 3
//   }  
// }

export const disabledSettings = {    
  scrollZoom: false,
  boxZoom: false,
  dragRotate: false,
  dragPan: false,
  keyboard: false,
  doubleClickZoom: false,
  touchZoomRotate: false,
  touchPitch: false,
}

export const enabledSettings = {
  scrollZoom: true,
  boxZoom: true,
  dragRotate: false,
  dragPan: true,
  keyboard: true,
  doubleClickZoom: true,
  touchZoomRotate: true,
  touchPitch: true,
}