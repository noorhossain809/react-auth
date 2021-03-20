import logo from './logo.svg';
import './App.css';
import { Button, Nav } from 'react-bootstrap';

import Rider from './components/Rider/Rider';

import Header from './components/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/LogIn/Login';
import Home from './components/Home/Home';
import Destination from './components/Destination/Destination';
import { createContext, useState } from 'react';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';


export const UserContext = createContext();

function App() {
 const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <div className="App">
        <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
       <Header></Header>
             <Switch>
               <Route path="/home">
                 <Home></Home>
               </Route>
               <Route path="/login">
                 <Login></Login>
               </Route>
               <PrivateRouter path="/destination/:name">
                 <Destination></Destination>
               </PrivateRouter>
               <Route exact path="/">
                 <Home></Home>
               </Route>
             </Switch>
      </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
