import React, {Component} from 'react';
import axios from "axios";
import './App.css'
import {Redirect} from "react-router-dom";
import defaultImage from './../images/toddler2.jpg';
// import {DirectionsService, DirectionsRenderer} from 'google-maps-react';

// import Map from './GoogleMap';


import {Card, Button,} from 'react-bootstrap';

const BASE_URL = process.env.REACT_APP_BASE_URL;


class APITrail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,

        }
    }


    // getDirections = (trail) => {
    //
    //     let lat = trail.latitude;
    //     let lng = trail.longitude;
    //     let name = trail.name;
    //
    //     if (this.state.redirect) {
    //         return <Redirect to={{pathname: '/simplemap', park: {lat: lat, lng: lng, name: name, crd: this.props.crd},}}/>
    //     }
    //
    //
    // };
    //
    //
    // setRedirect = () => this.setState({redirect: true});

    render() {
        return (

            <div className="col-12 col-sm-4 col-md-3">
                <Card className='deck'>
                    <Card.Img variant="top"
                              src={this.props.trail.imgMedium || this.props.trail.imgSmallMed || this.props.trail.imgSmall || this.props.trail.imgSqSmall || defaultImage}/>
                    <Card.Body>
                        <Card.Title>Trail Name:<br/>{this.props.trail.name}</Card.Title>
                        <Card.Text>Location:<br/>{this.props.trail.location}</Card.Text>
                        <Card.Text className='cardsummary'>Summary:<br/>{this.props.trail.summary}</Card.Text>
                        <Card.Text>{this.props.trail.park_name}</Card.Text>
                        <Button variant="info" type="button"
                                onClick={() => this.props.showDetails(this.props.trail, this.props.crd)}>Details</Button>
                    </Card.Body>
                </Card>

            </div>
        );
    }
}

class TrailList extends Component {


    constructor(props) {
        super(props);

        this.state = {
            trails: [],
            api: []
        }
    }

    componentDidMount() {
        this.getTrail();
        this.getApiData();
    }

    showDetails = (trail, crd) => {
        console.log('debuging', this.state.crd);
        console.log(trail);
        let trails = [...this.state.trails];

        for (let i = 0; i < trails.length; i++) {
            if (trails[i].reference_id === trail.id) {
                this.props.history.push({
                    pathname: `trails/${trails[i].id}`,
                    trail: trails[i],
                    crd: crd,
                });
                return;
            }
        }

        var obj = {};
        obj.reference_id = trail.id;
        obj.trail_name = trail.name;
        obj.location = trail.location;
        obj.summary = trail.summary || 'No summary provided';
        obj.longitude = trail.longitude;
        obj.latitude = trail.latitude;
        obj.length = trail.length;
        obj.difficulty = trail.difficulty;

        axios.post(`${BASE_URL}/api/v1/trails/`, obj, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('tinyTrailsToken')}`
            }
        })
            .then(response => {
                console.log('obj save', response.data);
                this.props.history.push({
                    pathname: `trails/${response.data.id}`,
                    trail: response.data,
                    crd: crd,
                });

            })
            .catch(error => {
                console.log('Oops, something went wrong', error);
            })
    };


    getTrail = () => {

        var lat = '${crd.latitude}';
        var lon = '${crd.longitude}';
        var max_distance = 20;
        var difficulty = 'green, blue';

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        var success = (pos) => {
            var crd = pos.coords;


            axios.get(`${BASE_URL}/api/v1/hiker_api/?lat=${crd.latitude}&lon=${crd.longitude}&max_distance=${max_distance}`)
                .then(response => {
                    console.log("trails", response.data.trails);
                    this.setState({api: response.data.trails});

                })
                .catch(error => {
                        // handle error
                        console.log('Something went wrong.', error);
                    }
                );
        };
    };

    getApiData = () => {

        var lat;
        var lon;
        var max_distance = 20;

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        var success = (pos) => {

            var crd = pos.coords;
            this.setState({crd: pos.coords});

            axios.get(`${BASE_URL}/api/v1/hiker_api/?lat=${crd.latitude}&lon=${crd.longitude}&max_distance=${max_distance}`)
                .then(response => {
                    console.log(response.data.trails);
                    let trails = response.data.trails.filter(trail => (
                        trail.difficulty === 'blue' || trail.difficulty === 'green'
                    ));
                    this.setState({api: trails});
                })
                .catch(error => {
                    console.log('Oops, something went wrong', error);
                });
        };

        var error = (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        };

       navigator.geolocation.getCurrentPosition(success, error, options);
    };

    render() {
        let trails = this.state.api.map(trail => {
            return <APITrail key={trail.id} trail={trail} showDetails={this.showDetails} crd={this.state.crd}/>
        });

        return (<div className='row'>{trails}</div>)
    }

}

export default TrailList