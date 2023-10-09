import React from "react";
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

import bgImage from "../static/img/bg1.jpg";

const Landing = () => {
    useDocumentTitle("Stick-It");
    return (
        <div className="landing-banner">
            <img className="landing-banner__image" src={bgImage} />
            <div className="landing-banner__content">
                <h1 className="landing-banner__title">
                    Stick-It is your No.1 workspace for collaborations and Productivity...
                </h1>
                <h4 className="landing-banner__subtitle">
                    Stick-It workspace has all-in-one features and enable superSonic workflow with amazing UI experience.
                </h4>
                <Link to="/register" className="btn">
                    Sign Up Here
                </Link>
            </div>
        </div>
    );
};

export default Landing;
