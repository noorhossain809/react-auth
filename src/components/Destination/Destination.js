import React, { useState } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useParams } from 'react-router';
import './Destinatione.css';
import dataRider from '../../data/data.json';
import DateDetails from '../DateDetails/Date';




const Destination = () => {
const {name} = useParams();
const [pick, setPick] = useState({});
const showRides = () => {
  const availableRiders = dataRider.find(ride => ride.name ===name);
  setPick(availableRiders);
  console.log(pick)
  
}
  return (
        <div className="main-header">
          
          <div>
            
          </div>
      <div class="row">
                <div className="search">
                <h1 style={{color:'red', fontWeight:'400'}}>Destination</h1>
                <DateDetails></DateDetails>
                <h5 style={{float: 'left'}}>Pick From</h5>
            <InputGroup className="mb-3">
            <FormControl
      aria-label=""
      aria-describedby="inputGroup-sizing-default"
    />
  </InputGroup>
  <h5 style={{float: 'left'}}>Pick To</h5>
  <br/>
  <InputGroup className="mb-3">
    <FormControl
      aria-label="Default"
      aria-describedby="inputGroup-sizing-default"
    />
  </InputGroup>
  <br/>

  <Button onClick={showRides} variant="danger" size="lg" block>Search</Button>
                </div>
            </div>
            <div class="row">
            <div class="col-md-3">
            <img className="img" src={pick.image} alt=""/>
          <p>{pick.name}</p>
          <img className="img" src={pick.image} alt=""/>
          <p>{pick.name}</p>
            </div>
            </div>
        </div>
    );
};

export default Destination;

