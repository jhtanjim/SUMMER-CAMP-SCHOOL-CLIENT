import React from 'react';
import { Helmet } from 'react-helmet-async';
import useCarts from '../../../Hooks/useCarts/useCarts';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { FaDollarSign, FaEdit, FaMoneyBill, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link, NavLink } from 'react-router-dom';

const MySelectedClass = () => {
    const [cart, refetch] = useCarts()
    // console.log(cart);
    const total = cart.reduce((sum, item) => item.price + sum, 0);



    const handleDelete = item => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://summer-camp-school-server-jhtanjim.vercel.app/carts/${item._id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Class has been Drop.',
                                'success'
                            )
                        }
                    })
            }
        })

    }


    return (
        <div>
            <SectionTitle
                subHeading="My Selected Class"
                heading="Add & Drop Class?"
            ></SectionTitle>

            <Helmet>
                <title>Bajao | MySelectedClass</title>
            </Helmet>

            <div className='uppercase h-[60px] mb-4 align-items-center font-semibold flex justify-evenly'>
                <h3 className="text-3xl">Total Items : {cart.length}</h3>
                <h3 className="text-3xl">Total Price : {total}</h3>
                {/* <Link to='/dashboard/payment'><button className="btn btn-primary  btn-sm"> <FaDollarSign /> Pay</button></Link> */}


            </div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead className=''>
                        <tr className='font-bold'>
                            <th>
                                #
                            </th>
                            <th >Image</th>
                            <th >Class Name</th>
                            <th >Price</th>
                            <th >Update</th>
                            <th >Delete</th>
                            <th >pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row  */}
                        {
                            cart.map((item, index) => <tr
                                key={item._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.name}

                                </td>
                                <td className=''> ${item.price}</td>


                                <td>
                                    <button className="btn btn-ghost  bg-orange-700  text-white">

                                        <FaEdit />
                                    </button>
                                </td>

                                <td>
                                    <button onClick={() => handleDelete(item)} className="btn btn-ghost  bg-red-600 text-white">

                                        <FaTrashAlt />
                                    </button>
                                </td>
                                <td>
                                    <Link to='/dashboard/payment'><button className="btn btn-primary  btn-sm"> <FaDollarSign /> Pay</button></Link>

                                </td>
                            </tr>)
                        }








                    </tbody>
                    {/* foot */}


                </table>
            </div>
        </div>
    );
};

export default MySelectedClass;