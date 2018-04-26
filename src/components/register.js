import React, { Component} from 'react';
import Formsy, {addValidationRule} from 'formsy-react';
import MyInput from './../components/Input';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// Redux stuff
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as SessionActions from '../actions/session_actions';

//const API_BASE = 'http://localhost:3000';
const API_BASE = "https://cis-658-create-test-api.herokuapp.com";
const DetailItem = (props) => {
    return(
            <li>{props.detail}</li>
    );
}

addValidationRule('equalsTo', (values, value, otherField) => {
    return value === values[otherField];
});

class Register extends Component {
    constructor(props) {
        super(props);
        const id = props.match.params.id;
        const createMode = (props.match.path.endsWith("register")) ? true: false;
        this.state = {
            id:id?id:0,
            create:createMode,
            canSubmit: false,
            modal: false,
            message:{
                title:'',
                details:[]
            },
            isSuccess:false
        };
        this.handleDismiss = this.handleDismiss.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }
    handleDismiss(){
        if(this.state.create){
            if (this.state.isSuccess){
                this.props.history.push('/log-in');
            }else{
                this.setState({
                    modal: !this.state.modal
                });
            }
        }else{
            this.setState({
                modal: !this.state.modal
            });
        }
    }
    registerUser(data, reset, invalidateForm){
        const newUser = {
            user:{
                fname:data.fname,
                lname:data.lname,
                email:data.email,
                password:data.password,
                password_confirmation:data.password_confirmation
            }
        }
        if(this.state.create){
            console.log(`Creating user ${newUser.user.email}`);
            axios
            .post(`${API_BASE}/users`, newUser)
            .then(res => {
              console.log('created!');
              this.setState({
                  modal:true,
                  message: {
                      title:'Success',
                      details:[
                          {
                              id:0,
                              detail:'You have registered successfully'
                          }
                      ]
                  },
                  isSuccess:true
              });
            })
            .catch(err => {
                console.log(err);
                if(err.response.status === 422){
                    console.log(JSON.stringify(err.response.data.errors));
                    for(var i=0; i < err.response.data.errors.length; i++){
                            err.response.data.errors[i]['id'] = i;
                    }

                    this.setState({
                        modal:true,
                        message: {
                            title:"Something is not right",
                            details:err.response.data.errors
                        },
                        isSuccess: false
                    });
                }
            });
        }else{
            console.log(`Updating user ${newUser.user.email}`);
            const headers = {
                'Authorization': `Bearer ${JSON.parse(sessionStorage.session).jwt}`,
                'Content-Type':'application/json'
            }
            axios
            .put(`${API_BASE}/users/${this.state.id}`,
                newUser,{headers:headers})
            .then(res => {
              console.log('updated!');
              this.setState({
                  modal:true,
                  message: {
                      title:'Success',
                      details:[
                          {
                              id:0,
                              detail:'Profile Updated successfully'
                          }
                      ]
                  },
                  isSuccess:true
              });
            })
            .catch(err => {
                console.log(err);
                if(err.response.status === 422){
                    console.log(JSON.stringify(err.response.data.errors));
                    for(var i=0; i < err.response.data.errors.length; i++){
                            err.response.data.errors[i]['id'] = i;
                    }

                    this.setState({
                        modal:true,
                        message: {
                            title:"Something is not right",
                            details:err.response.data.errors
                        },
                        isSuccess: false
                    });
                }
            });
        }
    }

    toggleModal() {
      this.setState({
          modal: !this.state.modal
      });
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    disableButton() {
        this.setState({ canSubmit: false });
    }

    handleRedirect(){
        if(!this.props.loggedIn && !this.state.create){
            return(<Redirect to='/log-in' />);
        }
    }


    render() {
      const detailsList = this.state.message.details.map((detail)  => {
        return (
            <DetailItem
              key={detail.id}
              detail={detail.detail}
            />
        )
      });

      var user = {
          id:0,
          fname:'',
          lname:'',
          email:''
      };
      if(this.props.loggedIn){
          user = JSON.parse(sessionStorage.session).user;
      }
      return (
        <div className="py-5 bg-light">
            <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <h1>
                        {this.state.create?'Register':'Update your profile'}
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                          <ModalHeader toggle={this.toggleModal}>
                              <ul>
                                  {this.state.message.title}
                              </ul>

                          </ModalHeader>
                          <ModalBody>
                            {detailsList}
                          </ModalBody>
                          <ModalFooter>
                            <Button color="primary" onClick={this.handleDismiss}>
                                Dismiss
                            </Button>{' '}
                          </ModalFooter>
                        </Modal>
                      <Formsy
                          onSubmit={this.registerUser}
                          onValid={this.enableButton}
                          onInvalid={this.disableButton}

                          className="login">
                          <MyInput id= "fname" placeholder="Enter your First name" className="form-group" name="fname" title="First Name" type="text" value={user.fname}
                              required />
                          <MyInput id= "lname" placeholder="Enter your Last name" className="form-group" name="lname" title="Last Name" type="text" value={user.lname} required />
                          <MyInput id= "email" placeholder="Enter your email" className="form-group" name="email" title="Email" validations="isEmail" validationError="This is not a valid email" value={user.email} required />
                          <MyInput id= "password" placeholder="Enter your password" className="form-group" name="password" title="Password" type="password" required />
                          <MyInput id= "confirm_password" placeholder="Confirm your password" className="form-group" name="confirm_password" title="Confirm Password" validations="equalsTo:password" validationError="Confirmation doesn't match password" type="password" required />
                          <Button color="primary" type="submit" disabled={!this.state.canSubmit}>{this.state.create?'Sign up':'Update'}</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
