
const EPOQUES = [
    [1, 'gray'],
    [1781, '#e51728'],
    [1782, '#e57316'],
    [1871, '#e5a717'],
    [1921, '#e6caa0'],
    [1943, '#f3f3f3'],
    [1958, '#a1e6db'],
    [1973, '#17afe6'],
    [1993, '#1616e5'],
    [2014, '#ab17e6'],
];

const fill = ['rgba', 0, 255, 0, 0.5]
const line = ['rgba', 0, 255, 0, 1]
const grey = ['rgba', 70, 70, 70, 1]

export const selectPolyLayer = {
  id: 'slected-poly',
  type: 'fill',
  layout: {},
  paint: {
      'fill-color': fill,
      "fill-outline-color": line
  }  
}
export const selectVolumeLayer = {
  id: 'slected-volume',
  type: 'fill-extrusion',
  layout: {},
  'paint': {
    'fill-extrusion-color': line,
    'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['zoom'],
        9, 0,
        10, ['*',['get', 'level'],5]
    ],
    'fill-extrusion-opacity': 1,
},
}
export const selectLineLayer = {
  id: 'slected-line',
  type: 'line',
  layout: {},
  paint: {
      "line-color": line,
      'line-width': 3
  }  
}

export const volumeLayer = {
    id: '3dbuildings',
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
            10, ['*',['get', 'level'],5]
        ]
    },
  filter: ['>',['get','year_built'],0]
}
export const flatLayer = {
  id: '2dbuildings',
  type: 'fill',
  layout: {},
  paint: {
      'fill-color': {
        property: 'year_built',
        type: 'interval',
        stops: EPOQUES
      },
  }  
}
export const greyLayer = {
  id: 'greybuildings',
  type: 'fill',
  layout: {},
  paint: {
      'fill-color': grey
  },
  filter: ['>',['get','year_built'],0] 
}


export const unsortedLayer = {
  id: 'unsortedBuildings',
  type: 'fill',
  minzoom: 15,
  paint: {
    'fill-color': 'transparent',
    'fill-outline-color': '#ffffff',
    'fill-opacity': 0.5
  },
  filter: ['<',['get','year_built'],1]
}