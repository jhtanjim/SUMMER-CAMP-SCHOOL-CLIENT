import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/"


    const { googleSignIn } = useContext(AuthContext)
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {
                const loggedInUser = res.user
                console.log(loggedInUser);


                const savedUser = { name: loggedInUser.displayName, email: loggedInUser.email }



                fetch('http://localhost:5000/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(() => {

                        navigate(from, { replace: true });


                    })





            })
    }

    return (
        <div>
            <div className="divider">OR</div>
            <div className='text-center my-4'>
                <button onClick={handleGoogleSignIn} className="btn btn-square btn-outline">
                    <FaGoogle />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;