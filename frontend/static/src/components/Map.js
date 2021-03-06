import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const mapStyles = {
    map: {
        // position: 'absolute',
        width: '100%',
        height: '100%',
        // marginLeft: '10%',
    }
};

  export class CurrentLocation extends Component {

    constructor(props) {
        super(props);

        const {lat, lng} = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng

            }
        }

    }

    componentDidMount() {
        if (this.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    });
                });
            }
        }

        this.loadMap();
    }

    componentDidUpdate(prevProps, prevState,) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }

    loadMap() {
        if (this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.maps;

            const node = ReactDOM.findDOMNode(mapRef);
            // reference to the actual DOM element

            let {zoom} = this.props;
            const {lat, lng} = this.props.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign(
                {},
                {
                    center: center,
                    zoom: zoom
                }
            );
            // maps.Map() is constructor that instantiates the map
            this.map = new maps.Map(node, mapConfig);
        }


    }

    recenterMap() {
        const map = this.map;
        const current = this.state.currentLocation;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(current.lat, current.lng);
            map.panTo(center);
        }
    }

    renderChildren() {
        const {children} = this.props;

        if (!children) return;

        return React.Children.map(children, c => {
            if (!c) return;
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        });
    }

    render() {
        console.log(this.props.currentLocation);
        console.log(this.state.currentLocation);
        const style = Object.assign({}, mapStyles.map);

        return (
            <div>
                <div style={style} ref='map'>
                    Loading map...
                </div>
                {this.renderChildren()}
            </div>
        );
    }
}

  export default CurrentLocation;

CurrentLocation.defaultProps = {
  zoom: 10,
  initialCenter: {
    lat: 34.852619,
    lng: -82.394012
  },
  centerAroundCurrentLocation: false,
  visible: true
};



