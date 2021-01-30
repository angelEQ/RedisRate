import React, { useState, useEffect, useContext } from 'react';
import AppContext from './context/index';
import Memory from './Metrics/Memory.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';

import './styles/styles.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const SignUp = () => {

  let history = useHistory();
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(AppContext);

  const { firstName, setFirstname } = useContext(AppContext);
  const { lastName, setLastname } = useContext(AppContext);
  const { username, setUsername } = useContext(AppContext);
  const { password, setPassword } = useContext(AppContext);

  const onSubmit = (e) => {
    e.preventDefault();
    fetch('/signup', {
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        password,
      }),
      method: 'POST',
      headers: { 'Content-Type': 'Application/JSON' },
    })
      .then(response => response.json())
      .then(res => {
        if (res === 'successfully created'){
          setIsUserLoggedIn(true);
        }
      })
      .catch(err => console.log('error creating user: ', err))
    }

  useEffect(() => {
      if(isUserLoggedIn) {
          history.push('/connect'); //later, change this to general page
      }
  }, [isUserLoggedIn]);

  return (
      <Switch>
        <Route path='/signup'>
          <div id='signup'>
          <form id='signupForm' onSubmit={onSubmit}>
            <TextField className='formElement' margin='normal' label='First Name' onChange={(e) => setFirstname(e.target.value)} />
            <TextField className='formElement' margin='normal' label='Last Name' onChange={(e) => setLastname(e.target.value)} />
            <TextField className='formElement' margin='normal' label='Username' onChange={(e) => setUsername(e.target.value)} />
            <TextField className='formElement' margin='normal' label='Password' onChange={(e) => setPassword(e.target.value)} />
            <Button id='signupButt' type='submit' variant='outlined'>Signup</Button>
          </form>
          </div>
        </Route>

        <Route path='/memory'>
          <Memory />
        </Route>
    </Switch>

  );
}

export default SignUp;
