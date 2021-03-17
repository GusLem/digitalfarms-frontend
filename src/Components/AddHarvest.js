import axios from 'axios';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.min.css';

class AddHarvest extends Component {

    state = {
        startDate: new Date(),
        endDate: new Date(),
        opts: [],
        millId: -1,
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        if(this.state.millId !== -1)  {
            axios
            .post(process.env.REACT_APP_API_URL + '/harvest', {
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                mill: {
                    id: this.state.millId
                }
            })
            .then(res => {
                this.props.add(res.data, this.state.millId)
                alert(`Added Harvest, Code: ${res.data.id}`);
                this.setState({ name: '' });
            });
        }
        else {
            alert("Please fill the data properly")
        }

        
    }

    render() {
        return (
            
            <>
                <form className="m-1 row" onSubmit={this.onSubmit}>
                    <h3>Add Harvest</h3>
                    <div className="form-group">
                        <label>Start Date</label>
                        <DatePicker 
                            selected={this.state.startDate}
                            onChange={date => this.setState({ startDate: date })}
                        />
                    </div>
                    <div className="form-group">
                        <label>End Date</label>
                        <DatePicker 
                            selected={this.state.endDate}
                            onChange={date => this.setState({ endDate: date })}
                        />
                    </div>
                    <div className="form-group">
                    <label>Pick a Mill</label>
                    <Select options={this.props.opts} onChange={sel => this.setState({ millId: sel.value })}/>
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

export default AddHarvest;