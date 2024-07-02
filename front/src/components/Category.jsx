import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Category() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories: ', error));
    }, []);

    return (
        <div className='w-full max-w-md'>
            <ul className='space-y-2'>
                {categories.map((category) => (
                    <li key={category}>
                        <Link to={`/Quiz/${category}`} className='block w-full text-center bg-blue-500 text-white py-2 rounded'>
                            {category}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
