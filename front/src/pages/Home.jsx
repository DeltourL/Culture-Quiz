import React from 'react';
import Category from '../components/Category';
import logo from '../logo.png';

export default function Home() {
    return (
        <div className='min-h-screen flex flex-col items-center bg-gray-100 p-4'>
            <img src={logo} alt="logo" className='w-24 h-24 mb-4' />
            <h1 className='text-2xl font-bold mb-4'>Culture Quiz</h1>
            <Category />
        </div>
    );
}
