import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import PopularClassCard from './PopularClassCard';
import UseClass from '../../../Hooks/UseClass/UseClass';

const PopularClass = () => {

    const [classes] = UseClass()
    const popularClasses = classes.filter(item => item.numOfStudent > 0).sort((a, b) => b.numOfStudent - a.numOfStudent).slice(0, 6);

    // const [classes, setClasses] = useState([])
    // useEffect(() => {
    //     fetch('class.json')
    //         .then(res => res.json())
    //         .then(data => {

    //             const popularClass = data.filter(item => item.popular === true)
    //             setClasses(popularClass)
    //         })
    // }, [])


    return (
        <div className='my-32'>
            <SectionTitle
                subHeading='Popular Class'
                heading='Popular Class'
            ></SectionTitle>

            <div className='md:grid grid-cols-3 gap-4 max-w-screen-xl mx-auto'>

                {
                    popularClasses.map(item => <PopularClassCard
                        key={item._id}
                        item={item}

                    ></PopularClassCard>)
                }
            </div>


        </div>
    );
}

export default PopularClass;