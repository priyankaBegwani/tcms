import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class App extends Component {

  logout(){
    sessionStorage.clear();
  }
  render() {
    const userData = JSON.parse(sessionStorage.getItem('tmsData'));
    console.log("userData >>",userData)
    let button = "";
    if(userData && userData.isLoggedIn){
       button = <Link to="/" onClick={this.logout}>LogOut</Link>;
    }else{
       button = "";
    }
    console.log("button >>",button)
    return (
      <div className="contentArea">
          <div className="topBar">
              <div className="topBar__left">
              </div>
              <div className="topBar__right">
                {button}
              </div>
          </div>
	        {this.props.children}
    	</div>)
  }
}

App.propTypes = {
    children: PropTypes.object.isRequired
}

export default App;
