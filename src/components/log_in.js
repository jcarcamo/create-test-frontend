import React, { Component } from 'react';
import Formsy from 'formsy-react';
import MyInput from './../components/Input';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

// Redux stuff
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as SessionActions from '../actions/session_actions';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canSubmit: false,
            credentials: {email: '', password: ''}
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
    }
    handleRedirect(){
        if(this.props.loggedIn){
            return(<Redirect to='/' />);
        }
    }

    handleLogin(data) {
        const credentials = {
            email:data.email,
            password:data.password
        };
        this.setState({
            credentials:credentials
        });
        console.log(credentials)
        this.props.actions.logInUser(credentials);
        //alert(JSON.stringify(data, null, 4));
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    disableButton() {
        this.setState({ canSubmit: false });
    }

    render() {
      return (
        <div className="py-5 bg-light">
            <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <h1>
                        Log In
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                      <Formsy onSubmit={this.handleLogin} onValid={this.enableButton} onInvalid={this.disableButton} className="login">
                          <MyInput id= "email" placeholder="Enter your email" className="form-group" name="email" title="Email" validations="isEmail" validationError="This is not a valid email" required />
                          <MyInput id= "password" placeholder="Enter your password" className="form-group" name="password" title="Password" type="password" required />
                          <Button color="primary" type="submit" disabled={!this.state.canSubmit}>Go</Button>
                      </Formsy>
                      { this.handleRedirect() }
                  </div>
                </div>
            </div>
        </div>
      );
    }
}

function mapStateToProps(state, ownProps) {
  return {
      loggedIn: state.session
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SessionActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
