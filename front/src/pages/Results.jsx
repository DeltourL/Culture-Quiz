import { Link, useParams } from 'react-router-dom';

export default function Results() {
    const { score } = useParams()

    return (
        <div>
            <p>Total Score: {score}/10</p>
            <Link to={`/`}>Back to home</Link>
        </div>
    );

};