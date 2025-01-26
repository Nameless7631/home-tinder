import { Link } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
import pixel from './pixelated.png';
import './home.css';

const Navbar = () => {
    return (
    <div style={textStyle}>
    <nav style={navbarStyle}>
        <ul style={navListStyle}>
            <li style={titleStyle}>
                <Link to="/home" style={titleStyle}>
                    match<Text as="span" color="#99c280">A</Text>house
                </Link>            
                </li>
            {/* <li style={navItemStyle}>
                <Link to="/home" style={homeStyle}>Home</Link>
            </li> */}
            <li style={navItemStyle}>
                <a href="#about" style={aboutStyle}>About</a>
            </li>
            <li style={navItemStyle}>
                <Link to="/survey" style={surveyStyle}>Survey</Link>
            </li>
            
        </ul>
    </nav>
    </div>
    );
}

const textStyle = {
    // fontFamily: "'Palatino Linotype', 'Book Antiqua', serif",
    fontSize: '25px',
};

const navbarStyle = {
    width: '100%',      
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px', 
    backgroundImage: '#fff',
    backgroundPosition: 'center',
    position: 'relative',
    backgroundSize: 'cover',
    borderBottom: '4px solid #AFE1AF',
};

const navListStyle = {
    display: 'flex',
    listStyleType: 'none',
    padding: '0',
    margin: '0',
    justifyContent: 'flex-start',
};

const navItemStyle = {
    marginRight: '20px',
};

const homeStyle = {
    color: '#000',
    textDecoration: 'none',
    marginLeft: '20px',
};

const aboutStyle = {
    color: '#000',
    textDecoration: 'none',
    marginLeft: '20px',
    fontSize: '18px',
};

const surveyStyle = {
    color: '#000',
    textDecoration: 'none',
    marginLeft: 'auto',
    fontSize: '18px',
};

const titleStyle = {
    fontSize: '25px',
    marginLeft: '10px',
};

export default Navbar;