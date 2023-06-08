import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import PopularClassCard from './PopularClassCard';

const PopularClass = () => {
    const [music, setMusic] = useState([])
    useEffect(() => {
        fetch('class.json')
            .then(res => res.json())
            .then(data => {

                const popularClass = data.filter(item => item.popular === true)
                setMusic(popularClass)
            })
    }, [])


    return (
        <div className='my-32'>
            <SectionTitle
                subHeading='Popular Class'
                heading='Popular Class'
            ></SectionTitle>

            <div className='md:grid grid-cols-3 gap-4 max-w-screen-xl mx-auto'>

                {
                    music.map(item => <PopularClassCard
                        key={item._id}
                        item={item}

                    ></PopularClassCard>)
                }
            </div>


        </div>
    );
}

export default PopularClass;