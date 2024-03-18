import React from 'react';

const MainSection = () => {
    return (
        <section className="py-5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-5 max-w-screen-xl">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                            <span className="text-blue-400">Clear</span>Breath
                        </h1>
                        <p className="text-lg text-gray-700 mb-6">
                            ClearBreath is a platform dedicated to environmental awareness and air quality monitoring. Explore the map, add markers, and visualize pollution data in real-time. Help create a cleaner and healthier environment for everyone.
                        </p>
                        <button className="bg-blue-400 text-white px-6 py-3 rounded-full hover:bg-blue-500 focus:outline-none focus:bg-blue-700 transition duration-300 ease-in-out">
                            Get Started
                        </button>
                    </div>
                    <div className="lg:w-1/2">
                        <img src={process.env.PUBLIC_URL + '/landing.png'} className="w-full" alt="Clear Breath Landing" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainSection;
