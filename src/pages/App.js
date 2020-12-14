import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import '../site.css';
import mrk from '../img/mrk.png'
import AddPopup from '../components/addPopup'
import {addMarker} from  '../reducers/map/actions'

import mapboxgl from 'mapbox-gl';

function App() {
    const dispatch = useDispatch();
    const {payload} = useSelector(state => state.map.geoData);
    const [mapSettings, setMapSettings] = useState({
        lng: -77.020945,
        lat: 38.878241,
        zoom: 17,
    });
    const [addInfo, setAddInfo] = useState({
        isOpen: false,
        title: '',
        description: '',
        lng: 0,
        lat: 0,
    });

    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoibmlraXRhYm9nZGFub3YiLCJhIjoiY2tpZnd2N3ZhMDI2aDJ1bzMwcXdlaTF6cyJ9.TG6WMDhBBdEZ02AnCstRrw';
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [mapSettings.lng, mapSettings.lat],
            zoom: mapSettings.zoom,
        });

        map.on('load', () => { onLoad(map) });
        map.on('click', 'buildings', e => { onMapClick(e, map) });
    }, []);


    const onMapClick = (event, map) => {
        event.preventDefault();
        setAddInfo({
            isOpen: true,
            title: '',
            description: '',
            lng: event.lngLat.lng,
            lat: event.lngLat.lat,
        });

        setMap(map);
    };

    const onAdd = () => {
        if (map === null) return;

        map.getSource('places').setData({
                'type': 'FeatureCollection',
                'features': [...map.getSource('places')._data.features,
                    {
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
                ]
            }
        );

        setAddInfo({
            isOpen: false,
            title: '',
            description: '',
            lng: 0,
            lat: 0,
        });

        dispatch(addMarker(map.getSource('places')._data.features));
        localStorage.setItem("geoData", JSON.stringify(map.getSource('places')._data.features));
    };

    const onLoad = (map) => {
        var layers = map.getStyle().layers;

        var labelLayerId;
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                labelLayerId = layers[i].id;
                break;
            }
        }

        map.addLayer(
            {
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
            },
            labelLayerId
        );

        map.addLayer(
            {
                'id': 'buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
            },
            labelLayerId
        );

        map.loadImage(mrk, function (error, image) {
            map.addImage('custom-marker', image);

            map.addSource('places', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': payload
                }
            });

            map.addLayer({
                'id': 'places',
                'type': 'symbol',
                'source': 'places',
                'layout': {
                    'icon-image': 'custom-marker',
                    'icon-allow-overlap': true
                }
            });
        });

        var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        map.on('mouseenter', 'places', function (e) {
            map.getCanvas().style.cursor = 'pointer';

            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.description;
            var title = e.features[0].properties.title;

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            popup.setLngLat(coordinates).setHTML(`<p class="tooltip-title">${title}<p/><p class="tooltip-description">${description}<p/>`).addTo(map);
        });

        map.on('mouseleave', 'places', function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
    };

    const handleOnChange = (value, field) => {
        setAddInfo({
            ...addInfo,
            [field]: value
        })
    };

    return (
        <div className="App">
            <div ref={mapContainer} className="mapContainer"/>
            {addInfo.isOpen && <AddPopup onChange={handleOnChange} onAdd={onAdd}/>}
        </div>
    );
}

export default App;
