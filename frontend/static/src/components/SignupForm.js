import React, {Component} from 'react';
import axios from 'axios';
import {Button, Form} from "react-bootstrap";



axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';



class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: {username: '', email: '', password1: '', password2:''},
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.submitUserSignupForm = this.submitUserSignupForm.bind(this);
        this.handleSignup = this.handleSignup.bind(this);

    }

    handleChange(e) {
        let fields = Object.assign({}, this.state.fields);
        fields[e.target.name] = e.target.value;
        this.setState({fields});

    }

    submitUserSignupForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            let fields = {};
            fields['username'] = '';
            fields['emailid'] = '';
            fields['password1'] = '';
            fields['password2']= '';
            this.setState({fields: fields});
            alert('Form submitted')

        }
    }

    handleSignup(e) {
        e.preventDefault();
        console.log(this.state.fields);
        axios.post('http://localhost:3000/rest-auth/registration/',this.state.fields)
            .then(response => {
                console.log(response);
                localStorage.setItem('token', response.data.key);
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
            .finally(() => {
                // always executed
            });
    }

    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!typeof fields['username']) {
            formIsValid = false;
            errors['username'] = '*Please enter your name.';
        }

        if (typeof ['username'] !== 'undefined') {
            if (!fields['username'].match(/^[a-zA-Z]*$/)) {
                formIsValid = false;
                errors['username'] = '*Please enter alphabet characters only.';
            }

        }

        if (!fields['email']) {
            formIsValid = false;
            errors['email'] = '*Please enter your email-ID.';
        }
        if (typeof ['email'] !== 'undefined') {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields['email'])) {
                formIsValid = false;
                errors['email'] = '*Please enter your email-ID.';
            }
        }

        if (!fields["password1"]) {
            formIsValid = false;
            errors["password1"] = "*Please enter your password.";
        }

        if (!fields["password2"]) {
            formIsValid = false;
            errors["password2"] = "*Please confirm your password.";
        }

        if (typeof fields["password1"] !== "undefined") {
            if (!fields["password1"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                if (!fields['password2'].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)){
                    errors["password2"] = "*Please enter secure and strong password.";
                }
            }
        }
        this.setState({
            errors: errors
        });
        return formIsValid


    }


    render() {
        return (
            <div id='main-registration-container'>
                <section className="left-background"></section>
                <div id="right-side">
                    <h3>SignUp Page</h3>
                    <Form onSubmit={event => this.handleSignup(event, this.state)}>
                            <Form.Group  controlId='formGridName'>
                        <Form.Label className='labelColor'>Name</Form.Label>
                        <Form.Control className='controlInput' type="text" placeholder='Enter Name' name='username' value={this.state.fields.username} onChange={this.handleChange}/>
                            </Form.Group>

                         <Form.Group  controlId='formGridBasicEmail'>
                        <Form.Label className='labelColor'>Email ID</Form.Label>
                        <Form.Control className='controlInput' type="email" placeholder='Enter Email' name='email' value={this.state.fields.email} onChange={this.handleChange}/>
                         </Form.Group>
                            <Form.Group   controlId='formGridPassword'>
                                <Form.Label className='labelColor'>Password</Form.Label>
                        <Form.Control className='controlInput' type="password" placeholder='Enter Password' name='password1' value={this.state.fields.password1} onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group   controlId='formGridPassword'>
                                <Form.Label className='labelColor'>Confirm Password</Form.Label>
                        <Form.Control className='controlInput' type="password" placeholder='Confirm Password' name='password2' value={this.state.fields.Password2} onChange={this.handleChange}/>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        );
    }

}


export default SignupForm

// https://www.skptricks.com/2018/06/simple-form-validation-in-reactjs-example.html