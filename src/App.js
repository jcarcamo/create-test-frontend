import React, { Component } from 'react';
import Home from './components/home';
import LogIn from './components/log_in'
import Register from './components/register'
import About from './components/about';
import Tests from './components/tests'
import Questions from './components/questions'
import Answers from './components/answers';
import TopNav from './components/top_nav';
import Footer from './components/footer';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <div>
          	<header>
                <TopNav />
            </header>
            <main role="main">
                <Switch>
                  <Route path="/tests/:test_id/questions/:question_id/answers" component={Answers}/>
                  <Route path="/tests" component={Tests} />
                  <Route path="/users/:user_id/tests/:test_id/questions" component={Questions} />
                  <Route path="/users/:id/edit" component={Register} />
                  <Route path="/users/register" component={Register} />
                  <Route path="/log-in" component={LogIn} />
                  <Route path="/about" component={About} />
                  <Route path="/" component={Home} />
                </Switch>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
