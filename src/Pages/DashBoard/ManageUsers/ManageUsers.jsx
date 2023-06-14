import React from 'react';
import { Helmet } from 'react-helmet-async';
import { } from 'react-icons/fa';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

const ManageUsers = () => {


    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('https://summer-camp-school-server-jhtanjim.vercel.app/users')
        return res.json()
    })





    // makeadmin
    const handleMakeAdmin = user => {
        fetch(`https://summer-camp-school-server-jhtanjim.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH'

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Admin Now`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handleMakeInstuctor = user => {
        fetch(`https://summer-camp-school-server-jhtanjim.vercel.app/users/instuctor/${user._id}`, {
            method: 'PATCH'

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Instuctor Now`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }








    return (
        <div className='w-full'>
            <Helmet>
                <title>Bajao | Manage Users </title>
            </Helmet>

            <h3 className="text-3xl font-semibold my-4">Total Users:   {users.length}</h3>


            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th className=''>Instuctor Role</th>
                            <th className=''>Admin Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr
                                key={user._id}
                            >
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className='space-x-4 '>

                                    {
                                        user.role === 'instuctor' ? 'instuctor' :


                                            <button onClick={() => handleMakeInstuctor(user)} className="btn btn-sm btn-active btn-primary">Make Instuctor</button>

                                    }

                                </td>
                                <td className=''>


                                    {
                                        user.role === 'admin' ? 'admin' :


                                            < button onClick={() => handleMakeAdmin(user)} className="btn btn-active btn-sm btn-secondary">Make Admin</button>

                                    }

                                </td>
                            </tr>
                            )


                        }

                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default ManageUsers;