import React, {Component} from 'react';
import axios from "axios";
import './App.css'
import {Card, Button, Form} from 'react-bootstrap';

import GoogleMapReact from 'google-map-react';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


const BASE_URL = process.env.REACT_APP_BASE_URL;
const Marker = ({text}) => <div>{text}
    <i className="fas fa-child"></i>
</div>;


class Map extends Component {

    static defaultProps = {
        center: {
            lat: 34.85,
            lng: -82.31
        },
        zoom: 11
    };


    render() {


        console.log('this.props', this.props);

        return (

            // Important! Always set the container height explicitly
            <div style={{height: '100vh', width: '100%'}}>

                <GoogleMapReact
                    bootstrapURLKeys={{key: `$process.env.REACT_APP_GOOGLE_MAPS_API_KEY`}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <Marker
                        lat={Number(this.props.trail.latitude) ? Number(this.props.trail.latitude) : 34.85}
                        lng={Number(this.props.trail.longitude) ? Number(this.props.trail.longitude) : -82.31}
                        text={this.props.trail ? this.props.trail.trail_name : ""}
                    />
                    <Marker
                        lat={this.props.crd ? this.props.crd.latitude : 34.85}
                        lng={this.props.crd ? this.props.crd.longitude : -82.31}
                        text={this.props.crd ? "You are here!" : ""}
                    />

                </GoogleMapReact>
            </div>
        );
    }
}

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            isEditing: false
        }
    }

    componentDidMount() {
        let text = this.props.comment.text;
        this.setState({text})
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleUpdate = (e) => {
        this.setState({isEditing: false});

        let comment = Object.assign({}, this.props.comment);
        comment.text = this.state.text;

        axios.put(`${BASE_URL}/api/v1/comments/${this.props.comment.id}/`, comment)
            .then(response => {
                console.log('comment saved', response.data);
            })
            .catch(error => {
                console.log('Oops, something went wrong', error);
            })

    };

    render() {
        return (
            <div>
                <Card className="trail comment">
                    {this.state.isEditing ? (
                        <div>
                            <Form.Group>
                                <Form.Control name="text" as="textarea" rows="3" value={this.state.text}
                                              onChange={this.handleInput}/>
                            </Form.Group>
                            <Button variant="primary" as='link' onClick={this.handleUpdate}>Update</Button>
                            <Button variant="link" onClick={() => this.setState({isEditing: false})}>Cancel</Button>
                        </div>
                    ) : (
                        <div>
                            {this.state.text}
                            <Button variant="link" onClick={() => this.setState({isEditing: true})}>Edit</Button>
                            <Button variant="link" onClick={this.props.handleDelete}>Delete</Button>
                        </div>
                    )}
                </Card>

            </div>
        )
    }
}

class Trail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trail: {comments: []},
            text: ''
        }
    }

    componentDidMount() {
        if (this.props.location.trail) {
            this.setState({trail: this.props.location.trail})
        } else {
            this.getTrail()
        }
        this.getApiData()
    }

    getTrail = () => {
        axios.get(`${BASE_URL}/api/v1/trails/${this.props.match.params.id}/`)
            .then(response => {
                console.log('trail test', response.data);
                this.setState({trail: response.data});
            })
            .catch(error => {
                console.log('Oops, something went wrong', error);
            })
    };

    addComment = (e) => {
        let trail = Object.assign({}, this.state.trail);
        let comment = {};
        comment.trail = this.state.trail.id;
        comment.text = this.state.text;
        axios.post(`${BASE_URL}/api/v1/comments/`, comment)
            .then(response => {
                console.log('comment', response.data);
                trail.comments.unshift(response.data);
                this.setState({trail: trail, text: ''});
            })
            .catch(error => {
                console.log('Oops, something went wrong', error);

            });
    };

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };


    handleDelete = (comment) => {
        // console.log(comment);
        let trail = Object.assign({}, this.state.trail);
        let comments = trail.comments;
        let index = comments.indexOf(trail);
        comments.splice(index, 1);
        trail.comments = comments;
        this.setState({trail});
        axios.delete(`${BASE_URL}/api/v1/comments/${comment.id}/`)
            .then(response => {
                console.log('comment deleted', response.data);
            })
            .catch(error => {
                console.log('Oops, something went wrong', error);
            });
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
            console.log("I am here", pos.coords);

        };

        var error = (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        };

       navigator.geolocation.getCurrentPosition(success, error, options);
    };

    render() {



        console.log('one two', this.props.location.crd);
        let comments = this.state.trail.comments.map(comment => (
            <Comment key={comment.id} comment={comment} handleDelete={() => this.handleDelete(comment)}/>
        ));



        let link;
        if(this.state.crd) {
            link = `http://maps.google.com/maps/dir/${this.state.crd.latitude},${this.state.crd.longitude}/${this.state.trail.latitude},${this.state.trail.longitude}`;
        }

        return (
            <section>
                <div className="col information-page detail-page">
                    <header>
                    <Card className='details-card trail'>
                        <Card.Body>
                            <Card.Title>Trail Name:<br/>{this.state.trail.trail_name}</Card.Title>
                            <Card.Text>Location:<br/>{this.state.trail.location}</Card.Text>
                            <Card.Text className='summary'>Summary:<br/> {this.state.trail.summary}</Card.Text>
                            <Card.Text>Park Name:<br/>{this.state.trail.park_name}</Card.Text>
                            <Card.Text>Difficulty:<br/>{this.state.trail.difficulty}</Card.Text>
                            <Card.Text>Amenities:<br/>{this.state.trail.amenities}</Card.Text>
                             <a href={link} className="btn btn-success directions" target="_blank">Get Directions</a>
                        </Card.Body>
                    </Card>
                    </header>
                    <Form.Group id='add comment' controlId="Form.ControlTextarea">
                        <Form.Label>Add Comment</Form.Label>
                        <Form.Control as="textarea" rows="3" value={this.state.text} onChange={this.handleInput}
                                      name="text"/>
                        <Button variant="btn btn-success save" type="link" onClick={this.addComment}>Save</Button>
                    </Form.Group>
                    {comments}



                </div>
                <aside className="asideMap mapbg"><Map className="mapbg" trail={this.state.trail} crd={this.props.location.crd}/></aside>
            </section>
        );
    }
}

export default Trail;

