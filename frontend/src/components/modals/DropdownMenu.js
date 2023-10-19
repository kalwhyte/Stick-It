import React from "react";
import "../../static/css/components/menu.css";

const DropdownMenu = ({ isOpen, toggle }) => {
    return isOpen ? (
        <div className="dropdown-menu">
            <ul className="dropdown-menu__list">
                <li className="dropdown-menu__li">
                    <a onClick={toggle}>Profile</a>
                </li>
                <li className="dropdown-menu__li">
                    <a onClick={toggle}>Settings</a>
                </li>
                <li className="dropdown-menu__li">
                    <a onClick={toggle}>Logout</a>
                </li>
            </ul>
        </div>
    ) : null;
};

export default DropdownMenu;
