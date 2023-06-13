import React, { useEffect, useState } from 'react';
import Cover from '../Cover/Cover';
import { Helmet } from 'react-helmet-async';
import UseClass from '../../../Hooks/UseClass/UseClass';
import { FaCalendarPlus, FaChair, FaDollarSign, FaIdBadge, FaList, FaMusic } from 'react-icons/fa';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useCarts from '../../../Hooks/useCarts/useCarts';
import { useContext } from 'react';

const Classes = () => {
    const [classes] = UseClass();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [, refetch] = useCarts();
    const location = useLocation();
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [numOfStudent, setNumOfStudent] = useState({});

    useEffect(() => {
        fetch('http://localhost:5000/payments')
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

    const handleSelect = classItem => {
        if (user && user.email) {
            const selectItem = {
                classItem: classItem._id,
                name: classItem.name,
                image: classItem.image,
                email: user.email,
                price: classItem.price
            };

            fetch('http://localhost:5000/carts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch();
                        setSelectedClasses(prevSelectedClasses => [
                            ...prevSelectedClasses,
                            classItem._id
                        ]);
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Class has been Added',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
        } else {
            Swal.fire({
                title: 'Please Login to Select the Class',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now'
            }).then(result => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };

    return (
        <div className=''>
            <Helmet>
                <title>Bajao | Classes</title>
            </Helmet>
            <Cover img='https://i.ibb.co/0XjrmrG/pexels-tim-powellmorris-5371625.jpg' title="Music Classes" />
            <div className="my-20 grid gap-8 xl:grid-cols-4  mx-12">
                {classes.map(classItem => (
                    classItem.statusbar === 'approved' && (
                        <div
                            key={classItem._id}
                            className="card w-full my-4 bg-base-100 shadow-xl border border-black border-opacity-30 lg:p-8"
                        >
                            <figure>
                                <img className='rounded-xl' src={classItem.image} alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title sm:text-xs lg:text-xl font-bold">
                                    <FaList /> {classItem.name}
                                </h2>
                                <h2 className="card-title sm:text-xs lg:text-xl font-bold">
                                    Price: <FaDollarSign />{classItem.price}
                                </h2>
                                <h1 className="card-title lg:text-lg font-bold mt-3">
                                    <FaIdBadge /> <span className='underline'>Instructor:</span> {classItem.instructor}
                                </h1>
                                <h2 className="card-title sm:text-xs lg:text-xl font-bold my-3">
                                    <FaChair /> <span className='underline'>Available Seat:</span> <span className=''> {classItem.seat}</span>
                                </h2>
                                <h2>Number of Students: {numOfStudent[classItem.name] || 0}</h2>
                                <button
                                    onClick={() => handleSelect(classItem)}
                                    className="btn btn-primary mt-3 font-bold text-xl"
                                    disabled={selectedClasses.includes(classItem._id)}
                                >
                                    {selectedClasses.includes(classItem._id) ? 'Selected' : 'Select'}
                                </button>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default Classes;