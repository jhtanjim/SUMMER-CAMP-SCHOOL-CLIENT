import React from 'react';
import Cover from '../Cover/Cover';
import { Helmet } from 'react-helmet-async';
import UseClass from '../../../Hooks/UseClass/UseClass';
import { FaCalendarPlus, FaChair, FaIdBadge, FaList, FaMusic } from 'react-icons/fa';

const Classes = () => {
    const [classes] = UseClass();

    return (
        <div className=''>
            <Helmet>
                <title>Summer Camp | Classes</title>
            </Helmet>
            <Cover
                img='https://i.ibb.co/C9ZvJLF/pexels-mart-production-8471826.jpg'
                title="Music Classes"
            ></Cover>
            <div className="my-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-12">
                {classes.map((classItem) => (
                    <div className="card w-full my-4 bg-base-100 shadow-xl border border-black border-opacity-30 lg:p-8">
                        <figure><img className='rounded-xl' src={classItem.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title sm:text-xs lg:text-2xl font-bold">
                                <FaList />  {classItem.name}

                            </h2>
                            <h2 className="card-title  lg:text-2xl font-bold mt-3">
                                <FaIdBadge /> <span className='underline'>Instuctor:</span>  {classItem.instructor}

                            </h2>
                            <h2 className="card-title sm:text-xs lg:text-2xl font-bold my-3">
                                <FaChair /> <span className='underline'>Available Seat:</span> <span className=''> {classItem.availableSeats}</span>

                            </h2>
                            <button className="btn btn-primary mt-3 font-bold text-xl">Select</button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Classes;
