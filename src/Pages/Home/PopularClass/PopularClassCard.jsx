import React from 'react';

const PopularClassCard = ({ item }) => {
    const { image, name } = item;
    return (

        <div >
            <div className="card w-96 glass">
                <figure><img src={image} alt="car!" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>

                </div>
            </div>
        </div>
    );
};

export default PopularClassCard;