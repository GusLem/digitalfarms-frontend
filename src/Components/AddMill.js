import axios from 'axios';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class AddMill extends Component {

    state = {
        name: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        if(this.state.name) {
            axios
            .post('http://localhost:8080/mill', {
                name: this.state.name
            })
            .then(res => {
                this.props.add(res.data)
                alert("Added Mill.");
                this.setState({ name: '' });
            });
        }
        else {
            alert("Fill the name")
        }

        
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <>
            <form className="m-1 row" onSubmit={this.onSubmit}>
                <h3 className="mx-auto">Add Farm</h3>
                <div className="form-group">
                    <label>Insert Mill name</label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Name of the mill..." 
                        value={this.state.name}
                        onChange={this.onChange}
                    />
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

export default AddMill;