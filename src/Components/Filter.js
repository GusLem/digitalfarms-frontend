import React, { Component } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

class Filter extends Component {

    state = {
        
    }

    filterMill = (millObj) => {
        
        this.props.filterMill(millObj)

    }

    filterHarvest = (value) => {
        
        
        this.props.filterHarvest(value)

    }

    filterFarm = (farmObj) => {
        
        this.props.filterFarm(farmObj)
    }

    filterField = (value) => {
        
        this.props.filterField(value)
    }

    render() {
        return (
            <div className="row">
                <div className="form-group">
                    <label>Mill Name</label>
                    <Select options={this.props.millOpts} onChange={mill => this.filterMill(mill)} value={this.props.mill} />
                </div>
                <div className="form-group">
                    <label>Harvest Start Date</label>
                    <DatePicker selected={this.props.startDate} onChange={startDate => this.props.filterStartDate(startDate)} />
                </div>
                <div className="form-group">
                    <label>Harvest End Date</label>
                    <DatePicker selected={this.props.endDate} onChange={endDate => this.props.filterEndDate(endDate)}/>
                </div>
                <div className="form-group">
                    <label>Harvest Code</label>
                    <Select options={this.props.harvestOpts} onChange={harvest => this.filterHarvest(harvest.value)} value={this.props.harvest} />
                </div>
                <div className="form-group">
                    <label>Farm Name</label>
                    <Select options={this.props.farmOpts} onChange={farm => this.filterFarm(farm)} value={this.props.farm} />
                </div>
                <div className="form-group">
                    <label>Field Code</label>
                    <Select options={this.props.fieldOpts} onChange={field => this.filterField(field.value)} value={this.props.field} />
                </div>
            </div>
        );
    }
}

export default Filter;