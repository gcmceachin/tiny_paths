import React, {Component} from 'react';
import './App.css'
import {Button, Col, Form,} from "react-bootstrap";


class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    };

    render() {
        let text = this.state.text;
        return (
            <div>

                <Form onSubmit={(e) => this.props.addComment(e, text)}>

                    <Form.Group as={Col} controlId="Form.ControlTextarea">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as='textarea' rows="3" name='text' value={this.state.text} onChange={this.handleInput}/>
                        <Button variant="success" type="submit">Add Comment</Button>
                    </Form.Group>

                </Form>

            </div>
        )
    }
}

export default CommentForm;

