import React from 'react';

const About = () => {
  return (
      <div className="py-5 bg-light">
        <div className="container">
            <div className="row">
              <div className="col-md-12">
                  <h1>About</h1>
                  <p className="text-justify">This is the final project for CIS-658 - Web Architectures. This course was taken during winter semester 2018. The purpose of this application is to provide an admin environment for an application like <a href='https://brilliant.org'>brilliant.org</a> where people can take different challenges in the form of multiple choice single correct answer questions. The goal of this project was to develop an API that could support the CRUD operations for the User, Test, Question, and Answer entities.
                  </p>
                  <p className="text-justify">
                      This project was created using the following technologies:
                  </p>
                  <h4>For the backend (Created with Ruby on Rails) the following gems were used</h4>
                  <ul>
                      <li>Knock: JWT authentication</li>
                      <li>bcrypt: encrypts passwords</li>
                      <li>active_model_serielizer: fine-handle Json responses</li>
                  </ul>

                  <h4>For the frontend (Created with React) the following packages were used</h4>
                  <ul>
                      <li>reactstrap: bootstrap@4 components</li>
                      <li>@fortawesome/react-fontawesome: Free icons to style buttons</li>
                      <li>formsy-react: Form lifecycle helper</li>
                  </ul>

                  <h4>Final thoughts</h4>
                  <p className="text-justify">
                      Although I tried to understand redux I only manage to follow a tutorial which kind of helped me handling the log-in state globally. However due to the lack of time I ended up using sessionStorage like a mere mortal.The front-end is not complete yet, it is missing storing the answers.
                  </p>

                  <h4>References</h4>
                  <ul>
                      <li>
                          <a href='https://github.com/jcarcamo/create-test-api'>
                              Live Demo
                          </a>
                      </li>
                      <li>
                          <a href='https://github.com/jcarcamo/create-test-api'>
                              Rails API github repo
                          </a>
                      </li>
                      <li>
                          <a href='https://github.com/jcarcamo/create-test-frontend'>
                              React frontend github repo
                          </a>
                      </li>
                  </ul>

                </div>
            </div>
        </div>
    </div>
  )
}

export default About;
