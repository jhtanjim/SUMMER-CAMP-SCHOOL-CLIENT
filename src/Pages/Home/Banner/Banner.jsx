import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Banner = () => {
    return (
        <div>
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <img src='https://i.ibb.co/3m8F4nQ/pexels-rdne-stock-project-8035133.jpg' className="w-full" />
                    <div className="absolute flex items-center h-full bg-gradient-to-r from-[#000000] to-[rgba(21, 21, 21, 0) 100%)] pl-12">
                        <div className='text-white space-y-7 text-center'>
                            <h2 className="text-6xl font-bold">Affordable Price For Car Servicing</h2>
                            <p>There are many variations of passages of available, but the majority have suffered alteration in some form</p>
                            <div>
                                <button className="btn btn-primary mr-5">Discover More</button>
                                <button className="btn btn-outline btn-success">Latest Project</button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" className="btn btn-circle mr-5">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img src='https://i.ibb.co/2v7Y3Kx/pexels-rdne-stock-project-8034609.jpg' className="w-full  " />
                    <div className="absolute flex  items-center  h-full   left-0 top=0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0) 100%)] pl-12">
                        <div className='text-white space-y-7 w-1/2 '>
                            <h2 className="text-6xl font-bold">Affordable Price For Car Servicing</h2>
                            <p>There are many variations of passages of  available, but the majority have suffered alteration in some form</p>
                            <div>
                                <button className="btn btn-primary mr-5">Discover More</button>
                                <button className="btn btn-outline btn-success">Latest Project</button>

                            </div>
                        </div>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle mr-5">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img src='https://i.ibb.co/p1vf8Wj/pexels-rdne-stock-project-8033860.jpg' className="w-full  " />
                    <div className="absolute flex  items-center  h-full   left-0 top=0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0) 100%)] pl-12">
                        <div className='text-white space-y-7 w-1/2 '>
                            <h2 className="text-6xl font-bold">Affordable Price For Car Servicing</h2>
                            <p>There are many variations of passages of  available, but the majority have suffered alteration in some form</p>
                            <div>
                                <button className="btn btn-primary mr-5">Discover More</button>
                                <button className="btn btn-outline btn-success">Latest Project</button>

                            </div>
                        </div>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle mr-5">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <img src='https://i.ibb.co/TwG8cjY/pexels-rdne-stock-project-8035135.jpg' className="w-full  " />
                    <div className="absolute flex  items-center  h-full   left-0 top=0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0) 100%)] pl-12">
                        <div className='text-white space-y-7 w-1/2 '>
                            <h2 className="text-6xl font-bold">Affordable Price For Car Servicing</h2>
                            <p>There are many variations of passages of  available, but the majority have suffered alteration in some form</p>
                            <div>
                                <button className="btn btn-primary mr-5">Discover More</button>
                                <button className="btn btn-outline btn-success">Latest Project</button>

                            </div>
                        </div>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle mr-5">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
