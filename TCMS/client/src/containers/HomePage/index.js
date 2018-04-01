import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './actions';
import TransportEntry from '../TransportEntry';
import { NavLink  } from 'react-router-dom';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
    };
  }

  render() {
    return (
      <div>
        <div className="menu-bar">
            <NavLink to="/search">Search</NavLink>
        </div>
        <TransportEntry/>
        </div>
    )
}
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
