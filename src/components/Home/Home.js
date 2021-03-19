import React from 'react';
import dataRider from '../../data/data.json';
import { useEffect, useState } from 'react';
import Rider from '../Rider/Rider';


const Home = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
       setData(dataRider);
       
    },[])
    return (
        <div>
            <div class="row">
      {
         data.map(rider => <Rider rider={rider}></Rider>)
       }
      </div>
        </div>
    );
};

export default Home;