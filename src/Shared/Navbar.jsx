import React from 'react';
import { NavLink } from 'react-router-dom'; // Corrected import path
import GradientButton from '../Components/GradientButton';

const Navbar = () => {
    const navItems = ( // Added parentheses for clarity, though not strictly required for a fragment
        <>
            <NavLink to='/'><li>Home</li></NavLink>
            <NavLink to='/all-properties'><li>All Properties</li></NavLink> {/* Updated route */}
            <NavLink to='/dashboard'><li>Dashboard</li></NavLink> {/* Updated route */}
            <NavLink to='/login'><li>Login</li></NavLink> {/* Updated route */}
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItems} {/* Corrected usage */}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">PropertyPulse</a> {/* Updated website name */}
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems} {/* Corrected usage */}
                </ul>
            </div>
            <div className="navbar-end">
                <GradientButton>Login</GradientButton>
            </div>
        </div>
    );
};

export default Navbar;