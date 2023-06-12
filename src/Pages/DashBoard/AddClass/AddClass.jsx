import React, { useContext } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
const img_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN

const AddClass = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const onSubmit = (data) => {
        const formData = new FormData()
        formData.append('image', data.image[0])
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgUrl = imgResponse.data.display_url
                    const { name, seat, price, instructor, email } = data

                    console.log(data);
                    const newClass = {
                        name,
                        price: parseFloat(price),
                        seat, image: imgUrl, instructor, email,
                        statusbar: 'pending',
                        enrolled: 0
                    }
                    console.log(newClass);
                    axiosSecure.post('/class', newClass)
                        .then(data => {
                            console.log('After Posting New Class', data.data);
                            if (data.data.insertedId) {
                                reset()
                                Swal.fire(
                                    'Class Added Successfully',
                                    '',
                                    'success'
                                )
                            }
                        })

                }
            })
    };
    // console.log(img_hosting_token);
    return (
        <div>
            <SectionTitle subHeading="Add Class" heading="Add Class" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full ml-4">
                    <label className="label">
                        <span className="label-text font-semibold">Class name *</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Class name"
                        {...register('name', { required: true, maxLength: 120 })}
                        className="input input-bordered w-full"
                    />
                    {errors.name && <span className='text-red-800'>Please Add Your class name</span>}
                </div>

                {/* file input/ add image */}
                <div className="form-control w-full ml-4 my-4">
                    <label className="label">
                        <span className="label-text">Class Image*</span>
                    </label>
                    <input
                        {...register('image', { required: true })}
                        type="file"
                        className="file-input file-input-bordered w-full"
                    />
                    {errors.image && <span className='text-red-800'>Please Add Your Class Image</span>}
                </div>

                {/* instructor name */}
                <div className="form-control w-full ml-4">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        {...register('instructor', { required: true })}
                        name="name"
                        placeholder="Name"
                        className={`input input-bordered ${errors.instructor ? 'input-error' : ''}`}
                        readOnly
                        value={user.displayName}
                    />

                </div>

                {/* instructor email */}
                <div className="form-control w-full ml-4">
                    <label className="label">
                        <span className="label-text font-semibold">Instructor email *</span>
                    </label>
                    <input
                        type="text"
                        {...register('email', { required: true })}
                        name="email"
                        placeholder="Email"
                        className={`input input-bordered ${errors.instructorEmail ? 'input-error' : ''}`}
                        readOnly
                        value={user.email}
                    />

                </div>


                {/* available seats and price */}
                <div className="lg:flex my-4">
                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text font-semibold">Available Seats *</span>
                        </label>
                        <input
                            type="number"
                            {...register('seat', { required: true })}
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            required
                        />
                        {errors.seat && <span className='text-red-800'>Please Add Your Seat</span>}
                    </div>

                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text font-semibold">Price *</span>
                        </label>
                        <input
                            type="number"
                            {...register('price', { required: true })}
                            placeholder="Type here"
                            className="input input-bordered w-full"

                        />
                        {errors.price && <span className='text-red-800'>Please Add Your Price</span>}
                    </div>
                </div>

                {/* submit */}
                <input className="btn btn-accent btn-sm mt-4 mx-auto" type="submit" value="Add Class" />
            </form>
        </div>
    );
};

export default AddClass;
