import React from 'react';
import Cover from '../Cover/Cover';
import { Helmet } from 'react-helmet-async';

const Classes = () => {
    return (
        <div >
            <Helmet>
                <title>Summer Camp | Classes</title>
            </Helmet>
            <Cover
                img='https://i.ibb.co/C9ZvJLF/pexels-mart-production-8471826.jpg'
                title="Music Classes"
            ></Cover>
        </div>
    );
};

export default Classes;