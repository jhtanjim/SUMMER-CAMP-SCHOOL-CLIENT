import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import UseClass from '../../../Hooks/UseClass/UseClass';
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useCarts from '../../../Hooks/useCarts/useCarts';

const ManageClasses = () => {
    const [classes] = UseClass();
    const [, refetch] = useCarts();

    const handleApproved = (classes) => {
        fetch(`https://summer-camp-school-server-jhtanjim.vercel.app/class/approved/${classes._id}`, {
            method: 'PATCH',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Status approved',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    };


    const handleDeny = (classes) => {
        Swal.fire({
            title: 'Enter Feedback',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off',
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: (feedback) => {
                return fetch(`https://summer-camp-school-server-jhtanjim.vercel.app/class/deny/${classes._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ feedback }), // Include the feedback in the request body
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        if (data.modifiedCount) {
                            refetch();
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'Status Denied',
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        }
                    })
                    .catch((error) => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'An error occurred',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        console.log(error);
                    });
            },
        });
    };


    return (
        <div>
            <SectionTitle subHeading="Manage Classes" heading="Manage Classes" />

            <div className="w-full">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Class Name</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.instructor}</div>
                                                <div className="text-sm opacity-50">{item.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        {item.statusbar === 'pending' ? (
                                            <div>
                                                {item.statusbar === 'approved' ? (
                                                    'approved'
                                                ) : (
                                                    <button onClick={() => handleApproved(item)} className="btn btn-success btn-sm">
                                                        Approved
                                                    </button>
                                                )}
                                                {item.statusbar === 'deny' ? (
                                                    'deny'
                                                ) : (
                                                    <button onClick={() => handleDeny(item)} className="btn btn-secondary btn-sm">
                                                        Deny
                                                    </button>
                                                )}
                                            </div>
                                        ) : (
                                            item.statusbar
                                        )}
                                    </td>
                                    <td>{item.totalStudents}</td>
                                    <td>
                                        <button className="btn btn-ghost  bg-orange-700  text-white">
                                            <FaEdit />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageClasses;