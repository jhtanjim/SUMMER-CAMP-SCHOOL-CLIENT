import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';

const Banner = () => {
    const slideStyles = {
        position: 'relative',
    };

    const overlayStyles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: '#fff',
    };

    const headingStyles = {
        fontSize: '50px',
        fontWeight: 'bold',
        textTransform: 'uppercase', // Add this property

    };

    const descriptionStyles = {
        fontSize: '20px',
        fontWeight: 'semiBold',
    };

    return (
        <div className="carousel w-full">
            <AwesomeSlider animation="cubeAnimation" className="slider">
                <div style={slideStyles} className="bg-black">
                    <img
                        className="opacity-50"
                        src="https://i.ibb.co/PF9Q1zP/pexels-moose-photos-1037992.jpg"
                        alt="Slider 1"
                    />
                    <div style={overlayStyles}>
                        <h2 className="whitespace-nowrap" style={headingStyles}>
                            Learn to Play an Instrument
                        </h2>
                        <p style={descriptionStyles}>
                            Explore our wide range of music lessons and learn to play your favorite instrument.
                        </p>
                    </div>
                </div>
                <div style={slideStyles}>
                    <img
                        className="opacity-50"
                        src="https://i.ibb.co/zRBZccd/pexels-roman-odintsov-5855893.jpg"
                        alt="Slider 2"
                    />
                    <div style={overlayStyles}>
                        <h2 style={headingStyles}> Learn Music Theory </h2>
                        <p style={descriptionStyles}>
                            Dive into the world of music theory and composition and unlock your creativity.
                        </p>
                    </div>
                </div>
                <div style={slideStyles}>
                    <img
                        className="opacity-50"
                        src="https://i.ibb.co/7KQB3PF/sheet-music-7036343.jpg"
                        alt="Slider 3"
                    />
                    <div style={overlayStyles}>
                        <h2 style={headingStyles}>Discover Various Genres</h2>
                        <p style={descriptionStyles}>
                            Experience the beauty of different music genres and broaden your musical horizons.
                        </p>
                    </div>
                </div>
                <div style={slideStyles}>
                    <img
                        className="opacity-50"
                        src="https://i.ibb.co/V2FMHpX/music-instruments-2887457.jpg"
                        alt="Slider 4"
                    />
                    <div style={overlayStyles}>
                        <h2 style={headingStyles}>Join a Music Community</h2>
                        <p style={descriptionStyles}>
                            Connect with fellow music enthusiasts, collaborate, and share your passion for music.
                        </p>
                    </div>
                </div>
            </AwesomeSlider>
        </div>
    );
};

export default Banner;
