import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import '../../site.css';
import mrk from '../../img/mrk.png'
import AddPopup from '../../components/addPopup'
import {addMarker, mapMovement} from  '../../reducers/map/actions'

import mapboxgl from 'mapbox-gl';
import * as constants from './constants'
import Tooltip from "../../components/tooltip";

import ReactDOM from 'react-dom';

function Map() {
    const dispatch = useDispatch();
    const {payload} = useSelector(state => state.map.geoData);
    const {mapSettings} = useSelector(state => state.map);
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

        map.on('load', () => onLoad(map));
        map.on('click', 'buildings', e => onMapClick(e, map));
        map.on('moveend', () => onMapMove(map));
    }, []);

    const onMapMove = (map) => {
        dispatch(mapMovement({
            lng: map.getCenter().lng.toFixed(4),
            lat: map.getCenter().lat.toFixed(4),
            zoom: map.getZoom().toFixed(2),
        }))
    };

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
        map.getSource('places').setData({
                'type': 'FeatureCollection',
                'features': [...map.getSource('places')._data.features,
                    constants.newFeature(addInfo)
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
        addLayers(map);
        addTooltips(map);
    };

    const addLayers = (map) => {
        let layers = map.getStyle().layers;
        let labelLayerId;
        for (let i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                labelLayerId = layers[i].id;
                break;
            }
        }
        map.addLayer(constants.buildings3dLayer, labelLayerId);
        map.addLayer(constants.buildings2dLayer, labelLayerId);
        map.loadImage(mrk, function (error, image) {
            map.addImage('custom-marker', image);
            map.addSource('places', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': payload
                }
            });
            map.addLayer(constants.placesLayer);
        });
    };

    const addTooltips = (map) => {
        const popup = new mapboxgl.Popup({closeButton: false});
        const placeholder = document.createElement('div');

        map.on('mouseenter', 'places', function (e) {
            map.getCanvas().style.cursor = 'pointer';

            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;
            const title = e.features[0].properties.title;

            ReactDOM.render(<Tooltip title={title} description={description}/>, placeholder);

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            popup.setLngLat(coordinates).setDOMContent(placeholder).addTo(map);
        });

        map.on('mouseleave', 'places', function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
    };

    const handleOnChange = (value, field) => {
        setAddInfo({...addInfo, [field]: value})
    };

    return (
        <div className="App">
            <div ref={mapContainer} className="mapContainer"/>
            {addInfo.isOpen && <AddPopup addInfo={addInfo} onChange={handleOnChange} onAdd={onAdd} onCancel={()=>setAddInfo({...addInfo, isOpen: false})}/>}
        </div>
    );
}

export default Map;
