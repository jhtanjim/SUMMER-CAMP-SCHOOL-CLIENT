import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';

const SignUp = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch
    } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await createUser(data.email, data.password);
            const loggedUser = res.user;

            await updateUserProfile(data.name, data.photoURL);

            const savedUser = {
                name: data.name,
                email: data.email,
                image: data.photoURL
            };

            const response = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(savedUser)
            });

            const responseData = await response.json();

            if (responseData.insertedId) {
                reset();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'User Created Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <iframe className="h-96" src="https://embed.lottiefiles.com/animation/89032"></iframe>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
                                    name="name"
                                    placeholder="Name"
                                    className="input input-bordered"
                                />
                                {errors.name && <span className="text-red-800">Please Add Your name</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("photoURL", { required: true })}
                                    placeholder="photoURL"
                                    className="input input-bordered"
                                />
                                {errors.photoURL && <span className="text-red-800">Please Add Your photoURL</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("email", { required: true })}
                                    name="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                />
                                {errors.email && <span className="text-red-800">Please Add Your Email</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z])/
                                    })}
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                />
                                {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className='text-red-600'>Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && (
                                    <p className='text-red-600'>Password must have one uppercase, one lowercase, one number, and one special character</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("confirmPassword", {
                                        required: true,
                                        validate: (value) => value === watch("password")
                                    })}
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    className="input input-bordered"
                                />
                                {errors.confirmPassword?.type === "validate" && (
                                    <p className="text-red-600">Passwords do not match</p>
                                )}
                            </div>
                            <div className="form-control ">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className="mt-4 text-center text-lg">
                            <small>
                                <Link to="/login">Already Have an Account</Link>
                            </small>
                        </p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
