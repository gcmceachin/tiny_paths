import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

// import Currentlocation from './component/map/';

const Marker = ({text}) => <div>{text}</div>;

// const google = google.maps;

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 34.85,
            lng: -82.31
        },
        zoom: 9
    };

    // function initMap() {
    //     var directionsService = new google.maps.DirectionsService;
    //     var directionsDisplay = new google.maps.DirectionsRenderer;
    //     var map = new google.maps.Map(document.getElementById('map'));
    //
    //     directionsDisplay.setMap(map);
    //
    //     var onChangeHandler = function() {
    //       calculateAndDisplayRoute(directionsService, directionsDisplay);
    //     };
    //     document.getElementById('start').addEventListener('change', onChangeHandler);
    //     document.getElementById('end').addEventListener('change', onChangeHandler);
    //   }
    //
    //   function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    //     directionsService.route({
    //       origin: document.getElementById('start').value,
    //       destination: document.getElementById('end').value,
    //       travelMode: 'DRIVING'
    //     }, function(response, status) {
    //       if (status === 'OK') {
    //         directionsDisplay.setDirections(response);
    //       } else {
    //         window.alert('Directions request failed due to ' + status);
    //       }
    //     });
    //   }
    //

    render() {


        return (
            // Important! Always set the container height explicitly
            <div>
                {/*<a href="">Get Directions</a>*/}

                <GoogleMapReact
                    bootstrapURLKeys={{key: `$process.env.REACT_APP_GOOGLE_MAPS_API_KEY`}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <Marker
                        lat={this.props.location.park ? this.props.location.park.lat : 34.85}
                        lng={this.props.location.park ? this.props.location.park.lng : -82.31}
                        text={this.props.location.park ? this.props.location.park.name : ""}
                    />

                    <Marker
                        lat={this.props.location.park ? this.props.location.park.crd.latitude : 34.85}
                        lng={this.props.location.park ? this.props.location.park.crd.longitude : -82.31}
                        text={this.props.location.park ? "You are here!" : ""}
                    />

                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;




