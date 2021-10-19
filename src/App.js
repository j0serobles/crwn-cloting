import React from 'react';

import './App.css';


import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import Header   from './components/Header/header.component.jsx';  
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'; 

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubstribeFromAuth = null;

  componentDidMount() {
    this.unsubstribeFromAuth = auth.onAuthStateChanged( async user => {
      createUserProfileDocument(user); 
    });
  }

  componentWillUnmount() {
    this.unsubstribeFromAuth(); 
  }

  
  render() { 
 
    return ( 
      <div>
        <Header currentUser = { this.state.currentUser }/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
 
  }

}
export default App;