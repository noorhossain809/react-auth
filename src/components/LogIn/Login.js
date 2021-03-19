import React, { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faGithub } from '@fortawesome/free-brands-svg-icons';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router';

const Login = () => {

    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
     const history = useHistory();
     const location = useLocation();
     let { from } = location.state || { from: { pathname: "/" } };
           
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        
        firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    const {displayName} = result.user;
    const signInUser = {displayName}
    setLoggedInUser(signInUser);
    history.replace(from);
    
    
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
   
  });
    }

    const handleFacebookSignIn = () => {
        var fbProvider = new firebase.auth.FacebookAuthProvider();

        firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    const {displayName} = result.user;
    const signInUser = {displayName}
    setLoggedInUser(signInUser);
    history.replace(from);
    

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });

    }
      
     const handleGithubSignIn = () => {
        var ghProvider = new firebase.auth.GithubAuthProvider();

        firebase
  .auth()
  .signInWithPopup(ghProvider)
  .then((result) => {
    const user = result.user;
    console.log(user)
    // const signInUser = {displayName}
    // setLoggedInUser(signInUser);
    // history.replace(from);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
     }

    return (
        <div class="row">
            <div >
            <div className="login">
            
        <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label><h3>Login to your account</h3></Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    
    <Form.Control type="password" placeholder="Password" />
    <br/>
    <Button variant="success" style={{ width:'280px'}}>Login</Button>
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Form.Label>or</Form.Label>
  <Button onClick={handleGoogleSignIn} variant="danger" style={{ width:'280px'}}><FontAwesomeIcon icon={faGoogle} />  Continue with Google</Button>
  <br/>
  <Button onClick={handleFacebookSignIn} variant="primary" style={{ width:'280px', marginBottom:'10px',marginTop:'10px'}}><FontAwesomeIcon icon={faFacebookF} />  Continue with Facebook</Button>
  <br/>
  <Button onClick={handleGithubSignIn} variant="dark" style={{ width:'280px'}}><FontAwesomeIcon icon={faGithub} />  Continue with Github</Button>
  <br/>
  <Form.Label>Forgot password?</Form.Label>
</Form>
            </div>
            </div>
            
        </div>
    );
};

export default Login;