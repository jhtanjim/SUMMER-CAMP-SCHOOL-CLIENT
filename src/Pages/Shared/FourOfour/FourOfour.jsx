import React from 'react';
import { Link } from 'react-router-dom';

const FourOfour = () => {
    return (
        <div>
            <div>
                <div className="not-found text-center">
                    <img className="w-25" src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?size=626&ext=jpg&ga=GA1.2.2105197794.1682091372&semt=ais" alt="404" />
                    <p>Oops! The page you're looking for does not exist.</p>
                    <Link to="/" className="btn btn-primary">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FourOfour;