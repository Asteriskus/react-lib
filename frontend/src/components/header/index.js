import React from 'react';
import './index.less';

const Header = ({ text }) => {
    const linkList = [
        ["About", "/about"],
        ["Pricing", '/pricing'],
        ["Docs", "/docs"],
        ["Contacts", '/contacts']
    ];
    return <header className="header">
        <h2 className="header-logo">{text}</h2>
        <nav className="header-nav">
            <ul className="header-ul">
                <NavLinks links={linkList}/>
            </ul>
        </nav>
    </header>
};

const NavLinks = ({ links }) => links.map(getLinksMarkup);

const getLinksMarkup = ( link ) =>
    <li className="header-li" key={link[0]}>
        <a className="header-a" href={link[1]}>{link[0]}</a>
    </li>

export default Header;