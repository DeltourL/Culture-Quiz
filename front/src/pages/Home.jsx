// TODO styles

import React from 'react';
import Category from '../components/Category';
import logo from '../logo.png';

export default function Home() {

    return (
        <div className='Body'>
            <img src={logo} alt="logo" />
            <h1>Culture Quiz</h1>
            <Category />
        </div>
    )
}