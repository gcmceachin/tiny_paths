import React, {Component} from 'react';
import axios from 'axios';
// import {Image} from 'react-bootstrap';
import './App.css'
import Jumbotron from "react-bootstrap/Jumbotron";


class Trail extends Component {
    render() {
        let trail = this.props.trail;
        return (
            <div>{trail.name}</div>
        )
    }
}


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            park_name: '',
            length: '',
            difficulty: '',
            amenities: '',
            trails: []
        };

    }

    componentDidMount() {
        this.getTrails()
    }

    getTrails = () => {
        axios.get('http://localhost:3000/api/v1/trails/')
            .then((response) => {
                console.log(response);
                this.setState({trails: response.data});
            })
            .catch(function (error) {
                // handle error
                console.log('Oops. There was an error.', error);
            })
            .finally(function () {
                // always executed
            });
    };

    render() {
        console.log(this.state.trails);
        let trails = this.state.trails.map((trail) => (
            <Trail key={trail.id} trail={trail} />
            ));
        return (
            <main className='homeContainer'>
                <section className='section-left'>
                    <Jumbotron className='story'>
                    <h4>Back Story</h4>
                        <p>
                         Tiny Paths was born out of our experiences as a family who loves the outdoors and hiking.
                         My wife and I started hiking on our honeymoon and have hiked every anniversary since then!
                         When our son was born we took him on short hikes and my wife walked with him for miles in his
                         hiking stroller.</p>
                       <p>  Our experiences have taught us many things, such has smooth trails keep tripping to a minimum
                         and inevitably you will be carrying your child so your going to get a work out!
                         We have been up many a trail and had to turn back early because the little one was tired.</p>

                        <p> I have chosen these trails by difficulty (Green for easy and Blue for bigger kids), location within
                         20 miles of your current location, and trail names.</p>

                         <p>Please feel free to sign in and leave a comment about the trails you've hiked for other parents to see
                         too!!</p>

                         <p>Happy Hiking!!!</p>

                    </Jumbotron>
                </section>
            <div className='containterRight'>
                <div>
                <h1>Welcome to Tiny Paths!</h1>

                {trails}
            </div>
            </div>
                </main>
        )
    }


}

export default Home