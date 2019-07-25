import React, {Component} from 'react';
import axios from "axios";
import './App.css'
import {Button, Form} from "react-bootstrap";
import {withRouter} from 'react-router-dom';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    // this defines what email and password are to be for to the rest of the page


    // this is short hand so that bind.this isn't needed

    handleChange = event => {
        // console.log(event.target.name);
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleSubmit = (event, data) => {
        event.preventDefault();
        console.log('hey');
        this.props.history.push('/');
        //stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4

        axios.post('http://localhost:3000/rest-auth/login/', data)
            .then(response => {
                console.log(response);
                // save token to local storage for future axios requests
                localStorage.setItem('token', response.data.key);
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
            .finally(() => {
                // always executed
            });
    };

    // handleOnClick = withRouter(({history}) => (
    //     <button type='button'
    //     onClick={() => {history.push('/SignUp')}}></button>
    //     )
    // );

    // fat arrows make for easier code great for debugging


    render() {
        return (
            <section className="login-parent">
                <div className='left-background'>o</div>
                <div className='Login' id="right-side">
                    <h3>Login Page</h3>
                    <Form className='form-horizontal' onSubmit={event => this.handleSubmit(event, this.state)}>
                        <Form.Group className='MainGrid'>
                            <Form.Group controlId="formGridUserName">
                                <Form.Label className='labelColor' column sm={8}>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username" value={this.state.username}
                                              onChange={this.handleChange} name='username'/>
                            </Form.Group>
                            <Form.Group controlId="formGridBasicPassword">
                                <Form.Label className='labelColor' column sm={8}>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={this.state.password}
                                              onChange={this.handleChange} name='password'/>
                            </Form.Group>
                        </Form.Group>
                        <div className='loginbuttons'>
                            <Button variant="btn btn-outline-success" type='submit'>
                                Login
                            </Button>
                            <Button variant='btn btn-outline-success' type='button' onClick={() => {
                                this.props.history.push('/signup')
                            }}>Signup</Button>
                        </div>
                    </Form>
                </div>
            </section>

        )
    }
}

export default withRouter(LoginForm)

//https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4
// https://serverless-stack.com/chapters/create-a-login-page.html