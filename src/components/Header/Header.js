import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
        <h2>Uber Riders</h2>
      <Nav className="justify-content-end" activeKey="/home" style={{padding:'50px',margin:'5px'}}>
      <Nav.Item>
      <Link to="/home">Home</Link>
    </Nav.Item>
    
    <Nav.Item>
    <Link to="/destination" style={{marginLeft:'60px'}}>Destination</Link>
    </Nav.Item>
    <Nav.Item>
      <Link to="/Blog" style={{marginLeft:'50px'}}>Blog</Link>
    </Nav.Item>
    <Nav.Item>
    <Link to="/Contact" style={{marginLeft:'40px'}}>Contact</Link>
    </Nav.Item>
    <Nav.Item>
      <Link to="/login" style={{backgroundColor:'white', marginLeft:'30px'}} eventKey="link-4">Login</Link>
    </Nav.Item>
    <p style={{marginLeft:'10px'}}>{loggedInUser.displayName}</p>
  </Nav>
        </div>
    );
};

export default Header;