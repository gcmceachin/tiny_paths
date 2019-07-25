import React from 'react'
import Nav from 'react-bootstrap/Nav'

import {NavLink} from 'react-router-dom';

function BaseLayout(props) {
    return (
        <div>

            <Nav className='navbar navbar-fixed-top justify-content-end container-fluid'>
            {/*<NavLink to="/signup">Sign Up</NavLink>*/}
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/trails">Trails</NavLink>
            </Nav>
                        {props.children}

        </div>
    )
}

export default BaseLayout