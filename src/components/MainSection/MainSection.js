import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const MainSection = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <main className="bg-gradient-to-b from-blue-100 to-blue-50">
            {/* Hero Section */}
            <section className="py-10 min-h-screen flex items-center bg-gradient-to-b from-white to-blue-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
                        }}
                        className="flex flex-col lg:flex-row items-center gap-10"
                    >
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
                                className="w-full rounded-lg"
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.8, ease: 'easeInOut' }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            {/* Features Section */}
            <motion.section
                className="py-16 bg-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
                }}
            >
                <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Features</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard icon="🌍" title="Global Map" description="View real-time air quality data across the globe with our interactive map feature." />
                        <FeatureCard icon="📍" title="Custom Markers" description="Add your own markers to the map to share and track local air quality." />
                        <FeatureCard icon="📊" title="Data Visualization" description="Analyze pollution trends with our easy-to-use visual data tools." />
                    </div>
                </div>
            </motion.section>

            {/* How It Works Section */}
            <motion.section
                className="py-16 bg-blue-50"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
                }}
            >
                <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">How It Works</h2>
                    <div className="flex flex-col lg:flex-row items-center lg:space-x-10 space-y-6 lg:space-y-0">
                        <StepCard number="1" title="Explore the Map" description="Browse air quality levels around the world." />
                        <StepCard number="2" title="Add Markers" description="Contribute by adding data and location markers." />
                        <StepCard number="3" title="Track Trends" description="Monitor and analyze air quality changes." />
                    </div>
                </div>
            </motion.section>

            {/* Testimonials Section */}
            <motion.section
                className="py-16 bg-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
                }}
            >
                <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">What Users Say</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <TestimonialCard quote="ClearBreath has helped me understand air quality levels in my neighborhood!" name="Sarah L." location="New York, USA" />
                        <TestimonialCard quote="A valuable tool for environmental awareness!" name="David R." location="London, UK" />
                    </div>
                </div>
            </motion.section>

            {/* Call-to-Action Section */}
            <section className="py-16 bg-gradient-to-b from-blue-500 to-blue-400 text-white text-center">
                <div className="container mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-4">Ready to make an impact?</h2>
                    <p className="mb-6">Join ClearBreath and help us create a cleaner, healthier environment for everyone.</p>
                    <Link to="/signup">
                        <button
                            className="bg-white text-blue-500 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 focus:outline-none transition duration-300 ease-in-out"
                        >
                            Join Now
                        </button>
                    </Link>
                </div>
            </section>

            {/* Scroll-to-Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
                    aria-label="Scroll to top"
                >
                    <FaArrowUp size={20} />
                </button>
            )}
        </main>
    );
};

// Reusable Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
    <motion.div
        className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition"
        whileHover={{ scale: 1.05 }}
    >
        <span className="text-5xl mb-4">{icon}</span>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </motion.div>
);

const StepCard = ({ number, title, description }) => (
    <motion.div
        className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
        whileHover={{ scale: 1.05 }}
    >
        <span className="text-4xl font-bold text-blue-500 mb-4">{number}</span>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </motion.div>
);

const TestimonialCard = ({ quote, name, location }) => (
    <motion.div
        className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition"
        whileHover={{ scale: 1.05 }}
    >
        <p className="text-gray-700 italic mb-4">&quot;{quote}&quot;</p>
        <h4 className="font-semibold text-gray-800">{name}</h4>
        <span className="text-gray-500">{location}</span>
    </motion.div>
);

export default MainSection;
