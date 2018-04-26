import React,{ Component } from 'react';
import TestForm from './test_form';
import TestList from './test_list';
import axios from 'axios';

//const API_BASE = "http://localhost:3000";
const API_BASE = "https://cis-658-create-test-api.herokuapp.com";

function getSession(){
    const session = JSON.parse(sessionStorage.getItem('session'));
    let jwt = '';
    let user_id = '';
    if(session !== null){
        jwt = session.jwt;
        user_id = session.user.id;
    }
    const headers = {
      'Content-Type':'application/json',
      'Authorization':`Bearer ${jwt}`
    };
    return {user_id:user_id, headers};
}

class Tests extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tests:[],
      formMode: "new",
      test:{description:"", status:"",id:0}

    };
    this.loadTests = this.loadTests.bind(this);
    this.removeTest = this.removeTest.bind(this);
    this.addTest = this.addTest.bind(this);
    this.updateTest = this.updateTest.bind(this);
    this.updateTestForm = this.updateTestForm.bind(this);
  }

  updateTestForm(mode, testVals) {
    this.setState({
      test: Object.assign({}, testVals),
      formMode: mode,
    });
  }
  clearForm()
  {
    console.log("clear form");
    this.updateTestForm("new",{description:"",status:"",id:0});
  }

  formSubmitted(test) {
    if(this.state.formMode === "new") {
      console.log("formSubmitted: " + JSON.stringify(test));
      this.addTest(test);
    } else {
      this.updateTest(test);
    }
    this.clearForm();
  }

  loadTests() {
    const sess = getSession();
    axios
    .get(`${API_BASE}/users/${sess.user_id}/tests`, {headers:sess.headers})
    .then(res => {
      console.log(res.data);
      this.setState({ tests: res.data });
      console.log(`Tests loaded! = ${JSON.stringify(this.state.tests)}`)
    })
    .catch(err => console.log(err));
  }

  addTest(newTest) {
    const sess = getSession();
    axios
    .post(`${API_BASE}/users/${sess.user_id}/tests`,newTest,{headers:sess.headers})
    .then(res => {
      res.data.key = res.data.id;
      this.setState({ tests: [...this.state.tests, res.data] });
    })
    .catch(err => console.log(err));
  }

  updateTest(test) {
    const sess = getSession();
    console.log(test);
    axios
    .put(`${API_BASE}/users/${sess.user_id}/tests/${test.id}`,test,{headers:sess.headers})
    .then(res => {
      this.loadTests();
    })
    .catch(err => console.log(err));
  }

  removeTest(user_id,id) {
    const sess = getSession();
    let filteredArray = this.state.tests.filter(item => item.id !== id)
    this.setState({tests: filteredArray});
    axios
    .delete(`${API_BASE}/users/${sess.user_id}/tests/${id}`,{headers:sess.headers})
    .then(res => {
      console.log(`Record Deleted`);
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    console.log("Tests just got mounted")
    this.loadTests();
  }

  render() {
    return (
        <div className="py-5 bg-light">
            <div className="container">
              <div className="row">
                  <div className="col-md-9">
                      <h1>Test Workspace</h1>
                  </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                    <TestList
                      tests={this.state.tests}
                      onDelete={(user_id,id) => this.removeTest(user_id,id)}
                      onEdit={(mode,test) => this.updateTestForm(mode,test)}
                    />
                </div>
                <div className="col-md-4">
                    <TestForm
                      onSubmit={(test) => this.formSubmitted(test)}
                      onCancel={(mode,test) => this.updateTestForm(mode,test)}
                      formMode={this.state.formMode}
                      test={this.state.test}
                    />
                </div>
              </div>
            </div>
        </div>
    );
  }
}

export default Tests;
