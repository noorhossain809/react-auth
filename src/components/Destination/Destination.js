import React from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import './Destinatione.css'

const Destination = () => {
    return (
        <div>
            <div class="row">
                <div className="search">
                <h1>Destination</h1>
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
  <Button variant="danger" size="lg" block>Search</Button>
                </div>
            </div>
            
        </div>
    );
};

export default Destination;