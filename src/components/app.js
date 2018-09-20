import React, { Component } from 'react';
import BirthdayForm from './birthdayForm';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <header>
          <h1 className='appTitle'>Birthday Countdown</h1>
          <div className='header__skew'>
            <div className='header__subskew'>
            </div> 
          </div>
        </header>
        <BirthdayForm />  
      </div>
    );
  }
}
