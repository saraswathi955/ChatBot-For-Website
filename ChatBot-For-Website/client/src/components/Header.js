import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
        <nav>
            <div className="nav-wrapper">
                <Link to={'/'} className="brand-logo">MSIT</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to={'/shop'}>COURSES</Link></li>
                    <li><Link to={'/about'}>About MSIT</Link></li>
                </ul>
            </div>
        </nav>
    )


export default Header;