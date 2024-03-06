import React from 'react';

const MainSection = () => {
    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6">
                        <h1 className="display-5 fw-bolder"><span style={{color: "#2091d6"}}>Clear</span>Breath!</h1>
                        <p className="lead">ClearBreath is a platform dedicated to environmental awareness and air quality monitoring. Explore the map, add markers, and visualize pollution data in real-time. Help create a cleaner and healthier environment for everyone.</p>
                        <button className="btn btn-outline-dark" type="button">Get Started</button>
                    </div>
                    <div className="col-md-6">
                        <img src={process.env.PUBLIC_URL + '/landing.jpg'} className="img-fluid" alt="Clear Breath Landing" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainSection;
