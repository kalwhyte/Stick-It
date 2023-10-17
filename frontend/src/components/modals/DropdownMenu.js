import React from "react";

const DropdownMenu = ({ isOpen, toggle }) => {
    return isOpen ? (
        <div className="dropdown-menu">
            <ul className="dropdown-menu__list">
                <li className="dropdown-menu__li">
                    <button onClick={toggle}>Profile</button>
                </li>
                <li className="dropdown-menu__li">
                    <button onClick={toggle}>Settings</button>
                </li>
                <li className="dropdown-menu__li">
                    <button onClick={toggle}>Logout</button>
                </li>
            </ul>
        </div>
    ) : null;
}

export default DropdownMenu;