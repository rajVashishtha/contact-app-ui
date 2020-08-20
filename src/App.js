import React from 'react';
import './App.css';
import { Route,Switch, Redirect } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.page';
import ContactsPage from './pages/contactspage/contactspage.page';
import { connect} from 'react-redux';

class App extends React.Component{
  render(){
    const {currentUser} = this.props
    console.log(currentUser)
    return (
      <Switch>
        <Route exact path="/" render={()=>(currentUser?(<Redirect to="/contacts/Contacts" />):(<HomePage />))}></Route>
        <Route path="/contacts" render={()=>(currentUser ? (<ContactsPage />): <Redirect to="/" />)}></Route>
      </Switch>
    );
  }
}

const mapStateToProps = state =>({
  currentUser : state.user.currentUser
})
export default connect(mapStateToProps)(App)
