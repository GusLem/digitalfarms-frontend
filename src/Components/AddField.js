import axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

class AddField extends Component {

    state = {
        opts: [],
        farmId: -1,
        oneup: false
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        if(this.state.farmId !== -1)  {
            axios
            .post(process.env.REACT_APP_API_URL + '/field', {
                latitude: this.props.position[0],
                longitude: this.props.position[1],
                farm: {id: this.state.farmId}
            })
            .then(res => {
                this.props.add(res.data, this.state.farmId)
                alert(`Added Field, Code: ${res.data.id}`);
            });
        }
        else {
            alert("Please fill the data properly")
        }
    }

    onChangeLat = (e) => {
        this.props.setPosition([e.target.value,this.props.position[1]]);
    };

    onChangeLng = (e) => {
        this.props.setPosition([this.props.position[0],e.target.value]);
    };

    render() {
        return (
            <>
            <form className="m-1 row" onSubmit={this.onSubmit}>
                <h3>Add Field</h3>
                <div className="form-group">
                    <label>Latitude</label>
                    <input 
                        type="number" 
                        name="latitude" 
                        placeholder="latitude..." 
                        value={this.props.position[0]}
                        onChange={this.onChangeLat}
                    />
                </div>
                <div className="form-group">
                    <label>Longitude</label>
                    <input 
                        type="number" 
                        name="longitude" 
                        placeholder="longitude..." 
                        value={this.props.position[1]}
                        onChange={this.onChangeLng}
                    />
                </div>
                <div className="form-group">
                    <label>Pick a Farm</label>
                    <Select options={this.props.opts} onChange={sel => this.setState({ farmId: sel.value })}/>
                </div>
                <input 
                    type="submit" 
                    value="Submit" 
                    className="mt-2 btn btn-primary"
                />
                
            </form>
            <hr/>
            </>
        );
    }
}

export default AddField;

/*

*/