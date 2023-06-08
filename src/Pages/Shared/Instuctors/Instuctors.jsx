import React from 'react';
import UseInstuctor from '../../../Hooks/UseInstuctor/UseInstuctor';
import Cover from '../Cover/Cover';
import { Helmet } from 'react-helmet-async';
import { FaEnvelope, FaTasks } from "react-icons/fa";

const Instuctors = () => {
    const [loading, instructors] = UseInstuctor();

    if (loading) {
        return <p>Loading...</p>; // Add a loading indicator while data is being fetched
    }

    return (
        <div>
            <Helmet>
                <title>Summer Camp | Instructor</title>
            </Helmet>
            <Cover
                img='https://i.ibb.co/QpVFWG2/pexels-kindel-media-7149181.jpg'
                title="Our Instructors"
            ></Cover>
            <div className='md:grid grid-cols-2 max-w-screen-2xl mx-auto space-y-8 gap-8 my-16 '>
                {instructors.map((instructor, index) => (
                    <div key={index} className="card lg:card-side bg-base-100 shadow-2xl border py-8">
                        <figure>
                            <img className="w-full h-80 object-cover object-center ms-8 rounded-2xl" src={instructor.image} alt="Album" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title lg:text-4xl font-bold">{instructor.name}</h2>
                            <h2 className='text-2xl font-semibold flex items-center space-x-4 my-2'>
                                <FaEnvelope />
                                <span>{instructor.email}</span></h2>

                            <h2 className='text-2xl font-semibold flex items-center gap-4'>
                                <FaTasks />
                                <span>Number of Classes Taken: {instructor.numClasses}</span>
                            </h2>
                            <div className='pt-20 text-end'>

                                <button className="btn btn-primary">See Classes</button>
                            </div>


                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Instuctors;
