export const buildings3dLayer = {
    'id': '3d-buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
        'fill-extrusion-color': '#aaa',
        'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height']
        ],
        'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height']
        ],
        'fill-extrusion-opacity': 0.6
    }
};

export const buildings2dLayer = {
    'id': 'buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
};

export const placesLayer = {
    'id': 'places',
    'type': 'symbol',
    'source': 'places',
    'layout': {
        'icon-image': 'custom-marker',
        'icon-allow-overlap': true
    }
};

export const newFeature = (addInfo) => {
    return {
        'type': 'Feature',
        'properties': {
            'title': addInfo.title,
            'description': addInfo.description,
        },
        'geometry': {
            'type': 'Point',
            'coordinates': [addInfo.lng, addInfo.lat]
        }
    }
};