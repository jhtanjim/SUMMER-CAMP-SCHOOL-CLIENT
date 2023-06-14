// import React, { useEffect, useState } from 'react';
// import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
// import UseClass from '../../../Hooks/UseClass/UseClass';
// import { FaEdit } from 'react-icons/fa';

// const MyClasses = () => {
//     const [classes] = UseClass();
//     const [numOfStudents, setNumOfStudents] = useState({});

//     useEffect(() => {
//         fetch('https://summer-camp-school-server-jhtanjim.vercel.app/payments')
//             .then(res => res.json())
//             .then(data => {
//                 const studentCount = data.reduce((count, item) => {
//                     if (count[item.itemNames]) {
//                         count[item.itemNames] += 1;
//                     } else {
//                         count[item.itemNames] = 1;
//                     }
//                     return count;
//                 }, {});
//                 setNumOfStudents(studentCount);
//             });
//     }, []);

//     return (
//         <div>
//             <SectionTitle subHeading="My Classes" heading="My Classes" />

//             <div className="w-full">
//                 <div className="overflow-x-auto">
//                     <table className="table">
//                         {/* head */}
//                         <thead>
//                             <tr>
//                                 <th>#</th>
//                                 <th>Image</th>
//                                 <th>Class Name</th>
//                                 <th>Price</th>
//                                 <th>Status</th>
//                                 <th>Total Students</th>
//                                 <th>Feedback</th>
//                                 <th>Update</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {/* rows */}
//                             {classes.map((item, index) => (
//                                 <tr key={item._id}>
//                                     <td>{index + 1}</td>
//                                     <td>
//                                         <div className="flex items-center space-x-3">
//                                             <div className="avatar">
//                                                 <div className="mask mask-squircle w-12 h-12">
//                                                     <img src={item.image} alt="Avatar Tailwind CSS Component" />
//                                                 </div>
//                                             </div>
//                                             <div>
//                                                 <div className="font-bold">{item.instructor}</div>
//                                                 <div className="text-sm opacity-50">{item.email}</div>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td>{item.name}</td>
//                                     <td>{item.price}</td>
//                                     <td>{item.statusbar}</td>
//                                     <td>{numOfStudents[item.name] || 0}</td>
//                                     <td>
//                                         {/* Render feedback component or display feedback */}
//                                     </td>
//                                     <td>
//                                         <button className="btn btn-ghost bg-orange-700 text-white">
//                                             <FaEdit />
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MyClasses;


import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import UseClass from '../../../Hooks/UseClass/UseClass';
import { FaEdit } from 'react-icons/fa';

const MyClasses = () => {
    const [classes] = UseClass();
    const [numOfStudents, setNumOfStudents] = useState({});

    useEffect(() => {
        fetch('https://summer-camp-school-server-jhtanjim.vercel.app/payments')
            .then((res) => res.json())
            .then((data) => {
                const studentCount = data.reduce((count, item) => {
                    if (count[item.itemNames]) {
                        count[item.itemNames] += 1;
                    } else {
                        count[item.itemNames] = 1;
                    }
                    return count;
                }, {});
                setNumOfStudents(studentCount);
            });
    }, []);

    return (
        <div>
            <SectionTitle subHeading="My Classes" heading="My Classes" />

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
                                <th>Total Students</th>
                                <th>Feedback</th>
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
                                    <td>{item.statusbar}</td>
                                    <td>{item.feedback}</td>
                                    <td>{numOfStudents[item.name] || 0}</td>

                                    <td>
                                        <button className="btn btn-ghost bg-orange-700 text-white">
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

export default MyClasses;
