import React from 'react';
import { Card} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import './Rider.css'

const Rider = (props) => {
    const {name,image} = props.rider;

    const history = useHistory();
    const handleClick = (name) => {
        history.push(`/destination/${name}`)
    }
    return (
        
        <div class="col-md-3">
       <Card border="primary" style={{ width: '18rem' }}>
  <Card.Img onClick={handleClick} className="img" variant="top" src={image} />
    <Card.Body>
    <Card.Title className="title" onClick={() =>handleClick(name)}>{name}</Card.Title>
    </Card.Body>
  </Card>
       
    
        </div>
    );
};

export default Rider;