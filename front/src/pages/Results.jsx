import { Link, useParams } from 'react-router-dom';

export default function Results() {
    const { score } = useParams();

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
            <p className='text-2xl font-bold mb-4'>Total Score: {score}/10</p>
            <Link to={`/`} className='block bg-blue-500 text-white py-2 px-4 rounded'>
                Back to home
            </Link>
        </div>
    );
}
