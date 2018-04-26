import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as SessionActions from '../actions/session_actions';

import {
    Collapse,
    Nav,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    NavItem,
    NavLink } from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';

class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
          collapsed: true,
          loggedIn: false,
          user:{
              id:0,
              fname:"Fake",
              lname:"Name",
              email:"fake@example.com",
          }
        };
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    logOut(event) {
        event.preventDefault();
        this.props.actions.logOutUser();
        this.props.history.push('/');
    }

    isUserLoggedIn(){
        if(!this.props.session){
            return (
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <LinkContainer to="/log-in">
                            <NavLink href="/log-in">Log in</NavLink>
                        </LinkContainer>
                    </NavItem>
                    <NavItem>
                        <LinkContainer to="/users/register">
                            <NavLink href="/users/register">Register</NavLink>
                        </LinkContainer>
                    </NavItem>
                    <NavItem>
                        <LinkContainer to="/about">
                            <NavLink href="/about">About</NavLink>
                        </LinkContainer>
                    </NavItem>
                </Nav>
            );
        }else{
            const user = JSON.parse(sessionStorage.getItem('session')).user;
            const editLink = `/users/${user.id}/edit`;
            return (
                <Nav className="ml-auto" navbar >
                    <NavItem>
                        <LinkContainer to={editLink}>
                            <NavLink href={editLink}>
                            {
                                user.fname + ' ' +
                                user.lname
                            }
                        </NavLink>
                        </LinkContainer>
                    </NavItem>
                    <NavItem>
                        <LinkContainer to="/tests">
                            <NavLink href="/tests">Create Tests</NavLink>
                        </LinkContainer>
                    </NavItem>
                    <NavItem>
                        <LinkContainer to="/log-out">
                            <NavLink href="/log-out" onClick={this.logOut}>Log out</NavLink>
                        </LinkContainer>
                    </NavItem>
                    <NavItem>
                        <LinkContainer to="/about">
                            <NavLink href="/about">About</NavLink>
                        </LinkContainer>
                    </NavItem>
                </Nav>

            );
        }
    }
    toggleNavbar() {
        this.setState({
          collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <Navbar color="dark" dark expand="md">
                <LinkContainer to="/">
                    <NavbarBrand href="/" className="mr-auto">
                        CT
                    </NavbarBrand>
                </LinkContainer>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={!this.state.collapsed} navbar>
                    {this.isUserLoggedIn()}
                </Collapse>
            </Navbar>
        );
    }
}

function mapStateToProps(state, ownProps) {
  return {
      session: state.session
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SessionActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopNav));
