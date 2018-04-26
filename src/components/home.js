import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

const Home  = (props) =>  {
  const session = JSON.parse(sessionStorage.getItem('session'));
  const jwt = session?session.jwt:'';
  let url = '/users/register';
  let buttonText = 'Sign Up';
  if(jwt !== ''){
      url = '/tests';
      buttonText = 'Start a test'
  }
  return (
    <section className="jumbotron text-center">
        <div  className="container">
              <h1 className="jumbotron-heading">Create Test</h1>
              <p className="lead text-muted">Ever wanted to create your own multiple choice test? Start now!</p>
              <p>
              <LinkContainer to={url}>
                <a className="btn btn-primary btn-lg" href="" role="button">{buttonText}</a>
              </LinkContainer>
              </p>
        </div>
    </section>
  );
}

export default  Home;
