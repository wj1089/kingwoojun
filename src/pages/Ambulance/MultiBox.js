import React,{useState,useEffect,useRef} from "react";
// import Breadcrumb from "../common/breadcrumb";
// import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL,{Marker,Popup,NavigationControl,FlyToInterpolator} from 'react-map-gl'
import * as _ from 'underscore';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
// import MapboxLanguage,{setLayoutProperty} from '@mapbox/mapbox-gl-language'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
mapboxgl.accessToken = 'pk.eyJ1IjoianVuaHdhIiwiYSI6ImNrY3Q4NG5xNDE3bDIyeXBnZzg0NzZ0YzYifQ.c4ILQswrvoXNzakCMy82Hg';


// import 'mapbox-gl/dist/mapbox-gl.css';
// import 'react-map-gl-directions/dist/mapbox-gl-directions.css'
// import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
// // import ReactMapGL,{Marker,Popup,NavigationControl,FlyToInterpolator} from 'react-map-gl'
// import Directions from 'react-map-gl-directions'
// import Geocoder from 'react-map-gl-geocoder'
// import '../../styles/Map.css'
// import * as _ from 'underscore';
// import {Button, Col, Container, Form, Image, Modal, Row} from "react-bootstrap";


class Map extends React.Component  {
    componentDidMount() {
        // Creates new map instance
        const map = new mapboxgl.Map({
            container: this.mapWrapper, // Container ID
            style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
            center: [126.886020,37.553818], // Starting position [lng, lat]
            zoom:13 // Starting zoom level
        });
        //Change Language
        mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-language/v0.10.0/mapbox-gl-language.js');
        // map.addControl(new MapboxLanguage({ defaultLanguage: "ko"}));
        // Creates new directions control instance
        const directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/driving'
        });
        // Integrates directions control with map
        map.addControl(directions, 'top-left');
        var geojson = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [37.562167, 126.941056]
                    },
                    properties: {
                        title: '신촌 세브란스병원',
                        description: '서울 강서구 공항대로63길 14'
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [37.501736, 127.004716]
                    },
                    properties: {
                        title: '가톨릭대학교 서울성모병원',
                        description: '서울 강서구 공항대로 529'
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [37.579602, 126.998998]
                    },
                    properties: {
                        title: '서울대병원',
                        description: '서울 강서구 공항대로 561 강서보건소'
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [37.550999, 126.8589698]
                    },
                    properties: {
                        title: '고려대병원',
                        description: '서울 강서구 공항대로 549'
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [37.548885, 126.868082]
                    },
                    properties: {
                        title: '스타벅스 등촌역점',
                        description: '서울 양천구 공항대로 566'
                    }
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [37.5525892, 126.9367663]
                    },
                    properties: {
                        title: '비트캠프 신촌점',
                        description: '서울특별시 강서구 공항대로 529'
                    }
                }
            ]
        };
        geojson.features.forEach(function(marker) {
            // create a HTML element for each feature
            var el = document.createElement('div');
            el.className = 'marker';
            // make a marker for each feature and add to the map
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates) //Marker [lng, lat] coordinates
                .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
                .addTo(map); // Add the marker to the map
        });
        // Add zoom and rotation controls to the map.
        map.addControl(new mapboxgl.NavigationControl());
        //Add the geocoder
        var geocoder = new MapboxGeocoder({ // Initialize the geocoder
            accessToken: mapboxgl.accessToken, // Set the access token
            mapboxgl: mapboxgl, // Set the mapbox-gl instance
            marker: false, // Do not use the default marker style
            placeholder: '장소를 검색해주세요.'
        });
        // Add the geocoder to the map
        map.addControl(geocoder);
        // After the map style has loaded on the page,
        // add a source layer and default styling for a single point
        map.on('load', function() {
            map.addSource('single-point', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: []
                }
            });
            map.addLayer({
                id: 'point',
                source: 'single-point',
                type: 'circle',
                paint: {
                    'circle-radius': 10,
                    'circle-color': '#448ee4'
                }
            });
            // Listen for the `result` event from the Geocoder
            // `result` event is triggered when a user makes a selection
            // Add a marker at the result's coordinates
            geocoder.on('result', function(ev) {
                map.getSource('single-point').setData(ev.result.geometry);
            });
        });
    }
    render() {
        return (
            // Populates map by referencing map's container property
            <>
                <div
                    ref={el => (this.mapWrapper = el)}
                    className="mapWrapper"
                />

            </>
        );
    }
};
export default Map;