import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MainSection = () => {
    return (
        <main className="bg-gradient-to-b from-blue-100 to-blue-50">
            {/* Hero Section */}
            <section className="py-5 min-h-screen flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
                    <div className="flex flex-col lg:flex-row items-center gap-10">
                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-800 mb-4">
                                <span className="text-blue-500">Clear</span>Breath
                            </h1>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                ClearBreath is a platform dedicated to environmental awareness and air quality monitoring. Explore the map, add markers, and visualize pollution data in real-time. Help create a cleaner and healthier environment for everyone.
                            </p>
                            <Link to="/signup">
                                <motion.button
                                    className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-700 transition duration-300 ease-in-out"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Get Started
                                </motion.button>
                            </Link>
                        </motion.div>
                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        >
                            <motion.img
                                src={process.env.PUBLIC_URL + '/landing.png'}
                                alt="Clear Breath Landing"
                                className="w-full rounded-lg" // Removed shadow and any borders
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.8, ease: 'easeInOut' }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Features</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon="🌍"
                            title="Global Map"
                            description="View real-time air quality data across the globe with our interactive map feature."
                        />
                        <FeatureCard
                            icon="📍"
                            title="Custom Markers"
                            description="Add your own markers to the map to share and track local air quality."
                        />
                        <FeatureCard
                            icon="📊"
                            title="Data Visualization"
                            description="Analyze pollution trends with our easy-to-use visual data tools."
                        />
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-12 bg-blue-50">
                <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">How It Works</h2>
                    <div className="flex flex-col lg:flex-row items-center lg:space-x-10 space-y-6 lg:space-y-0">
                        <StepCard number="1" title="Explore the Map" description="Browse air quality levels around the world." />
                        <StepCard number="2" title="Add Markers" description="Contribute by adding data and location markers." />
                        <StepCard number="3" title="Track Trends" description="Monitor and analyze air quality changes." />
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">What Users Say</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <TestimonialCard
                            quote="ClearBreath has helped me understand air quality levels in my neighborhood!"
                            name="Sarah L."
                            location="New York, USA"
                        />
                        <TestimonialCard
                            quote="A valuable tool for environmental awareness!"
                            name="David R."
                            location="London, UK"
                        />
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="py-12 bg-gradient-to-b from-blue-500 to-blue-400 text-white text-center">
                <div className="container mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-4">Ready to make an impact?</h2>
                    <p className="mb-6">Join ClearBreath and help us create a cleaner, healthier environment for everyone.</p>
                    <Link to="/signup">
                        <motion.button
                            className="bg-white text-blue-500 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 focus:outline-none transition duration-300 ease-in-out"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Join Now
                        </motion.button>
                    </Link>
                </div>
            </section>
        </main>
    );
};

// Reusable Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
    <div className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
        <span className="text-5xl mb-4">{icon}</span>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

// Reusable Step Card Component
const StepCard = ({ number, title, description }) => (
    <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
        <span className="text-4xl font-bold text-blue-500 mb-4">{number}</span>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

// Reusable Testimonial Card Component
const TestimonialCard = ({ quote, name, location }) => (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
        <p className="text-gray-700 italic mb-4">&quot;{quote}&quot;</p>
        <h4 className="font-semibold text-gray-800">{name}</h4>
        <span className="text-gray-500">{location}</span>
    </div>
);

export default MainSection;
