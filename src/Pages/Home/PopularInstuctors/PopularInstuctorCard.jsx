import React from 'react';

const PopularInstuctorCard = ({ instructor }) => {
    const { image, name, email, numClasses, classes } = instructor;

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                <img className="w-full h-80 object-cover object-center" src={image} alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title font-bold lg:text-4xl ">
                    {name}
                </h2>
                <p className="text-xl lg:mb-8 font-semibold">
                    Number of Classes: <span className="text-cyan-700 font-bold">{numClasses}</span>
                </p>
                <div className="card-actions justify-end">
                    <p className='text-lg font-bold underline'>Classes:</p>
                    {classes.map((classItem, index) => (
                        <div key={index} className="badge badge-ghost p-4 text-xl  ">
                            {classItem}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularInstuctorCard;
