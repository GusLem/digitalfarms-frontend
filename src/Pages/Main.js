import axios from 'axios';
import React, { Component } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import AddFarm from '../Components/AddFarm';
import AddField from '../Components/AddField';
import AddHarvest from '../Components/AddHarvest';
import AddMill from '../Components/AddMill';
import FieldList from '../Components/FieldList';
import Filter from '../Components/Filter';
import 'bootstrap/dist/css/bootstrap.min.css';
import FieldMarker from '../Components/FieldMarker';

class Main extends Component {

    state = {
        mills: [],
        harvests: [],
        farms: [],
        fields: [],
        millsOpts: [],
        harvestsOpts:[],
        farmsOpts: [],
        fieldsOpts: [],
        filteredHarvestsRaw:[],
        filteredHarvests:[],
        filteredHarvestOpts:[],
        filteredFarms:[],
        filteredFarmsOpts:[],
        filteredFields:[],
        filteredFieldOpts:[],
        selectedFields: [],
        mill: {value: null, label: ""},
        farm: {value: null, label: ""},
        harvest: {value: null, label: ""},
        field: {value: null, label: ""},
        startDate: new Date(),
        endDate: new Date(),
        newFieldPosition: [-23,-46],
    }

    componentDidMount () {
        axios.get(process.env.REACT_APP_API_URL + '/mill')
            .then((res) => {
                this.setState({mills: res.data});

                this.OptMills(this.state.mills)

                this.updateHarvest()

                this.updateFarm()

                this.updateField()
            })

        
    }

    addMill = (mill) => {
        mill.harvests = []

        this.setState({mills: [...this.state.mills,mill]})

        this.OptMills(this.state.mills)

        this.updateFilter()

    }

    addHarvest = (harvest, millId) => {

        harvest.farms = []

        let mill = this.state.mills.find(mill => mill.id === millId)

        mill.harvests = [...mill.harvests, harvest]

        this.setState({harvests: []})

        this.updateHarvest()

        this.updateFilter()
    }

    addFarm = (farm, harvestId) => {

        farm.fields = []

        let harvest = this.state.harvests.find(harvest => harvest.id === harvestId)

        harvest.farms = [...harvest.farms,farm]

        this.setState({farms: []})

        this.updateFarm()

        this.updateFilter()
    }

    addField = (field, farmId) => {

        let farm = this.state.filteredFarms.find(farm => farm.id === farmId)

        farm.fields = [...farm.fields,field]

        this.setState({fields: []})

        this.updateField()

        this.updateFilter()
    }

    updateHarvest = () => {
        this.state.mills.forEach((element) => {
            this.setState({harvests: [...this.state.harvests,...element.harvests]})
        })

        this.OptHarvests(this.state.harvests)

        this.setState({filteredHarvests: this.state.harvests})

        this.OptFiltHarvests(this.state.harvests)
    }

    updateFarm = () => {
        this.state.harvests.forEach((element) => {
            this.setState({farms: [...this.state.farms,...element.farms]})
        })
        
        this.OptFarms(this.state.farms)

        this.setState({filteredFarms: this.state.farms})

        this.OptFiltFarms(this.state.filteredFarms)
    }

    updateField = () => {
        this.state.farms.forEach((element) => {
            this.setState({fields: [...this.state.fields,...element.fields]})
        })

        this.setState({filteredFields: this.state.fields})

        this.OptFiltFields(this.state.filteredFields)

        this.setState({selectedFields: this.state.filteredFields})
    }

    updateFilter = () => {
        this.setState({
            selectedFields: this.state.fields,
            mill: {value: null, label: ""},
            farm: {value: null, label: ""},
            harvest: {value: null, label: ""},
            field: {value: null, label: ""}, 
        })
    }

    updateFieldPosition = (position) => {
        this.setState({newFieldPosition: position})
    }

    OptMills = (filtMills) => {

        const millOpts = filtMills.map((mill) => {
            return {value: mill.id, label: mill.name};
        })
        this.setState({millsOpts: millOpts})

    }

    OptHarvests = (filtHarvests) => {
        const HarvOpts = filtHarvests.map((harvest) => {
            return {value: harvest.id, label: harvest.id};
        })
        this.setState({harvestsOpts: HarvOpts})
    }

    OptFarms = (filtFarms) => {
        const FarmsOpts = filtFarms.map((farm) => {
            return {value: farm.id, label: `${farm.id} - ${farm.name}`};
        })

        this.setState({farmsOpts: FarmsOpts})
    }

    OptFields = (filtFields) => {
        const FieldOpts = filtFields.map((field) => {
            return {value: field.id, label: field.id}
        })

        this.setState({fieldsOpts: FieldOpts})
    }


    OptFiltHarvests = (filtHarvests) => {
        const filteredHarvOpts = filtHarvests.map((harvest) => {
            return {value: harvest.id, label: harvest.id};
        })

        this.setState({filteredHarvestOpts: filteredHarvOpts})
    }

    OptFiltFarms = (filtFarms) => {
        const filteredFarmsOpts = filtFarms.map((farm) => {
            return {value: farm.id, label: `${farm.id} - ${farm.name}`};
        })

        this.setState({filteredFarmsOpts: filteredFarmsOpts})
    }

    OptFiltFields = (filtFields) => {
        const filteredFieldOpts = filtFields.map((field) => {
            return {value: field.id, label: field.id}
        })

        this.setState({filteredFieldOpts: filteredFieldOpts})
    }

    millOptsWithAll = () => {
        const arr = [{value: -1, label: "All"},...this.state.millsOpts];
        return arr;
    }

    filterByMill = (millObj) => {
        this.setState({mill: millObj})
        this.setState({farm: {value: null, label: ""}})
        this.setState({harvest: {value: null, label: ""}})
        this.setState({field: {value: null, label: ""}})

        let inHarvests = [];
        let inFarms = [];
        let inFields = [];

        let mill = this.state.mills.find(mill => mill.id === millObj.value)

        if (!mill) {
            inHarvests = this.state.harvests
        }
        else {
            inHarvests = mill.harvests
        }

        this.setState({filteredHarvestsRaw: inHarvests})
        
        this.OptFiltHarvests(inHarvests)

        inHarvests.forEach((element) => {
            inFarms = [...inFarms,...element.farms]

        })

        this.setState({filteredFarms: inFarms})

        this.OptFiltFarms(inFarms)

        if (inFarms.length === 0)
            this.setState({filteredFarms: []})

        inFarms.forEach((element) => {
            inFields = [...inFields,...element.fields]
            
        })

        this.setState({filteredFields: inFields})

        this.OptFiltFields(inFields)

        this.setState({selectedFields: inFields})
        
    }

    filterByStartDate = (startDate) => {

        this.setState({startDate: startDate})
        
        const arr = this.state.filteredHarvestsRaw.filter((elem) => {
            const dato = new Date(elem.endDate)
            return ((dato.getTime() >= startDate.getTime()) && (dato.getTime() <= this.state.endDate.getTime()))
        })
        this.setState({filteredHarvests: arr})

        this.OptFiltHarvests(arr)

    }

    filterByEndDate = (endDate) => {

        this.setState({endDate: endDate})
        
        const arr = this.state.filteredHarvestsRaw.filter((elem) => {
            const dato = new Date(elem.endDate)
            return ((dato.getTime() >= this.state.startDate.getTime()) && (dato.getTime() <= endDate.getTime()))
        })
        this.setState({filteredHarvests: arr})

        this.OptFiltHarvests(arr)
    }
    

    filterByHarvest = (harvestId) => {

        this.setState({harvest: {value: harvestId, label: harvestId}})
        this.setState({farm: {value: null, label: ""}})
        this.setState({field: {value: null, label: ""}})

        let inFarms = [];
        let inFields = [];

        let harvest = this.state.filteredHarvests.find(harvest => harvest.id === harvestId)

        inFarms = harvest.farms

        this.setState({filteredFarms: inFarms})

        this.OptFiltFarms(inFarms)

        if (inFarms.length === 0)
            this.setState({filteredFarms: []})

        inFarms.forEach((element) => {
            inFields = [...inFields,...element.fields]
            
        })

        this.setState({filteredFields: inFields})

        this.OptFiltFields(inFields)

        this.setState({selectedFields: inFields})
        
    }


    filterByFarm = (farmObj) => {

        this.setState({farm: farmObj})
        this.setState({field: {value: null, label: ""}})

        let inFields = [];

        let farm = this.state.filteredFarms.find(farm => farm.id === farmObj.value)

        inFields = farm.fields

        this.setState({filteredFields: inFields})

        this.OptFiltFields(inFields)

        this.setState({selectedFields: inFields})
        
    }

    filterByField = (fieldId) => {

        this.setState({field: {value: fieldId, label: fieldId}})

        let field = this.state.filteredFields.find(field => field.id === fieldId)

        this.setState({selectedFields: [field]})

    }

    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-dark navbar-bg-custom">
                    <button class="btn btn-link mx-2 navbar-brand" href="#">Digital Farms</button>
                </nav>
                <div className="row">
                    <div className="col-3">
                        <h1>Add</h1>
                        <AddMill add={this.addMill} />

                        <AddHarvest add={this.addHarvest} opts={this.state.millsOpts} />

                        <AddFarm add={this.addFarm} opts={this.state.harvestsOpts}/>

                        <AddField add={this.addField} opts={this.state.farmsOpts} position={this.state.newFieldPosition} setPosition={this.updateFieldPosition}/>
                    </div>
                    <div className="col-3">
                        <h1>Filter</h1>
                        <Filter 
                            millOpts={this.millOptsWithAll()} 
                            farmOpts={this.state.filteredFarmsOpts}
                            harvestOpts={this.state.filteredHarvestOpts}
                            fieldOpts={this.state.filteredFieldOpts} 
                            filterMill={this.filterByMill}
                            filterHarvest={this.filterByHarvest}  
                            filterFarm={this.filterByFarm}
                            filterField={this.filterByField}
                            filterStartDate={this.filterByStartDate}
                            filterEndDate={this.filterByEndDate}
                            mill={this.state.mill}
                            harvest={this.state.harvest} 
                            farm={this.state.farm} 
                            field={this.state.field}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            
                        />
                    </div>
                    
                    <div className="col-4">
                        <h1>Fields</h1>
                        <h5>Click on map to choose latitude and longitude for field</h5>
                        <MapContainer style={mapStyle} center={[-23,-46]} zoom={6} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <FieldMarker position={this.state.newFieldPosition} setPosition={this.updateFieldPosition} />
                            <FieldList fields={this.state.selectedFields} />
                        </MapContainer>
                        
                    </div>
                </div>
            </div>
        );
    }
}

const mapStyle = {
    width: "154%",
    height: "90%"
}

export default Main;