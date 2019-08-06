import React, {Component} from 'react';
import axios from "axios";
import './App.css'
import {Button} from 'react-bootstrap';


const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class Comment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            text: ''
        }
    }

    componentDidMount() {
        this.setState({text: this.props.comment.text})
    }

    handleEdit = () => {
        if(this.state.isEditing) {
            // console.log('you need to save the changes');

            // save the changes to the comment locally and on the server

            let comment = Object.assign({}, this.props.comment);

            comment.text = this.state.text;

            axios.put(`${BASE_URL}/api/v1/comments/${comment.id}/`, comment)  //The put request allows for a completely new comment to be saved.
            .then(response => {
                    console.log(response);
                    this.props.updateComment(response.data);
                })
                .catch(error => {
                        // handle error
                        console.log('Something went wrong.', error);
                    }
            );


        }

        this.setState({isEditing: !this.state.isEditing});
    };

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        return (

            <li key={this.props.comment.id}>

                {this.state.isEditing ? (
                    <div>
                        <input value={this.state.text} name="text" onChange={this.handleInput} type="text"/>
                        <Button onClick={this.handleEdit}>Save Comment</Button>
                    </div>
                ): (
                    <div>
                         <p>{this.props.comment.text}</p>
                        <Button onClick={this.handleEdit}>Edit Comment</Button>
                        <Button onClick={this.props.handleDelete}>Delete Comment</Button>
                    </div>
                )}



            </li>

        );
    }


}

export default Comment;
