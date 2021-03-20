import React, { useContext, useState } from 'react';
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
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
      isSignedIn: false,
      name: '',
      email: '',
      password: '',
      success: false,
    })
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

     const handleBlur = (e) => {
        let isFieldValid = true;
        if(e.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
            
        }
        if(e.target.name === 'password'){
             const isPasswordValid = e.target.value.length > 6;
             const passwordHasValid = /\d{1}/.test(e.target.value);
             isFieldValid = isPasswordValid && passwordHasValid

        }
        if(isFieldValid){
          const newUserInfo = {...user};
          newUserInfo[e.target.name] = e.target.value;
          setUser(newUserInfo);
        }
     }

     const handleSubmit = (e) => {
            if(newUser && user.email && user.password){
              firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
              .then( res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                updateUserName(user.name);
          
              })
              .catch( error => {
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
              
              });
            
            }

            if(!newUser && user.email && user.password){
              firebase.auth().signInWithEmailAndPassword(user.email, user.password)
              .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                console.log('sign in user info', res.user)
              })
              .catch((error) => {
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
              });
            }
            e.preventDefault();
     }

     const updateUserName = name => {
      var user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: name,
      }).then(function() {
        console.log('user name update successfully')
      }).catch(function(error) {
         console.log(error)
      });
     }

    return (
        <div class="row">
            <div >
            <div className="login">
            
        <Form onSubmit={handleSubmit}>
        <Form.Label><h3 style={{color:'red', fontWeight:'400'}}>Create  Or</h3></Form.Label>
        <Form.Label><h3 style={{color:'blue', fontWeight:'400'}}>Login to your account</h3></Form.Label>
        <Form.Check type="checkbox" onChange={() => setNewUser(!newUser)} label="NewUser ? Please Sign Up"/>
        {newUser && <Form.Control type="name" name="name" onBlur={handleBlur} placeholder="Enter name" /> } 
        <br/>
  <Form.Group controlId="formBasicEmail">
    
    <Form.Control type="email" name="email" onBlur={handleBlur} placeholder="Enter email" required/>
    
    <p style={{color:'red', fontWeight:'300'}}>{user.error}</p>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    
    <Form.Control type="password" name="password" onBlur={handleBlur} placeholder="Password" required/>
    <br/>
    <Button variant="success" type="submit" style={{ width:'280px'}}>{newUser ? 'Sign Up' : 'Login'}</Button>
    {user.success && <p style={{color: 'green'}}>User {newUser ? 'created' : 'Logged In'} successfully</p>}
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
   
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