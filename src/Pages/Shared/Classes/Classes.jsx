import React, { useContext } from 'react';
import Cover from '../Cover/Cover';
import { Helmet } from 'react-helmet-async';
import UseClass from '../../../Hooks/UseClass/UseClass';
import { FaCalendarPlus, FaChair, FaDollarSign, FaIdBadge, FaList, FaMusic } from 'react-icons/fa';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useCarts from '../../../Hooks/useCarts/useCarts';

const Classes = () => {
    const [classes] = UseClass();
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [, refetch] = useCarts()

    const location = useLocation()




    const handleSelect = classItem => {

        let { _id, image, name, email, numClasses, classes, price, statusbar, enrolled } = classItem
        enrolled++
        if (user && user.email) {

            const selectItem = { classItem: _id, name, image, email: user.email, price }
            fetch('http://localhost:5000/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(selectItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch()
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Class has been Addeded',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please Login to Select the Class',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }


    return (
        <div className=''>
            <Helmet>
                <title>Summer Camp | Classes</title>
            </Helmet>
            <Cover
                img='https://i.ibb.co/C9ZvJLF/pexels-mart-production-8471826.jpg'
                title="Music Classes"
            ></Cover>
            <div className="my-20 grid gap-8 xl:grid-cols-4  mx-12">
                {classes.map((classItem) => (
                    classItem.statusbar === 'approved' &&
                    <div className="card w-full my-4 bg-base-100 shadow-xl border border-black border-opacity-30 lg:p-8">
                        <figure><img className='rounded-xl' src={classItem.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title sm:text-xs lg:text-xl font-bold">
                                <FaList />  {classItem.name}

                            </h2>
                            <h2 className="card-title sm:text-xs lg:text-xl font-bold">
                                Price: <FaDollarSign />{classItem.price}

                            </h2>
                            <h2 className="card-title  lg:text-lg font-bold mt-3">
                                <FaIdBadge /> <span className='underline'>Instuctor:</span>  {classItem.instructor}

                            </h2>
                            <h2 className="card-title sm:text-xs lg:text-xl font-bold my-3">
                                <FaChair /> <span className='underline'>Available Seat:</span> <span className=''> {classItem.seat}</span>

                            </h2>
                            <h2>{classItem.numOfStudent}</h2>
                            <button onClick={() => handleSelect(classItem)} className="btn btn-primary mt-3 font-bold text-xl">Select</button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Classes;
