import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import UseClass from '../../../Hooks/UseClass/UseClass';
import { FaCalendarPlus, FaChair, FaDollarSign, FaIdBadge, FaList, FaMusic } from 'react-icons/fa';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import useCarts from '../../../Hooks/useCarts/useCarts';
import { useContext } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const PopularClass = () => {
    const [classes] = UseClass();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [, refetch] = useCarts();
    const location = useLocation();
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [numOfStudent, setNumOfStudent] = useState({});
    const [topClasses, setTopClasses] = useState([]);

    useEffect(() => {
        fetch('https://summer-camp-school-server-jhtanjim.vercel.app/payments')
            .then(res => res.json())
            .then(data => {
                const studentCount = data.reduce((count, item) => {
                    if (count[item.itemNames]) {
                        count[item.itemNames] += 1;
                    } else {
                        count[item.itemNames] = 1;
                    }
                    return count;
                }, {});
                setNumOfStudent(studentCount);
            });
    }, []);

    useEffect(() => {
        const sortedClasses = [...classes].sort((a, b) => {
            const numOfStudentsA = numOfStudent[a.name] || 0;
            const numOfStudentsB = numOfStudent[b.name] || 0;
            return numOfStudentsB - numOfStudentsA;
        });
        setTopClasses(sortedClasses.slice(0, 6));
    }, [classes, numOfStudent]);

    return (
        <div>
            <SectionTitle
                subHeading='Popular Class'
                heading='Popular Class'
            ></SectionTitle>
            <div className="grid gap-x-4 gap-y-4 sm:grid-cols-1 lg:grid-cols-3 max-w-screen-xl mx-auto">
                {topClasses.map(classItem => (
                    classItem.statusbar === 'approved' && (
                        <div
                            key={classItem._id}
                            className="card w-full bg-base-100 shadow-xl border border-black border-opacity-30 lg:p-8"
                        >
                            <figure>
                                <img className='rounded-xl' src={classItem.image} alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-lg font-bold">
                                    <FaList /> {classItem.name}
                                </h2>
                                <h2 className="card-title text-lg font-bold">
                                    Price: <FaDollarSign />{classItem.price}
                                </h2>
                                <h1 className="card-title text-md font-bold mt-3">
                                    <FaIdBadge /> <span className='underline'>Instructor:</span> {classItem.instructor}
                                </h1>
                                <h2 className="card-title text-lg font-bold my-3">
                                    <FaChair /> <span className='underline'>Available Seat:</span> <span className=''>{classItem.seat}</span>
                                </h2>
                                <h2>Number of Students: {numOfStudent[classItem.name] || 0}</h2>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default PopularClass;
