import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

const Answers  = (props) =>  {
  return (
    <section className="jumbotron text-center">
        <div  className="container">
              <h1 className="jumbotron-heading">Section under construction</h1>
              <p className="lead text-muted">Sorry for the inconvenience, this will be ready as soon as possible</p>
              <p>
              <LinkContainer to="/tests">
                <a className="btn btn-primary btn-lg" href="" role="button">Go to Tests</a>
              </LinkContainer>
              </p>
        </div>
    </section>
  );
}

export default Answers;
