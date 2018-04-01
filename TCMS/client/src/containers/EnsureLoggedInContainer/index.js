import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
    class Authentication extends Component {

        componentWillMount() {
            let userData = JSON.parse(sessionStorage.getItem('tmsData'));
            if(!userData || !userData.isLoggedIn){
                this.props.history.push('/')
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                that.props.history.push('/')
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }
    function mapStateToProps(state) {
        return {authenticated: state.userSession.isLoggedIn };
    }

    return connect(mapStateToProps)(Authentication);
}
