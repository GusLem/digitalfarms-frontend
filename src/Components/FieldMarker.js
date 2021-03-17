import React from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import * as L from "leaflet";

const FieldMarker = (props) => {

    const LeafIcon = L.Icon.extend({
        options: {}
      });

    const greenIcon = new LeafIcon({
        iconUrl:
          "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF",
        iconAnchor: [12, 41],
      });

    useMapEvents({
      click(e) {
        props.setPosition([e.latlng.lat,e.latlng.lng])
      }
    })
  
    return props.position === null ? null : (
      <Marker position={props.position} icon={greenIcon} />
    )
  }

export default FieldMarker;