import React from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import './App.css';
import Home from './Home';

function App() {
    return (
        <div className="App">
            <SignupForm/>
            <LoginForm/>
            <Home/>
        </div>
    );

}

export default App;