import React from 'react';

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className='mx-auto text-center  my-24  md:w-3/12'>
            <p className='text-2xl  text-sky-700 font-bold mb-4'>{subHeading}</p>
            <h3 className='text-teal-900	 text-4xl font-bold uppercase border-y-4  py-4'>{heading}</h3>
        </div>
    );
};

export default SectionTitle;