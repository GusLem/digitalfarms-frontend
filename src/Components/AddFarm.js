import axios from 'axios';
import React, { Component } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

class AddFarm extends Component {

    state = {
        name: '',
        opts: [],
        harvestId: -1
    }

    onSubmit = (e) => {
        e.preventDefault();

        console.log(this.state.name, this.state.harvestId)
        
        if(this.state.name && this.state.harvestId !== -1)  {
            axios
            .post('http://localhost:8080/farm', {
                name: this.state.name,
                harvest: {id: this.state.harvestId}
            })
            .then(res => {
                this.props.add(res.data, this.state.harvestId)
                alert("Added Farm.");
                this.setState({ name: '' });
            });
        }
        else {
            alert("Please fill the data properly")
        }

    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <>
            <form className="m-1 row" onSubmit={this.onSubmit}>
                <h3>Add Farm</h3>
                <div className="form-group">
                    <label>Insert name</label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Name of the farm..." 
                        value={this.state.name}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Select Harvest Code</label>
                    <Select options={this.props.opts} onChange={sel => this.setState({ harvestId: sel.value })}/>
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

export default AddFarm;