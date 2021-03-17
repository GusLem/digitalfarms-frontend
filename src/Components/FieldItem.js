import React from 'react';

const FieldItem = (props) => {
    return (
        <div>
            <p>Latitude: {props.field.latitude}</p>
            <p>Longitude: {props.field.longitude}</p>
        </div>
    );
};

export default FieldItem;