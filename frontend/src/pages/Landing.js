import React from "react";
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

import bgImage from "../static/img/bg1.jpg";

const Landing = () => {
    useDocumentTitle("Stick-It | Home");
    return (
        <div className="landing-banner">
            <img className="landing-banner__image" src={bgImage} />
            <div className="landing-banner__content">
                <h1 className="landing-banner__title">
                    Stick-It isn't just functional; it's also designed for fun.
                </h1>
                <h4 className="landing-banner__subtitle">
                   Stick-It Boards, Lists, and Cards offer a dynamic and engaging platform for efficient project organization and prioritization 
                </h4>
                <Link to="/register" className="btn">
                    Sign Up For Free Today
                </Link>
            </div>
        </div>
    );
};

export default Landing;
