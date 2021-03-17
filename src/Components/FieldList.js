import React from 'react';
import { Marker } from 'react-leaflet';

const FieldList = (props) => {
    //return (props.fields.map((field) => (<FieldItem key={field.id} field={field} />)));
    return (props.fields.map((field) => (<Marker position={[field.latitude,field.longitude]} />)));
};

export default FieldList;